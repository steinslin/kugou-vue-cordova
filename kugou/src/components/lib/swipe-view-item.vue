<!-- 和swipe-view.vue一起使用 -->
<!-- lv-swipe-item 必须传递loaded参数 必须绑定ref 格式是item+index
       可选参数loadingImg 可选参数loadingText 可选参数loadingFunction-->
<template>
  <div class='con'>
    <div v-if='visited && !loaded' class='loading'>
      <!-- <div class="ant-spin ant-spin-spinning">
                <span class="ant-spin-dot">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
            </div> -->
            <div id='loadingBox' v-animate></div>
      <span class='text light_color_2'>{{loadingText}}</span>
    </div>
    <div v-if='loaded && visited'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    /*
    是否加载完成的标志  必须传递  不然一直显示loading
     */
    loaded: {
      type: Boolean,
      default: false
    },
    loadingImg: {
      type: String,
      default: 'static/gears.svg'
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    },
    loadingFunction: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      visited: false // 是否已经拜访过
    }
  },
  directives: {
    animate: {
      bind (el, binding, vnode) {
        let arr = [
          '/static/loading2/afg.png',
          '/static/loading2/afh.png',
          '/static/loading2/afi.png',
          '/static/loading2/afj.png',
          '/static/loading2/afk.png',
          '/static/loading2/afl.png',
          '/static/loading2/afm.png',
          '/static/loading2/afn.png',
        ]

        let index = 0
        let img = document.createElement('img')
        img.id = 'loadingImg'
        img.src = arr[0]
        img.style.width = '15vw'
        el.appendChild(img)
        let timer = setInterval(() => {
          if (vnode.context.loaded) {
            clearInterval(timer)
          } else {
            index = ++index % arr.length
            el.children[0].src = arr[index]
          }
        }, 180)
      }
    }
  },
  methods: {
    updateStatus () {
      this.visited = true
    },
  },
  watch: {
    visited (newval, oldval) {
      if (!oldval && typeof this.loadingFunction === 'function') {
        this.loadingFunction()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$img_width:50px;
$font_size:4vw;
.con{
  height: 100%;
  width: 100%;
  overflow-y: auto;
  position: relative;
}

.loading{
  position: absolute;
    display: inline-block;
  top:0;
  bottom:0;
  right: 0;
    height:90px;
    width:100px;
  left:0;
  font-size: $font_size;
  margin: auto;
    text-align: center;
}

.text{
  display: block;
    text-align: center;
    margin-top:0.3rem;
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
    background-color: #108ee9;
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
