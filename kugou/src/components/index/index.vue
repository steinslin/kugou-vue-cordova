<template>
  <div>
    <v-touch tag='div' class='view wholepage con bg z1' key='1' :style="{backgroundImage: `url(${skin.bg})`}" @swiperight='openSideBar' @swipeleft='closeSideBar' >
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
        this.$emit('update:sideBarLeft', 0)
      },
      closeSideBar () {
        console.log(2)
        this.$emit('update:sideBarLeft', -88)
      }
    }
  }
</script>
