/* eslint-disable no-new */
export default {
  name: 'vBack',
  bind (el, binding, vnode) {
    let value = binding.value || -1
    new BackEffect(el, value, vnode.componentInstance)
  }
}

function BackEffect (el, value, _vue) {
  this.el = el
  this.value = value
  this._vue = _vue
  this.el.addEventListener('click', this.back.bind(this), false)
}

BackEffect.prototype.back = function () {
  this._vue.$router.go(this.value)
}
