<template>
  <div>
    <v-touch tag='div' class='view wholepage con bg z1 lv-with-transition' key='1' :style="{backgroundImage: `url(${skin.bg})`, left: (sideBarLeft + 88) * 0.33 + 'vw'}" @swiperight='openSideBar' @swipeleft='closeSideBar' >
      <index-content @openSideBar='openSideBar'></index-content>
    </v-touch>
    <side-bar :left.sync='sideBarLeft' key='1' @closeSideBar='closeSideBar'></side-bar>
  </div>
</template>
<script>
  import indexContent from './content'
  import sideBar from './sideBar'
  import {mapState} from 'vuex'
  export default {
    props: ['sideBarLeft'],
    name: 'index',
    components: {indexContent, sideBar},
    computed: {
      ...mapState(['skin'])
    },
    data () {
      return {}
    },
    methods: {
      openSideBar () {
        console.log(1)
        console.log('???')
        this.$emit('update:sideBarLeft', 0)
      },
      closeSideBar () {
        console.log(2)
        this.$emit('update:sideBarLeft', -88)
      }
    }
  }
</script>
