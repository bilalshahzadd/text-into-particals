// selected HTML elements
const canvas = document.getElementById('my-canvas-one');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 2;
let adjustY = 5;

// handle mouse
let mouse = {
    x: null,
    y: null,
    radius: 100
}

// adding events
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

// ctx styles
ctx.fillStyle = '#F9C011';
ctx.font = '20px Verdana';
ctx.fillText('#MADBEE', 0, 30);
const text = ctx.getImageData(0, 0, 100, 100);

// class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40 + 5);
    }

    // draw the pattern
    draw() {
        ctx.fillStyle = '#F9C011';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 4);
        ctx.closePath();
        ctx.fill();
    }

    // mouse moving function
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}
console.log(text);

// function to push value into the particleArray
function init() {
    particleArray = [];
    for (let y = 0, y2 = text.height; y < y2; y++) {
        for (let x = 0, x2 = text.width; x < x2; x++) {
            if (text.data[(y * 4 * text.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 13, positionY * 13));
            }
        }
    }
}
init();

// animation here
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 612; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();