var canvas
var ctx

var tab = []
var xSize = 201;
var ySize = 201;
var pixSize = 2;
var dt = 0.5;

var mousebtndown = false;
var mousePos = []


//pour tout mettre en place
function setup() {
    canvas = document.getElementById("quantumWave");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "#0F1E3D";
    ctx.strokeStyle = "#897E58";

    for (let i = 0; i < xSize; i++) {
        tab[i] = []
        for (let j = 0; j < ySize; j++) {
            tab[i][j] = [0,0];//pos + vel
        }
    }
    setInterval(loop, 5);
}


function loop(){
    if(mousebtndown){
        tab[mousePos[0]][mousePos[1]][0] += 1;
    }

    //tab[100][100][0] = 0;

    let frottement = 0.002;

    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            tab[i][j][1] += getForce(i,j)*dt + -frottement*tab[i][j][1];
        }
    }
    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            tab[i][j][0] += tab[i][j][1]*dt;
        }
    }
    draw()
}

function getForce(i,j) {
    let totF = 0;
    if(i>0){ totF += tab[i-1][j][0] - tab[i][j][0]} else { totF += - tab[i][j][0]}
    if(j>0){ totF += tab[i][j-1][0] - tab[i][j][0]} else { totF += - tab[i][j][0]}
    if(i<xSize-1){ totF += tab[i+1][j][0] - tab[i][j][0]} else { totF += - tab[i][j][0]}
    if(j<ySize-1){ totF += tab[i][j+1][0] - tab[i][j][0]} else { totF += - tab[i][j][0]}

    totF *= 4

    if(i>0&&j>0){ totF += tab[i-1][j-1][0] - tab[i][j][0]} else { totF += - tab[i][j][0]}
    if(i>0&&j<ySize-1){ totF += tab[i-1][j+1][0] - tab[i][j][0]} else { totF += - tab[i][j][0]}
    if(i<xSize-1&&j>0){ totF += tab[i+1][j-1][0] - tab[i][j][0]} else { totF += - tab[i][j][0]}
    if(j<ySize-1&&i<xSize-1){ totF += tab[i+1][j+1][0] - tab[i][j][0]} else { totF += - tab[i][j][0]}

    totF /= 4

    totF += - tab[i][j][0]*0.05
    return totF;
}

function draw(){
    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            ctx.fillStyle = "rgb(" + Math.max(0, tab[i][j][0])*10000+",0," + Math.max(0, -tab[i][j][0])*10000+ ")";
            ctx.fillRect(i*pixSize, j*pixSize, pixSize, pixSize );
        }
    }
}


addEventListener('mousedown', (event) => {
    mousebtndown = true;
});

addEventListener('mouseup', (event) => {
    mousebtndown = false;
});

addEventListener("mousemove", (event) => {
    mousePos = [Math.min(Math.floor(event.clientX/pixSize), xSize-1), Math.min(Math.floor(event.clientY/pixSize), ySize-1)]
});


setup()