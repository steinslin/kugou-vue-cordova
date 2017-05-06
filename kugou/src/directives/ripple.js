function RippleEffect(element) {
	this.element = element;
	this.element.addEventListener('click', this.run.bind(this), false);
}
RippleEffect.prototype = {
	run: function(event) {
		var offsetInfo = this.element.getBoundingClientRect();
		var circleD = Math.min(offsetInfo.width * 2 - 16, 55);
		circleD = Math.max(circleD, 40);

		let rippler = this.element.querySelector('.ripple');
		if (rippler) {
			rippler.remove();
		}
		var ripple = document.createElement('div');
		ripple.style.position = 'absolute';
		ripple.style.width = circleD + 'px';
		ripple.style.height = circleD + 'px';
		ripple.style.borderRadius = '500px';
		ripple.style.left = ((event.pageX - offsetInfo.left) - circleD / 2) + 'px';
		ripple.style.top = ((event.pageY - offsetInfo.top) - circleD / 2) + 'px';
		ripple.className = 'ripple';
		this.element.appendChild(ripple);
		ripple.addEventListener('animationend', function() {
			let rippler = this.element.querySelector('.ripple');
			if (rippler) {
				rippler.remove();
			}
		}.bind(this), false);
	}
}

export default {
	name: 'ripple',
	bind(el) {
		new RippleEffect(el);
	}
}