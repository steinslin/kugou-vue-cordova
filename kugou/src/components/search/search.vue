<template>
	<div class='view wholepage con bg z2' :style="{backgroundImage: bg}">
		<search-header ref='searchHeader'></search-header>
		<transition enter-active-class="animated slideIn animated-in">
            <router-view></router-view>
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
	
</style>
