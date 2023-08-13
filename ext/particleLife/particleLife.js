var canvas;
var ctx;
var w;
var h;

const dlt = 0.002; //delta time btw each frame


var nbParticle = 1500;
var particles = [];
var rayon = 2;
var nbCol = 5;
var interaction = [];

var rmin = 15;
var rmax = 50;


function setup() { //fonction de setup executer 1 fois 
    canvas = document.getElementById("particleLife");
    ctx = canvas.getContext("2d");

    body = document.getElementsByTagName('html')[0];
    canvas.height = body.clientHeight;
    canvas.width = body.clientWidth;
    w = canvas.width
    h = canvas.height
    ctx.fillStyle = "#111";
    ctx.strokeStyle = "#EEE"

    init(5)

    setInterval(draw, 20);
}

function init(nbdiff) {
    nbCol = nbdiff;
    interaction = [];
    for (let i = 0; i < nbParticle; i++) {
        particles[i] = new Particle(i);
        particles[i].init(nb_random(0, w), nb_random(0, h), i)
        particles[i].sy = nb_random(-10, 10) * 10
        particles[i].sx = nb_random(-10, 10) * 10
        particles[i].color = nb_random(0, nbCol - 1);
    }

    for (let i = 0; i < nbCol; i++) {
        interaction[i] = []
        for (let j = 0; j < nbCol; j++) {
            interaction[i][j] = nb_random(-100, 100) / 100
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = "#111"
    ctx.fillRect(0, 0, w, h)
    ctx.beginPath()

    for (let i = 0; i < nbParticle; i++) {
        particles[i].Force();
    }

    for (let i = 0; i < nbParticle; i++) {
        particles[i].update();
    }

    for (let i = 0; i < nbParticle; i++) {

        //particles[i].update();
        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, rayon, 0, 2 * 3.1415);

        ctx.fillStyle = colorWheel(particles[i].color / nbCol * 6, 1, 0.5, 1)
        ctx.fill();
    }

}

function Particle() {
    this.x;
    this.y;
    this.sx; // speed on x
    this.sy; // speed on y
    this.fx; // force applied on x
    this.fy;
    this.color;

    this.init = function(x, y, i) {
        this.x = x;
        this.y = y;
        this.sx = 0;
        this.sy = 0;
        this.fx = 0;
        this.fy = 0;
        this.index = i;
    }

    this.update = function() {
        this.Speed()
        this.Pos()
    }
    this.Force = function() {
        this.fx = 0;
        this.fy = 0;

        for (let i = 0; i < nbParticle; i++) {
            if (!(i == this.index)) {

                let dist = toroidalDistance(this.x, this.y, particles[i].x, particles[i].y, w, h)
                //let dist = Math.sqrt((this.x - particles[i].x) ** 2 + (this.y - particles[i].y) ** 2);
                let a = interaction[this.color][particles[i].color];
                let repellForce = 15;
                let force = -calcForce(dist, a, rmin, rmax, repellForce) * 0.15;

                if (force != 0) {

                    let angle = toroidalAngle(this.x, this.y, particles[i].x, particles[i].y, w, h) + 3.14
                    //let angle = Math.atan2(this.y - particles[i].y, this.x - particles[i].x)
                    this.fx += Math.cos(angle) * force
                    this.fy += Math.sin(angle) * force
                }
            }
        }

        const maxForce = 2
        let mag = Math.sqrt(this.fx * this.fx + this.fy * this.fy)
        if (mag != 0) {
            this.fx /= mag
            this.fy /= mag
            mag = Math.min(maxForce, mag)
            mag *= 0.985
            this.fx *= mag
            this.fy *= mag

        }


    }
    this.Speed = function() {
        this.sx += this.fx / dlt;
        this.sy += this.fy / dlt;

        const maxSpeed = 1000
        let mag = Math.sqrt(this.sx * this.sx + this.sy * this.sy)
        if (mag != 0) {
            this.sx /= mag
            this.sy /= mag
            mag = Math.min(maxSpeed, mag)
            mag *= 0.985
            this.sx *= mag
            this.sy *= mag

        }
    }

    this.Pos = function() {
        this.x += this.sx * dlt;
        this.y += this.sy * dlt;
        this.checkBounds();
        this.checkBounds();
    }

    this.checkBounds = function() {
        if (this.y >= h) {
            this.y -= h;
            //this.sy *= -1;
        } else if (this.y < 0) {
            this.y += h;
            //this.sy *= -1;
        }
        if (this.x >= w) {
            this.x -= w;
            //this.sx *= -1;
        } else if (this.x < 0) {
            this.x += w;
            //this.sx *= -1;
        }
    }


}

function calcForce(x, a, b, c, d) { //a maxpic, b rmin, c rmax
    if (x <= b) return x * d / b - d
    if (x > b && x < b + c) return Math.abs(x - b - c / 2) * (-2 * a / c) + a
    return 0
}

function toroidalDistance(x1, y1, x2, y2, width, height) { //mrc chatGPT
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    const toroidalDx = Math.min(dx, width - dx);
    const toroidalDy = Math.min(dy, height - dy);

    return Math.sqrt(toroidalDx * toroidalDx + toroidalDy * toroidalDy);
}

function toroidalAngle(x1, y1, x2, y2, width, height) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    // Ajuster les coordonnées pour le monde torique
    if (dx > width / 2) {
        dx = dx - width;
    } else if (dx < -width / 2) {
        dx = dx + width;
    }

    if (dy > height / 2) {
        dy = dy - height;
    } else if (dy < -height / 2) {
        dy = dy + height;
    }

    return Math.atan2(dy, dx);
}

function colorWheel(hue, saturation, darkness, alpha) {
    var red
    var green
    var blue

    hue = hue % 6;

    if (hue >= 0 && hue < 1) {
        red = 255
        green = hue * 255
        blue = 0;
    } else if (hue >= 1 && hue < 2) {
        green = 255
        red = 255 - ((hue - 1) * 255)
        blue = 0;
    } else if (hue >= 2 && hue < 3) {
        green = 255
        blue = (hue - 2) * 255
        red = 0;
    } else if (hue >= 3 && hue < 4) {
        blue = 255
        green = 255 - ((hue - 3) * 255)
        red = 0;
    } else if (hue >= 4 && hue < 5) {
        blue = 255
        red = (hue - 4) * 255
        green = 0;
    } else if (hue >= 5 && hue < 6) {
        red = 255
        blue = 255 - ((hue - 5) * 255)
        green = 0;
    }

    var sat = saturation / 100;
    red = red + (255 - red) * sat;
    green = green + (255 - green) * sat;
    blue = blue + (255 - blue) * sat;

    var dark = (100 - darkness) / 100;
    red = red * dark
    green = green * dark;
    blue = blue * dark;

    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setup()


document.addEventListener("keypress", logKey);

function logKey(e) {
    if (e.code == "Space") {
        if(nbCol != 5) init(5)    
        interaction = [
            [0.63, 0, -0.52, -0.78, -0.89],
            [0.21, 0.11, -0.27, -0.62, -0.18],
            [-0.55, 0.79, 0.61, -0.01, -0.93],
            [0.53, 0.05, 0.16, 0.24, 0.39],
            [0.53, -0.47, -0.3, 0.94, -0.79]
        ]
    }
}