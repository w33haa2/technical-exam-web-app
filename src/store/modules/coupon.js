import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_COUPONS = generateMutationTypes('coupon', 'FETCH_COUPONS')

const state = {
  fetchingCoupons: {
    initial: false,
    success: false,
    fail: false
  },
  coupons: []
}

const getters = {
  getFetchingCouponState() {
    return state.fetchingCoupons
  },
  getCoupon() {
    return state.coupons
  },
}

const mutations = {
  //FETCH ITEMS
  [FETCH_COUPONS.initial](state) {
    state.fetchingCoupons = {
      initial: true,
      success: false,
      fail: false,
    }
  },
  [FETCH_COUPONS.success](state,payload) {
    state.fetchingCoupons = {
      initial: false,
      success: true,
      fail: false,
    }
    state.coupons = payload.meta
  },
  [FETCH_COUPONS.fail](state) {
    state.fetchingCoupons = {
      initial: false,
      success: false,
      fail: true,
    }
    state.coupons = []
  },
}

const actions = {
  fetchCoupons({commit}, params) {
    const slug = 'api.coupons.fetchAll'
    STATE_API({
      slug,
      params
    }, commit, [FETCH_COUPONS.initial, FETCH_COUPONS.success, FETCH_COUPONS.fail])
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
