<template>
  <v-touch tag='div' class='view wholepage con bg z1 sidebar lv-flex' :style='{left: left + "vw"}' @swipeleft='closeSideBar' style='transition:left .5s'>
    <div :style='{backgroundImage: `url(${skin.dialogBg})`}' class='sidebar-con wholepage bg'>
      <span @click='setSkin'>点我切换皮肤</span>
    </div>
    <div class='sidebar-shadow wholepage' @click='closeSideBar' v-show='left === 0' style='transition:all .5s'></div>
  </v-touch>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props: ['left'],
  data () {
    return {
      index: 0
    }
  },
  methods: {
    setSkin () {
      this.$store.commit('setSkin', ++this.index % 4)
    },
    closeSideBar () {
      this.$emit('closeSideBar')
    }
  },
  computed: {
    ...mapState(['skin'])
  }
}
</script>
<style lang='scss'>
.sidebar{
  width:80vw;
  top:0;
  position:fixed;
  z-index: 10000 !important;
  .sidebar-con{
    width: 80vw
  }
  .sidebar-shadow{
    position:absolute;
    left: 80vw;
    width: 100vw;
    background:rgba(0,0,0,.3);
  }
}
</style>
