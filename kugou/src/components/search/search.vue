<template>
	<div class='view wholepage con bg z2' :style="{backgroundImage: bg}">
		<search-header ref='searchHeader'></search-header>
		<transition enter-active-class="animated slideIn fadeIn" leave-active-class='fadeOut animated-out'>
            <router-view ref='searchresult'></router-view>
        </transition>
	</div>
</template>

<script type="es6">
	import searchHeader from './header'
	import {
    bg
} from '../../config/skin-config.js'
	export default {
		name:'search',
		data(){
			return{
				bg: `url(${bg})`
			}
		},
		components:{
			searchHeader
		}
	}
</script>

<style lang='scss' scoped>
.animated-out{
	transition-duration: .15s;
}
.animated-in{
	transition-duration: .2s;
}
</style>
