<template>
	<div class='lv-overflow-auto con'>
		<div class="lv-container-medium lv-align-center lv-bottom-border">
			<i class="iconfont icon-tag"></i>
			<span>歌手分类</span>
			<i class="iconfont icon-right"></i>
		</div>
		<div class="lv-container header lv-bottom-border" v-if='hotList && hotList.length>0'>
			<div class='lv-container lv-primary-color-light'>热门搜索</div>
			<ul class='lv-container lv-mg-minus-bottom-medium lv-mg-minus-right-medium'>
				<v-touch v-for='item in hotList' v-ripple-btn class="lv-container-circle" tag='li' @tap='searchSong($event,item)'>{{item}}</v-touch>			
			</ul>
		</div>
		<ul v-if='historyList && historyList.length>0' class='lv-bottom-border'>
			<v-touch tag='li' class='lv-pd-left-large' v-ripple-btn  v-for='(item,index) in historyList' @tap='searchSong($event,item)' >
				<div class="lv-flex lv-bottom-border  lv-pd-right-small">
					<div class="lv-container-medium nopdleftright">
						<i class="iconfont icon-clockcircleo"></i>
					</div>
					<div class="lv-flex-grow lv-flex">
						<div class="lv-flex-grow lv-container-medium">{{item}}</div>
						<div class="lv-container-medium stop-propogation" >
							<i class="iconfont icon-close stop-propogation" @click.stop='deleteHisItem(index)'></i>
						</div>
					</div>
				</div>
			</v-touch>
		</ul>
		<div v-if='historyList && historyList.length>0' class=" lv-container-mlarge lv-align-center lv-font-large" v-ripple-btn @click='clearHis'>清空搜索历史
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'
	export default{
		data(){
			return {
			}
		},
		created(){
			this.$store.commit('getHistoryList');
			this.$store.commit('getHotList')
		},
		computed:{
			...mapState(['historyList','hotList','dialogBg'])
		},
		methods:{
			searchSong($event,key){
				console.log($event.target.className);
				if($event.target.className.indexOf('stop-propogation')!=-1){
					console.log('stop');
					return;
				}
				this.$parent.$refs.searchHeader.inputMsg=key;
				this.$router.replace({name:'searchresult'})

			},
			clearHis(){
				this.$message.confirm('确定清空搜索历史?').then(action=>this.$store.commit('clearHistoryList')).catch(cancle=>{})
				Vue.nextTick(()=>{
					let el=document.querySelector('.mint-msgbox');
					el.style.backgroundImage=`url(${this.dialogBg})`
					el.style.backgroundSize='cover';				
				})
			},
			deleteHisItem(index){
				this.$store.commit('deleteHisItem',index);
			}
		}
	}
</script>

<style scoped>
@import '../../styles/lv/var.scss';
	.lv-container-medium.nopdleftright{
		padding-left:0;
		padding-right: 0;
	}
	.con{
	    height: 21rem;
	    overflow-y: auto;
	}
	.lv-container-circle{
		padding:5px 8px;
	}
	li div.lv-bottom-border{
		/*border-bottom:1px solid #195275;*/
		/*&:before{
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
        }*/

	}
	.lv-bottom-border:last-child{
		/*border-bottom: none;*/
		&:before{
            border-bottom:none;
        }
	}
	.icon-close{
		margin-right: 0px;
	}
	.header.lv-bottom-border:last-child:before{
		border-bottom:none;
	}
</style>