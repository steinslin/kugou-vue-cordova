import Vue from 'vue'

const ToastConstructor = Vue.extend(require('./toast.vue'))
console.log(typeof ToastConstructor)
let instance = null

const getInstance = () => {
  if (instance) {
    return instance
  }
  return new ToastConstructor({
    el: document.createElement('div')
  })
}

const removeDom = event => {
  console.log(event.target)
  if (event.target) {
    document.body.removeChild(event.target)
  }
}

ToastConstructor.prototype.close = function () {
  if (this.colsed) {
    return
  }
  this.$el.addEventListener('transitionend', removeDom)
  this.colsed = true
  this.visible = false
}
export default function Toast ({
  duration = 1800,
  icon,
  image,
  message,
  position = 'middle'
}) {
  let instance = getInstance()
  clearTimeout(instance.timer)
  instance.duration = duration
  instance.icon = icon
  instance.image = image
  instance.message = message
  instance.position = position
  instance.colsed = false
  instance.visible = true
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.$el.removeEventListener('transitionend', removeDom)
    instance.timer = setTimeout(() => {
      instance.close()
    }, duration)
  })
}
