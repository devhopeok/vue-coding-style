import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'

Vue.use(VueAxios, axios)
Vue.mixin(mixin)

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
