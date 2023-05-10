import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 处理登录的业务
  async login({ commit }, userInfo) {
    // 解构出用户名和密码
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    console.log('登录的数据：', result)
    // 注意：当前登录的请求，使用的mock数据
    if (result.code === 20000) {
      const token = result.data.token
      commit('SET_TOKEN', token)
      setToken(token)
      return true
    }
    return Promise.reject(new Error('faile'))
  },

  // 获取用户信息
  async getInfo({ commit, state }) {
    const result = await getInfo(state.token)
    console.log('获取用户信息：', result)
    if (result.code === 20000) {
      const { data } = result
      if (!data) {
        return Promise.reject(new Error('验证失败，请重试'))
      }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
    }
    return true
  },

  // 登出
  async logout({ commit, state }) {
    const result = await logout(state.token)
    console.log('登出：', result)
    if (result.code === 20000) {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      return true
    }
    return Promise.reject(new Error('faile'))
  },

  // 移出token
  async resetToken({ commit }) {
    const result = await removeToken()
    if (result) {
      commit('RESET_STATE')
      return true
    }
    return Promise.reject(new Error('faile'))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

