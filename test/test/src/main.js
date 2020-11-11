// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import locale from '../node_modules/element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
Vue.prototype.$http = axios


Vue.use(ElementUI,{locale});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h => h(App)
})
