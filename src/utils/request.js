import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

import router from '@/router'
import { getToken,setToken,removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 ,// request timeout

})

// request interceptor
service.interceptors.request.use(
  config => {
    //

    if (store.getters.token) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.headers['Authorization'] = getToken()
    }

    console.log('token',store.getters.token,getToken())
    config.params = {
      token:getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response

      console.log('res')
      console.log(response)
      console.log(res.data.code)
      console.log('res')
      // return res
    if (res.status != '200') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.data.code !== 0) {
        if(res.data.code == 407){

          Message({
            message: res.data.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          setTimeout(function(){
            removeToken('')
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          },3000)
        }else{
          Message({
            message: res.data.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }

      }
      console.log(res.data)
      return res.data
    }
  },
  error => {
    var that = this
    console.log(error)
    try{
      console.log(error.response)
      const {data} = error.response
    }catch(err){

    }
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
// 删除token
if(data.status){
  return;
}


  removeToken('')
  store.dispatch('user/resetToken').then(() => {
    location.reload()
  })

if(data == 401){

  // return;
}
if(data == 401){

  removeToken('')
  store.dispatch('user/resetToken').then(() => {
    location.reload()
  })
}else{
  removeToken('')
  console.log('getToken()')
  console.log(getToken())
  // 刷新当前页面
  router.go(0)

  store.dispatch('user/resetToken').then(() => {
    location.reload()
  })
}
// setTimeout(function(){
//   console.log('user')
//     store.dispatch('user/login',{username: 'user',password: 'pass'})
//   console.log('user')
// },3000)
             // that.$router.push({
             //    path: '/login',
             // })
    // store.dispatch('user/logout').then(() => {
    //     // location.reload()
    //   })
    // next(`/login?redirect=${to.path}`)
    return Promise.reject(error)
  }
)

export default service
