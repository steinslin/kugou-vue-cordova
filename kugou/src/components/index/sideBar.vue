<template>
  <v-touch tag='div' class='view wholepage con bg z1 sidebar lv-flex lv-with-transition' :style='{left: left + "vw"}' @swipeleft='closeSideBar'>
    <div :style='{backgroundImage: `url(${skin.dialogBg})`}' class='sidebar-con wholepage bg lv-with-transition'>
      <div class='header lv-flex lv-bottom-border'>
        <div>
          <img :src="skin.avatar" alt="" class='avatar' />
        </div>
        <div class='lv-flex-grow'>
          hua
        </div>
      </div>
      <ul class='funcbar'>
        <li v-ripple-btn class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-letter1"></use>
          </svg>
          <span class='title lv-flex-grow'>消息中心</span>
        </li>
        <li v-ripple-btn tag='li' class='item lv-flex' @click='goSkin'>
        <!-- <li v-ripple-btn class='item lv-flex' @click='setSkin'> -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-skin2"></use>
          </svg>
          <span class='title lv-flex-grow'>皮肤中心</span>
          <span class='lv-primary-color-light lv-font-small'>星夜</span>
        </li>
        <li v-ripple-btn class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zuanshi1"></use>
          </svg>
          <span class='title lv-flex-grow'>会员中心</span>
        </li>
        <li v-ripple-btn class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-naozhong"></use>
          </svg>
          <span class='title lv-flex-grow'>定时关闭</span>

        </li>
        <li v-ripple-btn class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinghengqi"></use>
          </svg>
          <span class='title lv-flex-grow'>蝰蛇音效</span>
          <span class='lv-primary-color-light lv-font-small'>3D丽音</span>
        </li>
        <li v-ripple-btn class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gongju"></use>
          </svg>
          <span class='title lv-flex-grow'>音乐工具</span>
        </li>
        <li v-ripple-btn class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-naozhong1"></use>
          </svg>
          <span class='title lv-flex-grow'>铃声彩铃</span>
        </li>
      </ul>
      <div class='lv-bottom-border line'></div>
      <ul class='switchbar'>
        <li class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wifi"></use>
          </svg>
          <span class='title lv-flex-grow'>仅WIFI联网</span>
          <lv-switch v-model='onlyWifiSwitch' />
        </li>
        <li class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ttpodicon"></use>
          </svg>
          <span class='title lv-flex-grow'>桌面歌词</span>
          <lv-switch v-model='topLyricSwitch' />
        </li>
        <li class='item lv-flex'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouji"></use>
          </svg>
          <span class='title lv-flex-grow'>锁屏歌词</span>
          <lv-switch v-model='lockLyricSwitch' />
        </li>
      </ul>
      <div class='lv-bottom-border line'></div>
      <div class='footer'>
        <ul>
          <li class='item lv-flex _relative' v-ripple>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shezhi"></use>
            </svg>
            <span class='lv-primary-color-light lv-font-small lv-flex-grow'>设置</span>
          </li>
          <li class='item lv-flex _relative' v-ripple>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuichu1"></use>
            </svg>
            <span class='lv-primary-color-light lv-font-small lv-flex-grow'>退出</span>
          </li>
        </ul>
      </div>
    </div>
    <div class='sidebar-shadow wholepage' @click='closeSideBar' v-show='left === 0' style='transition:all .5s'></div>
  </v-touch>
</template>
<script>
import {mapState} from 'vuex'
import Switch from '../lib/switch.vue'
export default {
  props: ['left'],
  data () {
    return {
      index: 0,
      onlyWifiSwitch: true,
      topLyricSwitch: false,
      lockLyricSwitch: false
    }
  },
  methods: {
    setSkin () {
      this.$store.commit('setSkin', ++this.index % 4)
    },
    closeSideBar () {
      this.$emit('closeSideBar')
    },
    goSkin () {
      this.$router.push({name: 'theme'})
    }
  },
  computed: {
    ...mapState(['skin'])
  },
  components: {
    'lvSwitch': Switch
  }
}
</script>
<style lang='scss'>
.sidebar{
  .sub-con {
    width: 88vw;
  }
  width:88vw;
  font-size: 4.2vw;
  top:0;
  position:fixed;
  z-index: 10000 !important;
  .sidebar-con{
    width: 88vw
  }
  .sidebar-shadow{
    position:absolute;
    left: 88vw;
    width: 100vw;
    background:rgba(0,0,0,.3);
  }
  .icon {
     width: 1.5em; 
     height: 1.5em;
     fill: currentColor;
     overflow: hidden;
     &:active{
      color:#99B6C3;
     }
  }
  .header{
    margin: 0.8rem 0.6rem 0 0.6rem;
    padding-bottom: .4rem;
    .avatar{
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: 3px solid #01324d;
    }
    .lv-flex-grow{
      line-height: 2rem;
      margin-left: 2vw;
    }
  }
  .line{
    margin: 0 1rem;
  }
  .lv-bottom-border{
    &::before{
      z-index: 0;
    }
  }
  ul{
    &.funcbar{
      padding-bottom: .2rem;

    }
    &.switchbar{
      padding-top: .2rem;
      .item{
        padding: .28rem 1rem;
      }
    }
    .item{
      padding: .45rem 1rem;
      justify-content:center;
      align-items: center;
      .title {
        margin-left: 5vw;
      }
      .switch{
        transform: scale(0.8);
      }
    }
  }
  .footer {
    ul{
      height: 3.3rem;
      display:flex;
      align-items:center;
      justify-content:space-around;
    }
    .item{
      width:18vw;
      padding:0;
    }
    span{
      margin-left:2vw;
    }
  }
}
</style>
