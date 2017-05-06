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

Vue.config.productionTip = false;

Vue.use(VueTouch, {
	name: 'v-touch'
})

Vue.directive('ripple', ripple)

Vue.directive('ripple-btn', rippleBtn)

Vue.directive('back', vBack)

Vue.use(store)

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