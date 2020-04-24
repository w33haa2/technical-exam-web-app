<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0 pb-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cilBasket"></CIcon>
        <CBadge shape="pill" color="info">{{ getCartList.length }}</CBadge>
      </CHeaderNavLink>
    </template>
    <CDropdownItem disabled v-for="(item,index) in cartList" :key="index">
      {{ index }} x {{ item.length }}
    </CDropdownItem>
    <CDropdownItem @click="placeOrder" v-if="getCartList.length > 0" >
       Proceed to Checkout
    </CDropdownItem>
    <CDropdownItem disabled v-if="getCartList.length == 0">
      No items in Cart
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  computed: {
    ...mapGetters([
      "getCartList"
    ]),
    cartList() {
        return _.groupBy(this.getCartList, 'name')
    }
  },
  methods: {
    ...mapActions([
      "removeToCart",
      "orderPlaced"
    ]),
    placeOrder() {
      this.$router.push({path: '/checkout'})
      this.orderPlaced()
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>