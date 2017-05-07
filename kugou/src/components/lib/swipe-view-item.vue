<!-- 和swipe-view.vue一起使用 -->

<template>
	<div class='con'>
		<div v-if='visited && !loaded' class='loading'>
			<img :src="loadingImg" class='img'>
			<span class='text light_color_2'>{{loadingText}}</span>
		</div>
		<div v-if='loaded && visited'>
			<slot></slot>
		</div>
	</div>
</template>

<script type='es6'>
export default{
	props:{
		/*
		是否加载完成的标志  必须传递  不然一直显示loading
		 */
		loaded:{
			type:Boolean,
			default:false
		},
		loadingImg:{
			type:String,
			default:'static/gears.svg'
		},
		loadingText:{
			type:String,
			default:'加载中...'
		},
		loadingFunction:{
			type:Function,
			default:null
		}
	},
	data(){
		return{
			visited:false //是否已经拜访过 
		}
	},
	computed:{

	},
	methods:{
		updateStatus(){
			this.visited=true			
		}
	},
	watch:{
		visited(newval,oldval){
			if(!oldval && typeof this.loadingFunction=='function'){
				this.loadingFunction();
			}
		}
	}
}
</script>

<style lang='scss' scoped>
$img_width:40px;
$font_size:4vw;
.con{
	height: 100%;
	width: 100%;
	overflow-y: auto;
	position: relative;
}

.loading{
	position: absolute;
	top:0;
	bottom:0;
	width: calc(40px + 3vw + 4vw * 5);
	height:$img_width;
	right: 0;
	left:0;
	font-size: $font_size;
	margin: auto;
}

.img{
	width: $img_width;
	height: $img_width;
	vertical-align: middle;
}

.text{
	display: inline-block;
	margin-left: 3vw;
}
</style>