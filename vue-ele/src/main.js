// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store/store'
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
import App from './App'
import router from './router'
Vue.prototype.$http = axios
Vue.use(YDUI);
Vue.use(Vuex);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
