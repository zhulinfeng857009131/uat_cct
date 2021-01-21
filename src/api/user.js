import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/cct/oauth/sys/login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/cct/oauth/logout',
    method: 'get',
    data
  })
}
