// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/normalize.css'
// import './styles/iconfont.css'
import 'animate.css'
import VueTouch from 'vue-touch'
import store from './store'
import ripple from './directives/ripple'
import rippleBtn from './directives/ripple-btn'
import vBack from './directives/v-router-back'
import vTap from './directives/v-tap'
import Toast from './components/lib/toast.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import FastClick from 'fastclick'
Vue.use(MintUI)
Vue.config.productionTip = false

Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.prototype.$toast = Toast

VueTouch.config.press = {
  time: 5
}
Vue.directive('ripple', ripple)

Vue.directive('ripple-btn', rippleBtn)

Vue.directive('back', vBack)

Vue.directive('tap', vTap)

Vue.use(store)

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
