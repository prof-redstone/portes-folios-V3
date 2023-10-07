//NEW VERSION IN P5JS FOLDER
var canvas;
var ctx;
var H;
var W;
var mX;
var mY;
var mouseDown = 0;
var time = 0;
var pi = 3.14159265;
var cenX;
var cenY;

var param = [
    [0.4, 0, -200, 0],
    [0.4, 1, 0, -200],
    [0.4, 0, 200, 0],
    [0.4, 0, 0, 200],
]

function setup() {
    canvas = document.getElementById("chaosFractal")
    ctx = canvas.getContext("2d");
    let size = Math.min(window.innerWidth, window.innerHeight);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;
    cenX = W / 2;
    cenY = H / 2;

    noise.seed(0); //init de perlin noise
    setInterval(loop, 30);
}

function loop() {
    ctx.clearRect(0, 0, W, H);
    move()
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < (param.length ** j); i++) {
            plot(i, j)
        }
    }
    time++
}

function plot(n, e) {
    let size = 143;
    let pt1 = new point(-size, -size);
    let pt2 = new point(-size, size);
    let pt3 = new point(size, size);
    let pt4 = new point(size, -size);

    for (let i = 0; i < e; i++) {
        let rep = Math.floor(n / (param.length ** i)) % param.length
        pt1.sh(rep)
        pt2.sh(rep)
        pt3.sh(rep)
        pt4.sh(rep)
    }

    if (e == 0) {
        ctx.fillStyle = "#F00"
    } else if (e == 1) {
        ctx.fillStyle = "#0F0"
    } else {
        ctx.fillStyle = "#00F"
    }

    ctx.beginPath()
    ctx.moveTo(pt1.x + cenX, pt1.y + cenY)
    ctx.lineTo(pt2.x + cenX, pt2.y + cenY)
    ctx.lineTo(pt3.x + cenX, pt3.y + cenY)
    ctx.lineTo(pt4.x + cenX, pt4.y + cenY)
    ctx.fill()
}

function point(x, y) {
    this.x = x;
    this.y = y;

    this.init = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.rot = function(a) {
        const newX = this.x * Math.cos(a) - this.y * Math.sin(a);
        const newY = this.x * Math.sin(a) + this.y * Math.cos(a);
        this.x = newX;
        this.y = newY;
    }

    this.scale = function(a) {
        this.x *= a;
        this.y *= a;
    }

    this.trans = function(a, b) {
        this.x += a;
        this.y += b;
    }

    this.sh = function(i) {
        this.scale(param[i][0]);
        this.rot(param[i][1]);
        this.trans(param[i][2], param[i][3])
    }

    this.sh1 = function() {
        this.scale(map(noiseInd(0), 0.6, 0.9));
        this.rot(map(noiseInd(1), 0, 2 * pi));
        this.trans(map(noiseInd(2), -200, 200), map(noiseInd(3), -200, 200))
    }

    this.sh2 = function() {
        this.scale(map(noiseInd(4), 0.6, 0.9));
        this.rot(map(noiseInd(5), 0, 2 * pi));
        this.trans(map(noiseInd(6), -200, 200), map(noiseInd(7), -200, 200))
    }

    this.sh3 = function() {
        this.scale(map(noiseInd(8), 0.6, 0.9));
        this.rot(map(noiseInd(9), 0, 2 * pi));
        this.trans(map(noiseInd(10), -200, 200), map(noiseInd(11), -200, 200))
    }
}

function move() {
    let grabDist = 50
    for (let i = 0; i < param.length; i++) {
        if (len(param[i][2], param[i][3], mX, mY) < grabDist) {
            if (mouseDown) {
                param[i][2] = mX;
                param[i][3] = mY;
                break;
            }
        }
    }
}

function map(x, a, b) {
    return a + (b - a) * x
}

function dot(x, y) {
    ctx.beginPath()
    ctx.rect(x + W / 2, H / 2 - y, 2, 2)
    ctx.fill()
}

function square(a, b, c, d) {
    ctx.rect()
}

function MouseMove(e) {
    mX = e.clientX - W / 2;
    mY = e.clientY - H / 2;
}

document.body.onmousedown = function() {
    ++mouseDown;
}
document.body.onmouseup = function() {
    --mouseDown;
}
window.addEventListener('keydown', function(e) {
    console.log(e.key)
}, false);

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function noiseInd(index) {
    return noise.perlin2(time / 200, index * 10);
}

function len(a, b, c, d) {
    return Math.sqrt((a - c) ** 2 + (b - d) ** 2);
}

setup()