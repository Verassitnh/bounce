class Bounce {
	constructor() {
		this.canvas = document.querySelector('#bounce-canvas');
		this.canvas.height = screen.height;
		this.canvas.width = screen.width;
		this.ctx = this.canvas.getContext('2d');
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.layers = {
			actionBar: {
				height: 50,
				background: '#fffddd',
				hidden: false,
				shadow: this.shadow(0, 4, 5, this.rgba(0, 0, 0, 0.5)),
			},
			onAction: {

			},
			page: {
				background: '#00ffff',
				hidden: false,
				shadow: this.shadow('none'),
			},
			onPage: {

			}
		}
		this.update();
	}

	

	update() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.createActionBar(this.layers.actionBar);
		this.createPage(this.layers.page);
	}

	createActionBar({ height, background, hidden }) {
		if (!hidden) {
			this.ctx.fillStyle = background;
			this.ctx.fillRect(0, 0, this.width, height);
		}
	}
	createPage({ background, hidden }) {
		if (!hidden) {
			let actionBarHeight = this.layers.actionBar.height;
			this.ctx.fillStyle = background;
			this.ctx.fillRect(0, actionBarHeight, this.width, this.height - actionBarHeight);
		}
	}


	shadow(x, y, blur, color) {
		if (x != 'none') return { x, y, blur, color };
		else return { x: 0, y: 0, blur: 0, color: 'rgba(0, 0, 0, 0)' };
	}
	rgba(red, green, blue, alpha) {
		return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
	}
}