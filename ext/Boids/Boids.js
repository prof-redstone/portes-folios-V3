var canvas;
var ctx;
canvas = document.getElementById("boids");
ctx = canvas.getContext("2d");

var boidsCol = [];

var Rdist = 70;
var PI = 3.14159265358979323846;

function setup() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    H = ctx.canvas.height;
    W = ctx.canvas.width;
    for (let i = 0; i < 100; i++) {
        boidsCol[i] = new Boid(nb_random(0, W), nb_random(0, H), nb_random(0, 50), 2);
    }

    setInterval(loop, 30)
}



function loop() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#EEE';

    for (let i = 0; i < boidsCol.length; i++) {
        boidsCol[i].draw();
        boidsCol[i].update();

        boidsCol[i].move();
    }
}

function Boid(x, y, a, s) {
    this.x = x;
    this.y = y;
    this.a = a; //angle
    this.s = s; //speed

    this.update = function() {
        let angleCorrect = 0;//angle de correction pour la prochaine frame
        let cohesionAngle = 0;
        //somme des angles des boids, puis on tourne pour s'en raprocher.
        let nbVision = 0; //nombre de boids dans la vision
        let averagePos = [0, 0]; //somme des positions des boids dans la vision

        for (let i = 0; i < boidsCol.length; i++) {
            dist = Math.sqrt((this.x - boidsCol[i].x) ** 2 + (this.y - boidsCol[i].y) ** 2);

            if (dist != 0 && dist < Rdist) { //si on est proche d'un autre boid

                nbVision++;

                if (Math.sin(this.a - boidsCol[i].a) > 0) { //truc relou, mais pour trouver le sens le plus court pour tourner et arriver sur l'angle
                    angleCorrect -= 1 / dist;
                } else {
                    angleCorrect += 1 / dist;
                }

                averagePos[0] += boidsCol[i].x;
                averagePos[1] += boidsCol[i].y;
            }
        }
        if (nbVision != 0) {
            angleCorrect /= nbVision;

            averagePos[0] /= nbVision;
            averagePos[1] /= nbVision;

            if ((averagePos[0] - this.x) != 0 && (averagePos[1] - this.y) != 0) {
                cohesionAngle = angleBTWvector(0, 1, averagePos[0] - this.x, averagePos[1] - this.y);
            }
            
        }

        //force pour tourner face au wall.
        if (Math.sin(this.a - avoidWall(this.x, this.y, this.a)) > 0.1) { //truc relou, mais pour trouver le sens le plus court pour tourner et arriver sur l'angle
            angleCorrect -= 1 * 0.3
        } else if (Math.sin(this.a - avoidWall(this.x, this.y, this.a)) < -0.1) {
            angleCorrect += 1 * 0.3
        }

        this.a += angleCorrect * 1; //0.2 pour le delta time
        //console.log(this.a)
        this.a += cohesionAngle * 0.01;
    }

    this.move = function() {
        this.x += Math.cos(this.a) * this.s;
        this.y += Math.sin(this.a) * this.s;
        //this.x = modul(this.x, 0, W);
        //this.y = modul(this.y, 0, H);
    }

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

setup()

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getAngle(a) { //modulo 2pi
    while (a > 2 * PI) {
        a -= 2 * PI;
    }
    while (a <= 0) {
        a += 2 * PI;
    }
    return a;
}

function modul(x, a, b) {
    while (x > b) {
        x -= b;
    }
    while (x <= a) {
        x += b;
    }
    return x;
}

function avoidWall(x, y, angle) {
    const walldist = 40;
    var a = 0;
    var b = 0;
    if (x < walldist) {
        a = -1
    }
    if (x > W - walldist) {
        a = 1
    }
    if (y < walldist) {
        b = -1
    }
    if (y > H - walldist) {
        b = 1
    }

    if (a == 0 && b == 0) {
        return undefined
    }
    if (a == -1 && b == 0) {
        return 0
    }
    if (a == 1 && b == 0) {
        return PI
    }
    if (a == 0 && b == 1) {
        return -PI / 2
    }
    if (a == 0 && b == -1) {
        return PI / 2
    }

    if (a == -1 && b == 1) {
        return -PI / 4
    }
    if (a == -1 && b == -1) {
        return PI / 4
    }

    if (a == 1 && b == 1) {
        return -PI * 3 / 4
    }
    if (a == 1 && b == -1) {
        return PI * 3 / 4
    }

}

function angleBTWvector(xa, ya, xb, yb) {
    let angle = Math.acos((xa * xb + ya * yb) / (Math.sqrt(xa * xa + ya * ya) * Math.sqrt(xb * xb + yb * yb)));
    if (ya * xb - xa * yb < 0) {
        angle = 2 * PI - angle;
    }
    return angle;
}