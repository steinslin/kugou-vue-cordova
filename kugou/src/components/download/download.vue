<template>
  <div class='view wholepage con bg z2'  :style="{backgroundImage: `url(${skin.bg})`}">
    <div class='header-con'>
      <v-touch v-ripple v-back tag='img' src="static/img/agp.png" class='img-back' /> 
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
