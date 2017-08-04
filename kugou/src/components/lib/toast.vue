<template>
  <transition name="lv-toast-pop">
    <div class="lv-toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
      <i class="lv-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="lv-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>

<style scoped>
    .lv-toast {
      position: fixed;
      max-width: 80%;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      box-sizing: border-box;
      text-align: center;
      z-index: 1000;
      transition: opacity .3s linear;
    }
      .lv-toast-icon {
        display: block;
        text-align: center;
        font-size: 56px;
      }
      
      .lv-toast-text {
        font-size: 14px;
        display: block;
        text-align: center;
      }
      
      .lv-toast-placetop {
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      
      .lv-toast-placemiddle {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      
      .lv-toast-placebottom {
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      
      .lv-toast-pop-enter, .lv-toast-pop-leave-active {
        opacity: 0;
      }

</style>

<script type="text/babel">
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        visible: false
      }
    },

    computed: {
      customClass () {
        var classes = []
        switch (this.position) {
          case 'top':
            classes.push('lv-toast-placetop')
            break
          case 'bottom':
            classes.push('lv-toast-placebottom')
            break
          default:
            classes.push('lv-toast-placemiddle')
        }
        classes.push(this.className)

        return classes.join(' ')
      }
    }
  }
</script>
