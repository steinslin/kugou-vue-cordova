<template>
	<div>
		<div class='header-con'>
			<!-- <router-link :to='{name:"index"}' class='primary_color'>
				<v-touch class='iconfont icon-left' tag='i' @tap='back'></v-touch>
			</router-link> -->
			<v-touch class='iconfont icon-left' tag='i' v-ripple v-back></v-touch>
			<div class='search-con'>
				<i class="iconfont icon-search light_color"></i>
				<input type="text" class="search-input primary_color" playholder='想听什么歌呢...' autofocus v-model.trim='inputMsg' @keyup.enter='enter' />
			</div>
			<router-link :to='{name:"searchresult"}' replace>
				<v-touch tag='button' class='search-btn btn-noborder' @tap='searchSong(true)'>搜索</v-touch>	
			</router-link>				
		</div>
	</div>
</template>

<script type="es6">
	import lvLoadmore from '../lib/pull-down-up.vue';
	export default {
		name:'header',
		data(){
			return{
				inputMsg:''
			}
		},
		components:{
			lvLoadmore
		},
		methods:{
			enter(){
				this.searchSong();
				this.$router.replace({name:'searchresult'})
			},
			searchSong(){
				this.$store.dispatch('songSearch',{
					key:this.inputMsg,
					page:this.page,
					pagesize:this.pagesize
				})				
			},
			backToIndex(){
				this.$router.go(-1);
			},
			getSong(item){
				this.$store.dispatch('getSong',{hash:item.FileHash ,album_id:item.AlbumID,cb:()=>{
					setTimeout(()=>{
						let audio=document.getElementById('audio');
						console.log(audio.src);
						console.log(audio.paused);
						audio.play();
						this.$store.commit('play');
					},300)
				}})
			}
		},
		watch:{
			// 'inputMsg':(newval,oldval)=>{
			// 	this.$store.commit('setInputMsg',newval)
			// 	//this.$store.dispatch('songSearch',{key:newval})
			// }
		}
	}
</script>

<style lang='scss' scoped="true">
$input_bg_color:rgba(17,35,67,0.8);
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
.search-con{
	flex-grow: 1;
	display: flex;
	box-sizing: border-box;
	background: $input_bg_color;
	border-radius:1.5vw;
	margin-right: 3vw;
	.search-input{
		width: 100%;
		flex-grow: 1;
		background: transparent;
	}
}
.icon-search{
	transform: translateY(0.05rem);
	margin-left: 2vw;
	margin-right: 2vw;
}

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