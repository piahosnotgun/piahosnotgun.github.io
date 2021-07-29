class Intro {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.stars = []; // FallingStar[]
        this.draw();
        this.pause = false;
        setInterval(this.spawnStar.bind(this), 500);
    }
    handleClick(event) {
        let x = event.clientX;
        let y = event.clientY;
        let pos = this.getMousePosition(x, y);
        x = pos[0];
        y = pos[1];
        this.stars.push(new FallingStar(this.canvas, this.ctx, x, y));
    }
    spawnStar() {
        if (this.pause) return;
        let width = this.canvas.width;
        let height = this.canvas.height;
        let randX = Math.floor(Math.random() * (width + 1));
        let randY = Math.floor(Math.random() * (height / 2 + 1));
        this.stars.push(new FallingStar(this.canvas, this.ctx, randX, randY));
    }
    getMousePosition(x, y) {
        var cRect = this.canvas.getBoundingClientRect();
        var canvasX = Math.round(x - cRect.left);
        var canvasY = Math.round(y - cRect.top);
        return [canvasX, canvasY];
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];
			if(typeof star === 'undefined')
				continue;
            if (star.isValid()) {
                star.draw();
            } else {
				delete this.stars[i];
			}
        }
        window.requestAnimationFrame(this.draw.bind(this));
    }

    resize() {
        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;
        let pixelRatio = window.devicePixelRatio;
        this.canvas.width = width * pixelRatio;
        this.canvas.height = height * pixelRatio;
        this.ctx.scale(pixelRatio, pixelRatio);
    }
}

window.onload = function () {
    let canvas = document.getElementById('intro-canvas');
    let ctx = canvas.getContext('2d');
    let intro = new Intro(canvas, ctx);
    let title = document.getElementById('tcontainer');
    canvas.onclick = intro.handleClick.bind(intro);
    title.onclick = intro.handleClick.bind(intro);
    window.addEventListener('resize', intro.resize.bind(intro), {
        once: false,
        passive: false,
        capture: false,
    });
    document.addEventListener('visibilitychange', (event) => {
        if (document.visibilityState == 'visible') {
            intro.pause = false;
        } else {
            intro.pause = true;
        }
    });
    intro.resize();
};