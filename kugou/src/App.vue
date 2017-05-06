<template>
    <div id="app" class='bg wholepage _fixed'>
        <transition :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
            <router-view></router-view>
        </transition>
        <footer-play-bar></footer-play-bar>
    </div>
</template>
<script>
import footerPlayBar from './components/footer.vue';
import {
    bg
} from './config/skin-config.js'
(function(doc, win) {
    let docEl = doc.documentElement;
    let clientHeight = docEl.clientHeight;
    docEl.style.fontSize = clientHeight / 100 * 4 + 'px';
})(document, window)
export default {
    name: 'app',
    data() {
        return {
            bg: `url(${bg})`,
            leaveActiveClass:'',
            enterActiveClass:''
        }
    },
    components: {
        footerPlayBar
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
        //    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            if(toDepth>fromDepth){
                this.enterActiveClass='animated slideIn animated-in';
                this.leaveActiveClass='animated thirdSildeOut animated-in'
            }else{
                this.enterActiveClass='animated thirdSildeIn animated-in';
                this.leaveActiveClass='animated slideOut animated-in'
            }
        }
    }
}
</script>
<style lang='scss'>
$border_color:#186591;
$color_light:rgb(153, 182, 195);
$color_primary:rgb(238, 242, 245);
$playholder_color:rgb(80, 84, 96);
$light_color_2:rgb(0, 209, 255);
html {
    font-size: 1vh;
}

::-webkit-scrollbar {
    width: 0px;
}

.animated.animated-in {
    animation-duration: .5s;
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
    color:$color_primary;
    @for $i from 1 through 6 {
        .z#{$i} { z-index:$i; }
    }
}

body {
    overflow-x: hidden;
}

.text-no-wrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.small {
    font-size: 3.75vw;
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

.ripple-container {}

.ripple {
    background-color: rgba(255, 255, 255, 0.4);
    animation: ripple 1s forwards cubic-bezier(0, 0, 0.2, 1);
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
    -webkit-animation-name: thirdSildeIn;
    animation-name: thirdSildeIn;
}
</style>
