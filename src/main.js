import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueRouter)
// 全局，通过this.axios调用
Vue.prototype.axios = axios

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   // let isLogin = window.sessionStorage.getItem('isLogin')
//   // 退出登录
//   if (to.path === '/logout') {
//     // 清除状态
//     window.sessionStorage.clear()
//     next('/Login')
//   } else if (to.path === '/Login') {
//     // 已登录直接跳转首页
//     if (isLogin != null) {
//       next('/Main')
//     }
//   }else if (isLogin == null) {
//     next('/Login')
//   }
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
