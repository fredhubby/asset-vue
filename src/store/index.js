import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 公共state对象，存储所有组件的状态
const state = null != window.sessionStorage.getItem('state') ? JSON.parse(window
    .sessionStorage.getItem('state')) : {
  user: {
    name: ''
  }
}

// 唯一取值的方法，计算属性
const getters = {
  getUser (state) {
    return state.user
  }
}

// 唯一可以修改state值的方法，同步阻塞
const mutations = {
  updateUser (state, user) {
    state.user = user
  }
}

// 异步调用mutations方法，必须用commit方法
// 调用actions方法，必须用dispatch
const actions = {
  asyncUpdateUser (context, user) {
    context.commit('updateUser', user)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
