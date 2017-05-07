<template>
	<div class='con' id='ripple'>	
		<!-- lv-swipe 必须绑定navArray 头部导航 可选参数activeIndex  -->
		<!-- lv-swipe-item 必须传递loaded参数 必须绑定ref 格式是item+index
			 可选参数loadingImg 可选参数loadingText 可选参数loadingFunction-->
		<lv-swipe :nav-array='navArray'>
			<lv-swipe-item :loaded='loaded[0]' ref='item0' >
				<lv-loadmore :refresh='refresh' :loadmore='loadmore'
				 ref='loadmore' :bottom-all-loaded='allLoaded'>				 
					<ul class='songlist' slot='data'>
						<li class='song' v-for='(item,index) in searchSongs'>
							<div class='con-left'>
								<i class='iconfont icon-add primary_color'></i>
							</div>
							<div class='con-mid'>
								<v-touch class='songNameItem' @tap='getSong(item)' v-ripple-btn='"ripple"'>
									<div class='light_color_2 songName'>{{item.SongName}}</div>
									<div class='light_color small singerName'>{{item.SingerName}}</div>
									
								</v-touch>
								<div>
									<i class="iconfont icon-config light_color"></i>
								</div>
							</div>
						</li>
					</ul>
				</lv-loadmore>
			</lv-swipe-item>
			<lv-swipe-item :loaded='loaded[1]' ref='item1' :loading-function='searchMV'>1</lv-swipe-item>
			<lv-swipe-item :loaded='loaded[2]' ref='item2' >2</lv-swipe-item>
			<lv-swipe-item :loaded='loaded[3]' ref='item3' >3</lv-swipe-item>
			<lv-swipe-item :loaded='loaded[4]' ref='item4' >4</lv-swipe-item>	
		</lv-swipe>

		
	</div>
</template>

<script type='es6'>
	import lvLoadmore from '../lib/pull-down-up.vue'
	import Vue from 'vue'
	import lvSwipe from '../lib/swipe-view.vue'
	import lvSwipeItem from '../lib/swipe-view-item.vue'
	import {mapState} from 'vuex'
	export default {
		name:'searchresult',
		data(){
			return{
				loadmorePage:1,
				allLoaded:false,
				navArray:['歌曲','MV','专辑','歌单','歌词'],
				loaded:[true,false,false,false,false]
			}
		},
		components:{
			lvLoadmore,
			lvSwipe,
			lvSwipeItem,
		},
		computed:{
			...mapState(['searchSongs','page','pagesize'])
		},
		methods:{
			searchMV(){
				setTimeout(()=>{
					Vue.set(this.loaded, 1, true)
				},5000)
			},
			getSong(item){
				console.log('getSong');
				this.$store.dispatch('getSong',{hash:item.FileHash ,album_id:item.AlbumID,cb:()=>{			
					// let audio=document.getElementById('audio');
					// audio.play();
					// let timer=setInterval(()=>{
					// 	if(audio.played.length==0){
					// 		audio.play()
					// 	}else{
					// 		clearInterval(timer)
					// 	}
					// },300)
					// this.$store.commit('play');			
				}})
			},
			refresh(){
				let _this=this;
				this.$store.dispatch('songSearch',{
					key:this.$parent.$refs.searchHeader.inputMsg,
					page:this.page,
					pagesize:this.pagesize,
					cb:function(){
						_this.$refs.loadmore.topLoaded();
						_this.allLoaded=false
						_this.loadmorePage=1
					}
				})
			},
			loadmore(){
				let _this=this;
				this.$store.dispatch('songSearch',{
					key:this.$parent.$refs.searchHeader.inputMsg,
					page:++this.loadmorePage,
					pagesize:this.pagesize,
					flag:true,
					cb:function(){
						_this.$refs.loadmore.bottomLoaded();						
					}
				})
			}
		}
	}
</script>


<style lang='scss' scoped="true">
.con{
	height: 21rem;
	overflow-y:auto;
	.con-left{
		
	}
	.con-mid{
		flex-grow: 1;
		border-bottom-width:1px;
		border-bottom-style:solid;
		
		box-sizing: border-box;
		display: flex;
	}
	.songNameItem{
		flex-grow: 1;
	}
}
	.songlist{
		.song{
			height: 2rem;
			box-sizing: border-box;
			padding-left: 3.5vw;
			width: 100%;
			display: flex;
			&:nth-last-child(1) .con-mid{
				border:none;
			}
		}
		.songName{
			width:77vw;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			margin-top:0.25rem;
		}
		.singerName{
			width:77vw;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.icon-config{
			font-size: 5vw;
			/*position: absolute;
			right: 3.5vw;*/
			margin-right:3.5vw;
			margin-left:3vw;
			/*top:0;*/
			height:2rem;
			line-height: 2rem
		}
		.icon-add{
			font-size: 5vw;
			margin-right:3vw;
			height:1.5rem;
			line-height: 1.5rem;
		}
	}
</style>
