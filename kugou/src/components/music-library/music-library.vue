<template>
	<div class='view wholepage con bg z2'  :style="{backgroundImage: bg}">
		<div class='header-con'>
			<v-touch class='iconfont icon-left' tag='i' v-ripple v-back></v-touch>	
		</div>
		<div class="foo">
			<lv-switch v-model='switchValue' @change='change'></lv-switch>
		</div>
	</div>
</template>

<script type='es6'>
import {
    bg
} from '../../config/skin-config.js'

import lvSwitch from '../lib/switch.vue'
export default {
	name:'search',
	data(){
		return{
			bg: `url(${bg})`,
			switchValue:true
		}
	},
	components:{
		lvSwitch
	},
	methods:{
		change(){
			console.log(this.switchValue);
		}
	}
}
</script>

<style lang='scss' scoped>

</style>