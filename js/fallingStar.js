class FallingStar {
    constructor(canvas, ctx, x, y) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
		this.speedX = 4;
		this.speedY = 3;
        this.count = 0;
;    }
    draw() {
        this.count++;
        this.x -= this.speedX
        this.y += this.speedY;
        let height = this.canvas.clientHeight;
        for (let i = 1; i < this.count; i+=1) {
			if(i > 30)
				break;
			let startX = this.x + (this.speedX * (i));
			let startY = this.y - (this.speedY * (i));
			let length = Math.min(30, this.count);
			let endX = startX + (this.speedX * (length-i));
			let endY = startY - (this.speedY * (length-i));
			this.drawTail(startX, startY, endX, endY, ((30 - i) / 60) / 2);
		}
		this.shape();
    }
	isValid() {
		let endX = this.x + (this.speedX * 30);
		let endY = this.y - (this.speedY * 30);
        return ! (endX < 0 || endY >= this.canvas.clientHeight);
	}
    shape() {
        this.drawStar(4, 8, 2);
		this.drawTwinkle(10);
    }
	drawTail(x, y, toX, toY, opacity){
		let ctx = this.ctx;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(toX, toY);
		ctx.closePath();
		ctx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
		ctx.lineWidth = 1;
		ctx.stroke();
	}
    // drawTail(x, y, radius) {
    //     let ctx = this.ctx;
    //     ctx.beginPath();
    //     ctx.moveTo(x, y);
    //     ctx.arc(x, y, radius, 0, Math.PI * 2);
    //     ctx.closePath();
    //     ctx.fillStyle = 'rgba(255, 255, 255,1)';
    //     ctx.fill();
    // }
	drawTwinkle(radius){
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
		//Math.floor(Math.random() * 5)
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, .1)';
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
        ctx.strokeStyle = 'rgba(255, 255, 255,.1)';
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 255, 255,1)';
        ctx.fill();
    }
}