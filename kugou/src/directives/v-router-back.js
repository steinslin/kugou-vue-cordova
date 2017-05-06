export default {
	name: 'vBack',
	bind(el, binding, vnode) {
		let value = binding.value || -1;
		new backEffect(el, value, vnode.componentInstance);
	}
}

function backEffect(el, value, _vue) {
	this.el = el;
	this.value = value;
	this._vue = _vue;
	this.el.addEventListener('click', this.back.bind(this), false);

}

backEffect.prototype.back = function() {
	this._vue.$router.go(this.value)
}