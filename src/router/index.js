import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Main from '../views/Main'

import notFound from '@/views/notFound'
import Register from '@/views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
    // 嵌套路由
    // children: [
    //   {
    //     path: '/books/borrowedBooks',
    //     name: 'borrowedBooks',
    //     component: borrowedBooks
    //   },
    //   {
    //     path: '/books/recalledBooks',
    //     name: 'recalledBooks',
    //     component: recalledBooks
    //   }
    // ]
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '*',
    name: 'notFound',
    component: notFound
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
