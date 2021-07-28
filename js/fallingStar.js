class FallingStar {
    constructor(canvas, ctx, x, y) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
		this.speedX = 3;
		this.speedY = 3;
        this.count = 0;
    }
    draw() {
        this.count++;
        this.x -= this.speedX
        this.y += this.speedY;
        let height = this.canvas.clientHeight;
        if (this.x < 0 || this.y >= height) return;
        if (this.count === 1) {
            this.shape();
            return;
        }
        for (let i = 1; i < this.count; i+=5) {
			if(i >= 30)
				break;
			let x = this.x + (this.speedX * (i + 3));
			let y = this.y - (this.speedY * (i + 3));
			this.drawTail(x, y, Math.floor((30-i) * 0.01));
		}
		this.shape();
    }
    shape() {
        this.drawStar(5, 10, 5);
		this.drawTwinkle(10);
    }
    drawTail(x, y, radius) {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fill();
    }
	drawTwinkle(radius){
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
		//Math.floor(Math.random() * 5)
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,.1)';
        ctx.fill();
	}
    drawStar(spikes, outerRadius, innerRadius) {
        // https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
        let rot = (Math.PI / 2) * 3;
        let cx = this.x;
        let cy = this.y;
        let step = Math.PI / spikes;
        let ctx = this.ctx;

        let x = cx;
        let y = cy;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255,255,255,.1)';
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fill();
    }
}