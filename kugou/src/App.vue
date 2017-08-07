<template> <!-- :style='{left: (sideBarLeft + 88) * 0.33 + "vw"}' -->
  <div id="app" class='bg wholepage _fixed' style='transition:left .5s'>
    <transition :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
      <router-view :sideBarLeft.sync='sideBarLeft'></router-view>
    </transition>
    <play-list ref='playList'></play-list>
    <footer-play-bar :sideBarLeft.sync='sideBarLeft'></footer-play-bar>
  </div>
</template>
<script>
import footerPlayBar from './components/footer'
import playList from './components/play-list'
import sideBar from './components/index/sideBar.vue'
(function (doc, win) {
  let docEl = doc.documentElement
  let clientHeight = docEl.clientHeight
  docEl.style.fontSize = clientHeight / 100 * 4 + 'px'
})(document, window)
export default {
  name: 'app',
  data () {
    return {
      sideBarLeft: -88,
      leaveActiveClass: '',
      enterActiveClass: ''
    }
  },
  components: {
    footerPlayBar,
    playList,
    sideBar
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      console.log(to.path)
      if (to.meta.hidePlayBar) {
        document.querySelector('#playBar').style.display = 'none'
      }
      if (from.meta.hidePlayBar && !to.meta.hidePlayBar) {
        setTimeout(() => {
          document.querySelector('#playBar').style.display = 'block'
        }, 600)
      }
      if (toDepth > fromDepth) {
        this.enterActiveClass = 'animated slideIn animated-in'
        this.leaveActiveClass = 'animated thirdSildeOut animated-in'
      } else {
        this.enterActiveClass = 'animated thirdSildeIn animated-in'
        this.leaveActiveClass = 'animated slideOut animated-in'
      }
    }
  }
}
</script>
<style lang='scss'>
@import './styles/lv/index.scss';

$border_color       : #195275;
$img_width          : 50px;
$color_light        : #99B6C3;
$color_primary      : #EEF2F5;
$playholder_color   : #505460;
$light_color_2      : #00D1FF;
$light_active_color : #FBF6A9;
$nav_bg_color       : #213051;

/*::-webkit-scrollbar {
     width: 2px;
}
*/
.header-con{
  display: flex;
  box-sizing: border-box;
  margin-top: 0.25rem;
  padding:0.25rem 3vw;
  height: 1.5rem;
  *{
    line-height: 1.15rem;
    height: 1.15rem;
  }
  .iconfont{
    font-size: 5vw;
  }
  .icon-left{
    margin-right: 4vw;
    position: relative;
  }
} 
.img-back{
  transform: rotate(180deg);
  width: 2.4vw;
  height: 4vw;
  margin-right: 4vw;
  margin-top: 1.7vw;
}
.mint-toast{
  font-weight: 200;
}
.mint-msgbox-header{
  display: none;
}
body .mint-msgbox-message{
  color:$color_primary;
  line-height: 2.2rem
}
body .mint-msgbox{
  font-size: 4vw;
}
.mint-msgbox-btns button{
  font-size: 4.5vw;
  background-color: transparent;
}
body button.mint-msgbox-cancel{
  color:$color_primary;
  &:active{
    background-color:transparent;
    color:color_primary;
  }
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
    border-right: 1px solid $border-color;
    transform: scale(.5);
  }
  border-right: 0px solid $border-color;
}
body button.mint-msgbox-confirm{
  &:active{
    background-color:transparent;
  }
}
body .mint-msgbox-content{
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
    border-bottom: 1px solid $border-color;
    transform: scale(.5);
  }
  border-bottom: 0px solid $border-color;
}
.animated.animated-in {
  animation-duration: .5s;
}

.active-border{
  color:$light_active_color;
  height:2px;
  background-color:$border_color; 
}

.active{
  color:$light_active_color !important;
}

.swipe-con-nav{
  background-color: $nav_bg_color
}
#app {
  font-family: 'microsoft yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 4vw;
  ul,
  li,
  div {
    border-color: $border_color;
  }
  width:100vw;
  /* overflow:hidden; 这个加上在切换路由时动画有bug  */
  @for $i from 1 through 6 {
    .z#{$i} { z-index:$i; }
  }
}

.text-no-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.small {
  font-size: 3vw;
  line-height: 1.2;
}

.medium{
  font-size: 4.5vw;
  line-height: 1.3;
}
.iconfont {
  display: inline-block;
}

.wholepage {
  height: 25rem;
  width: 100vw;
}

.view {
  position: absolute;
  left: 0px;
  right: 0px;
}

.bg {
  box-sizing: border-box;
  width: 100vw;
  height: 25rem;
  background-size: cover;
  background-color: rgba(0,0,0,.3);
}

.light_color_2 {
  color: $light_color_2;
}

.light_color {
  color: $color_light;
}

.primary_color {
  color: $color_primary;
}

.btn-noborder {
  border: none;
  color: $color_primary;
  background: transparent;
  outline: none;
}

input {
  outline: none;
}

._right {
  float: right;
}

._relative {
  position: relative;
}

._absolute {
  position: absolute;
}

._fixed {
  position: fixed;
}

.ripple {
  background-color: rgba(255, 255, 255, 0.4);
  animation: ripple 1.5s forwards cubic-bezier(0, 0, 0.2, 1);
}
.ripple-circle {
  background-color: rgba(255, 255, 255, 0.4);
  animation: ripple .8s forwards cubic-bezier(0, 0, 0.2, 1);
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: $playholder_color;
}

input:-moz-placeholder,
textarea:-moz-placeholder {
  color: $playholder_color;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
  color: $playholder_color;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: $playholder_color;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  80% {
    transform: scale(1);
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes slideOut {
  from {
    -webkit-transform: none;
    transform: none;
  }
  to {
    -webkit-transform: translate3d(100vw, 0, 0);
    transform: translate3d(100vw, 0, 0);
  }
}

@keyframes slideOut {
  from {
    -webkit-transform: none;
    transform: none;
  }
  to {
    -webkit-transform: translate3d(100vw, 0, 0);
    transform: translate3d(100vw, 0, 0);
  }
}

@-webkit-keyframes slideIn {
  from {
    -webkit-transform: translate3d(100vw, 0, 0);
    transform: translate3d(100vw, 0, 0);
  }
  to {
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes slideIn {
  from {
    -webkit-transform: translate3d(100vw, 0, 0);
    transform: translate3d(100vw, 0, 0);
  }
  to {
    -webkit-transform: none;
    transform: none;
  }
}

@-webkit-keyframes thirdSildeOut {
  from {
    -webkit-transform: none;
    transform: none;
      
  }
  to {
    -webkit-transform: translate3d(-33vw, 0, 0);
    transform: translate3d(-33vw, 0, 0);
  }
}

@keyframes thirdSildeOut {
  from {
    -webkit-transform: none;
    transform: none;
      
  }
  to {
    -webkit-transform: translate3d(-33vw, 0, 0);
    transform: translate3d(-33vw, 0, 0);
  }
}

@-webkit-keyframes thirdSildeIn {
  from {
    -webkit-transform: translate3d(-33vw, 0, 0);
    transform: translate3d(-33vw, 0, 0);
  }
  to {
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes thirdSildeIn {
  from {
     -webkit-transform: translate3d(-33vw, 0, 0);
    transform: translate3d(-33vw, 0, 0);
  }
  to {
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeOpacityOut {
  from {
      opacity: 1
  }
  to {
      opacity: 0
  }
}
.slideIn{
  -webkit-animation-name: slideIn;
  animation-name: slideIn;
}

.slideOut{
  -webkit-animation-name: slideOut;
  animation-name: slideOut;
}

.thirdSildeOut{
  -webkit-animation-name: thirdSildeOut;
  animation-name: thirdSildeOut;
}

.thirdSildeIn{
  -webkit-animation-name: AutoFileName;
  animation-name: thirdSildeIn;
}
.fadeOpacityOut{
  animation-name: fadeOpacityOut
}
</style>
