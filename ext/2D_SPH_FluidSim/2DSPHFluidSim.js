var canvas;
var ctx;
var w;
var h;

const grv = 50; // gravity const
const dlt = 0.005; //delta time btw each frame
const zoom = 10; //change factor btw speed and position, incresed it to go faster

var nbParticle = 200;
var particles = []
var containerRadius = 200;


function setup() { //fonction de setup executer 1 fois 
    canvas = document.getElementById("2DSPHFluidSim");
    ctx = canvas.getContext("2d");

    body = document.getElementsByTagName('html')[0];
    canvas.height = body.clientHeight;
    canvas.width = body.clientWidth;
    w = canvas.width
    h = canvas.height
    ctx.fillStyle = "#111";
    ctx.strokeStyle = "#EEE"

    particles[0] = new Particle(0);
    particles[0].init(w/2,h/2,0, 0);
    particles[1] = new Particle(1);
    particles[1].init(w/2,h/2+20,0, 0);

    for (let i = 0; i < nbParticle; i++) {
        particles[i] = new Particle(i);
        particles[i].init(nb_random(w/2 - containerRadius, w/2 + containerRadius), nb_random(h/2 - containerRadius, h/2 + containerRadius),0, 0);
    }


    setInterval(loop, 20);
}

function loop() {
    draw();

}

function draw() {
    ctx.clearRect(0, 0, w, h)
    ctx.fillRect(0, 0, w, h)
    ctx.beginPath()
    ctx.strokeRect(w / 2 - containerRadius, h / 2 - containerRadius, containerRadius * 2, containerRadius * 2)
    ctx.stroke();

    for (let i = 0; i < nbParticle; i++) {

        particles[i].update();
        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, 2 * 3.1415);
        ctx.stroke();
    }

}

function Particle(ind) {
    this.x;
    this.y;
    this.r;
    this.sx; // speed on x
    this.sy; // speed on y
    this.m; //mass
    this.fx; // force applied on x
    this.fy;
    this.index = ind; //index number in particles array 

    this.init = function(x, y, sx, sy) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.sx = sx;
        this.sy = sy;
        this.m = 1;
        this.fx = 0;
        this.fy = 0;
    }

    this.update = function() {
        this.UForce()
        this.USpeed()
        this.UPos()
    }
    this.UForce = function() {
        this.fy = this.m * grv;
        this.fx = 0;

        //const b = 0;
        //const c = 0.1;
        const mindist = 0.5 //to prevent bug like divided by 0
        //const distFactor = 0.5;

        for (let i = 0; i < nbParticle; i++) {
            if (!(i == this.index)) {

                let dist = Math.sqrt((this.x - particles[i].x) ** 2 + (this.y - particles[i].y) ** 2) + mindist;
                let force = 0;

                if(dist < this.r*2){
                    const a = 5000; //const for repulsion force tbw particle
                    force = +(-a*(dist/(this.r*2)) + a);
                }else if(dist-this.s < this.r/2){
                    //force = 1
                }

                if (force != 0) {

                    let angle = Math.atan2(this.y - particles[i].y, this.x - particles[i].x)
                    //console.log(force);
                    this.fx += Math.cos(angle) * force
                    this.fy += Math.sin(angle) * force
                }
            }
        }
    }
    this.USpeed = function() {
        this.sx += this.fx / this.m * dlt;
        this.sy += this.fy / this.m * dlt;

        const maxSpeed = 30
        if(this.sx > maxSpeed) this.sx = maxSpeed;
        if(this.sx < -maxSpeed) this.sx = -maxSpeed;
        if(this.sy > maxSpeed) this.sy = maxSpeed;
        if(this.sy < -maxSpeed) this.sy = -maxSpeed;

        this.sx *= 0.98
        this.sy *= 0.98
    }
    this.UPos = function() {
        this.x += this.sx * zoom * dlt;
        this.y += this.sy * zoom * dlt;
        this.checkBounds();
    }

    this.checkBounds = function() {
        if (this.y > h / 2 + containerRadius) {
            this.y = h / 2 + containerRadius;
            this.sy = -10;
            //this.USpeed()
        }
        if (this.y < h / 2 - containerRadius) {
            this.y = h / 2 - containerRadius;
            this.sy = -this.sy*0.2;
        }
        if (this.x > w / 2 + containerRadius) {
            this.x = w / 2 + containerRadius;
            this.sx = -10;
        }
        if (this.x < w / 2 - containerRadius) {
            this.x = w / 2 - containerRadius;
            this.sx = 10;
        }
    }

}

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setup()