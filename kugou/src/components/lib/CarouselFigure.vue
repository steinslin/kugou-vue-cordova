<!-- 
usage: <carousel-figure :imgList='currentSkin.preview' :active.sync='active'></carousel-figure>
 -->

<template>
  <div class='carousel-figure-con'>
    <ul class='_relative img-list' @touchstart='swipeStart($event)' @touchmove='swipeMove($event)' @touchend='swipeEnd($event)'>
      <li v-for="(item, index) in imgList" :class='{"per-left": (active > index) || (active === index && moveX < 0), "per-right": (active < index) || (active === index && moveX > 0)}'>
        <v-touch @tap='changeActive(index)' class='img-box' :style='{transform: "translate3d(" + (60 * (index - active) + moveX / screenWidth * 100) + "vw," + 0 + "," + (Math.abs(((screenWidth * Math.abs(active - index) * -1) + (active>index ? 1 : -1) * moveX)) * -1) + "px)", left: (index-active) * 10 + "vw"}' 
          :class='{"lv-with-transition": !swiping}'>
          <img v-lazy="item" />
        </v-touch>
      </li>
    </ul>
    <ul class='cursor-list'>
      <li v-for="(item, index) in imgList">
        <span class='cursor lv-with-transition' :class='{active: active === index}'></span>
      </li>
    </ul>
  </div>
</template>

<script>
const [FAST_SWIPE_SECOND, FAST_SWIPE_DISTANCE, SWIPE_LIMIT, RATE] = [300, 15, 0.45, 0.7]

export default {
  name: 'CarouselFigure',
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      moveX: 0,
      swiping: false,
      screenWidth: parseFloat(window.innerWidth),
      startX: 0,
      startY: 0,
      startTimeStamp: 0,
      direction: '',
      currentX: 0,
      currentY: 0
    }
  },
  methods: {
    changeActive (index) {
      this.swiping = false
      this.$emit('update:active', index)
    },
    swipe (direction) {
      if (direction === 'right') {
        this.$emit('update:active', Math.max(this.active - 1, 0))
      } else {
        this.$emit('update:active', Math.min(this.active + 1, this.imgList.length - 1))
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
    }
  }
}
</script>
<style lang='scss' scoped>
$padding: 20vw;
$img_height: 15rem;
.carousel-figure-con{
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
}
</style>
