<template>
  <div class='view wholepage con bg z2' :style="{backgroundImage: `url(${skin.bg})`}">
    <search-header ref='searchHeader'></search-header>
    <transition enter-active-class="animated slideIn fadeIn" leave-active-class='fadeOut animated-out'>
      <router-view ref='searchresult'></router-view>
    </transition>
  </div>
</template>

<script>
import searchHeader from './header'
import {mapState} from 'vuex'
export default {
  name: 'search',
  components: {
    searchHeader
  },
  computed: {
    ...mapState(['skin'])
  }
}
</script>

<style lang='scss' scoped>
.animated-out{
  transition-duration: .15s;
}
.animated-in{
  transition-duration: .2s;
}
</style>
