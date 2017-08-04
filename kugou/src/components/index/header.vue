<template>
  <ul>
    <li v-ripple><img class='avatar' :src="skin.avatar"></li>
    <li v-ripple v-for='(item,index) in skin.top_icons'>
      <v-touch tag="img" v-on:tap='toggleOnOff("top_icons",index)' class='icon' 
      :src='item.icons[item.selected]'></v-touch>
    </li>
    <li  @touchstart='press("icon_search")' @touchend='pressup("icon_search")' >
      <router-link :to='{name:"search"}' v-ripple >
        <img class='icon' :src='skin.icon_search.icons[skin.icon_search.selected]'/>
      </router-link>
    </li>
  </ul>

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['skin'])
    },
    methods: {
      toggleOnOff (key, index) {
        this.$store.commit('toggleOnOff', {
          key,
          index
        })
      },
      pressup (key) {
        this.$store.commit('pressup', {key})
      },
      press (key) {
        this.$store.commit('press', {key})
      }
    }
  }
</script>

<style scoped lang='scss'>
@import '../../styles/lv/var.scss';
ul{
  padding: 2vh 4vw 0px 4vw;
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
    border-bottom: 1px solid $dark-border-color;
    transform: scale(.5);
  }
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  li{
    width: 12vw;
    text-align: center;
    position:relative;
    &:last-child{
      .icon{
        width: 5vw;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        transform:translateY(-0.352vh);
      }
    };
  }
  .avatar{
    width:9.17vw;
    height:9.17vw;
    border-radius:50%;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    transform:translateY(-0.352vh);
    margin-left: 1vw;
  }
  .icon{
    width:11.5vw;;
    height: auto;
  }
}
</style>
