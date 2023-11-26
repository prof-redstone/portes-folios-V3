var canvas
var ctx


let tab = []
let buffer = [];
var xSize = 150;
var ySize = 150;
var pixSize = 5;
var dt = 0.5;
var nbBoucle = 5;

var mousebtndown = false;
var mousePos = []



function setup() {
    canvas = document.getElementById("FluidSimulation");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "#0F1E3D";
    ctx.strokeStyle = "#897E58";

    for (let i = 0; i < xSize; i++) {
        tab[i] = []
        for (let j = 0; j < ySize; j++) {
            tab[i][j] = [0, 0, 1, 0];//speed in left, top, bool for empty or not, color
        }
    }
    for (let i = 0; i < xSize; i++) {
        buffer[i] = []
        for (let j = 0; j < ySize; j++) {
            buffer[i][j] = [0,0,0];
        }
    }
    setInterval(loop, 20);
}

function loop(){
    if(mousebtndown){
        let lenght = Math.sqrt((mousePos[0]-(xSize/2))*(mousePos[0]-(xSize/2)) + (mousePos[1]-(ySize/2))*(mousePos[1]-(ySize/2)))+0.1;
        tab[xSize/2][ySize/2][0] = 300* (mousePos[0]-(xSize/2))/lenght;
        tab[xSize/2][ySize/2][1] = 300* (mousePos[1]-(ySize/2))/lenght;
        tab[xSize/2][ySize/2][3] += 30;
    }

    //correction divergence
    for (let l = 0; l < nbBoucle; l++) {
        for (let i = 0; i < xSize; i++) {
            for (let j = 0; j < ySize; j++) {
                d = -getCell(i,j)[0] - getCell(i,j)[1] + getCell(i+1,j)[0] + getCell(i,j+1)[1]; //amount of fluid that exit the cell
                d *= 1.; //overrelaxation
                s = getCell(i-1,j)[2] + getCell(i+1,j)[2] + getCell(i,j-1)[2] + getCell(i,j+1)[2];
                getCell(i,j)[0] += d* getCell(i-1,j)[2] /s;
                getCell(i,j)[1] += d* getCell(i,j-1)[2] /s;
                getCell(i+1,j)[0] -= d* getCell(i+1,j)[2] /s;
                getCell(i,j+1)[1] -= d* getCell(i,j+1)[2] /s;
            }    
        }
    }

    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            getCell(i,j)[0] *= 0.99;
            getCell(i,j)[1] *= 0.99;
        }    
    }

    //advection
    let speed = 0.8;
    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            let x = i-getCell(i,j)[0]*speed;
            let y = j-getCell(i,j)[1]*speed;
            let dx = x%1;
            let dy = y%1;
            let nx = Math.floor(x);
            let ny = Math.floor(y);
            buffer[i][j][2] = getCell(nx,ny)[3]*((1-dx)*(1-dy)) + getCell(nx+1,ny)[3]*(dx*(1-dy)) + getCell(nx,ny+1)[3]*((1-dx)*dy) + getCell(nx+1,ny+1)[3]*(dx*dy);
            buffer[i][j][0] = getCell(nx,ny)[0]*((1-dx)*(1-dy)) + getCell(nx+1,ny)[0]*(dx*(1-dy)) + getCell(nx,ny+1)[0]*((1-dx)*dy) + getCell(nx+1,ny+1)[0]*(dx*dy);
            buffer[i][j][1] = getCell(nx,ny)[1]*((1-dx)*(1-dy)) + getCell(nx+1,ny)[1]*(dx*(1-dy)) + getCell(nx,ny+1)[1]*((1-dx)*dy) + getCell(nx+1,ny+1)[1]*(dx*dy);
        }    
    }
    let dissipation = 0.995;
    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            tab[i][j][3] = buffer[i][j][2]*dissipation;
            tab[i][j][0] = buffer[i][j][0];
            tab[i][j][1] = buffer[i][j][1];
        }
    }

    draw()
}

function getCell(i,j){
    if(0<=i&&i<xSize&&0<=j&&j<ySize){
        return tab[i][j];
    }else{
        return [0,0,0,0];
    }
}



function draw(){
    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            let gray = tab[i][j][3]/1 ;
            ctx.fillStyle = "rgb("+gray*255+','+gray*255+','+gray*255+")";
            //ctx.fillStyle = "rgb("+tab[i][j][0]*255+','+-tab[i][j][0]*255+','+Math.abs(tab[i][j][1])*255+")";
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