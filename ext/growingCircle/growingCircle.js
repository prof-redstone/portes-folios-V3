var canvas
var ctx;
var H = 0;
var W = 0;
var circle = []
var espaceX = 100
var espaceY = 87
var size = 50
var phase = 0; // décalage de la phase petit à petit

function setup() {
    canvas = document.getElementById("growingCircle")
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;
    ctx.fillStyle = "#0F1E3D";
    ctx.strokeStyle = "#897E58";
    ctx.lineWidth = 2;
    setInterval(loop, 20);
    for (let i = 0; i < W/espaceX; i++) {
        for (let j = 0; j < H/espaceY; j++) {
            circle.push(new Circle(i*espaceX + espaceX/2*(j%2),j*espaceY, size))
        }
    }
}

function loop() {
    ctx.clearRect(0, 0, W, H)
    
    var sigmoide = 1/(1+Math.pow( 2, -9*Math.sin(phase) ) )
    var size = 50 + sigmoide*50
    for (let i = 0; i < circle.length; i++) {
        circle[i].update()
        ctx.beginPath()
        ctx.arc(circle[i].x, circle[i].y, circle[i].size, 0, 2 * Math.PI)
        ctx.stroke()
    }

    phase += 0.03
}

function Circle(x,y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.distance = Math.sqrt(pow(this.x - W/2) + pow(this.y - H/2))
    this.update = function(){
        var sigmoide = 1/(1+Math.pow( 2, -9*Math.sin(phase + this.distance/1500) ) )
        this.size = 50 + sigmoide*50
    }
}

function pow(x){
    return x*x
}

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


setup()