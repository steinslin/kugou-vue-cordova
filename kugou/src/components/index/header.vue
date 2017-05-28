<template>
	<ul>
		<li v-ripple><img class='avatar' :src="avatar"></li>
		<li v-ripple v-for='(item,index) in top_icons'>
			<v-touch tag="img" v-on:tap='toggleOnOff("top_icons",index)' class='icon' 
			:src='item.icons[item.selected]'></v-touch>
		</li>
		<li  @touchstart='press("icon_search")' @touchend='pressup("icon_search")' >
			<router-link :to='{name:"search"}' v-ripple >
				<img class='icon' :src='icon_search.icons[icon_search.selected]'/>
			</router-link>
		</li>
	</ul>

</template>

<script type='es6'>
	import { mapState } from 'vuex'
	export default{
		computed:{
			...mapState([
				'top_icons',
				'icon_search',
				'avatar'
			])
		},
		methods:{
			toggleOnOff(key,index){
				this.$store.commit('toggleOnOff',{
					key,
					index
				});
			},
			pressup(key){
				this.$store.commit('pressup',{key});
			},
			press(key){
				this.$store.commit('press',{key});
			}
		}
	}	
</script>

<style scoped lang='scss'>
ul{
	padding: 2vh 4vw 0px 4vw;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	li{
		width: 12vw;
		text-align: center;
		position:relative;
		&:last-child{
			.icon{
				width: 5vw;
				position: absolute;
				margin: auto;
				left: 0;
				right: 0;
				top:0;
				bottom: 0;
				transform:translateY(-0.352vh);
			}
		};
	}
	.avatar{
		width:9.17vw;
		height:9.17vw;
		border-radius:50%;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		transform:translateY(-0.352vh);
		margin-left: 1vw;
	}
	.icon{
		width:11.5vw;;
		height: auto;
	}
}
</style>