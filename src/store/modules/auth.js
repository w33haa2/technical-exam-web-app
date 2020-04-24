import SecureLS from 'secure-ls'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'
import router from "../../router";

const LOGIN = generateMutationTypes('auth', 'LOGIN')
const LOGOUT = generateMutationTypes('auth', 'LOGOUT')

//secure ls
var ls = new SecureLS({
  encodingType: 'aes'
});

const state = {
  accessToken: ls.get('token').access_token,
  logInState: {
    initial: false,
    success: false,
    fail: false
  },
  logOutState: {
    initial: false,
    success: false,
    fail: false
  },
  token_info: ls.get('token_info'),
  permissions: ls.get("permissions")
}

const getters = {
  getLogInState() {
    return state.logInState
  },
  getLogOutState() {
    return state.logOutState
  },
  getTokenInfo() {
    return state.token_info
  },
  getPermissions() {
    return state.permissions
  }
}

const mutations = {
  //LOGIN
  [LOGIN.initial](state) {
    state.logInState = {
      initial: true,
      success: false,
      fail: false,
    }
  },
  [LOGIN.success](state, payload) {
    state.logInState = {
      initial: false,
      success: true,
      fail: false,
    }
    state.accessToken = payload.access_token
    state.token_info = payload.user
    //set to local storage with encryption
    ls.set('token', {
      access_token: state.accessToken
    });
    ls.set('token_info', state.token_info)
    //set axios base token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.accessToken;
    router.push({
      path: "/dashboard"
    });
  },
  [LOGIN.fail](state) {
    state.logInState = {
      initial: false,
      success: false,
      fail: true,
    }
  },
  //LOGOUT
  [LOGOUT.initial](state) {
    state.logOutState = {
      initial: true,
      success: false,
      fail: false,
    }
  },
  [LOGOUT.success](state, payload) {
    state.logOutState = {
      initial: false,
      success: true,
      fail: false,
    }
    ls.removeAll()
    state.accessToken = null
    router.push({
      path: "/login"
    });
  },
  [LOGOUT.fail](state) {
    state.logOutState = {
      initial: false,
      success: false,
      fail: true,
    }
  },
  logoutUser (state) {
    ls.removeAll()
    state.accessToken = null
    router.go({
      path: "/login"
    });
  }
}

const actions = {
  authenticate({commit}, params) {
    const slug = 'api.auth.login'
    STATE_API({
      slug,
      params
    }, commit, [LOGIN.initial, LOGIN.success, LOGIN.fail])
  },
  revokeToken({commit}, params) {
    const slug = 'api.logout'
    STATE_API({
      slug,
      params
    }, commit, [LOGOUT.initial, LOGOUT.success, LOGOUT.fail])
  },
  logout({commit}, params) {
    commit('logoutUser')
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
