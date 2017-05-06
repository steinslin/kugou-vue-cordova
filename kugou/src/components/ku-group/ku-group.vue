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
.header-con{
	display: flex;
	box-sizing: border-box;
	margin-top: 0.25rem;
	padding:0.25rem 3vw;
	height: 1.5rem;
	*{
		line-height: 1.15rem;
		height: 1.15rem;
	}
	.iconfont{
		font-size: 5vw;
	}
	.icon-left{
		margin-right: 4vw;
		position: relative;
	}
}	
</style>