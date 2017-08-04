<template>
  <div class='view wholepage con bg z2'  :style="{backgroundImage: `url(${skin.bg})`}">
    <div class='header-con'>
      <v-touch class='iconfont icon-left' tag='i' v-ripple v-back></v-touch>  
    </div>  
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'search',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['skin'])
  }
}
</script>
