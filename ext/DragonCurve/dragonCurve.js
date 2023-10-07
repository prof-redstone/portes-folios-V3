var canvas;
var ctx;

var w;
var h;

var PI = 3.14159265
var ratio = 0.70710 // 1/sqrt(2)


var maxStep = 16;
var currentStep = 0;

var point = [] //co des points de la courbe



function setup() { //fonction de setup executer 1 fois 
    canvas = document.getElementById("DragonCurve");
    ctx = canvas.getContext("2d");

    body = document.getElementsByTagName('html')[0];
    canvas.height = body.clientHeight;
    canvas.width = body.clientWidth;
    w = canvas.width
    h = canvas.height
    ctx.lineCap = 'round';
    ctx.strokeStyle = "#000"

    let minsq = Math.min(w,h);
    point = [
        [w/2 - minsq/3, h / 2 - minsq/5],
        [w/2 + minsq/3, h / 2 - minsq/5]
    ]

    loop();
    draw();
}

function loop() {
    ctx.fillStyle = "rgb(0, 121, 145)"; //for bg
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgb(54, 53, 55)"; 
    nextStep()
    draw();
    currentStep++
    if(currentStep < maxStep){
        setTimeout(loop, 200);
    }
}

function nextStep() {
    var nextTab = [];
    for (let i = 0; i < point.length - 1; i++) {
        nextTab.push(point[i]);

        let angle = Math.atan2(point[i + 1][1] - point[i][1], point[i + 1][0] - point[i][0]) + ((i % 2 == 0) ? PI / 4 : -PI / 4);

        let length = Math.sqrt((point[i + 1][1] - point[i][1]) ** 2 + (point[i + 1][0] - point[i][0]) ** 2);

        nextTab.push([point[i][0] + (ratio * length) * Math.cos(angle), point[i][1] + (ratio * length) * Math.sin(angle)]);
    }
    nextTab.push(point[point.length - 1]);

    point = [];
    for (let i = 0; i < nextTab.length; i++) {
        point.push(nextTab[i]);
    }
}


function draw() {

    ctx.beginPath();
    ctx.moveTo(point[0][0], point[0][1]);
    for (let i = 1; i < point.length; i++) {
        ctx.lineTo(point[i][0], point[i][1]);
    }
    ctx.stroke();
}

setup()