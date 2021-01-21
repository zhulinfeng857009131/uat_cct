// import { login, logout, getInfo } from '@/api/user'
import { login} from '@/api/user'
import { getToken, setToken, removeToken,setuserName,getuserName } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'

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
  // user login
  login({ commit }, userInfo) {
    const { username, password,captcha,time } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, captcha: captcha, uuid: time }).then(response => {
        const { data } = response
        console.log('*****')
        console.log(response)
        // console.log(data.token)
        console.log('*****')
        if(response.code !== 500){
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.username)
          setToken(data.token)
          //setuserName(data.username)
          sessionStorage.setItem('user',data.username)
          Cookies.set('setuserName', data.username)

          console.log(1,Cookies.get('TokenKey'));
          console.log(2,Cookies.get('setuserName'));
        }
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
        console.log(1223)
        const { data } = response

        if (!data) {
          //return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
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
