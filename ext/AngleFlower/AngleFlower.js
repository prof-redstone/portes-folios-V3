var canvas
var ctx;
var H = 0;
var W = 0;

var posX = 0
var posY = 0
var LastAngle = 0
var angleAdder = 1
var length= 5
var stepByFrame = 10

function setup(){
    canvas = document.getElementById("angleFlower")
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;

    posX = W/2
    posY = H/2


    ctx.fillStyle = "#6AC"
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = "#000"

    
    setInterval(loop, 1);
}

function loop(){

    for (let i = 0; i < stepByFrame; i++) {
        
        ctx.beginPath()
        ctx.moveTo(posX,posY)
        posX += Math.cos((LastAngle )*3.1415926535/180) * length
        posY += Math.sin((LastAngle )*3.1415926535/180) * length
        ctx.lineTo(posX, posY)
        ctx.stroke();
    
        angleAdder += 0.35
        LastAngle += angleAdder
    }

}

setup()// start animation