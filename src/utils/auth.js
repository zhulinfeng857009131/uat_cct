import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
//var inFifteenMinutes = new Date(new Date().getTime() + 11.5 * 60 * 60 * 1000);

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  //return Cookies.set(TokenKey, token,{expires:inFifteenMinutes})
	return Cookies.set(TokenKey, token)
}
export function setuserName(token) {
  return Cookies.set('setuserName', token)
}
export function getuserName() {
  return Cookies.get(setuserName)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
