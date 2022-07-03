var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var W = 400;
var H = 400
ctx.canvas.width = W;
ctx.canvas.height = H;

function setup() {
    setInterval(loop, 30);
}


var a = new bird()
var g = new goal()
g.reset()


function loop() {
    ctx.clearRect(0, 0, W, H)
    a.update()
    a.render()

    g.update()
    g.render()
}



function bird() {
    this.x = 30
    this.y = 100
    this.speedX = 0
    this.speedY = 0
    this.jump //true or false
    this.accF = -10 // force
    this.alive = true;
    this.radius = 5;
    this.score = 0

    this.update = function() {
        if (this.jump) {
            this.speedY = this.accF;
        }

        this.y += this.speedY;

        if (this.alive) {
            this.speedY += 1 //gravity
        }

        this.jump = false

        if (this.y > H) {
            this.y = H
        }
        if (this.y < 0) {
            this.y = 0
        }

        if (RectCircleColliding(this.x, this.y, this.radius, g.x, g.y, g.w, g.h)){
            this.score += 1
        }
        console.log(this.score)
    }

    this.render = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI)
        ctx.fill()
    }
}


function goal() {
    this.x = 0
    this.y = 0
    this.w = 30
    this.h = 20

    this.update = function() {
        this.x -= 1

        if (this.x < 10) {
            this.reset()
        }
    }

    this.reset = function() {
        this.x = 100;
        this.y = nb_random(20, H - 20)
        console.log(this.y)
    }

    this.render = function() {
        ctx.rect(this.x, this.y, this.w, this.h)
        ctx.fill()
    }
}



document.addEventListener('keydown', function(event) {
    if (event.code == "Space") {
        a.jump = true;
    }
});


function RectCircleColliding(Cx, Cy, Cr, Rx, Ry, Rw, Rh) { //collision detection btw circle and rect
    var distX = Math.abs(Cx - Rx - Rw / 2);
    var distY = Math.abs(Cy - Ry - Rh / 2);

    if (distX > (Rw / 2 + Cr)) {
        return false;
    }
    if (distY > (Rh / 2 + Cr)) {
        return false;
    }

    if (distX <= (Rw / 2)) {
        return true;
    }
    if (distY <= (Rh / 2)) {
        return true;
    }

    var dx = distX - Rw / 2;
    var dy = distY - Rh / 2;
    return (dx * dx + dy * dy <= (Cr * Cr));
}


function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




setup()