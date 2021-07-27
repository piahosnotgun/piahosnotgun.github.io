let ctx = null;
let canvas = null;

let title = null;
let subtitle = null;

let stageWidth = 0;
let stageHeight = 0;

let currentColor = 0;

let isOnAnimate = false;

window.onload = () => {
    canvas = document.getElementById('intro-canvas');
    title = document.getElementById('title-text');
    subtitle = document.getElementById('subtitle-text');

    titleContainer = document.getElementById('tcontainer');

    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize, {
        once: false,
        passive: false,
        capture: false,
    });
    canvas.addEventListener('click', handleClick);
    titleContainer.addEventListener('click', handleClick);
};
function handleClick(event) {
    let x = event.clientX;
    let y = event.clientY;
    let pos = getMousePosition(x, y);
    x = pos[0];
    y = pos[1];
    let fillEffect = new FillEffect(ctx, x, y, getNextColor(), getFillRadius(x, y));
	let color = getNextColor();
	getNextColor();
	title.setAttribute('style', 'color: ' + color);
	subtitle.setAttribute('style', 'color: ' + color);
    window.requestAnimationFrame(fillEffect.draw.bind(fillEffect));
}
function getMousePosition(x, y) {
    var cRect = canvas.getBoundingClientRect();
    var canvasX = Math.round(x - cRect.left);
    var canvasY = Math.round(y - cRect.top);
    return [canvasX, canvasY];
}
function resize() {
    stageWidth = canvas.clientWidth;
    stageHeight = canvas.clientHeight;
    let pixelRatio = window.devicePixelRatio;
    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
}
function getFillRadius(x, y) {
    var w = Math.max(x - 0, stageWidth - x);
    var h = Math.max(y - 0, stageHeight - y);
    return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
}
function getNextColor() {
    let colors = [
		'rgba(255,255,255,1)',
		'rgba(0, 0, 0, 1)'
    ];
    if (++currentColor >= colors.length) {
        currentColor = 0;
    }
    return colors[currentColor];
}