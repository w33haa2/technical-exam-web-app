import order from "./order"

const state = {
    cart: [],
    orderPlaced: []
}


const getters = {
    getCartList() {
        return state.cart
    },
    getOrderPlaced() {
        return state.orderPlaced
    }
}

const mutations = {
    addToCart(state, payload) {
        state.cart.push(payload)
    },
    orderPlaced(state, payload) {
        state.orderPlaced = state.cart
    },
    resetOrderPlaced(state, payload) {
        state.orderPlaced = []
    },
    resetCart(state, payload) {
        state.cart = []
    },
    removeToCart(state, payload) {
        payload.forEach(e => {
            let index = state.cart.indexOf(e);
            if (index > -1) {
                state.cart.splice(index, 1);
            }
        });
    },
}

const actions = {
    addToCart({commit}, params) {
        if(!_.isEmpty(params)) {
            commit('addToCart',params)
        }
    },
    removeToCart({commit}, params) {
        if(!_.isEmpty(params)) {
            commit('removeToCart',params)
        }
    },
    resetCart({commit}, params) {
        commit('resetCart')
    },
    orderPlaced({commit}, params) {
        commit('orderPlaced')
    },
    resetOrderPlaced({commit}, params) {
        commit('resetOrderPlaced')
    },
}

export default {
    state,
    getters,
    mutations,
    actions
  }


  