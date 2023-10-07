var canvas;
var ctx;
var H;
var W;
var mX;
var mY;
var time = 0;
var pi = 3.14159265;
var minX;
var maxX;
var minY;
var maxY;
var cenX = 0;
var cenY = 0;

function setup() {
    canvas = document.getElementById("chaosFractal")
    ctx = canvas.getContext("2d");
    let size = Math.min(window.innerWidth, window.innerHeight);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;
    
    noise.seed(Math.random() * 100); //init de perlin noise
    setInterval(loop, 20);
}

function loop() {
    ctx.fillStyle = "rgb(191, 215, 234)"; //for bg
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgb(54, 53, 55)"; //for point
    minX = 0;
    maxX = 0;
    minY = 0;
    maxY = 0;
    for (let i = 0; i < 19683; i++) {
        plot(i)
    }
    cenX = (maxX + minX)/2
    cenY = (maxY + minY)/2
    time++
}

function plot(n) {
    let pt = new point();
    pt.init(0, 0);
    for (let i = 0; i < 9; i++) {
        let rep = Math.floor(n / (3 ** i)) % 3
        if (rep == 0) {
            pt.sh1()
        } else if (rep == 1) {
            pt.sh2()
        } else if (rep == 2) {
            pt.sh3()
        }
    }
    if(pt.x > maxX) maxX = pt.x
    if(pt.x < minX) minX = pt.x
    if(pt.y > maxY) maxY = pt.y
    if(pt.y < minY) minY = pt.y
    dot(pt.x, pt.y)
}

function point() {
    this.x;
    this.y;

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

    this.sh1 = function() {
        this.scale(map(noiseInd(0),0.6,0.9));
        this.rot(map(noiseInd(1),0,2*pi));
        this.trans(map(noiseInd(2),-200,200), map(noiseInd(3),-200,200))
    }

    this.sh2 = function() {
        this.scale(map(noiseInd(4),0.6,0.9));
        this.rot(map(noiseInd(5),0,2*pi));
        this.trans(map(noiseInd(6),-200,200),map(noiseInd(7),-200,200))
    }

    this.sh3 = function() {
        this.scale(map(noiseInd(8),0.6,0.9));
        this.rot(map(noiseInd(9),0,2*pi));
        this.trans(map(noiseInd(10),-200,200),map(noiseInd(11),-200,200))
    }
}

function map(x,a,b){
    return a + (b-a)*x
}

function dot(x, y) {
    ctx.beginPath()
    ctx.rect(x + W / 2 - cenX, H / 2 - y + cenY, 2, 2);
    ctx.closePath()
    ctx.fill()
}

function MouseMove(e) {
    mX = e.clientX - W / 2;
    mY = H / 2 - e.clientY;
}

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function noiseInd(index){
    return noise.perlin2(time/200, index*10);
}

setup()