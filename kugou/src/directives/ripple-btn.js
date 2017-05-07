function RippleEffect(element, id) {
	this.id = id;
	this.element = element;
	this.element.addEventListener('click', this.run.bind(this), false);
}
RippleEffect.prototype = {
	run: function(event) {
		var ripplerContainer = this.element.querySelector('.ripple-container');
		var offsetInfo = this.element.getBoundingClientRect();
		console.log(offsetInfo)
		if (ripplerContainer) {
			ripplerContainer.remove();
		}
		let currentNode = event.target
		let scrollTarget = window;
		while (currentNode && currentNode.tagName !== 'HTML' &&
			currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
			let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
			if (overflowY === 'scroll' || overflowY === 'auto') {
				scrollTarget = currentNode;
				currentNode = null;
			} else {
				currentNode = currentNode.parentNode;
			}
		}
		let scrollTop = scrollTarget.scrollTarget || 0;
		var rippleContainer = document.createElement('div');
		rippleContainer.style.position = 'fixed';
		rippleContainer.style.zIndex = 99;
		rippleContainer.style.width = offsetInfo.width + 'px';
		rippleContainer.style.left = offsetInfo.left + 'px';
		rippleContainer.style.top = offsetInfo.top + 'px';
		rippleContainer.style.height = offsetInfo.height + scrollTop + 'px';
		rippleContainer.className = 'ripple-container';
		rippleContainer.style.overflow = 'hidden';
		if (!this.id) {
			console.log(2);
			this.element.appendChild(rippleContainer);
		} else {
			console.log(1);
			document.getElementById(this.id).appendChild(rippleContainer)
		}
		var circleD = offsetInfo.width * 2;

		var ripple = document.createElement('div');
		ripple.style.position = 'absolute';
		ripple.style.width = circleD + 'px';
		ripple.style.height = circleD + 'px';
		ripple.style.borderRadius = '500px';
		ripple.style.left = ((event.pageX - offsetInfo.left) - circleD / 2) + 'px';
		ripple.style.top = ((event.pageY - offsetInfo.top) - circleD / 2) + 'px';
		ripple.className = 'ripple';
		rippleContainer.appendChild(ripple);
		ripple.addEventListener('animationend', function() {
			rippleContainer.remove();
		}.bind(this), false);
	}
}

export default {
	name: 'rippleBtn',
	bind(el, binding) {
		console.log(binding.value);
		new RippleEffect(el, binding.value);
	}
}