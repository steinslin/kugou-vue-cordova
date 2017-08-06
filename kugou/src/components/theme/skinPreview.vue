<template>
  <div class='view wholepage con bg z3 skin-preview' :style="{backgroundImage: `url(${skin.bg})`}">
    <div class='header-con'>
      <v-touch v-ripple v-back tag='img' src="static/img/agp.png" class='img-back' />
      <span>皮肤详情</span> 
    </div>
    <div class='skin-preview-con'>
      <ul class='_relative img-list' @touchstart='swipeStart($event)' @touchmove='swipeMove($event)' @touchend='swipeEnd($event)'>
        <li v-for="(item, index) in currentSkin.preview" :class='{"per-left": (active > index) || (active === index && moveX < 0), "per-right": (active < index) || (active === index && moveX > 0)}'>
          <v-touch @tap='changeActive(index)' class='img-box' :style='{transform: "translate3d(" + (60 * (index - active) + moveX / screenWidth * 100) + "vw," + 0 + "," + (Math.abs(((screenWidth * Math.abs(active - index) * -1) + (active>index ? 1 : -1) * moveX)) * -1) + "px)", left: (index-active) * 10 + "vw"}' :class='{"lv-with-transition": !swiping}'>
            <img v-lazy="item" />
          </v-touch>
        </li>
      </ul>
      <ul class='cursor-list'>
        <li v-for="(item, index) in currentSkin.preview">
          <span class='cursor lv-with-transition' :class='{active: active === index}'></span>
        </li>
      </ul>
      <div class='footer'>
        <div>{{currentSkin.title}}</div>
        <div class='lv-primary-color-light lv-font-small'>{{currentSkin.filesize | filesizeFormat}}</div>
        <button class='btn disable lv-primary-color-light' v-if='using' disabled="true">使用中</button>
        <button class='btn' v-else-if='canuse' v-ripple-btn @click='setSkin'>使用</button>
        <button class='btn disable lv-primary-color-light' disabled="true" v-else>等待提供下载</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
const FAST_SWIPE_SECOND = 300
const FAST_SWIPE_DISTANCE = 15
const SWIPE_LIMIT = 0.45
const RATE = 0.7
export default {
  data () {
    return {
      id: parseInt(this.$route.params.id),
      currentSkin: {},
      using: false,
      canuse: false,
      moveX: 0,
      swiping: false,
      screenWidth: parseFloat(window.innerWidth),
      active: 0,
      startX: 0,
      startY: 0,
      startTimeStamp: 0,
      direction: '',
      currentX: 0,
      currentY: 0
    }
  },
  computed: {
    ...mapState(['skin', 'themes', 'skins', 'skinId']),
  },
  mounted () {
    if (!this.id) {
      this.$toast({
        message: '没有找到皮肤'
      })
      return
    }
    console.log('???')
    this.using = this.id === this.skinId
    this.getSkin()
  },
  methods: {
    changeActive (index) {
      this.swiping = false
      this.active = index
    },
    swipe (direction) {
      if (direction === 'right') {
        this.active = Math.max(this.active - 1, 0)
      } else {
        this.active = Math.min(this.active + 1, this.currentSkin.preview.length - 1)
      }
    },
    swipeStart (e) {
      this.startX = this.currentX = e.touches[0].pageX
      this.startY = this.currentY = e.touches[0].pageY
      this.swiping = true
      this.startTimeStamp = e.timeStamp
    },
    swipeMove (e) {
      if (!this.swiping) {
        return
      }
      let {startX, startY, swiping, startTimeStamp} = this
      let currentX = e.touches[0].pageX
      let currentY = e.touches[0].pageY
      if (e.timeStamp - startTimeStamp < 200 && (!swiping || Math.abs(currentY - startY) > Math.abs(currentX - startX))) {
        this.swiping = false
        return
      }
      e.preventDefault()
      e.stopPropagation()
      this.direction = currentX > this.currentX ? 'right' : 'left'
      this.currentX = currentX
      this.currentY = currentY
      this.moveX = (this.currentX - this.startX) * RATE
    },
    swipeEnd (e) {
      this.swiping = false
      if ((this.direction === 'right' && this.moveX < 0) || (this.direction === 'left' && this.moveX > 0)) {
        this.moveX = 0
        return
      }
      console.log('1231231')
      let {currentX, startX, startTimeStamp, screenWidth} = this
      // 右划
      if (currentX > startX) {
        // 快速滑动 300ms以内 滑动距离超过FAST_SWIPE_DISTANCE
        if ((e.timeStamp - startTimeStamp < FAST_SWIPE_SECOND && currentX - startX > FAST_SWIPE_DISTANCE) || currentX - startX > screenWidth * SWIPE_LIMIT) {
          console.log(this.active)
          this.swipe(this.direction)
          console.log(1)
        }
      } else { // 左划
        if ((e.timeStamp - startTimeStamp < FAST_SWIPE_SECOND && Math.abs(currentX - startX) > FAST_SWIPE_DISTANCE) || Math.abs(currentX - startX) > screenWidth * SWIPE_LIMIT) {
          console.log(2)
          this.swipe(this.direction)
        }
      }
      this.moveX = 0
    },
    getSkin () {
      let {id, themes, skins} = this
      console.log(themes, id)
      for (let i = 0; i < themes.length; i++) {
        for (let j = 0; j < themes[i].themes.length; j++) {
          if (themes[i].themes[j].id === id) {
            this.currentSkin = themes[i].themes[j]
            break
          }
        }
      }
      for (let i = 0; i < this.skins.ids.length; i++) {
        if (skins.ids[i] === id) {
          this.canuse = true
          break
        }
      }
    },
    setSkin () {
      this.$store.commit('setSkin', this.id)
      this.using = true
      this.$toast({
        message: '皮肤切换成功'
      })
    }
  }
}
</script>
<style lang='scss' scoped>
$padding: 20vw;
$img_height: 15rem;
.skin-preview{
  &-con{
    ul.img-list{
      margin: 14vw 0 2vw 0;
      padding: 0 $padding;
      box-sizing:border-box;
      height:15rem;
      li{
        transform-style:preserve-3d;
        perspective: 900px;
        width: 100vw - $padding * 2;
        position:absolute;
        top:0;
        left:20vw;
        height: $img_height;
        &.per-left{
          perspective-origin: left;
        }
        &.per-right{
          perspective-origin: right;
        }
        .light_color_2{
          margin-top: .4rem;
        }
        .img-box{
          position: absolute;
          height: $img_height;
          width: 100vw - $padding * 2;
          // height: 7rem;
          background:rgba(0,0,0,.2);
          display: flex;
          align-items:center;
          text-align: center;
          box-sizing:border-box;
        }
        img{
          max-width: 100%;
          // height:7rem;
          &[lazy=loading]{
            opacity: .5;
            height:auto;
            max-height: 100%;
            max-width:100%;
          }
        }
      }
    }
    .cursor-list{
      display: flex;
      justify-content:center;
      li+li{
        margin-left:6px;
      }
      .cursor{
        display: inline-block;
        width:6px;
        height:6px;
        border-radius: 3px;
        background: #8492A6;
        &.active{
          background:#EEF2F5
        }
      }
    }
    .footer{
      position:fixed;
      width:100vw;
      bottom:0;
      box-sizing:border-box;
      height: 4.5rem;
      padding: 4vw;
      background-color: rgba(0,0,0, .5);
      .btn{
        margin-top:.4rem;
        padding:.2rem;
        width: 100%;
        display: block;
        border:1px solid #7b90d1;
        border-radius:1vw;
        color: #7b90d1;
        outline:none;
        background-color: rgba(0,0,0,0);
        &:focus,&:active,&:hover{
          outline: none;
        }
        &.disable{
          color: #8492A6;
          border-color: #8492A6;
          &:focus,&:active,&:hover{
            outline: none;
          }
        }
      }
    }
  }
}
</style>
