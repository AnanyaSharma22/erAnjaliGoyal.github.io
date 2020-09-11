// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Toasted from 'vue-toasted';

import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)



Vue.config.productionTip = false


Vue.use(Toasted, {
  duration: 1000
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
console.log("Vue initialized")
