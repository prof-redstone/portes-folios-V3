var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var gride = new HexagonalGride(11,14)
gride.hexRadius = 30
gride.firstOffset = 1
gride.ligneDirection = 0
gride.marge = 0
gride.init()
let size = gride.SizeGride()
canvas.width = size[0]
canvas.height = size[1]

function draw(){
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    let size = gride.SizeGride()
    ctx.fillStyle = "#AAA";
    ctx.fillRect(0,0,size[0], size[1]);
    ctx.fillStyle = "#FF0000";
    for (let i = 0; i < gride.width; i++) {
        for (let j = 0; j < gride.height; j++) {
            let pos = gride.GetXYCoordinate(i,j)
            gride.PathDrawHex(pos[0], pos[1], ctx);
            if (gride.gride[j][i] == 1) {
                ctx.fillStyle = "#00F"
                ctx.fill()
            }
            if (gride.gride[j][i] == 2) {
                ctx.fillStyle = "#0F0"
                ctx.fill()
            }
            ctx.fillStyle = "#FF0000";
            ctx.stroke();
            ctx.fillText(i+","+j, pos[0], pos[1] + 4);
        }
    }
}

draw()

var timer = setInterval(draw, 20)

canvas.onmousemove = event => {
    gride.Reset(0)
    let pos = gride.GetGrideCoordinate(event.clientX,event.clientY)
    gride.gride[pos[0]][pos[1]] = 1
    let nei = gride.GetNeighbourCoordinate(pos[1],pos[0])
    for (let i = 0; i < nei.length; i++) {
        if (nei[i][0] != undefined || nei[i][1] != undefined) {
            gride.gride[nei[i][1]][nei[i][0]] = 2
        }
    }
}