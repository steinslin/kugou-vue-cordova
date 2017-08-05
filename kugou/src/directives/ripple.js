function RippleEffect (element) {
  this.element = element
  this.element.addEventListener('click', this.run.bind(this), false)
}
RippleEffect.prototype = {
  run: function (event) {
    var offsetInfo = this.element.getBoundingClientRect()
    var circleD = Math.min(offsetInfo.width * 2 - 16, 55)
    circleD = Math.max(circleD, 40)

    let rippler = this.element.querySelector('.ripple')
    if (rippler) {
      rippler.remove()
    }
    let currentNode = event.target
    while (currentNode && currentNode.tagName !== 'HTML' &&
      currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
      let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
      if (overflowY === 'scroll' || overflowY === 'auto') {
        currentNode = null
      } else {
        currentNode = currentNode.parentNode
      }
    }
    var ripple = document.createElement('div')
    ripple.style.position = 'absolute'
    ripple.style.width = circleD + 'px'
    ripple.style.height = circleD + 'px'
    ripple.style.borderRadius = '500px'
    var x = event.pageX || event.touches[0].pageX
    var y = event.pageY || event.touches[0].pageY
    ripple.style.left = ((x - offsetInfo.left) - circleD / 2) + 'px'
    ripple.style.top = ((y - offsetInfo.top) - circleD / 2) + 'px'
    ripple.className = 'ripple-circle'
    this.element.appendChild(ripple)
    ripple.addEventListener('animationend', function () {
      let rippler = this.element.querySelector('.ripple-circle')
      if (rippler) {
        rippler.remove()
      }
    }.bind(this), false)
  }
}

/* eslint-disable no-new */
export default {
  name: 'ripple',
  bind (el) {
    new RippleEffect(el)
  }
}
