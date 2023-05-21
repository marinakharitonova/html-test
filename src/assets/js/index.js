// import { gsap } from 'gsap';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

// global.gsap = gsap;

// gsap.defaults({
// 	overwrite: 'auto',
// });

class CartCalculator {
	constructor() {
		this.subtotal = 0;
		this.tax = 100;
		this.shipping = 150;
		this.total = 0;

		this.cartList = document.querySelector('.main__cart-list');
		this.totalElement = document.getElementById('total');
		this.subtotalElement = document.getElementById('subtotal');

		this.cartList.addEventListener('click', this.handleCartListClick.bind(this));
		if (module.hot) {
			module.hot.dispose(() => {
				this.cartList.removeEventListener('click', this.handleCartListClick.bind(this));
			});
		}
	}

	handleCartListClick(e) {
		const addCounterBtn = e.target.closest('.counter__button_add');
		const subtractCounterButton = e.target.closest('.counter__button_subtract');
		const deleteButton = e.target.closest('.cart-item__close');

		if (addCounterBtn) {
			const input = addCounterBtn.previousElementSibling;
			input.value = +input.value + 1;
		} else if (subtractCounterButton) {
			const input = subtractCounterButton.nextElementSibling;
			if (input.value > 1) {
				input.value = input.value - 1;
			} else if (Number(input.value) === 1) {
				const parentNode = subtractCounterButton.parentNode.parentNode.parentNode.parentNode;

				this.deleteFromCart(parentNode);
			}
		} else if (deleteButton) {
			this.deleteFromCart(deleteButton.parentNode);
		}

		if (addCounterBtn || subtractCounterButton || deleteButton) {
			this.calculateTotal();
			this.setTotal();
		}
	}

	deleteFromCart(node) {
		this.cartList.removeChild(node);
	}

	calculateTotal() {
		this.subtotal = 0;
		this.total = 0;

		for (const elem of document.querySelectorAll('.cart-item')) {
			const count = Number(elem.querySelector('.counter__input').value);
			const price = Number(elem.querySelector('.cart-item__price').innerText);

			this.subtotal += count * price;
		}

		this.total = this.subtotal + this.tax + this.shipping;
	}

	setTotal() {
		this.totalElement.innerText = this.formatNumber(this.total);
		this.subtotalElement.innerText = this.formatNumber(this.subtotal);
	}

	formatNumber(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}
}

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			// Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');

			const cartCalculator = new CartCalculator();
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}
