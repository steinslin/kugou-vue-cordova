<!--必须绑定navArray(头部导航) 可选参数activeIndex 结合swipe-view-item一起用 
 navArray的长度必须和swipe-view-item的个数相同-->

<template>
  <div class="swipe-con" id='swipe-con-id'>
    <div class="swipe-con-nav" v-if='navArray.length>0'>
      <v-touch class='swipe-con-nav-item light_color_2' 
        v-for='(item,index) in navArray' :key='index'
        @tap='changeIndex(index)' 
        :class='{
          "active":index===active,"withAnimate":!swiping
        }' 
        :style='{
          "width":100/navArray.length+"%"
        }'>
        {{item}}
      </v-touch>
    </div>
    <div class="active-border" v-if='navArray.length>0' 
    :style='{
      "width":100/navArray.length+"%",
      "transform":"translateX("+navOffsetLeft+"px)"
    }' :class='{
      "withAnimate":!swiping
    }'></div>
    <div class="swipe-con-content" id='swipe-con-content'
      :style='{
        "width":100*navArray.length+"%",
        "transform":"translateX("+conOffsetLeft+"px)"
      }'
      :class='{"withAnimate":!swiping}'
      @touchstart='swipeStart' 
      @touchmove='swipeMove' 
      @touchend='swipeEnd'>
        <slot :style='{
          "width":100/navArray.length+"%"
        }'></slot>
      </div>
      
    </div>
  </div>
</template>

<script>
const FAST_SWIPE_SECOND = 300
const FAST_SWIPE_DISTANCE = 15
const SWIPE_LIMIT = 0.45
const RATE = 0.7
export default{
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    navArray: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      loaded: false,
      active: parseInt(this.activeIndex),
      swiping: false,
      navOffsetLeft: 0,
      navOffsetLeftCopy: 0,
      conOffsetLeft: 0,
      conOffsetLeftCopy: 0,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      conWidth: 0,
      conContentWidth: 0,
      startTimeStamp: 0,
    }
  },
  mounted () {
    this.conWidth = document.getElementById('swipe-con-id').clientWidth
    this.conContentWidth = document.getElementById('swipe-con-content').clientWidth
    if (this.active !== 0) {
      this.navOffsetLeft = this.navOffsetLeftCopy = this.conWidth / this.navArray.length * this.active
      this.conOffsetLeft = this.conOffsetLeftCopy = this.conContentWidth / this.navArray.length * this.active * -1
    }
    // 更新swipe-view-item的状态
    console.log(this.$parent.$refs)
    this.$parent.$refs['item' + this.active].updateStatus()
  },
  watch: {
    active (index) {
      this.navOffsetLeft = this.navOffsetLeftCopy = document.getElementById('swipe-con-id').clientWidth / this.navArray.length * this.active
      this.conOffsetLeft = this.conOffsetLeftCopy = document.getElementById('swipe-con-content').clientWidth / this.navArray.length * this.active * -1
      // 更新swipe-view-item的状态
      console.log(this.$parent.$refs)
      this.$parent.$refs['item' + this.active].updateStatus()
    }
  },
  methods: {
    setOffsetLeft () {
      this.navOffsetLeft = this.navOffsetLeftCopy
      this.conOffsetLeft = this.conOffsetLeftCopy
    },
    changeIndex (index) {
      console.log('changeIndex')
      this.active = index
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
      let {startX, startY, navArray, swiping, startTimeStamp} = this
      let currentX = e.touches[0].pageX
      let currentY = e.touches[0].pageY
      if (e.timeStamp - startTimeStamp < 200 && (!swiping || Math.abs(currentY - startY) > Math.abs(currentX - startX))) {
        this.swiping = false
        return
      }
      e.preventDefault()
      e.stopPropagation()
      this.currentX = e.touches[0].pageX
      this.currentY = e.touches[0].pageY
      this.navOffsetLeft = this.navOffsetLeftCopy + (startX - currentX) / navArray.length * RATE
      this.conOffsetLeft = this.conOffsetLeftCopy + (currentX - startX) * RATE
    },
    swipeEnd (e) {
      this.swiping = false
      let {currentX, startX, startTimeStamp, navArray} = this
      // 右划
      if (currentX > startX) {
        // 快速滑动 300ms以内 滑动距离超过FAST_SWIPE_DISTANCE
        if ((e.timeStamp - startTimeStamp < FAST_SWIPE_SECOND && currentX - startX > FAST_SWIPE_DISTANCE) || currentX - startX > this.conWidth * SWIPE_LIMIT) {
          this.active = Math.max(--this.active, 0)
          console.log(1)
          if (this.active === 0) {
            this.setOffsetLeft()
          }
        } else {
          this.setOffsetLeft()
        }
      } else { // 左划
        if ((e.timeStamp - startTimeStamp < FAST_SWIPE_SECOND && Math.abs(currentX - startX) > FAST_SWIPE_DISTANCE) || Math.abs(currentX - startX) > this.conWidth * SWIPE_LIMIT) {
          console.log(2)
          this.active = Math.min(++this.active, navArray.length - 1)
          if (this.active === navArray.length - 1) {
            this.setOffsetLeft()
            console.log(3)
          }
        } else {
          this.setOffsetLeft()
          console.log(4)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$img_width:40px;
$font_size:4vw;
.swipe-con{
  height:100%;
  width: 100%;
  overflow:hidden;
  
  .swipe-con-nav{
    height: 3em;
    display: flex;
  }
  .swipe-con-nav-item{
    box-sizing: border-box;
    text-align: center;
    line-height: 3em;
  }
  .swipe-con-content{
    height:calc(100% - 3em - 2px);
    
    display: flex;
    overflow-y: auto;
  }
}
.withAnimate{
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out,
}
.loading{
  position: absolute;
  top:0;
  bottom:0;
  width: calc(40px + 3vw + 4vw * 5);
  height:$img_width;
  right: 0;
  left:0;
  font-size: $font_size;
  margin: auto;
}

.img{
  width: $img_width;
  height: $img_width;
  vertical-align: middle;
}

.text{
  display: inline-block;
  margin-left: 3vw;
}
</style>
