<template>
  <div class='view wholepage con bg z2 theme'  :style="{backgroundImage: `url(${skin.bg})`}">
    <div class='header-con lv-bottom-border'>
      <v-touch v-ripple v-back tag='img' src="static/img/agp.png" class='img-back' />
      <span>皮肤中心</span>
    </div>
    <div class='scroll-con' id='scroll-ripple-con'>
      <lv-swipe :nav-array='navArray' ref='swipe'>
        <lv-swipe-item :loaded='loaded[0]'  ref='item0'>
          <div class='scon'>
            <ul class='lv-flex-wrap lv-flex' slot='data' v-for='(theme,index) in themes' v-if='theme.name === navArray[0]'>
              <li v-for='item in theme.themes'>
                <div class='img-box lv-border' @click='chooseSkin(item.id)' v-ripple-btn:id='"scroll-ripple-con"'>
                  <img v-lazy="item.thumb" />
                </div>
                <div class='light_color_2'>{{item.title}}</div>
                <svg class="icon lv-primary-color-light" aria-hidden="true">
                  <use xlink:href="#icon-skin1"></use>
                </svg>
                <span class='lv-primary-color-light'>{{item.use_total | numberFormat}}</span>
              </li>
            </ul>
          </div>
        </lv-swipe-item>
        <lv-swipe-item :loaded='loaded[1]'  ref='item1' :loading-function='getTheme'>
          <div class='scon'>
            <ul class='lv-flex-wrap lv-flex' slot='data' v-for='(theme,index) in themes' v-if='theme.name === navArray[1]'>
              <li v-for='item in theme.themes'>
                <div class='img-box lv-border' @click='chooseSkin(item.id)' v-ripple-btn:id='"scroll-ripple-con"'>
                  <img v-lazy="item.thumb" />
                </div>
                <div class='light_color_2'>{{item.title}}</div>
                <svg class="icon lv-primary-color-light" aria-hidden="true">
                  <use xlink:href="#icon-skin1"></use>
                </svg>
                <span class='lv-primary-color-light'>{{item.use_total | numberFormat}}</span>
              </li>
            </ul>
          </div>
        </lv-swipe-item>
        <lv-swipe-item :loaded='loaded[1]'  ref='item2' :loading-function='getTheme'>
          <div class='scon'>
            <ul class='lv-flex-wrap lv-flex' slot='data' v-for='(theme,index) in themes' v-if='theme.name === navArray[2]'>
              <li v-for='item in theme.themes'>
                <div class='img-box lv-border' @click='chooseSkin(item.id)' v-ripple-btn:id='"scroll-ripple-con"'>
                  <img v-lazy="item.thumb" />
                </div>
                <div class='light_color_2'>{{item.title}}</div>
                <svg class="icon lv-primary-color-light" aria-hidden="true">
                  <use xlink:href="#icon-skin1"></use>
                </svg>
                <span class='lv-primary-color-light'>{{item.use_total | numberFormat}}</span>
              </li>
            </ul>
          </div>
        </lv-swipe-item>
        <lv-swipe-item :loaded='loaded[1]'  ref='item3' :loading-function='getTheme'>
          <div class='scon'>
            <ul class='lv-flex-wrap lv-flex' slot='data' v-for='(theme,index) in themes' v-if='theme.name === navArray[3]'>
              <li v-for='item in theme.themes'>
                <div class='img-box lv-border' @click='chooseSkin(item.id)' v-ripple-btn:id='"scroll-ripple-con"'>
                  <img v-lazy="item.thumb" />
                </div>
                <div class='light_color_2'>{{item.title}}</div>
                <svg class="icon lv-primary-color-light" aria-hidden="true">
                  <use xlink:href="#icon-skin1"></use>
                </svg>
                <span class='lv-primary-color-light'>{{item.use_total | numberFormat}}</span>
              </li>
            </ul>
          </div>
        </lv-swipe-item>
        <lv-swipe-item :loaded='loaded[1]'  ref='item4' :loading-function='getTheme'>
          <div class='scon'>
            <ul class='lv-flex-wrap lv-flex' slot='data' v-for='(theme,index) in themes' v-if='theme.name === navArray[4]'>
              <li v-for='item in theme.themes'>
                <div class='img-box lv-border' @click='chooseSkin(item.id)' v-ripple-btn:id='"scroll-ripple-con"'>
                  <img v-lazy="item.thumb" />
                </div>
                <div class='light_color_2'>{{item.title}}</div>
                <svg class="icon lv-primary-color-light" aria-hidden="true">
                  <use xlink:href="#icon-skin1"></use>
                </svg>
                <span class='lv-primary-color-light'>{{item.use_total | numberFormat}}</span>
              </li>
            </ul>
          </div>
        </lv-swipe-item>
        <lv-swipe-item :loaded='loaded[1]'  ref='item5' :loading-function='getTheme'>
          <div class='scon'>
            <ul class='lv-flex-wrap lv-flex' slot='data' v-for='(theme,index) in themes' v-if='theme.name === navArray[5]'>
              <li v-for='item in theme.themes'>
                <div class='img-box lv-border' @click='chooseSkin(item.id)' v-ripple-btn:id='"scroll-ripple-con"'>
                  <img v-lazy="item.thumb" />
                </div>
                <div class='light_color_2'>{{item.title}}</div>
                <svg class="icon lv-primary-color-light" aria-hidden="true">
                  <use xlink:href="#icon-skin1"></use>
                </svg>
                <span class='lv-primary-color-light'>{{item.use_total | numberFormat}}</span>
              </li>
            </ul>
          </div>
        </lv-swipe-item>
      </lv-swipe>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import LvSwipe from '../lib/swipe-view.vue'
import LvSwipeItem from '../lib/swipe-view-item.vue'
export default {
  data () {
    return {
      navArray: ['已下载', '推荐', '明星', '卡通', '个性', '纯色'],
      loaded: [true, false]
    }
  },
  computed: {
    ...mapState(['skin', 'skins', 'themes'])
  },
  components: {
    LvSwipeItem,
    LvSwipe
  },
  methods: {
    getTheme () {
      this.$store.dispatch('getTheme').then(_ => {
        this.loaded.splice(1, 1, true)
      })
    },
    chooseSkin (id) {
      this.$router.push({
        name: 'skin-preview',
        params: { id }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
$padding: 4vw;
.theme{
  .header-con {
    height: 1.8rem;
  }
  .scroll-con{
    height:22.8rem;
    overflow: auto;
  }
  .scon{
    box-sizing:border-box;
    width:100vw;
    padding:$padding;
  }
  .icon {
    width: .5rem; 
    height: .5rem;
    fill: currentColor;
    overflow: hidden;
    &:active{
      color:#99B6C3;
    }
  }
  ul{
    margin-bottom: -4vw;
    justify-content:space-between;
    li{
      width: (100vw - $padding * 4) / 3;
      margin-bottom: 4vw;
      .light_color_2{
        margin-top: .4rem;
      }
      .img-box{
        width: 100%;
        height: 7rem;
        background:rgba(0,0,0,.2);
        display: flex;
        align-items:center;
        text-align: center;
        box-sizing:border-box;
      }
      img{
        max-width: 100%;
        height:7rem;
        &[lazy=loading]{
          opacity: .5;
          height:auto;
          max-height: 100%;
          max-width:100%;
        }
      }
    }
  }
}
</style>
