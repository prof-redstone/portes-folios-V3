var canvas;
var ctx;
var nbArc = 10;
var sizeArc = 10;
var spaceArc = 20
var time = 0
var speed = 2.5;

var C = Math.PI * 2

var pointCollect = [];

function setup() { //fonction de setup executer 1 fois 
    canvas = document.getElementById("rotatingSpiral");
    ctx = canvas.getContext("2d");


    //console.log(innerWidth - (innerWidth % symboleSize));
    body = document.getElementsByTagName('html')[0];
    canvas.height = body.clientHeight;
    canvas.width = body.clientWidth;

    Ycenter = canvas.height / 2;
    Xcenter = canvas.width / 2;

    for (let i = 0; i < nbArc; i++) {
        pointCollect[i] = [0 - i * 0.1, 0 + i * 0.1];
    }


    ctx.lineCap = "round";
    ctx.fillStyle = "#111"
    ctx.strokeStyle = "#EEE"
    ctx.lineWidth = sizeArc;

    IntervalTime = setInterval(loop, 20);
}

function loop() {
    Draw();
    time += speed;
}

function Draw() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nbArc; i++) {
        let point = calculatePoint(i);
        ctx.beginPath();
        ctx.arc(Xcenter, Ycenter, i * spaceArc, point[0]+3.14, point[1]+3.15)
        ctx.stroke();

    }
}

function calculatePoint(n) {
    let p1 = pointCollect[n][0];
    let p2 = pointCollect[n][1];
    // if (time < 1) {
    //     p1 = 0 + angle
    //     p2 = C * time + angle
    // } else {
    //     p2 = C + angle
    //     p1 = C * (time - 1) + angle
    // }
    //let space = 1 + 0.5*Math.cos(t*0.1 + n*0.1)
    // let fondamentalSpeed = 1;
    // let speedp1;
    // let speedp2;
    let t = time * 0.003 + n * 0.08
    // if ((t % 4) < 1) {
    //     speedp1 = fondamentalSpeed + (Math.sin((t%1)*Math.PI)+1) *0.5
    //     speedp2 = fondamentalSpeed
    // }else if ((t % 4) < 2) {
    //     speedp1 = fondamentalSpeed
    //     speedp2 = fondamentalSpeed
    // }else if ((t % 4) < 3) {
    //     speedp1 = fondamentalSpeed
    //     speedp2 = fondamentalSpeed + (Math.sin((t%1)*Math.PI)+1)  *0.5
    // }else {
    //     speedp1 = fondamentalSpeed
    //     speedp2 = fondamentalSpeed
    // }

    // pointCollect[n][0] += speedp2*0.01
    // pointCollect[n][1] += speedp1*0.01

    if ((t % 4) < 1) {
        p2 = lerp(t % 1) * 3.14
        p1 = 0
    } else if ((t % 4) < 2) {
        p2 = 3.14
        p1 = lerp(t % 1) * 3.14
    } else if ((t % 4) < 3) {
        p2 = 3.14
        p1 = lerp(1-(t % 1)) * 3.14
    } else {
        p2 = lerp(1-(t % 1)) * 3.14
        p1 = 0
    }


    return [p1, p2];

}


function lerp(x) {
    return -2 * x * x * x + 3 * x * x;
}


setup();