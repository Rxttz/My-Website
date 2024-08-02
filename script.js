const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight;

let lines = [];
const colors = ['#FFFFFf', '#000000', '#FFFFFf', '#000000', '#FFFFFF'];

class Line {
    constructor(x, length, dy, color) {
        this.x = x;
        this.y = Math.random() * canvas.height - length;
        this.length = length;
        this.dy = dy;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.y += this.dy;

        if (this.y > canvas.height) {
            this.y = -this.length;
        }

        this.draw();
    }
}

function init() {
    lines = [];
    for (let i = 0; i < 100; i++) {
        const length = Math.random() * 50 + 50;
        const x = Math.random() * canvas.width;
        const dy = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        lines.push(new Line(x, length, dy, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(line => line.update());
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
    init();
});
