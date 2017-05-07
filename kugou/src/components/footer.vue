<template>
	<div>
		<v-touch :style='{backgroundImage:`url(${play_bg})`,left:left}' class='con' @swiperight='openLeftLyric' @swipeleft='closeLeftLyric' >
			<div class='con-left-lyric _relative'>
				<div class='lyric' v-if='currentLyrics.length>0' :style='{left:lyric_left}'>{{currentLyrics[0].lyric}}
					<div class='lyric highlight' :style='{width:lyricHighlightWidth}' v-if='currentLyrics.length>0'>{{currentLyrics[0].lyric}}</div>
				</div>
				<br>
				<div class='lyric-next' v-if='currentLyrics.length>1' :style='{right:lyric_next_right}'>{{currentLyrics[1].lyric}}
					<div class='lyric-next highlight' :style='{width:lyricNextHighlightWidth}' v-if='currentLyrics.length>1'>{{currentLyrics[1].lyric}}</div>
				</div>
			</div>
			<div class='_relative con-right-audio'>
				<div class='con-left'>
					<div class='padding-circel'>
						<img :src='audio.img || singer_default_play_bg' class='circel' :style='{transform:`rotate(${currentTime*8}deg)`}' />
					</div>
				</div>
				<div class='audio con-right _relative'>
					<v-touch class='progress-bar unfinish' id='unfinish'>
						<div class='finish' :style='{width:rate_of_progress}'></div>
						<v-touch @pan='setRateOfProgress($event,"unfinish",".slider-btn")' @panend='play' class='slider-btn-con'  :style='{left:rate_of_progress}'>
							<div class='slider-btn'></div>
						</v-touch>			
					</v-touch>
					<div class='song-name text-no-wrap'>{{audio.song_name}}</div>
					<div class='author-name light_color text-no-wrap'>{{audio.author_name}}</div>
					<v-touch class='controll-btn' >
						<v-touch tag='img' v-if='playing' :src="controll_stop_icons.icons[controll_stop_icons.selected]" @touchstart='press("controll_stop_icons")' @touchend='pressup("controll_stop_icons")'  @tap='stop()' ></v-touch>
						<v-touch tag='img' v-else :src="controll_play_icons.icons[controll_play_icons.selected]" @touchstart='press("controll_play_icons")' @touchend='pressup("controll_play_icons")'  @tap='play' ></v-touch>
					</v-touch>
					<v-touch class='next-btn' >
						<img :src='next_icons.icons[next_icons.selected]' @touchstart='press("next_icons")' @touchend='pressup("next_icons")' />
					</v-touch>
					<v-touch class='song-list-btn' >
						<img :src='song_list_icons.icons[song_list_icons.selected]' @touchstart='press("song_list_icons")' @touchend='pressup("song_list_icons")' />
					</v-touch>
				</div>
			</div>
			<audio :src='audio.play_url' id='audio' @timeupdate='timeupdate()'></audio>
		</v-touch>
	</div>
</template>

<script type="es6">
	import ripple from '../directives/ripple.js';
	import { mapState ,mapGetters} from 'vuex'
	import { formatTime,timeToSecond } from '../util';
	export default {
		data(){
			return{
				left:'-78vw'
			}
		},
		computed:{
			currentLyrics:[],
			...mapState([
				'play_bg',
				'singer_default_play_bg',
				'audio',
				'hash',
				'album_id',
				'controll_play_icons',
				'controll_stop_icons',
				'next_icons',
				'song_list_icons',
				'currentTime',
				'rate_of_progress',
				'playing'				
			]),
			...mapGetters(['lyricArray','currentLyrics']),
			lyricHighlightWidth(){
				let {lyricArray,currentLyrics,currentTime}=this;
				if(currentLyrics.length==0){
					return '0%';
				}
				let lyricStartTime= timeToSecond(lyricArray[currentLyrics[0].index].time);
				let lyricEndTime= timeToSecond(lyricArray[currentLyrics[0].index+1].time);				
				return `${Math.min(Math.max(currentTime-lyricStartTime,0)/(lyricEndTime-lyricStartTime)*100,100)}%`
			},
			lyric_left(){
				const length=72.5/3.75; //歌词区域为72.5vw 每个字的大小为3.75vw
				let {currentLyrics,currentTime,lyricArray}=this;
				if(currentLyrics.length==0){
					return '0vw';
				}
				let _length=currentLyrics[0].lyric.length
				let lyricStartTime= timeToSecond(lyricArray[currentLyrics[0].index].time);
				let lyricEndTime= timeToSecond(lyricArray[currentLyrics[0].index+1].time);
				//需要移动的距离
				let move_distance=(_length-length)*3.75;
				//需要到这个时间才开始移动
				let move_start_time=(lyricEndTime-lyricStartTime)/_length*length+lyricStartTime;
			//	console.log(move_distance)
				if(_length>length){
					if(currentTime<move_start_time){
						return '0vw';
					}else{
						console.log(move_distance);
						return `-${move_distance}vw`
					}
				}else{
					return '0vw';
				}
			},
			lyricNextHighlightWidth(){
				let {lyricArray,currentLyrics,currentTime}=this;
				if(currentLyrics.length<=1)
					return '0%';
				let lyricStartTime= timeToSecond(lyricArray[currentLyrics[1].index].time);
				let lyricEndTime= timeToSecond(lyricArray[currentLyrics[1].index+1].time);
				return `${Math.min(Math.max(currentTime-lyricStartTime,0)/(lyricEndTime-lyricStartTime)*100,100)}%`
			},
			lyric_next_right(){
				const length=72.5/3.75; //歌词区域为72.5vw 每个字的大小为3.75vw
				let {currentLyrics,currentTime,lyricArray}=this;
				if(currentLyrics.length<=1){
					return '0vw';
				}
				let _length=currentLyrics[1].lyric.length
				if(_length>length){
					let lyricStartTime= timeToSecond(lyricArray[currentLyrics[1].index].time);
					let lyricEndTime= timeToSecond(lyricArray[currentLyrics[1].index+1].time);
					//需要到这个时间才开始移动
					
					let move_start_time=(lyricEndTime-lyricStartTime)/_length*length+lyricStartTime;
					if(currentTime<move_start_time){
						//需要移动的距离		
						let move_distance=(_length-length)*3.75;
						console.log(move_distance);
						return `-${move_distance}vw`;
					}else if(currentTime>move_start_time){						
						return '0vw'
					}
				}else{
					return '0vw';
				}
			}
		},
		directives:{
			ripple
		},
		created(){
			this.$store.dispatch('getSong',{hash:this.hash,album_id:this.album_id});
		},
		methods:{
			press(key){
				this.$store.commit('press',{key})
			},
			pressup(key){
				this.$store.commit('pressup',{key})
			},
			setRateOfProgress(event,id,btn){
				this.$store.commit('setRateOfProgress',{event,id,btn})
				this.showLyrics();	
			},
			stop(){
				let audio=document.getElementById('audio');
				if(audio.src!='' && audio.src!=undefined && audio.src!=null){
					audio.pause();
					this.$store.commit('stop');
				}
			},
			play(){
				let audio=document.getElementById('audio');
				if(audio.src!='' && audio.readyState==4){
					audio.play();
					this.$store.commit('play');
				}
			},
			timeupdate(){
				this.$store.commit('timeupdate');
			},
			showLyrics(){
				// let currentTime=parseInt(this.currentTime);
				
				// let {lyrics}=this.audio;
				// console.log(lyrics);
			},
			getLyricWithTime(lyrics,time){
				
			},
			openLeftLyric(){
				this.left=0;
			},
			closeLeftLyric(){
				this.left='-78vw'
			}
		}
	}
</script>

<style scoped lang='scss'>
	$finish_color:rgb(81,204,255);
	$unfinish_color:rgb(1,50,77);
	$highlight_color:rgb(1,141,172);
	div.con{
		display:flex;
		transition: 0.5s all ease;
		background-size: cover;
		position:fixed;
		height:2.25rem;
		bottom:0;
		padding:0px 5vw 0px 5vw;
		box-sizing:border-box;
		z-index: 9999;
		.con-left-lyric{
			width:72.5vw;
			margin-right:2vw;
			overflow: hidden;
		}
		.con-right-audio{
			display:flex;
			width:100vw;
		}
		.con-left{
			width:21.5vw;
			height:2.25rem;
		}
		.con-right{
			width:74.5vw;
		}
		.padding-circel{
			position:absolute;
			top:-2vw;
			left:2vw;
			width:2.1925rem;
			height:2.1925rem;
			border:2px solid rgb(86,88,91);
			border-radius:50%;
			overflow:hidden;
		}
		.circel{
			height:2.1925rem;
			width:2.1925rem;
			border-radius:50%;
			transition: all 0.5s linear;
			&.paused{
				transition: all 0s linear;
			}
		}
		.lyric{
			margin-top: 0.25rem;
			position: absolute;
			font-size: 3.75vw;
			white-space:nowrap;
  			overflow:hidden;
  			transition: left 0.5s linear;
		}
		.lyric-next{
			margin-top: 0.25rem;	
			position: absolute;
			font-size: 3.75vw;
			white-space:nowrap;
  			overflow:hidden;
  			transition: right 0.5s linear;
		}
		.highlight{
			position: absolute;
			width: 0;
			left:0;
			top:0;
			font-size: 3.75vw;
			display: inline-block;
			transition: width 0.3s linear;
			color:$highlight_color;
			white-space:nowrap;
  			overflow:hidden;
  			margin-top:0;
		}
	}
	.audio{
		div.progress-bar{
			width:100%;
			height:0.088rem; /*2px*/
			position:relative;
			margin-top:2.5vw;
		}
		div.finish{
			background:$finish_color;
			position:absolute;
			height:100%;
		}
		div.unfinish{
			background:$unfinish_color;
		}
		.slider-btn-con{
			position:absolute;
			width: 0.5rem;
			height: 0.5rem;
			border-radius:100%;
			transform: translate(-0.15rem,-0.1rem);
			.slider-btn{
				width:0.35rem;
				height:0.35rem;
				background:$finish_color;
				border-radius:100%;
				/*transform: translate(-0.4vh,-0.4vh);*/
			}
		}
		.song-name{
			font-size: 3.8vw;
			margin-top:0.2rem;
			width:44vw;
		}
		.author-name{
			font-size: 3vw;
			width:44vw;	
		}
		.controll-btn,.song-list-btn,.next-btn{
			position:absolute;
			bottom:0.625rem;
			transform: translateY(0.15rem);
			img{
				width:5vw;
			}
		}
		.controll-btn{
			right: 21.5vw;
			transform: translateY(0.4rem);
			img{
				width:9vw;
			}
		}
		.next-btn{
			right:12vw;
		}
		.song-list-btn{
			right:0vw;
		}
	}
	@keyframes rotate{
		0%{
			transform:rotate(0deg);
		}
		100%{
			transform:rotate(360deg);
		}
	}
</style>