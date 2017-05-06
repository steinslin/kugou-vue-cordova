<template>
	<div class='view wholepage con bg z1'  :style="{backgroundImage: bg}">
		<index-header></index-header>
		<index-content></index-content>	
	</div>
</template>

<script type="es6">
	import indexHeader from './header'
	import indexContent from './content'
	import {
    bg
} from '../../config/skin-config.js'
	export default {
		name:'index',
		data(){
			return{
				bg: `url(${bg})`,
			}
		},
		components:{indexHeader,indexContent}
	}
</script>
