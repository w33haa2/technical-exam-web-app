import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_ITEMS = generateMutationTypes('item', 'FETCH_ITEMS')

const state = {
  fetchingItems: {
    initial: false,
    success: false,
    fail: false
  },
  items: [],
}

const getters = {
  getFetchingItemState() {
    return state.fetchingItems
  },
  getItem() {
    return state.items
  }
}

const mutations = {
  //FETCH ITEMS
  [FETCH_ITEMS.initial](state) {
    state.fetchingItems = {
      initial: true,
      success: false,
      fail: false,
    }
  },
  [FETCH_ITEMS.success](state,payload) {
    state.fetchingItems = {
      initial: false,
      success: true,
      fail: false,
    }
    state.items = payload.meta
  },
  [FETCH_ITEMS.fail](state) {
    state.fetchingItems = {
      initial: false,
      success: false,
      fail: true,
    }
    state.items = []
  },
}

const actions = {
  fetchItems({commit}, params) {
    const slug = 'api.menu_items.fetchAll'
    STATE_API({
      slug,
      params
    }, commit, [FETCH_ITEMS.initial, FETCH_ITEMS.success, FETCH_ITEMS.fail])
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
