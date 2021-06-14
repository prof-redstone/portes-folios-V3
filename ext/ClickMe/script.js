var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var div = document.getElementById("movingDiv")

canvas.width = window.innerWidth 
canvas.height = window.innerHeight

var height = window.innerHeight;
var width = window.innerWidth;
var mouseX = 0;
var mouseY = 0;

var FPS = 60;

var posX = width/2;
var posY = height/2;
var veloX = 0;
var veloY = 0;
var AccX = 0;
var AccY = 0;
var deltaT = 1/FPS * 7;
var interval = setInterval(loop, 1000/FPS);

function UpdatePos(){
    veloX = veloX + AccX*deltaT
    veloY = veloY + AccY*deltaT
    posX = posX + veloX*deltaT
    posY = posY + veloY*deltaT
}

function Friction(val){
    veloX *= val
    veloY *= val
}

function MouseMove(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function loop(){
    UpdatePos();
    Friction(0.9)
    //middle atraction
    let F1X = width/2 - posX
    let F1Y = height/2 - posY
    //mouse repultion
    let distance = Math.sqrt(Math.pow(mouseX - posX,2) + Math.pow(mouseY - posY,2))
    let repForce = 10000/distance * Math.sign(mouseX - posX) 
    let F2X = repForce*Math.cos(Math.atan((mouseY - posY)/(mouseX - posX))) *-1
    let F2Y = repForce*Math.sin(Math.atan((mouseY - posY)/(mouseX - posX))) *-1

    AccX = F2X*2 + F1X
    AccY = F2Y*2 + F1Y

    /*ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "#000";
    ctx.fillRect(posX-10,posY-10,20,20);*/
    div.style.marginLeft = posX + "px";
    div.style.marginTop = posY + "px";
}

function resize(){
    canvas.width = window.innerWidth 
    canvas.height = window.innerHeight
    height = window.innerHeight
    width = window.innerWidth;
}