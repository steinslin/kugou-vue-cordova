<template>
  <div class='footer' id='playBar'>
    <v-touch :style='{backgroundImage:`url(${skin.play_bg})`,left:parseFloat(left) + (sideBarLeft + 88) * 0.33 + "vw"}' class='con' @swiperight='openLeftLyric' @swipeleft='closeLeftLyric' >
      <div class='con-left-lyric _relative'>
        <transition-group leave-active-class='fadeOpacityOut animated'>
          <div class='lyric' v-if='currentLyrics.length>0 && left == 0' key='1' :style='{left:lyric_left}'>{{currentLyrics[0].lyric}}
            <div class='lyric highlight' :style='{width:lyricHighlightWidth}' :class='{"highlight-noanimation" : leftLyricNoHighlight}' v-if='currentLyrics.length>0'>{{currentLyrics[0].lyric}}</div>
          </div>
          <br key='2'/>
          <div class='lyric-next' key='3' v-if='currentLyrics.length>1 && left == 0' :style='{right:lyric_next_right}'>{{currentLyrics[1].lyric}}
            <div class='lyric-next highlight' :style='{width:lyricNextHighlightWidth}' :class='{"highlight-noanimation" : parseFloat(lyricNextHighlightWidth) === 0}' v-if='currentLyrics.length>1'>{{currentLyrics[1].lyric}}</div>
          </div>
        </transition-group>
      </div>
      <div class='_relative con-right-audio'>
        <div class='con-left'>
          <div class='padding-circel' :style='{transform:`rotate(${currentTime*8}deg)`}' :class='paning?"stop":""'>
            <img :src='audio.img || skin.singer_default_play_bg' class='circel'  />
          </div>
        </div>
        <div class='audio con-right _relative'>
          <v-touch class='progress-bar unfinish' id='unfinish'>
            <div class='finish' :style='{width:parseFloat(rate_of_progress).toFixed() + "%"}'></div>
            <v-touch @pan='setRateOfProgress($event,"unfinish",".slider-btn")' @panend='panend' class='slider-btn-con'  :style='{left:parseFloat(rate_of_progress).toFixed() + "%"}' :class='showLyric?"scale":""'>
              <div class='slider-btn' v-compute-px></div>           
            </v-touch>      
          </v-touch>
          <div class='lv-flex-nowrap lv-center' >
            <div class="lv-flex-grow">
              <div class='song-name text-no-wrap'>{{audio.song_name || '酷狗音乐'}}</div>
              <div class='author-name light_color text-no-wrap'>{{audio.author_name || '一缕阳光,暖人灵魂'}}</div>
            </div>
            <div class="lv-spin" v-if='audioLoading'>
              <div class="lv-spin-icon"></div>
            </div>
          </div>
          <v-touch class='controll-btn' v-ripple>
            <v-touch tag='img' v-if='playing' :src="skin.controll_stop_icons.icons[skin.controll_stop_icons.selected]" @touchstart='press("controll_stop_icons")' @touchend='pressup("controll_stop_icons")'  @tap='stop' ></v-touch>
            <v-touch tag='img' v-else :src="skin.controll_play_icons.icons[skin.controll_play_icons.selected]" @touchstart='press("controll_play_icons")' @touchend='pressup("controll_play_icons")'  @tap='play' ></v-touch>
          </v-touch>
          <v-touch class='next-btn' v-ripple>
            <v-touch tag='img' :src='skin.next_icons.icons[skin.next_icons.selected]' @touchstart='press("next_icons")' @touchend='pressup("next_icons")' @tap='nextSong'>
            </v-touch>
          </v-touch>
          <v-touch class='song-list-btn' @tap='togglePlayList' v-ripple>
            <img :src='skin.song_list_icons.icons[skin.song_list_icons.selected]' @touchstart='press("song_list_icons")' @touchend='pressup("song_list_icons")' @tap='showSongList()'/>
          </v-touch>
        </div>
      </div>
      <audio :src='audio.play_url' id='audio' @timeupdate='timeupdate()' v-ready-listen:playing='playing'></audio>
      <transition enter-active-class="animated fadeIn" leave-active-class='fadeOut animated'>
        <div v-if='showLyric' class='lyricBox lv-flex-nowrap'>
          <div class="time">{{currentTimeFormat}}</div>
          <div class="lv-text-ellipsis lv-flex-grow" v-if='currentLyrics.length>0'>{{currentLyric}}</div>
        </div>
      </transition>
    </v-touch>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatTime, timeToSecond } from '../util'
export default {
  props: {
    sideBarLeft: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      left: '-78vw',
      paning: false,
      panendToPlay: false,
      audioLoading: false,
      showLyric: false,
      leftLyricNoHighlight: true
    }
  },
  computed: {
    currentLyrics: [],
    ...mapState([
      'audio',
      'hash',
      'album_id',
      'currentTime',
      'rate_of_progress',
      'playing',
      'playList',
      'playType',
      'playTypes',
      'skin'
    ]),
    ...mapGetters(['lyricArray', 'currentLyrics', 'audioIndex']),
    lyricHighlightWidth () {
      let {lyricArray, currentLyrics, currentTime} = this
      if (currentLyrics.length === 0) {
        return '0%'
      }
      let lyricStartTime = timeToSecond(lyricArray[currentLyrics[0].index].time)
      if (Math.abs(lyricStartTime - currentTime) < 0.5) {
        this.leftLyricNoHighlight = true
      } else {
        this.leftLyricNoHighlight = false
      }
      let lyricEndTime = timeToSecond(lyricArray[currentLyrics[0].index + 1].time)
      return `${Math.min(Math.max(currentTime - lyricStartTime, 0) / (lyricEndTime - lyricStartTime) * 100, 100)}%`
    },
    lyric_left () {
      const length = 72.5 / 3.75 // 歌词区域为72.5vw 每个字的大小为3.75vw
      let {currentLyrics, currentTime, lyricArray} = this
      if (currentLyrics.length === 0) {
        return '0vw'
      }
      let _length = currentLyrics[0].lyric.length
      let lyricStartTime = timeToSecond(lyricArray[currentLyrics[0].index].time)
      let lyricEndTime = timeToSecond(lyricArray[currentLyrics[0].index + 1].time)
      // 需要移动的距离
      let moveInstance = (_length - length) * 3.75
      // 需要到这个时间才开始移动
      let moveStartTime = (lyricEndTime - lyricStartTime) / _length * length + lyricStartTime
      if (_length > length) {
        if (currentTime < moveStartTime) {
          return '0vw'
        } else {
          return `-${moveInstance}vw`
        }
      } else {
        return '0vw'
      }
    },
    lyricNextHighlightWidth () {
      let {lyricArray, currentLyrics, currentTime, audio} = this
      if (currentLyrics.length <= 1) {
        return '0%'
      }
      let startIndex = currentLyrics[1].index
      let lyricStartTime = timeToSecond(lyricArray[startIndex].time)
      let endIndex = currentLyrics[1].index + 1
      let lyricEndTime
      if (endIndex >= lyricArray.length) {
        lyricEndTime = audio.timelength / 1000
      } else {
        lyricEndTime = timeToSecond(lyricArray[endIndex].time)
      }
      return `${Math.min(Math.max(currentTime - lyricStartTime, 0) / (lyricEndTime - lyricStartTime) * 100, 100)}%`
    },
    lyric_next_right () {
      const length = 72.5 / 3.75 // 歌词区域为72.5vw 每个字的大小为3.75vw
      let {currentLyrics, currentTime, lyricArray} = this
      if (currentLyrics.length <= 1) {
        return '0vw'
      }
      let _length = currentLyrics[1].lyric.length
      if (_length > length) {
        let lyricStartTime = timeToSecond(lyricArray[currentLyrics[1].index].time)
        let lyricEndTime = timeToSecond(lyricArray[currentLyrics[1].index + 1].time)
        // 需要到这个时间才开始移动
        let moveStartTime = (lyricEndTime - lyricStartTime) / _length * length + lyricStartTime
        if (currentTime < moveStartTime) {
          // 需要移动的距离
          let moveInstance = (_length - length) * 3.75
          console.log(moveInstance)
          return `-${moveInstance}vw`
        } else if (currentTime > moveStartTime) {
          return '0vw'
        }
      } else {
        return '0vw'
      }
    },
    currentTimeFormat () {
      return formatTime(this.currentTime)
    },
    currentLyric () {
      let {currentTime, currentLyrics, lyricArray} = this
      if (currentLyrics.length === 0) {
        return ''
      }
      if (currentLyrics.length === 1) {
        return currentLyrics[0].lyric
      }
      let endDis = timeToSecond(lyricArray[currentLyrics[1].index].time)
      return endDis > currentTime ? currentLyrics[0].lyric : currentLyrics[1].lyric
      // return startDis<endDis?currentLyrics[0].lyric:currentLyrics[1].lyric
    }
  },
  directives: {
    readyListen: {
      bind (el, bindings, vnode) {
        el.onended = () => vnode.context.$store.commit('audioEnd', vnode.context.audioIndex)
        el.onerror = (error) => {
          console.log(error)
          if (this.playing) {
            vnode.context.$toast({
              message: el.error.message + '播放出错，自动为您播放下一首'
            })
            setTimeout(() => {
              vnode.context.nextSong()
            }, 500)
          }
        }
      },
      componentUpdated (el, bindings, vnode) {
        vnode.context.audioLoading = el.readyState !== 4 && bindings.value
      }
    },
    computePx: {
      inserted (el) {
        let currentStyle = el.currentStyle ? el.currentStyle : document.defaultView.getComputedStyle(el, null)
        el.style.width = el.style.height = parseFloat(currentStyle.width).toFixed() + 'px'
      }
    }
  },
  created () {
    this.$store.commit('createdGetAudio', () => {
      this.$store.dispatch('getSong', {hash: this.hash, album_id: this.album_id})
    })
  },
  methods: {
    press (key) {
      this.$store.commit('press', {key})
    },
    pressup (key) {
      this.$store.commit('pressup', {key})
    },
    setRateOfProgress (event, id, btn) {
      if (document.getElementById('audio').src !== '') {
        if (!this.panendToPlay) {
          this.panendToPlay = this.playing
        }
        this.$store.commit('setRateOfProgress', {event, id, btn})
        this.showLyrics()
        this.paning = true
      }
    },
    stop () {
      let audio = document.getElementById('audio')
      this.$store.commit('stop')
      if (audio.src !== '' && audio.src !== undefined && audio.src !== null) {
        audio.pause()
      }
    },
    play () {
      let audio = document.getElementById('audio')
      this.paning = false
      if (audio.src !== '') {
        audio.play()
        this.$store.commit('play')
      }
    },
    panend () {
      let audio = document.getElementById('audio')
      this.paning = false
      this.showLyric = false
      if (this.panendToPlay && audio.src !== '') {
        audio.play()
        this.$store.commit('play')
        this.panendToPlay = false
      }
    },
    timeupdate () {
      this.$store.commit('timeupdate')
    },
    showLyrics () {
      this.showLyric = true
    },
    nextSong () {
      this.$store.commit('nextSong', this.audioIndex)
    },
    togglePlayList () {
      this.$parent.$refs.playList.showPlayList = !this.$parent.$refs.playList.showPlayList
    },
    openLeftLyric () {
      this.left = 0
    },
    closeLeftLyric () {
      this.left = '-78vw'
    }
  }
}
</script>

<style scoped lang='scss'>
  $finish_color:rgb(81,204,255);
  $unfinish_color:rgb(1,50,77);
  $highlight_color:rgb(1,141,172);
  .footer .animated{
    animation-duration: .5s;
  }
  // .aaa{
  //   transition-delay:5s;
  //   opacity:1;
  // }
  // .bbb{
  //   transition-delay:5s;
  //   opacity:0;
  // }
  div.con{
    display:flex;
    transition: 0.5s all ease;
    background-size: cover;
    position:absolute;
    height:2.25rem;
    bottom:0;
    padding:0px 5vw 0px 5vw;
    box-sizing:border-box;
    z-index: 9999;
    overflow-y: visible;
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
      
      transition: all 0.5s linear;
      &.stop{
        transition: all 0s linear;
      }
    }
    .circel{
      height:2.1925rem;
      width:2.1925rem;
      border-radius:50%;
      border:2px solid rgb(1,50,77);
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
    .highlight-noanimation{
      transition: width 0s linear;
    }
  }
  .lyricBox{
    position: fixed;
    background-color:rgba(81,204,255,.8);
    padding:7px 15px;
    border-radius: 5px;
    font-size: 4vw;
    line-height: 1.3;
    bottom:3rem;
    left:50%;
    width:90vw;
    transform: translateX(-50%);
    .lv-flex-grow{
      width:100px;
      text-align:center;
    }
  }
  #app .audio{
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
      border-radius:100%;
      transform: translate(-0.2rem,-0.25rem);
      border-style: solid;
      border-width: 0.15rem;
      border-color: transparent;
      &.scale{
        border-color: $finish_color;
      }
      .slider-btn{
        width:0.35rem;
        height:0.35rem;
        background:$finish_color;
        border-radius:100%;
        overflow:hidden;
      }
    }
    .lv-flex-nowrap{
      width: 46vw;
      margin-top:0.25rem;
    }
    .lv-flex-grow{
      width:6vw;
    }
    .lv-spin{
      display: block;         
          z-index: 1031;
          right:0px;
          top:1vw;
          margin-left:1vw;
    }
    .lv-spin-icon{
      width:5vw;
      height: 5vw;
          box-sizing: border-box;        
          border-top:2px solid #51ccff;
          border-left:2px solid #51ccff;
          border-radius: 50%;
          animation: spin .5s linear infinite;
    }
    .song-name{
      font-size: 3.8vw;
      line-height: 1.2
    }
    .author-name{
      font-size: 3vw;
      line-height: 1.2
    }
    .controll-btn,.song-list-btn,.next-btn{
      position:absolute;
      bottom:0.2rem;
      height: 10vw;
      img{
        width:10vw;
      }
    }
    .controll-btn{
      right: 19vw;
      /*transform: translateY(0.45rem);
      img{
        width:9vw;
      }*/
    }
    .next-btn{
      right:9vw;
    }
    .song-list-btn{
      right:-1vw;
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
  @keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
    }
  }
  /**
   * 在手机上软键盘弹出时,隐藏底部
   */
@media (max-height: 450px) { 
  .footer {
    display: none;
  }
}
</style>
