class FillEffect {
    constructor(ctx, x, y, color, maxRadius) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.currentRadius = 0;
        this.maxRadius = maxRadius + 20;
        this.color = color;
    }
    draw() {
        if (this.currentRadius < this.maxRadius) {
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
            this.currentRadius += 20;
            window.requestAnimationFrame(this.draw.bind(this));
        } else {
            this.currentRadius = 0;
        }
    }
}