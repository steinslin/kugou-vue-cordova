<template>
	<div>
		<div class='lv-shadow' v-if='showPlayList' @click.stop='showPlayList=false'></div>
		<transition enter-active-class='animated floatIn' leave-active-class='animated floatOut'>
			<div class='playList' :style='{backgroundImage:`url(${dialogBg})`}' v-show='showPlayList'>
				<div class="lv-container-mlarge lv-flex lv-bottom-border">
					<div class='lv-flex-grow'>
						<span class='light_color_2'>播放队列</span>
						<span class='light_color_2'>{{playList.length}}</span>
					</div>
					<div>
						<i class="iconfont icon-export "></i>
						<i class="iconfont icon-singlecycle light_color_2" v-if='playType=="单曲循环"' @click.stop='changePlayType'></i>
						<i class="iconfont icon-cycle light_color_2" v-if='playType=="顺序播放"' @click.stop='changePlayType'></i>
						<i class="iconfont icon-random light_color_2" v-if='playType=="随机播放"' @click.stop='changePlayType'></i>
						<i class="iconfont icon-delete1 "></i>
					</div>
					
				</div>
				<ul class='lv-bottom-border'>
					<li class="lv-flex lv-bottom-border" v-for='(item,index) in playList'>
						<div class='lv-container-small'>
							<span v-if='audioIndex!=index'>{{index}}</span>
							<img :src="audio.img" class='circle' v-else />
						</div>
						<div class="lv-flex-grow">
							<div class="lv-pd-small-top lv-pd-small-bottom">{{item.song_name}}</div>
							<div class="lv-pd-small-top lv-pd-small-bottom lv-primary-color-light lv-font-small">{{item.author_name}}</div>
						</div>
						<div class="lv-container-small">
							<i class="iconfont icon-delete1"></i>
						</div>
					</li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import Vue from 'vue'
export default{
	data(){
		return{
			showPlayList:false
		}
	},
	computed:{
		...mapState(['playList','audio','audioIndex','playTypes','playType','dialogBg'])
	},
	methods:{
		changePlayType(){
			this.$store.commit('changePlayType',()=>{
				Vue.nextTick(()=>{
					this.$toast({
						message:this.playType,
						position:'center',
						duration:2000
					})
				})
			});
		}
	}
}
</script>

<style scoped lang='scss'>
@import '../styles/lv/var';
.circle{
	width: 32px;
	height: 32px;
	border-radius: 100%;
}
#app .playList{
	height:12rem;
	font-size: 4.5vw;
	position: fixed;
	z-index: 9999;
	width: 100%;
	bottom:2.25rem;
	left:50%;
	transform: translate3d(-50%, 0%, 0);
	transition: transform 3s ease-out;
	background-size: cover;
	.iconfont{
		line-height: 1;
		margin-right: 0;
		font-size: 5.2vw;
		padding: 0px 13px;
		margin-left:-5px;
		border-right: 1px solid $border_color;
		&:last-child{
			border-right:none;
			padding-right: 0;
		}
	}
	.lv-container-mlarge{
		padding:13px;
	}
}
.animated{
	animation-duration: .3s;
}
.floatIn{
	animation-name: floatIn
}
.floatOut{
	animation-name: floatOut
}
@keyframes floatIn {
    from {
        -webkit-transform: translate3d(-50%, 100%, 0);
        transform: translate3d(-50%, 100%, 0);
    }
    to {
        -webkit-transform: translate3d(-50%, 0%, 0);
        transform: translate3d(-50%, 0%, 0);
    }
}
@keyframes floatOut {
    from {
        -webkit-transform: translate3d(-50%, 0%, 0);
        transform: translate3d(-50%, 0%, 0);
    }
    to {
        -webkit-transform: translate3d(-50%, 100%, 0);
        transform: translate3d(-50%, 100%, 0);
    }
}
</style>