var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var slider = document.getElementById("speedSlider");
var InpLong = document.getElementById("long")
var InpLarg = document.getElementById("larg")
var Button = document.getElementById("1frame")
var InpSize = document.getElementById("size")


var gride = new HexagonalGride(100,100)
gride.hexRadius = 5
gride.ligneDirection = 0
gride.init()

var grideCopie = new HexagonalGride(100,100)
grideCopie.hexRadius = 3
grideCopie.ligneDirection = 0
grideCopie.init()

var size = gride.SizeGride()
canvas.width = size[0]
canvas.height = size[1]

var interval = setInterval(draw, 200)

function draw(){

    update()

    show()    
}

function show(){
    let size = gride.SizeGride()
    ctx.fillStyle = "#AAA";
    ctx.fillRect(0,0,size[0], size[1]);
    ctx.fillStyle = "#FF0000";
    for (let i = 0; i < gride.width; i++) {
        for (let j = 0; j < gride.height; j++) {
            let pos = gride.GetXYCoordinate(i,j)
            gride.PathDrawHex(pos[0], pos[1], ctx);
            if (gride.gride[j][i] == 1) {
                ctx.fillStyle = "#222"
                ctx.fill()
            }
            ctx.stroke();
        }
    }
}

function initGride(){
    for (let i = 0; i < gride.height; i++) {
        for (let j = 0; j < gride.width; j++) {
            gride.gride[i][j] = nb_random(0,1)
            
        }
    }
    draw()
}

function update(){
    for(var i = 0; i < gride.height; i++){
        for(var j = 0; j < gride.width; j++){
            grideCopie.gride[i][j] = gride.gride[i][j];
        }
    }

    for(var i = 0; i < gride.height; i++){
        for(var j = 0; j < gride.width; j++){
            
            let voisins = grideCopie.GetNeighbourCoordinate(j,i)
            let nbV = 0
            for (let i = 0; i < voisins.length; i++) {
                if (voisins[i][0] != undefined || voisins[i][1] != undefined) {
                    if (grideCopie.gride[voisins[i][1]][voisins[i][0]] == 1) {
                        nbV++
                    }
                }
            }

            if(grideCopie.gride[i][j] == 1){
                if(!(nbV == 3)){
                    gride.gride[i][j] = 0;
                }
            }else{
                if(nbV == 2){
                    gride.gride[i][j] = 1;
                }
            }

        }
    }
}

function ChangeFrameRate(val){
        clearInterval(interval)
        if(val != 0){
            interval = setInterval(draw, val);
        }
}

function ChangeSize(long=100, larg=100, size = 5){
    gride = new HexagonalGride(parseInt(long),parseInt(larg));
    gride.hexRadius = parseInt(size);
    gride.ligneDirection = 0;
    gride.init();

    grideCopie = new HexagonalGride(parseInt(long),parseInt(larg));
    grideCopie.hexRadius = parseInt(size);
    grideCopie.ligneDirection = 0;
    grideCopie.init();

    size = gride.SizeGride();
    canvas.width = size[0];
    canvas.height = size[1];
    
    initGride();
}

slider.oninput = function() {
    if(slider.value == 10){
        ChangeFrameRate(0)
    }else{
        ChangeFrameRate(50*slider.value)
    }
}

Button.onclick = function(){
    draw()
}

InpLong.oninput = function() {
    ChangeSize(InpLong.value, InpLarg.value, InpSize.value)
}

InpLarg.oninput = function() {
    ChangeSize(InpLong.value, InpLarg.value, InpSize.value)
}

InpSize.oninput = function() {
    ChangeSize(InpLong.value, InpLarg.value, InpSize.value)
}

canvas.onclick = function(e){
    console.log(e)
    let pos = gride.GetGrideCoordinate(e.x, e.y)
    console.log(pos)
    gride.gride[pos[0]][pos[1]] = 1
    show();
}

function nb_random(min, max){ //fonction générant un nobre aléatoir  min et max inclue
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

initGride()

//var timer = setInterval(draw, 200)
