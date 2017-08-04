<template>
    <div class='_con'>
        <div class="pull-con" @touchstart='startHandler($event)' @touchmove='moveHandler($event)' @touchend='endHandler($event)' :style='{"transform":"translate3d(0, "+offsetTop+"px,0)"}' :class='{"is-dropped":topDropped || bottomDropped}'>
            <div class="top" v-if='refresh'>
                <!-- <img src='./gears.svg' class='loadingImg' v-if='onTopLoading' /> -->
                <div class="ant-spin ant-spin-spinning" v-if='onTopLoading'>
                    <span class="ant-spin-dot">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </div>
                <span class='icon with-animate light_color_2' v-if='!onTopLoading' :style='{"transform":"rotate("+rotateDeg+"deg)"}'>↓</span>
                <span class='center-text light_color_2'>{{pullDownText}}</span>
            </div>
            <slot name='data'></slot>
            <div class='bottom' v-if='loadmore'>
                <span class='icon with-animate light_color_2' v-if='!onBottomLoading' :style='{"transform":"rotate("+rotateDeg+"deg)"}'>↑</span>
                <!-- <img src='./gears.svg' class='loadingImg' v-if='onBottomLoading' /> -->
                <div class="ant-spin ant-spin-spinning" v-if='onBottomLoading'>
                    <span class="ant-spin-dot">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </div>
                <span class='center-text light_color_2'>{{pullUpText}}</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang='scss'>
._con {
    width: 100%;
    overflow: hidden
}

.pull-con {
    width: 100%;
    height: auto;
    .top,
    .bottom {
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
    }
    .top {
        margin-top: -40px;
    }
    .bottom {
        margin-bottom: -40px;
    }
    .loadingImg {
        vertical-align: middle;
        height: 40px;
        display: inline-block;
        margin-right: 3vw;
        transform: scale(0.65);
    }
    .icon {
        vertical-align: middle;
        margin-right: 3vw;
        display: inline-block;
    }

}

.is-dropped,
.with-animate {
    transition: transform 0.3s ease;
}

.ant-spin {
    margin-right: 2vw;
    color: #108ee9;
    vertical-align: middle;
    text-align: center;
    opacity: 0;
    position: absolute;
    -webkit-transition: -webkit-transform .3s cubic-bezier(.78, .14, .15, .86);
    transition: -webkit-transform .3s cubic-bezier(.78, .14, .15, .86);
    transition: transform .3s cubic-bezier(.78, .14, .15, .86);
    transition: transform .3s cubic-bezier(.78, .14, .15, .86), -webkit-transform .3s cubic-bezier(.78, .14, .15, .86);
    font-size: 12px;
    display: none;
}

.ant-spin-spinning {
    opacity: 1;
    position: static;
    display: inline-block;
}

.ant-spin-dot {
    position: relative;
    display: block;
    width: 20px;
    height: 20px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: antRotate 1.2s infinite linear;
    animation: antRotate 1.2s infinite linear;
}

.ant-spin-dot i {
    width: 9px;
    height: 9px;
    border-radius: 100%;
    /*background-color: #108ee9;*/
    background-color: rgb(110,200,255);
    -webkit-transform: scale(.75);
    -ms-transform: scale(.75);
    transform: scale(.75);
    display: block;
    position: absolute;
    opacity: .3;
    -webkit-animation: antSpinMove 1s infinite linear alternate;
    animation: antSpinMove 1s infinite linear alternate;
    -webkit-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
}

.ant-spin-dot i:first-child {
    left: 0;
    top: 0;
}

.ant-spin-dot i:nth-child(2) {
    right: 0;
    top: 0;
    -webkit-animation-delay: .4s;
    animation-delay: .4s;
}

.ant-spin-dot i:nth-child(3) {
    right: 0;
    bottom: 0;
    -webkit-animation-delay: .8s;
    animation-delay: .8s;
}

.ant-spin-dot i:nth-child(4) {
    left: 0;
    bottom: 0;
    -webkit-animation-delay: 1.2s;
    animation-delay: 1.2s;
}

@keyframes antRotate {
    100% {
        -webkit-transform: rotate(405deg);
        transform: rotate(405deg);
    }
}

@-webkit-keyframes antRotate {
    100% {
        -webkit-transform: rotate(405deg);
        transform: rotate(405deg);
    }
}

@keyframes antSpinMove {
    100% {
        opacity: 1;
    }
}

@-webkit-keyframes antSpinMove {
    100% {
        opacity: 1;
    }
}
</style>
<script>
const texts = {
  onPullDownText: '下拉刷新',
  onToReleaseText: '释放刷新',
  onTopLoadingText: '刷新中...',
  onPullUpText: '上拉加载更多',
  onBottomLoadingText: '加载中...'
}
export default {
  name: 'lv-loadmore',
  props: {
    onPullDownText: {
      type: String,
      default: texts.onPullDownText
    },
    onToReleaseText: {
      type: String,
      default: texts.onToReleaseText
    },
    onTopLoadingText: {
      type: String,
      default: texts.onTopLoadingText
    },
    onPullUpText: {
      type: String,
      default: texts.onPullUpText
    },
    onBottomLoadingText: {
      type: String,
      default: texts.onBottomLoadingText
    },
    refresh: {
      type: Function
    },
    loadmore: {
      type: Function
    },
    bottomAllLoaded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      offsetTop: 0,
      onTopLoading: false,
      topDropped: false,
      onBottomLoading: false,
      bottomDropped: false,
      bottomReached: false
    }
  },
  computed: {
    pullDownText () {
      let {
        offsetTop,
        onTopLoading
      } = this
      if (offsetTop <= 50 && !onTopLoading) {
        return this.onPullDownText
      } else if (offsetTop > 50 && !onTopLoading) {
        return this.onToReleaseText
      } else if (onTopLoading) {
        return this.onTopLoadingText
      }
    },
    pullUpText () {
      let {
          offsetTop,
          onBottomLoading
      } = this
      if (offsetTop <= 0 && offsetTop >= -50 && !onBottomLoading) {
        return this.onPullUpText
      } else if (offsetTop < -50 && !onBottomLoading) {
        return this.onToReleaseText
      } else if (onBottomLoading) {
        return this.onBottomLoadingText
      }
    },
    rotateDeg () {
      let {
        offsetTop
      } = this
      if ((offsetTop >= 0 && offsetTop <= 50) || (offsetTop >= -50 && offsetTop <= 0)) {
        return 0
      } else {
        return 180
      }
    }
  },
  methods: {
    topLoaded () {
      this.offsetTop = 0
      this.onTopLoading = false
      setTimeout(() => {
        this.topDropped = false
      }, 400)
    },
    bottomLoaded () {
      this.offsetTop = 0
      this.onBottomLoading = false
      setTimeout(() => {
        this.bottomDropped = false
      }, 400)
    },
    getScrollEventTarget (element) {
      let currentNode = element
      while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
          return currentNode
        }
        currentNode = currentNode.parentNode
      }
      return window
    },

    getScrollTop (element) {
      if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
      } else {
        return element.scrollTop
      }
    },
    checkBottomReached () {
      if (this.scrollEventTarget === window) {
        return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight
      } else {
        return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 5
      }
    },
    startHandler (e) {
      this.startY = e.touches[0].clientY
      this.scrollEventTarget = this.getScrollEventTarget(this.$el)
      this.startScrollTop = this.getScrollTop(this.scrollEventTarget)
      this.bottomReached = false
    },
    moveHandler (e) {
      if (this.$parent.$parent.swiping) {
        return
      }
      if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
        return
      }
      this.direction = (e.touches[0].clientY - this.startY) > 0 ? 'down' : 'up'
      if (this.direction === 'up') {
        this.bottomReached = this.bottomReached || this.checkBottomReached()
      }
      if ((this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0) || (this.direction === 'up' && this.bottomReached && !this.bottomAllLoaded)) {
        e.preventDefault()
        e.stopPropagation()
        this.offsetTop = (e.touches[0].clientY - this.startY) * 0.5
      }
    },
    endHandler (e) {
      if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.offsetTop > 0) {
        this.topDropped = true
        if (this.offsetTop >= 50) {
          if (!this.onTopLoading) {
            if (typeof this.refresh === 'function') {
              this.onTopLoading = true
              this.offsetTop = 50
              setTimeout(() => {
                this.refresh()
              }, 300)
            } else {
              this.onTopLoading = false
              this.offsetTop = 0
              setTimeout(() => {
                this.topDropped = false
              }, 400)
            }
          }
        } else {
          this.onTopLoading = false
          this.offsetTop = 0
          setTimeout(() => {
            this.topDropped = false
          }, 400)
        }
      } else if (this.direction === 'up' && this.bottomReached && this.offsetTop < 0) {
        this.bottomDropped = true
        this.bottomReached = false
        if (this.offsetTop < -50) {
          if (!this.onBottomLoading) {
            if (typeof this.loadmore === 'function') {
              this.offsetTop = -50
              this.onBottomLoading = true
              setTimeout(() => {
                this.loadmore()
              }, 300)
            } else {
              this.onBottomLoading = false
              this.offsetTop = 0
              setTimeout(() => {
                this.bottomDropped = false
              }, 400)
            }
          }
        } else {
          this.onBottomLoading = false
          this.offsetTop = 0
          setTimeout(() => {
            this.bottomDropped = false
          }, 400)
        }
      }
    }
  },
  mounted () {
    this.scrollEventTarget = this.getScrollEventTarget(this.$el)
  }
}
</script>
