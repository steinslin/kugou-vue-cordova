<template>
    <div class='_con'>
        <div class="pull-con" @touchstart='startHandler($event)' @touchmove='moveHandler($event)' @touchend='endHandler($event)' :style='{"transform":"translate3d(0, "+offsetTop+"px,0)"}' :class='{"is-dropped":topDropped || bottomDropped}'>
            <div class="top" v-if='refresh'>
            	<img src='./gears.svg' class='loadingImg' v-if='onTopLoading' />
            	<span class='icon with-animate light_color_2' v-if='!onTopLoading' :style='{"transform":"rotate("+rotateDeg+"deg)"}'>↓</span>
                <span class='center-text light_color_2'>{{pullDownText}}</span>
            </div>
            <slot name='data'></slot>
            <div class='bottom' v-if='loadmore'>
            	<span class='icon with-animate light_color_2' v-if='!onBottomLoading' :style='{"transform":"rotate("+rotateDeg+"deg)"}'>↑</span>
            	<img src='./gears.svg' class='loadingImg' v-if='onBottomLoading' />
                <span class='center-text light_color_2'>{{pullUpText}}</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang='scss'>
._con {
    width: 100%;
    overflow: hidden
}

.pull-con {
    width: 100%;
    height: auto;
    .top,
    .bottom {
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
    }
    .top {
        margin-top: -40px;
    }
    .bottom {
        margin-bottom: -40px;
    }
    .loadingImg{
    	vertical-align: middle;
    	height:40px;
    	display: inline-block;
    	margin-right: 3vw;
    	transform: scale(0.65);
    }
    .icon{
    	vertical-align: middle;
		margin-right: 3vw;
		display: inline-block;
    }
    .center-text{
    	display: inline-block;
    	line-height: 40px;
    	height: 40px;
    }
}

.is-dropped,.with-animate {
    transition: transform 0.3s ease;
}
</style>
<script tyle='es6'>
const texts = {
    onPullDownText: '下拉刷新',
    onToReleaseText: '释放刷新',
    onTopLoadingText: '刷新中...',
    onPullUpText: '上拉加载更多',
    onBottomLoadingText: '加载中...'
}
export default {
	name:'lv-loadmore',
    props: {
        onPullDownText: {
            type: String,
            default: texts.onPullDownText
        },
        onToReleaseText: {
            type: String,
            default: texts.onToReleaseText
        },
        onTopLoadingText: {
            type: String,
            default: texts.onTopLoadingText
        },
        onPullUpText: {
            type: String,
            default: texts.onPullUpText
        },
        onBottomLoadingText: {
            type: String,
            default: texts.onBottomLoadingText
        },
        refresh: {
            type: Function
        },
        loadmore: {
            type: Function
        },
        bottomAllLoaded: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            offsetTop: 0,
            onTopLoading: false,
            topDropped: false,
            onBottomLoading: false,
            bottomDropped: false,
            bottomReached: false
        }
    },
    computed: {
        pullDownText() {
            let {
                offsetTop,
                onTopLoading
            } = this;
            if (offsetTop <= 50 && !onTopLoading) {
                return this.onPullDownText
            } else if (offsetTop > 50 && !onTopLoading) {
                return this.onToReleaseText
            } else if (onTopLoading) {
                return this.onTopLoadingText
            }
        },
        pullUpText() {
            let {
                offsetTop,
                onBottomLoading
            } = this;
            if (offsetTop <= 0 && offsetTop >= -50 && !onBottomLoading) {
                return this.onPullUpText
            } else if (offsetTop < -50 && !onBottomLoading) {
                return this.onToReleaseText
            } else if (onBottomLoading) {
                return this.onBottomLoadingText
            }
        },
        rotateDeg(){
        	let {
                offsetTop,
                onTopLoading
            } = this;
            if (offsetTop>=0 &&offsetTop <= 50 || offsetTop>=-50 && offsetTop<=0) {
                return 0
            } else{
            	return 180;
            }
        }
    },
    methods: {
    	topLoaded(){
			this.offsetTop=0;
			this.onTopLoading=false;
			setTimeout(()=>{
				this.topDropped=false			
			},400)
    	},
    	bottomLoaded(){
			this.offsetTop=0;
			this.onBottomLoading=false;
			setTimeout(()=>{
				this.bottomDropped=false			
			},400)
    	},	
        getScrollEventTarget(element) {
            let currentNode = element;
            while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                if (overflowY === 'scroll' || overflowY === 'auto') {
                    return currentNode;
                }
                currentNode = currentNode.parentNode;
            }
            return window;
        },

        getScrollTop(element) {
            if (element === window) {
                return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
            } else {
                return element.scrollTop;
            }
        },
        checkBottomReached() {
            if (this.scrollEventTarget === window) {
                return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
            } else {
                return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 5;
            }
        },
        startHandler(e) {
            this.startY = e.touches[0].clientY;
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);
            this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
            this.bottomReached = false;
        },
        moveHandler(e) {
            if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                return;
            }
            this.direction = (e.touches[0].clientY - this.startY) > 0 ? 'down' : 'up';
            if (this.direction === 'up') {
                this.bottomReached = this.bottomReached || this.checkBottomReached();
            }
            if (( this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 ) || (this.direction === 'up' && this.bottomReached  && !this.bottomAllLoaded)) {
                e.preventDefault();
                e.stopPropagation();
                this.offsetTop = (e.touches[0].clientY - this.startY) * 0.5;
            } 
        },
        endHandler(e) {
            if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.offsetTop > 0) {
                this.topDropped = true;
                if (this.offsetTop >= 50) {
                    if(!this.onTopLoading){						
                        if(typeof this.refresh==='function'){
                            this.onTopLoading = true;
                            this.offsetTop = 50;
                            setTimeout(()=>{
                                this.refresh()
                            },300)
                        //    this.refresh()
                        }else{
                            this.onTopLoading = false;
                            this.offsetTop = 0
                            setTimeout(() => {
                                this.topDropped = false
                            }, 400)
                        }					
                    }
                } else {
                    this.onTopLoading = false;
                    this.offsetTop = 0
                    setTimeout(() => {
                        this.topDropped = false
                    }, 400)
                }
            } else if (this.direction === 'up' && this.bottomReached && this.offsetTop<0){
            	this.bottomDropped = true;
          		this.bottomReached = false;
          		if(this.offsetTop<-50){
          			
          			if(!this.onBottomLoading){
                        if(typeof this.loadmore==='function'){
                            this.offsetTop=-50;
                            this.onBottomLoading=true;
                            setTimeout(()=>{
                                this.loadmore()
                            },300)
                        //    this.loadmore();
                        }else{
                            this.onBottomLoading=false;
                            this.offsetTop=0;
                            setTimeout(()=>{
                                this.bottomDropped=false
                            },400)
                        }						
          			}
          		}else{
          			this.onBottomLoading=false;
          			this.offsetTop=0;
          			setTimeout(()=>{
          				this.bottomDropped=false
          			},400)
          		}
            }
        }
    },
    mounted() {
        this.scrollEventTarget = this.getScrollEventTarget(this.$el);
    }
}
</script>
