<template>
  <div>
    <div class='lv-shadow' v-if='showPlayList' @click.stop='showPlayList=false'></div>
    <transition enter-active-class='animated floatIn' leave-active-class='animated floatOut'>
      <div class='playList' :style='{backgroundImage:`url(${skin.dialogBg})`}' v-show='showPlayList'>
        <div class="lv-flex lv-bottom-border lv-one-line lv-center" v-if='playList.length>0'>
          <div class='lv-flex-grow'>
            <span class='light_color_2'>播放队列</span>
            <span class='light_color_2 lv-mg-left-small' v-if='playList.length>0'>{{playList.length}}</span>
          </div>
          <div class='iconbox'>
            <img :src="skin.share" class='icon'>
          </div>
          <div class='iconbox'>
            <img :src="skin.newlist" class='icon'>
          </div>
          <v-touch class='iconbox' @tap='changePlayType'>
            <img :src="skin.random" v-if='playType=="随机播放"' class='icon'>
            <img :src="skin.cycle" v-if='playType=="顺序播放"' class='icon'>
            <img :src="skin.singlecycle" v-if='playType=="单曲循环"' class='icon'>
          </v-touch>
          <div class="iconbox noborder" @click='clearPlayList'>
            <img :src="skin.remove" class='icon'>
          </div>        
        </div>
        <ul v-if='playList.length>0'>
          <v-touch tag='li' :key='index' @tap='changePlaySong($event,index)' class="lv-one-line custom lv-center" v-for='(item,index) in playList' v-ripple-btn:id='"body"'>
            <div class="iconbox noborder" v-if='audioIndex!=index'>{{index+1 }}</div>
            <div class="iconbox noborder" v-if='audioIndex==index'>
              <img :src="item.img" alt="" class="icon">
            </div>
            <div class="lv-flex-nowrap lv-flex-grow lv-center lv-bottom-border">
              <div class="lv-flex-grow">                
                <div class='lv-text-ellipsis light_color_2 medium'>{{item.song_name}}</div>
                <div class="lv-text-ellipsis light_color small">{{item.author_name}}</div>
              </div>
              <div class="iconbox-2">
                <img :src="skin.remove" alt="" class="icon-2 stop-propogation" @click.stop='deletePlayItem(index)'>
              </div>
            </div>            
          </v-touch>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Vue from 'vue'
export default{
  data () {
    return {
      showPlayList: false
    }
  },
  computed: {
    ...mapState(['playing', 'playList', 'audio', 'playTypes', 'playType', 'skin', 'share', 'newlist', 'cycle', 'random', 'singlecycle', 'remove']),
    ...mapGetters(['audioIndex'])
  },
  methods: {
    changePlayType () {
      this.$store.commit('changePlayType', () => {
        Vue.nextTick(() => {
          this.$toast({
            message: this.playType,
            position: 'center',
            duration: 2000
          })
        })
      })
    },
    clearPlayList () {
      this.$message.confirm('确定清空播放列表?').then(action => this.$store.commit('clearPlayList')).catch(cancle => {})
      Vue.nextTick(() => {
        let el = document.querySelector('.mint-msgbox')
        el.style.backgroundImage = `url(${this.skin.dialogBg})`
        el.style.backgroundSize = 'cover'
      })
    },
    deletePlayItem (index) {
      console.log(this.playing)
      this.$store.commit('deletePlayItem', {index, audioIndex: this.audioIndex, playing: this.playing})
    },
    changePlaySong ($event, index) {
      if ($event.target.className.indexOf('stop-propogation') !== -1) {
        console.log('stop')
        return
      }
      this.$store.commit('changePlaySong', {index, audioIndex: this.audioIndex})
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../styles/lv/var';
ul{
  height: 10.5rem;
  overflow-y: auto;
}
#app .playList{
  height:12.5rem;
  font-size: 4.5vw;
  position: absolute;
  z-index: 9999;
  width: 100%;
  bottom:2.25rem;
  left:50%;
  transform: translate3d(-50%, 0%, 0);
  transition: transform 3s ease-out;
  background-size: cover;
  .custom{
    text-indent: 0;
    .icon{
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 100%;
    }
    .lv-bottom-border{
      height: 2.1rem;
    }
    .lv-text-ellipsis{
      width: calc(100vw - 4rem);
    }
  }
  .iconbox.noborder{
    &:before{
      border:none;
    }
  }
  .iconbox,.custom .iconbox-2{
    width:2.1rem;
    height: 0.8rem;
    display:flex;
        justify-content: center;
        align-items: center;
        /*border-right: 1px solid $dark-border-color;*/
  }
  .iconbox{
    position: relative;
    &:before{
      z-index:-1;
      content: "";
      display: block;
      position:absolute;
      width: 200%;
      left:0;
      top:0;
      transform-origin: 0 0;
      height: 200%;
      border-right: 1px solid $dark-border-color;
      transform: scale(.5);
    }
  }
  .icon,.custom .icon-2{
    width:0.72rem;
    height: 0.72rem;
    &:active{
      opacity:.5;
    }
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
