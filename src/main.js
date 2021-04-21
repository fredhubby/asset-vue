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
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueRouter)
// 全局，通过this.axios调用
Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.prototype.$moment = moment;
Vue.directive('enterNumber', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  }
});
router.beforeEach((to, from, next) => {
  // 动态修改标题
//  if(to.meta.title){
//    document.title = to.meta.title
// }
  let isLogin = window.localStorage.getItem('isLogin')
  // 退出登录
  if (to.path === '/logout') {
    // 清除状态
    window.localStorage.clear()
    next({path:'/Login'})
  } else if (to.path === '/Login') {
    // 已登录直接跳转首页
    if (isLogin != null) {
      next({path:'/timeRemider'})
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
