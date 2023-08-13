var canvas;
var ctx;
var w;
var h;

var size = 150;
var midPoint = 0.25 - 0.1
var shift = 0.5 - 0.2;

var time = 600


function setup() { //fonction de setup executer 1 fois 
    canvas = document.getElementById("starPattern");
    ctx = canvas.getContext("2d")

    body = document.getElementsByTagName('html')[0];
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    w = canvas.width
    h = canvas.height
    ctx.lineCap = "round"

    setInterval(draw, 20);
}

function draw() {

    ctx.fillStyle = "#656d4a"
    ctx.fillRect(0, 0, w, h)

    shift = (Math.sin(time / 100) / 2)
    midPoint = (Math.sin(time / 1000) / 1.5)

    ctx.lineWidth = 7
    ctx.strokeStyle = "#c2c5aa"
    path()
    ctx.lineWidth = 4
    ctx.strokeStyle = "#936639"
    path()

    time++
}


function path() {
    for (let i = -1; i < w / size ; i++) {
        for (let j = -1; j < h / size ; j++) {
            let xo = i * size;
            let yo = j * size;
            ctx.beginPath()
            ctx.moveTo(xo + shift * size, yo)
            ctx.lineTo(xo + (1 - midPoint) * size, yo + midPoint * size)
            ctx.lineTo(xo + size, yo + (size * (1 - shift)))

            ctx.moveTo(xo + (1 - shift) * size, yo)
            ctx.lineTo(xo + (midPoint) * size, yo + midPoint * size)
            ctx.lineTo(xo, yo + (size * (1 - shift)))

            ctx.moveTo(xo + shift * size, yo + size)
            ctx.lineTo(xo + (1 - midPoint) * size, yo + (1 - midPoint) * size)
            ctx.lineTo(xo + size, yo + (size * (shift)))

            ctx.moveTo(xo + (1 - shift) * size, yo + size)
            ctx.lineTo(xo + (midPoint) * size, yo + (1 - midPoint) * size)
            ctx.lineTo(xo, yo + (size * (shift)))

            ctx.stroke();
        }
    }
}

setup()