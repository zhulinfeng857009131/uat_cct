import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken,removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login','/home1','/home2','/'] // no redirect whitelist
const whiteList = ['/login','/402','/404','/updateProfile'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log('hasToken')
    console.log(hasToken)
    console.log('hasToken')
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    }else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          //await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
					console.log('token:'+hasToken+'(失效)');
					removeToken(hasToken);
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          //next(`/login?redirect=${to.path}`)
		  window.open('https://identity-stg.schneider-electric.com/identity/IDMSC_IDPSloInit?RelayState=https://cct-test.schneider-electric.cn/cct/oauth/logoff','_self');
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next()
      //next(`/login?redirect=${to.path}`)
			 window.open('https://identity-stg.schneider-electric.com/identity/IDMSC_IDPSloInit?RelayState=https://cct-test.schneider-electric.cn/cct/oauth/logoff','_self');
				console.log('路径不在白名单');
				NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
