import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';

Vue.prototype.$layer = layer(Vue);

if (process.env.NODE_ENV === 'production') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {size: 'small', zIndex: 3000 })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI,{size: 'small', zIndex: 3000})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
