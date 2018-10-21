/**
 * This file is the entry to a small test&demo app for this plugin.
 * The plugin's entry file is index.js
 */

import Vue from 'vue'
import App from './App.vue'
import ReactiveProvide from '#lib'

Vue.use(ReactiveProvide)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
