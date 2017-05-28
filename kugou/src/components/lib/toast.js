export default class Toast {
	constructor({
		delay = 1800,
		icon,
		image,
		text,
		position = 'center'
	}) {
		this.config = {
			delay,
			icon,
			image,
			text,
			position
		}
	}
	show() {
		let el = document.createElement('div');
		el.innerHTML = this.config.text;

	}
}