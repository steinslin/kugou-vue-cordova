function RippleEffect (element, id) {
  this.id = id
  this.element = element
  this.element.addEventListener('click', this.run.bind(this), false)
}
RippleEffect.prototype = {
  run: function (event) {
    var ripplerContainer = this.element.querySelector('.ripple-container')
    var offsetInfo = this.element.getBoundingClientRect()
    console.log(offsetInfo)
    if (ripplerContainer) {
      ripplerContainer.remove()
    }
    let currentNode = event.target
    let scrollTarget = window
    while (currentNode && currentNode.tagName !== 'HTML' &&
      currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
      let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
      if (overflowY === 'scroll' || overflowY === 'auto') {
        scrollTarget = currentNode
        currentNode = null
      } else {
        currentNode = currentNode.parentNode
      }
    }
    let scrollTop = scrollTarget.scrollTarget || 0
    var rippleContainer = document.createElement('div')
    let currentStyle = this.element.currentStyle ? this.element.currentStyle : document.defaultView.getComputedStyle(this.element, null)
    rippleContainer.style.borderRadius = currentStyle.borderRadius
    rippleContainer.style.position = 'fixed'
    rippleContainer.style.zIndex = 99
    rippleContainer.style.width = offsetInfo.width + 'px'
    rippleContainer.style.left = offsetInfo.left + 'px'
    rippleContainer.style.top = offsetInfo.top + 'px'
    rippleContainer.style.height = Math.ceil(offsetInfo.height + scrollTop) + 'px'
    rippleContainer.className = 'ripple-container'
    rippleContainer.style.overflow = 'hidden'
    if (!this.id) {
      this.element.appendChild(rippleContainer)
    } else {
      document.getElementById(this.id).appendChild(rippleContainer)
    }
    var circleD = offsetInfo.width * 2

    var ripple = document.createElement('div')
    ripple.style.position = 'absolute'
    ripple.style.width = circleD + 'px'
    ripple.style.height = circleD + 'px'
    ripple.style.borderRadius = '500px'
    var x = event.pageX || event.touches[0].pageX
    var y = event.pageY || event.touches[0].pageY
    ripple.style.left = ((x - offsetInfo.left) - circleD / 2) + 'px'
    ripple.style.top = ((y - offsetInfo.top) - circleD / 2) + 'px'
    ripple.className = 'ripple'
    rippleContainer.appendChild(ripple)
    ripple.addEventListener('animationend', function () {
      rippleContainer.remove()
    }, false)
  }
}

export default {
  name: 'rippleBtn',
  bind (el, binding) {
    /* eslint-disable no-new */
    new RippleEffect(el, binding.value)
  }
}
