<template>
	<div class='view wholepage con bg z2'  :style="{backgroundImage: bg}">
		<div class='header-con'>
			<v-touch class='iconfont icon-left' tag='i' v-ripple v-back></v-touch>	
		</div>	
	</div>
</template>

<script type='es6'>
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
		
	}
}
</script>

<style lang='scss' scoped>

</style>