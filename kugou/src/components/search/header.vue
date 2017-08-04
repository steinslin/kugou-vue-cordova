<template>
  <div>
    <div class='header-con'>
      <v-touch class='iconfont icon-left' tag='i' v-ripple v-back></v-touch>
      <div class='search-con'>
        <i class="iconfont icon-search light_color"></i>
        <input type="text" class="search-input primary_color" playholder='想听什么歌呢...' autofocus v-model.trim='inputMsg' @keyup.enter='enter' @focus='focus'/>
      </div>
      <router-link :to='{name:"searchresult"}' replace>
        <v-touch v-ripple-btn tag='button' class='search-btn btn-noborder' @tap='search'>搜索</v-touch>
      </router-link>
    </div>
  </div>
</template>

<script>
  import lvLoadmore from '../lib/pull-down-up.vue'
  export default {
    name: 'header',
    data () {
      return {
        inputMsg: ''
      }
    },
    components: {
      lvLoadmore
    },
    methods: {
      search () {
        if (this.$parent.$refs.searchresult) {
          typeof this.$parent.$refs.searchresult.searchSong === 'function' && this.$parent.$refs.searchresult.searchSong()
        }
      },
      enter () {
        this.search()
        this.$router.replace({name: 'searchresult'})
      },
      focus () {
        if (this.$route.path !== '/2/search') {
          this.$router.replace({name: 'searchHistory'})
        }
      }
    }
  }
</script>

<style lang='scss' scoped="true">
$input_bg_color:rgba(17,35,67,0.8);

.search-con{
  flex-grow: 1;
  display: flex;
  box-sizing: border-box;
  background: $input_bg_color;
  border-radius:1.5vw;
  margin-right: 3vw;
  .search-input{
    width: 100%;
    flex-grow: 1;
    background: transparent;
  }
}
.icon-search{
  transform: translateY(0.05rem);
  margin-left: 2vw;
  margin-right: 2vw;
}

.con{
  height: 21rem;
  overflow-y:auto;
  .con-left{
    
  }
  .con-mid{
    flex-grow: 1;
    border-bottom-width:1px;
    border-bottom-style:solid;
    position: relative;
    box-sizing: border-box;
    display: flex;
  }
  .songNameItem{
    flex-grow: 1;
  }
}
  .songlist{
    .song{
      height: 2rem;
      box-sizing: border-box;
      padding:0.25rem 0vw 0px 3.5vw;
      width: 100%;
      display: flex;
      &:nth-last-child(1) .con-mid{
        border:none;
      }
    }
    .songName{
      width:77vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .icon-config{
      font-size: 5vw;
      /*position: absolute;
      right: 3.5vw;*/
      margin-right:3.5vw;
      /*top:0;*/
      height:1.5rem;
      line-height: 1.5rem
    }
    .icon-add{
      font-size: 5vw;
      margin-right:3vw;
      height:1.5rem;
      line-height: 1.5rem;
    }
  }
</style>
