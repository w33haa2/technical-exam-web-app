<template>
  <div>
   <b-card>
      <b-card-body>
        <b-row v-if="getOrderPlaced.length > 0" class="justify-content-center" lg="12" >
                <h4>Order Summary</h4>
        </b-row>
        <br/>
        <b-row class="justify-content-center" v-if="getOrderPlaced.length == 0">
            <h5>No Items in the Cart</h5>
        </b-row>
        <b-row v-else>
          <b-col v-for="(item,index) in cartList" :key="index" lg="12">
            <b-card>
                <span class="h5">{{ index }} x {{ item.length }}</span>
                <CBadge class="h5 float-right" shape="pill" color="success">₱ {{ parseFloat(((parseFloat(item[0].price) + parseFloat(item[0].tax)) - ((parseFloat(item[0].price) + parseFloat(item[0].tax)) * discount)) * item.length).toFixed(2) }}</CBadge>
                <br>
                <br>
                <b-button variant="info" v-if="!successFlag" @click="removeToCart(item)" class="float-right">Remove to Cart</b-button>
            </b-card>
          </b-col>
           <b-col lg="6" >
                <b-input-group v-if="!successFlag">
                    <b-form-input :formatter="(e) => e.toUpperCase()" :disabled="getFetchingCouponState.initial" v-model="code" placeholder="Promo Code" ></b-form-input>
                    <template v-slot:append>
                    <b-button variant="success" @click="checkCoupon">Check Validity</b-button>
                    </template>
                </b-input-group>
            </b-col>
            <b-col lg="6">
                <h5 class="float-right">Total: ₱ {{ total }}</h5>
            </b-col>
            <br>
            <br>
            <br>
            <b-col lg="12">
                <b-button variant="success" v-if="!successFlag" :disabled="getCreatingOrderState.initial" @click="placeOrder" class="float-right" size="lg">Place Order</b-button>
            </b-col>
        </b-row>
      </b-card-body>
   </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Checkout',
  data () {
    return {
        selected: 'Month',
        code: '',
        successFlag: false,
        discount: 0
    }
  },
  mounted() {
    this.successFlag = false
    this.fetchCoupons()
  },
  computed: {
    ...mapGetters([
      "getFetchingItemState",
      "getCartList",
      "getOrderPlaced",
      "getCreatingOrderState",
      "getTokenInfo",
      "getCoupon",
      "getFetchingCouponState"
    ]),
    total() {
        let total = 0
        this.getOrderPlaced.forEach(e => {
            total += parseFloat(e.tax) + parseFloat(e.price)
        });
        return parseFloat(total).toFixed(2)
    },
    cartList() {
        return _.groupBy(this.getOrderPlaced, 'name')
    }
  },
  watch: {
    getCreatingOrderState({ initial, success, fail }) {
        if(success) {
            this.$swal('Success!', 'Successfully Placed Order!', 'success')
            this.successFlag = true
            this.resetCart()
        } else if(fail) {
            this.$swal('Oh No!', 'Something went wrong!', 'error')
        }
    }
  },
  methods: {
    ...mapActions([
      "fetchItems",
      "removeToCart",
      "fetchCoupons",
      "createOrders",
      "resetCart"
    ]),

    checkCoupon() {
        if(this.getCoupon.filter(e => e.code == this.code)[0] != undefined) {
            this.discount = parseFloat(this.getCoupon.filter(e => e.code == this.code)[0].discount) / parseFloat(100)
            this.$swal('Success!', 'Promo Code Applied', 'success')
        } else {
            this.$swal('Oh No!', 'No Code Matched', 'error')
        }
    },

    placeOrder() {
        let orderNumber = Math.random().toString(36).slice(2)
        const data = {
            order: this.getOrderPlaced.map((e) => ({
                user_id: this.getTokenInfo.id,
                order_number: orderNumber,
                menu_item_id: e.id,
                net_price: (parseFloat(e.tax) + parseFloat(e.price)) - ((parseFloat(e.price) + parseFloat(e.tax)) * this.discount)
            }))
        }
        this.createOrders(data)
    }

  }
}
</script>
