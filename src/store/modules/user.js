import { login, getInfo, register } from '@/api/user'
import { merchant, merchantInfo } from '@/api/merchant'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    ownerName: '',
    businessCode: '',
    uniqueCode: ''
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
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ON: (state, ownerName) => {
    state.ownerName = ownerName
  },
  SET_BC: (state, businessCode) => {
    state.businessCode = businessCode
  },
  SET_UC: (state, uniqueCode) => {
    state.uniqueCode = uniqueCode
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        const { data } = response
        // console.log(data.token)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  register({ commit }, info) {
    const { username, password, type } = info
    return new Promise((resolve, reject) => {
      register({ userName: username.trim(), password: password, role: type }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  merchant({ commit }, info) {
    // const { ownerName, businessCode, uniqueCode } = info
    console.log(info)
    return new Promise((resolve, reject) => {
      merchant(info).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  merchantInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      merchantInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { merchantId, username, ownerName, businessCode, uniqueCode } = data
        commit('SET_ON', ownerName)
        commit('SET_BC', businessCode)
        commit('SET_UC', uniqueCode)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(state.token)
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { role, username, avatar } = data

        // roles must be a non-empty array
        if (!role || role.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', role)
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

