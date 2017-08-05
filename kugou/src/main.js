// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/normalize.css'
// import './styles/iconfont.css'
import 'animate.css'
import VueTouch from 'vue-touch'
import VueLazyload from 'vue-lazyload'
import store from './store'
import ripple from './directives/ripple'
import rippleBtn from './directives/ripple-btn'
import vBack from './directives/v-router-back'
import vTap from './directives/v-tap'
import Toast from './components/lib/toast.js'
import MintUI, {MessageBox} from 'mint-ui'
import 'mint-ui/lib/style.css'

import FastClick from 'fastclick'

VueTouch.config.press = {
  time: 5
}

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/img/ag6.png',
  loading: '/static/img/ag6.png',
  attempt: 1,
})
Vue.use(MintUI)
Vue.use(store)
Vue.use(VueTouch, {
  name: 'v-touch'
})

Vue.prototype.$message = MessageBox
Vue.prototype.$toast = Toast

Vue.directive('ripple', ripple)
Vue.directive('ripple-btn', rippleBtn)
Vue.directive('back', vBack)
Vue.directive('tap', vTap)

Vue.config.productionTip = false

Vue.filter('numberFormat', (val) => {
  let number = parseInt(val)
  if (isNaN(number)) {
    return val
  } else {
    if (number < 10000) {
      return number
    } else {
      return `${(number / 10000).toFixed(1)}万`
    }
  }
})

Vue.filter('filesizeFormat', (val) => {
  let size = parseInt(val, 10)
  if (size / 1024 > 1) {
    size /= 1024
    if (size / 1024 > 1) {
      return `${size.toFixed(1)}MB`
    } else {
      return `${size.toFixed(0)}KB`
    }
  } else {
    return `${size}B`
  }
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
