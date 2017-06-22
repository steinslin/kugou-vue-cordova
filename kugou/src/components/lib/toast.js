import Vue from 'vue'

const ToastConstructor=Vue.extend(require('./toast.vue'))

let instance = null

const getInstance = ()=>{
	if(instance){
		return instance
	}
	return new ToastConstructor({
		el:document.createElement('div')
	})
}

const removeDom = event =>{
	if(event.target){
		document.body.removeChild(event.target)
	}
}

ToastConstructor.protoType.close=()=>{
	if(this.colsed){
		return
	}
	this.$el.addEventListener('transitionend',removeDom)
	this.colsed=true
}
export default class Toast {
	constructor({
		duration = 1800,
		icon,
		image,
		text,
		position = 'center'
	}) {
		let instance= getInstance()
		clearTimeout(instance.timer)
		instance={
			duration,
			icon,
			image,
			text,
			position
		}
		instance.colsed=false
		document.body.appendChild(instance.$el)
		Vue.nextTick(()=>{
			instance.$el.removeEventListener('transitionend',removeDom)
			instance.timer = setTimeout(()=>{
				instance.close();
			},duration)
		})
	}

}