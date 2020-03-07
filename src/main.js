require('./bootstrap');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


//Vue.component('Menu', './components/Menu.vue');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
