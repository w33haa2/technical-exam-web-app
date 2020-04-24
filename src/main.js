import 'core-js/stable'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from '@/store'
import { roundNumber, numberFilter } from "@/utils/numbers";
import _ from "lodash";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.prototype._ = _
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2);
Vue.prototype.$log = console.log.bind(console)

//Vue Global filters
Vue.filter("RoundNumber", function (value) {
  return roundNumber(value);
});

//currency filter
Vue.filter("CurrencyNumber", function (value, decimals = 5) {
  if(isNaN(parseFloat(value))) return "0.00"; //catch NaN values
  const newValue = numberFilter(value, decimals);
  if (newValue == "-0.00" || newValue == "0") return "0.00";
  else return newValue;
});


/**
 * region Navigation Guard
 */
router.beforeEach((to, from, next) => {
  const exemptedLoggedInRoutes = ["/login"];

  let validityStatus = false;
  if (store.state.auth.accessToken) {
    validityStatus = true;
  }

  if (validityStatus) {
    // if logged in
    if (_.includes(exemptedLoggedInRoutes, to.path)) {
      router.push({
        path: "/dashboard"
      });
    } else {
      next()
    }
  } else {
    // if not logged in
    if (_.includes(exemptedLoggedInRoutes, to.path)) {
      next();
    } else {
      router.push({
        path: "/login"
      });
    }
    
  }
})

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
