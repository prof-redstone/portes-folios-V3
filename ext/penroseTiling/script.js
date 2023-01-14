var canvas;
var ctx;

var phi = 1.6180
var PI = Math.PI

var recursionCount = 0;
var bufferIndex = 1;
//BF -> buffer
var aigusBF1 = []
var obtuBF1 = []
var aigusBF2 = []
var obtuBF2 = []

var frstCol = "#1E5959";
var scndCol = "#3B8C6E";
var strkCol = "#BBB";



function setup() {
    canvas = document.getElementById("penroseTiling");
    ctx = canvas.getContext("2d");

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.fillStyle = "#111"
    ctx.strokeStyle = "#000"
    ctx.LineWidth = 30;
    initTriangle();
    loop();
    loop();
    loop();
    loop();
    loop();
    loop();
    loop();
    loop();
    loop();
    loop();
    draw();

}

function initTriangle() {
    let scale = 1500;
    let w = ctx.canvas.width / 2;
    let h = ctx.canvas.height / 2;
    for (let i = 0; i < 5; i++) {
        aigusBF1.push([
            [0 + w, 0 + h],
            [Math.cos(PI / 5 + (i*2*PI/5)) * scale + w, Math.sin(PI / 5 + (i*2*PI/5)) * scale + h],
            [Math.cos((i*2*PI/5)) * scale + w, Math.sin((i*2*PI/5)) * scale + h]
        ]);
        aigusBF1.push([
            [0 + w, 0 + h],
            [Math.cos(-PI / 5 + (i*2*PI/5)) * scale + w, Math.sin(-PI / 5 + (i*2*PI/5)) * scale + h],
            [Math.cos((i*2*PI/5)) * scale + w, Math.sin((i*2*PI/5)) * scale + h]
        ]);

    }
    /*
    aigusBF1.push([
            [0 + w, 0 + h],
            [Math.cos(PI / 10) * scale + w, -Math.sin(PI / 10) * scale + h],
            [Math.cos(PI / 10) * scale + w, Math.sin(PI / 10) * scale + h]
        ]);*/
}


function loop() {
    if (bufferIndex == 1) {
        aigusBF2 = []
        obtuBF2 = []
        for (let i = 0; i < aigusBF1.length; i++) {
            getAigus(aigusBF1[i])
        }
        for (let i = 0; i < obtuBF1.length; i++) {
            getObtu(obtuBF1[i])
        }
    }
    if (bufferIndex == 2) {
        aigusBF1 = []
        obtuBF1 = []
        for (let i = 0; i < aigusBF2.length; i++) {
            getAigus(aigusBF2[i])
        }
        for (let i = 0; i < obtuBF2.length; i++) {
            getObtu(obtuBF2[i])
        }
    }
    bufferIndex = bufferIndex == 2 ? 1 : 2;
}

function getAigus(tri) {
    let p1x = tri[0][0];
    let p1y = tri[0][1];
    let p2x = tri[1][0];
    let p2y = tri[1][1];
    let p3x = tri[2][0];
    let p3y = tri[2][1];
    if (bufferIndex == 1) {
        obtuBF2.push([
            [p1x + (p2x - p1x) * (1 - 1 / phi), p1y + (p2y - p1y) * (1 - 1 / phi)],
            [p1x + (p3x - p1x) * (1 / phi), p1y + (p3y - p1y) * (1 / phi)],
            [p1x, p1y]
        ]);
        aigusBF2.push([
            [p2x, p2y],
            [p1x + (p2x - p1x) * (1 - 1 / phi), p1y + (p2y - p1y) * (1 - 1 / phi)],
            [p1x + (p3x - p1x) * (1 / phi), p1y + (p3y - p1y) * (1 / phi)]
        ]);
        aigusBF2.push([
            [p2x, p2y],
            [p3x, p3y],
            [p1x + (p3x - p1x) * (1 / phi), p1y + (p3y - p1y) * (1 / phi)],
        ]);
    }
    if (bufferIndex == 2) {
        obtuBF1.push([
            [p1x + (p2x - p1x) * (1 - 1 / phi), p1y + (p2y - p1y) * (1 - 1 / phi)],
            [p1x + (p3x - p1x) * (1 / phi), p1y + (p3y - p1y) * (1 / phi)],
            [p1x, p1y]
        ]);
        aigusBF1.push([
            [p2x, p2y],
            [p1x + (p2x - p1x) * (1 - 1 / phi), p1y + (p2y - p1y) * (1 - 1 / phi)],
            [p1x + (p3x - p1x) * (1 / phi), p1y + (p3y - p1y) * (1 / phi)]
        ]);
        aigusBF1.push([
            [p2x, p2y],
            [p3x, p3y],
            [p1x + (p3x - p1x) * (1 / phi), p1y + (p3y - p1y) * (1 / phi)],
        ]);
    }
}

function getObtu(tri) {
    let p1x = tri[0][0];
    let p1y = tri[0][1];
    let p2x = tri[1][0];
    let p2y = tri[1][1];
    let p3x = tri[2][0];
    let p3y = tri[2][1];
    if (bufferIndex == 1) {
        obtuBF2.push([
            [p2x + (p3x - p2x) * (1 - 1 / phi), p2y + (p3y - p2y) * (1 - 1 / phi)],
            [p1x, p1y],
            [p2x, p2y]
        ]);
        aigusBF2.push([
            [p3x, p3y],
            [p2x + (p3x - p2x) * (1 - 1 / phi), p2y + (p3y - p2y) * (1 - 1 / phi)],
            [p1x, p1y]
        ]);
    }
    if (bufferIndex == 2) {
        obtuBF1.push([
            [p2x + (p3x - p2x) * (1 - 1 / phi), p2y + (p3y - p2y) * (1 - 1 / phi)],
            [p1x, p1y],
            [p2x, p2y]
        ]);
        aigusBF1.push([
            [p3x, p3y],
            [p2x + (p3x - p2x) * (1 - 1 / phi), p2y + (p3y - p2y) * (1 - 1 / phi)],
            [p1x, p1y]
        ]);
    }
}







function draw() {
    if (bufferIndex == 1) {
        ctx.fillStyle = frstCol;
        for (let i = 0; i < aigusBF1.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = frstCol;
            ctx.moveTo(aigusBF1[i][0][0], aigusBF1[i][0][1]);
            ctx.lineTo(aigusBF1[i][2][0], aigusBF1[i][2][1]);
            ctx.stroke();
            ctx.strokeStyle = strkCol;
            ctx.beginPath();
            ctx.moveTo(aigusBF1[i][0][0], aigusBF1[i][0][1]);
            ctx.lineTo(aigusBF1[i][1][0], aigusBF1[i][1][1]);
            ctx.lineTo(aigusBF1[i][2][0], aigusBF1[i][2][1]);
            ctx.stroke();
            ctx.fill();
        }
        ctx.fillStyle = scndCol;
        for (let i = 0; i < obtuBF1.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = scndCol;
            ctx.moveTo(obtuBF1[i][0][0], obtuBF1[i][0][1]);
            ctx.lineTo(obtuBF1[i][2][0], obtuBF1[i][2][1]);
            ctx.stroke();
            ctx.strokeStyle = strkCol;
            ctx.beginPath();
            ctx.moveTo(obtuBF1[i][0][0], obtuBF1[i][0][1]);
            ctx.lineTo(obtuBF1[i][1][0], obtuBF1[i][1][1]);
            ctx.lineTo(obtuBF1[i][2][0], obtuBF1[i][2][1]);
            ctx.stroke();
            ctx.fill();
        }
    }
    if (bufferIndex == 2) {
        ctx.fillStyle = frstCol;
        for (let i = 0; i < aigusBF2.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = frstCol;
            ctx.moveTo(aigusBF2[i][0][0], aigusBF2[i][0][1]);
            ctx.lineTo(aigusBF2[i][2][0], aigusBF2[i][2][1]);
            ctx.stroke();
            ctx.strokeStyle = strkCol;
            ctx.beginPath();
            ctx.moveTo(aigusBF2[i][0][0], aigusBF2[i][0][1]);
            ctx.lineTo(aigusBF2[i][1][0], aigusBF2[i][1][1]);
            ctx.lineTo(aigusBF2[i][2][0], aigusBF2[i][2][1]);
            ctx.stroke();
            ctx.fill();
        }
        ctx.fillStyle = scndCol;
        for (let i = 0; i < obtuBF2.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = scndCol;
            ctx.moveTo(obtuBF2[i][0][0], obtuBF2[i][0][1]);
            ctx.lineTo(obtuBF2[i][2][0], obtuBF2[i][2][1]);
            ctx.stroke();
            ctx.strokeStyle = strkCol;
            ctx.beginPath();
            ctx.moveTo(obtuBF2[i][0][0], obtuBF2[i][0][1]);
            ctx.lineTo(obtuBF2[i][1][0], obtuBF2[i][1][1]);
            ctx.lineTo(obtuBF2[i][2][0], obtuBF2[i][2][1]);
            ctx.stroke();
            ctx.fill();
        }
    }
}



setup()