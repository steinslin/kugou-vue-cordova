<template>
  <div>
    <div class='con con-head' :style='{backgroundImage:`url(${skin.bg})`,backgroundSize:"cover"}'>
      <ul id='header'>
      <li v-ripple><img class='avatar' :src="skin.avatar" @click='openSideBar'></li>
      <li v-ripple :key='index' v-for='(item,index) in skin.top_icons'>
        <v-touch tag="img" v-on:tap='toggleOnOff("top_icons",index)' class='icon' 
        :src='item.icons[item.selected]'></v-touch>
      </li>
      <li  @touchstart='press("icon_search")' @touchend='pressup("icon_search")' >
        <router-link :to='{name:"search"}' v-ripple >
          <img class='icon' :src='skin.icon_search.icons[skin.icon_search.selected]'/>
        </router-link>
      </li>
    </ul>
      <ul>
        <v-touch tag='li' :key='index' v-ripple v-for='(item,index) in skin.top_action_icons' @press='press("top_action_icons",index)' @pressup='pressup("top_action_icons",index)' @tap='go(index)'>
          <img class='icon' :src='item.icons[item.selected]' />
          <div :style='{color:item.selected==1?"rgb(0,209,255)":"#fff"}'>{{item.text}}</div>
        </v-touch>
      </ul>
      <router-link :to='{name:"localSongs"}'>
        <v-touch class='nav-bar' v-ripple-btn >
          <img :src='skin.phone' class='icon' />
          <span class='light_color_2'>本地音乐</span>
          <v-touch tag='img' :src='skin.play.icons[skin.play.selected]' class='small-icon' @touchstart.stop='press("play")' @touchend.stop='pressup("play")'></v-touch>
          <i class='iconfont icon-right _right light_color_2'></i>
          <span class='_right'>{{total}}首</span>
        </v-touch>
      </router-link>
    </div>
    <div class='con con-nav'>
      <ul>
        <v-touch tag='li' :key='index' v-ripple v-for='(item,index) in skin.center_nav_icons' @press='press("center_nav_icons",index)' @pressup='pressup("center_nav_icons",index)' @tap='goNavCon(index)'>
          <img class='icon center_nav_icon' :src='item.icons[item.selected]' />
          <div :style='{color:item.selected==1?"rgb(0,209,255)":"#fff"}'>{{item.text}}</div>
        </v-touch>
      </ul>
    </div>
    <div class='con'>
      <v-touch class='nav-bar action-bar' v-ripple-btn @tap='toggleActionNav'>
        <div>
          <img :src='skin.earphone' class='icon' />
        </div>
        <div class='underline' :style='{"border-bottom-width":ul_close?"1px":"0px",transition:ul_close?"all 0.4s":"0s"}'>
          <span>工具</span>
          <i class='iconfont icon-down _right' :style='{transform:ul_close?"translateY(1.12vh) rotate(0deg)":"translateY(1.12vh) rotate(180deg)"}'></i>
        </div>
      </v-touch>
      <ul id='action-nav' :class='{close:ul_close,open:!ul_close}'>
        <li v-ripple>
          <i class='iconfont icon-run'></i>
          <div class='light_color'>跑步</div>
        </li>
        <li v-ripple>
          <i class='iconfont icon-pass'></i>
          <div class='light_color'>传歌</div>
        </li>
        <li v-ripple>
          <i class='iconfont icon-preview'></i>
          <div class='light_color'>扫描</div>
        </li>
        <li v-ripple>
          <i class='iconfont icon-song'></i>
          <div class='light_color'>挑歌</div>
        </li>
        <li v-ripple>
          <i class='iconfont icon-sound'></i>
          <div class='light_color'>铃声</div>
        </li>
        <li v-ripple>
          <i class='iconfont icon-identify'></i>
          <div class='light_color'>识曲</div>
        </li>
      </ul>
    </div>
    <div class='con'>
      <v-touch class='nav-bar action-bar' v-ripple-btn>
        <div>
          <img :src='skin.game' class='icon' />
        </div>
        <div class='underline'>
          <span>游戏</span>
        </div>        
      </v-touch>
    </div>
    <div class='con '>
      <v-touch class='nav-bar action-bar' v-ripple-btn>
        <div>
          <img :src='skin.generalize' class='icon' />
        </div>
        <div class='underline'>
          <span>推广</span>
        </div>  
      </v-touch>
      <div class='underline'></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  export default {
    data () {
      return {
        ul_close: true,
      }
    },
    computed: {
      ...mapGetters([]),
      ...mapState(['total', 'skin'])
    },
    methods: {
      press (key, index) {
        this.$store.commit('press', {key, index})
      },
      pressup (key, index) {
        this.$store.commit('pressup', {key, index})
      },
      go (index) {
        switch (index) {
          case 0:
            this.$router.push({name: 'love'})
            break
          case 1:
            this.$router.push({name: 'songList'})
            break
          case 2:
            this.$router.push({name: 'download'})
            break
          case 3:
            this.$router.push({name: 'recent'})
            break
        }
      },
      goNavCon (index) {
        switch (index) {
          case 0:
            this.$router.push({name: 'musicLibrary'})
            break
          case 1:
            this.$router.push({name: 'station'})
            break
          case 2:
            this.$router.push({name: 'kuGroup'})
            break
        }
      },
      toggleActionNav () {
        this.ul_close = !this.ul_close
      },
      toggleOnOff (key, index) {
        this.$store.commit('toggleOnOff', {
          key,
          index
        })
      },
      openSideBar () {
        this.$emit('openSideBar')
      }
    }
  }
</script>

<style scoped lang="scss">
@import '../../styles/lv/var.scss';
.con{
  padding:0px 4vw;
}
.con-head{
  border-bottom:1.2vh solid rgb(1,68,110);
}
.con-nav{
  border:none;
  ul{
    padding:3.2vh 8vw;
    div{
      margin-top:1vh;
    }
  }
}
ul{
  padding: 2.5vh 3vw;
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
  &#action-nav{
    transition:height 0.4s linear, padding 0.4s linear;
  }
  &.open{
    padding:0px 3vw 2vh 3vw;
  }
  &.close{
    height:0;
    opacity:0;
    overflow:hidden;
    padding:0px 3vw;
  }
  li{
    text-align: center;
    position:relative;
    transition:all 0.4s linear;
    div{
      text-overflow:hidden;
      white-space:nowrap;
    }
    i{
      font-size:5.7vw;
      color:rgb(179,197,211);
    }
  }
  .icon{
    width: 13.5vw;
    height: auto;
  }
  .center_nav_icon{
    width:15.5vw;
  }
}
.icon{
  width:4.5vw;
}
.small-icon{
  width:4.5vw;
}
.nav-bar{
  padding:2.7vh 2vw;
  img{
    vertical-align:middle;
    margin-right:3vw;
  }
  span{
    display:inline-block;
    transform:translateY(0.5vh);
    margin-right:2vw;
    &._right{
      font-size:3.6vw;
      transform:translateY(0.92vh);
      color:rgb(138,155,175);
    }
  }
  i._right{
    font-size:3.6vw;
    transform:translateY(0.8vh);
  }
}
.action-bar{
  padding:0vh 2vw;
  display:flex;
  img{
    width:7vw;
    margin-right:2vw;
    padding-top:1.5vh;
  }
}
.underline{
  display:inline-block;
  padding:1.5vh 0px 2.5vh 0;
  flex-grow:1;
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
}

ul#header{
  padding: 2vh 0vw 0px 2vw;
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
