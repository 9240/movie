import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios = axios;

import BScroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.component('BScroller',BScroller)
Vue.component('Loading',Loading)
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')