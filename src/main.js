import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueLocalStorage,
  render: h => h(App)
}).$mount('#app')
