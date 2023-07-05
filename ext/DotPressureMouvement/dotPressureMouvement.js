var canvas;
var ctx;

var nbDot = 1000;
var dotCol = [];
var dt = 0.01;


function setup() {
    canvas = document.getElementById("DPM")
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;


    for (let i = 0; i < nbDot; i++) {
        dotCol[i] = new Dot(W / 2 + Math.random()*20, H / 2 + Math.random()*20);
    }

    setInterval(loop, 50);
}


function loop() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, W, H);

    let nbMove = 10;
    for (let i = 0; i < nbMove; i++) {
        Move();
    }

    ctx.fillStyle = "#FFF";
    for (let i = 0; i < nbDot; i++) {
        ctx.beginPath();
        ctx.arc(dotCol[i].x, dotCol[i].y, dotCol[i].r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function Move() {
    for (let i = 0; i < nbDot; i++) {
        let somX = 0;
        let somY = 0;
        for (let j = 0; j < nbDot; j++) {
            if (j != i) {
                let distance = Math.sqrt(
                    Math.pow(dotCol[i].lx - dotCol[j].lx, 2) + Math.pow(dotCol[i].ly - dotCol[j].ly, 2)
                );
                if (distance < 200) {
                    const force = dotCol[i].repForce / (distance**2);
                    const dx = dotCol[i].lx - dotCol[j].lx;
                    const dy = dotCol[i].ly - dotCol[j].ly;
                    somX += dx * force;
                    somY += dy * force;
                }
            }
        }
        dotCol[i].x += somX * dt;
        dotCol[i].y += somY * dt;
        limitMargin = 50;


        if (dotCol[i].x < limitMargin) {
            dotCol[i].x += Math.abs(dotCol[i].x - limitMargin) * 0.1; // Réduire la vitesse du point en fonction de sa distance à la limite
        } else if (dotCol[i].x > W - limitMargin) {
            dotCol[i].x -= Math.abs(dotCol[i].x - (W - limitMargin)) * 0.1; // Réduire la vitesse du point en fonction de sa distance à la limite
        }

        if (dotCol[i].y < limitMargin) {
            dotCol[i].y += Math.abs(dotCol[i].y - limitMargin) * 0.1; // Réduire la vitesse du point en fonction de sa distance à la limite
        } else if (dotCol[i].y > H - limitMargin) {
            dotCol[i].y -= Math.abs(dotCol[i].y - (H - limitMargin)) * 0.1; // Réduire la vitesse du point en fonction de sa distance à la limite
        }
    }
    for (let i = 0; i < nbDot; i++) {
        dotCol[i].lx = dotCol[i].x
        dotCol[i].ly = dotCol[i].y
    }
}

function Dot(x, y) {
    this.x = x;
    this.y = y;
    this.lx = x;
    this.ly = y;
    this.r = 2;
    this.repForce = 500;

    this.move = function() {

    }

}



setup()