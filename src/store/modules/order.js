import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const CREATE_ORDERS = generateMutationTypes('orders', 'CREATE_ORDERS')

const state = {
  creatingOrders: {
    initial: false,
    success: false,
    fail: false
  },
}

const getters = {
  getCreatingOrderState() {
    return state.creatingOrders
  },
}

const mutations = {
  //CREATE ORDERS
  [CREATE_ORDERS.initial](state) {
    state.creatingOrders = {
      initial: true,
      success: false,
      fail: false,
    }
  },
  [CREATE_ORDERS.success](state,payload) {
    state.creatingOrders = {
      initial: false,
      success: true,
      fail: false,
    }
  },
  [CREATE_ORDERS.fail](state) {
    state.creatingOrders = {
      initial: false,
      success: false,
      fail: true,
    }
  },
}

const actions = {
  createOrders({commit}, params) {
    const slug = 'api.orders.bulk'
    STATE_API({
      slug,
      params
    }, commit, [CREATE_ORDERS.initial, CREATE_ORDERS.success, CREATE_ORDERS.fail])
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
