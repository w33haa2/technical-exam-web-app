Vue.use(Vuex)
import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import cart from './modules/cart'
import coupon from './modules/coupon'
import ui from './modules/ui'
import items from './modules/items'
import orders from './modules/order'

/**
 * Declare imported modules to store.
 */
const store = new Vuex.Store({
  modules: {
    auth,
    cart,
    coupon,
    items,
    orders,
    ui,
  }
})

Vue.prototype.$store = store

export default store
