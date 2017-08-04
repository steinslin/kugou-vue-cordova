<template>
  <div class='con' id='ripple'> 
    <!-- lv-swipe 必须绑定navArray 头部导航 可选参数activeIndex  -->
    <!-- lv-swipe-item 必须传递loaded参数 必须绑定ref 格式是item+index
       可选参数loadingImg 可选参数loadingText 可选参数loadingFunction-->
    <lv-swipe :nav-array='navArray' ref='swipe'>
      <lv-swipe-item :loaded='loaded[0]' ref='item0' :loading-function='searchSong'>
        <lv-loadmore :refresh='songRefresh' :loadmore='songLoadmore'
         ref='songLoadmore' :bottom-all-loaded='allLoaded'> 
          <ul class='songlist' slot='data'>
            <li class='song' v-for='(item,index) in searchSongs'>
              <div class='con-left'>
                <i class='iconfont icon-add primary_color' @click.stop='addInPlayList(item)'></i>
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
      <lv-swipe-item :loaded='loaded[1]' ref='item1' :loading-function='searchMV'></lv-swipe-item>
      <lv-swipe-item :loaded='loaded[2]' ref='item2' >2</lv-swipe-item>
      <lv-swipe-item :loaded='loaded[3]' ref='item3' >3</lv-swipe-item>
      <lv-swipe-item :loaded='loaded[4]' ref='item4' >4</lv-swipe-item> 
    </lv-swipe>

    
  </div>
</template>

<script>
import lvLoadmore from '../lib/pull-down-up.vue'
import Vue from 'vue'
import lvSwipe from '../lib/swipe-view.vue'
import lvSwipeItem from '../lib/swipe-view-item.vue'
import {mapState} from 'vuex'
export default {
  name: 'searchresult',
  data () {
    return {
      songLoadmorePageIndex: 1,
      allLoaded: false,
      navArray: ['歌曲', 'MV', '专辑', '歌单', '歌词'],
      loaded: [false, false, false, false, false]
    }
  },
  components: {
    lvLoadmore,
    lvSwipe,
    lvSwipeItem,
  },
  computed: {
    ...mapState(['searchSongs', 'page', 'pagesize']),
  },
  methods: {
    searchMV () {
      setTimeout(() => {
        this.loaded.splice(1, 1, true)
        this.$toast({
          message: 'todoMV',
          position: 'bottom',
          duration: 2000
        })
      }, 2000)
    },
    searchSong () {
      console.log('searchSong')
      this.$store.dispatch('songSearch', {
        key: this.$parent.$refs.searchHeader.inputMsg,
        page: this.page,
        pagesize: this.pagesize,
        cb: () => {
          this.loaded.splice(0, 1, true)
          if (this.searchSongs.length < this.pagesize) {
            this.allLoaded = true
          }
        }
      })
    },
    getSong (item) {
      console.log('getSong')
      this.$store.dispatch('getSong', {
        hash: item.FileHash,
        album_id: item.AlbumID,
        cb: () => {
          let audio = document.getElementById('audio')
          Vue.nextTick(() => {
            audio.play()
            this.$store.commit('play')
          })
          let timer = setInterval(() => {
            if (audio.played.length === 0) {
              audio.play()
              this.$store.commit('play')
            } else {
              clearInterval(timer)
            }
          }, 300)
        }
      })
    },
    addInPlayList (item) {
      this.$store.dispatch('getSong', {
        hash: item.FileHash,
        album_id: item.AlbumID,
        cb: () => {},
        flag: false
      })
    },
    songRefresh () {
      this.$store.dispatch('songSearch', {
        key: this.$parent.$refs.searchHeader.inputMsg,
        page: this.page,
        pagesize: this.pagesize,
        cb: () => {
          this.$refs.songLoadmore.topLoaded()
          if (this.searchSongs.length < this.pagesize) {
            this.allLoaded = true
          } else {
            this.allLoaded = false
          }
          this.songLoadmorePageIndex = 1
        }
      })
    },
    songLoadmore () {
      this.$store.dispatch('songSearch', {
        key: this.$parent.$refs.searchHeader.inputMsg,
        page: ++this.songLoadmorePageIndex,
        pagesize: this.pagesize,
        flag: true,
        cb: () => {
          this.$refs.songLoadmore.bottomLoaded()
          if (this.searchSongs.length < this.songLoadmorePageIndex * this.pagesize) {
            this.allLoaded = true
          }
        }
      })
    }
  }
}
</script>


<style lang='scss' scoped="true">
@import '../../styles/lv/var.scss';
.con{
  height: 21rem;
  overflow-y:auto;
  .con-mid{
    flex-grow: 1;
    /*border-bottom-width:1px;
    border-bottom-style:solid;*/
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
      border-bottom: 1px solid $dark-border-color;
      transform: scale(.5);
    }
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
    &:nth-last-child(1) .con-mid:before{
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
    margin-right:3.5vw;
    margin-left:3vw;
  }
  .iconfont{
    font-size: 5vw;
    height:2rem;
    line-height: 2rem;
  }
  .icon-add{
    margin-right:3vw;
  }
}
</style>
