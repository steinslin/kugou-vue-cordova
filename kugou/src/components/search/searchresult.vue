<template>
	<div class='con'>
		<lv-loadmore :refresh='refresh' :loadmore='loadmore' ref='loadmore' :bottom-all-loaded='allLoaded'>
			<ul class='songlist' slot='data'>
				<v-touch tag='li' class='song' v-for='(item,index) in searchSongs'>
					<div class='con-left'>
						<i class='iconfont icon-add primary_color'></i>
					</div>
					<div class='con-mid'>
						<v-touch class='songNameItem' @tap='getSong(item)' v-ripple-btn>
							<div class='light_color_2 songName'>{{item.SongName}}</div>
							<div class='light_color small songName'>{{item.SingerName}}</div>
						</v-touch>
						<div>
							<i class="iconfont icon-config light_color"></i>
						</div>
					</div>
				</v-touch>
			</ul>
		</lv-loadmore>
	</div>
</template>

<script type='es6'>
	import lvLoadmore from '../lib/pull-down-up.vue';
	import {mapState} from 'vuex'
	export default {
		name:'searchresult',
		data(){
			return{
				loadmorePage:1,
				allLoaded:false
			}
		},
		components:{
			lvLoadmore
		},
		computed:{
			...mapState(['searchSongs','page','pagesize'])
		},
		methods:{
			getSong(item){
				console.log('getSong');
				this.$store.dispatch('getSong',{hash:item.FileHash ,album_id:item.AlbumID,cb:()=>{			
					let audio=document.getElementById('audio');
					audio.play();
					this.$store.commit('play');					
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
		position: relative;
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
			padding:0.25rem 0vw 0px 3.5vw;
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
		}
		.icon-config{
			font-size: 5vw;
			/*position: absolute;
			right: 3.5vw;*/
			margin-right:3.5vw;
			margin-left:3vw;
			/*top:0;*/
			height:1.5rem;
			line-height: 1.5rem
		}
		.icon-add{
			font-size: 5vw;
			margin-right:3vw;
			height:1.5rem;
			line-height: 1.5rem;
		}
	}
</style>
