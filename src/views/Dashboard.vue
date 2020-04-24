<template>
  <div>
   <b-card>
      <b-card-body>
        <b-row v-if="getFetchingItemState.initial" class="justify-content-center">
            <span> <i  class="fa fa-spinner fa-spin fa-3x"></i></span>
        </b-row>
        <b-row v-else>
          <b-col v-for="item in getItem" :key="item.id" lg="4">
            <b-card>
                <span class="h5">{{ item.name }}</span>
                <CBadge class="h6 float-right" shape="pill" color="success">₱ {{ item.price }}</CBadge>
                <br>
                <br>
                <b-button variant="info" @click="addToCart(item)" class="float-right">Add to Cart</b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-card-body>
   </b-card>
  </div>
</template>

<script>
import MainChartExample from './charts/MainChartExample'
import WidgetsDropdown from './widgets/WidgetsDropdown'
import WidgetsBrand from './widgets/WidgetsBrand'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand
  },
  data () {
    return {
      selected: 'Month',

    }
  },
  mounted() {
    this.fetchItems()
    this.resetOrderPlaced()
  },
  computed: {
    ...mapGetters([
      "getFetchingItemState",
      "getItem",
      "getCartList"
    ])
  },
  watch: {
    getCartList(e) {
      
    },
  },
  methods: {
    ...mapActions([
      "fetchItems",
      "addToCart",
      "resetOrderPlaced"
    ]),

  }
}
</script>
