var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gride = new HexagonalGride(30, 20)
gride.hexRadius = 30
gride.ligneDirection = 0
gride.init()

let Bind = 0 //buffer index

var size = gride.SizeGride()
let width = 20
let height = 30


function cell(type = "empty", cont = null, face = null) {
    this.type = type;
    this.contain = cont;
    this.contain2 = [null, null, null, null, null, null];
    this.face = face;
}

let hand = new cell("conv", null, face = 0)

function show() {
    let size = gride.SizeGride();
    ctx.fillStyle = "#AAA";
    ctx.fillRect(0, 0, size[0], size[1]);
    ctx.fillStyle = "#FF0000";
    ctx.font = "40px Arial"; // Ajustez la taille de la police si nécessaire
    ctx.strokeStyle = "#000"

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let pos = gride.GetXYCoordinate(i, j);
            gride.PathDrawHex(pos[0], pos[1], ctx);
            ctx.stroke();

            if (gride.gride[j][i].type == "mine") {
                ctx.fillStyle = "#222";
                ctx.fill();

                let text = gride.gride[j][i].contain;
                let textMetrics = ctx.measureText(text);
                let textWidth = textMetrics.width;
                let textHeight = 30; // Approximation de la hauteur de la police
                let x = pos[0] - textWidth / 2;
                let y = pos[1] + textHeight / 2;
                ctx.fillStyle = "#FFF";
                ctx.fillText(text, x, y);
            }
            if (gride.gride[j][i].type == "col") {
                ctx.fillStyle = "#F88";
                ctx.fill();
            }
            if (gride.gride[j][i].type == "conv") {
                ctx.fillStyle = "#22F";
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(pos[0] + gride.hexRadius * Math.cos(1.0472 * gride.gride[j][i].face + 1.5), pos[1] + gride.hexRadius * Math.sin(1.0472 * gride.gride[j][i].face + 1.5));
                ctx.lineTo(pos[0] + 0.8 * gride.hexRadius * Math.cos(1.0472 * (gride.gride[j][i].face + 2.5 + 1.5)), pos[1] + 0.8 * gride.hexRadius * Math.sin(1.0472 * (gride.gride[j][i].face + 2.5 + 1.5)));
                ctx.lineTo(pos[0] + gride.hexRadius * Math.cos(1.0472 * (gride.gride[j][i].face + 5 + 1.5)), pos[1] + gride.hexRadius * Math.sin(1.0472 * (gride.gride[j][i].face + 5 + 1.5)));
                ctx.stroke();
                if (gride.gride[j][i].contain != null) {
                    let text = gride.gride[j][i].contain;
                    let textMetrics = ctx.measureText(text);
                    let textWidth = textMetrics.width;
                    let textHeight = 30; // Approximation de la hauteur de la police
                    let x = pos[0] - textWidth / 2;
                    let y = pos[1] + textHeight / 2;
                    ctx.fillStyle = "#FFF";
                    ctx.fillText(text, x, y);
                }
            }
            if (gride.gride[j][i].type == "adder") {
                ctx.fillStyle = "#8F8";
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(pos[0] + gride.hexRadius * Math.cos(1.0472 * gride.gride[j][i].face + 1.5), pos[1] + gride.hexRadius * Math.sin(1.0472 * gride.gride[j][i].face + 1.5));
                ctx.lineTo(pos[0] + 0.8 * gride.hexRadius * Math.cos(1.0472 * (gride.gride[j][i].face + 2.5 + 1.5)), pos[1] + 0.8 * gride.hexRadius * Math.sin(1.0472 * (gride.gride[j][i].face + 2.5 + 1.5)));
                ctx.lineTo(pos[0] + gride.hexRadius * Math.cos(1.0472 * (gride.gride[j][i].face + 5 + 1.5)), pos[1] + gride.hexRadius * Math.sin(1.0472 * (gride.gride[j][i].face + 5 + 1.5)));
                ctx.stroke();
            }
        }
    }
}

function update() {
    for (let i = 0; i < height; i++) { //mine et tansfo
        for (let j = 0; j < width; j++) {
            if (gride.gride[j][i].type == "mine" && gride.gride[j][i].contain != null) {
                let getCell = gride.GetNeighbourCoordinate(i, j)
                for (let k = 0; k < 6; k++) {
                    if (getCell[k][0] != undefined && getCell[k][1] != undefined && gride.gride[getCell[k][1]][getCell[k][0]].type == "conv" && gride.gride[getCell[k][1]][getCell[k][0]].contain == null && gride.gride[getCell[k][1]][getCell[k][0]].face == k) {
                        gride.gride[getCell[k][1]][getCell[k][0]].contain = gride.gride[j][i].contain
                    }
                }
            }
            if (gride.gride[j][i].type == "col" && gride.gride[j][i].contain != null) {
                console.log(gride.gride[j][i].contain);
                gride.gride[j][i].contain = null;
            }
            if (gride.gride[j][i].type == "adder") {
                let getCell = gride.GetNeighbourCoordinate(i, j)[gride.gride[j][i].face]
                let a = null;
                let b = null;
                for (let k = 0; k < 6; k++) {
                    if (gride.gride[j][i].contain2[k] != null && a == null) {
                        a = k
                    } else if (gride.gride[j][i].contain2[k] != null && a != null && b == null) {
                        b = k
                    }
                }
                console.log(a, b)
                if (getCell[0] != undefined && getCell[1] != undefined && gride.gride[getCell[1]][getCell[0]].type == "conv" && gride.gride[getCell[1]][getCell[0]].contain == null && b != null) {
                    gride.gride[getCell[1]][getCell[0]].contain = gride.gride[j][i].contain2[a] + gride.gride[j][i].contain2[b];
                    gride.gride[j][i].contain2[a] = null;
                    gride.gride[j][i].contain2[b] = null;
                }
            }
        }
    }



    let queue = []
    for (let i = 0; i < height; i++) { //pour les conv
        for (let j = 0; j < width; j++) {
            if (gride.gride[j][i].type == "conv" && gride.gride[j][i].contain != null) {
                let getCell = gride.GetNeighbourCoordinate(i, j)[gride.gride[j][i].face]
                if (getCell[0] != undefined && getCell[1] != undefined && gride.gride[getCell[1]][getCell[0]].type == "conv" && gride.gride[getCell[1]][getCell[0]].contain == null) {
                    queue.push([j, i, gride.gride[j][i].contain, getCell[1], getCell[0]]);
                }
                if (getCell[0] != undefined && getCell[1] != undefined && gride.gride[getCell[1]][getCell[0]].type == "col" && gride.gride[getCell[1]][getCell[0]].contain == null) {
                    gride.gride[getCell[1]][getCell[0]].contain = gride.gride[j][i].contain
                    gride.gride[j][i].contain = null;
                }
                if (getCell[0] != undefined && getCell[1] != undefined && gride.gride[getCell[1]][getCell[0]].type == "adder") {
                    if (gride.gride[getCell[1]][getCell[0]].contain2[gride.gride[j][i].face] == null) {
                        gride.gride[getCell[1]][getCell[0]].contain2[gride.gride[j][i].face] = gride.gride[j][i].contain;
                        gride.gride[j][i].contain = null;
                    }
                    /*if(gride.gride[getCell[1]][getCell[0]].contain == null){
                        gride.gride[getCell[1]][getCell[0]].contain = gride.gride[j][i].contain
                        gride.gride[j][i].contain = null;
                    }else if(gride.gride[getCell[1]][getCell[0]].contain2 == null){
                        gride.gride[getCell[1]][getCell[0]].contain2 = gride.gride[j][i].contain
                        gride.gride[j][i].contain = null;
                    }*/
                }
            }
        }
    }

    for (let i = 0; i < queue.length; i++) {
        if (gride.gride[queue[i][3]][queue[i][4]].contain == null) {
            gride.gride[queue[i][3]][queue[i][4]].contain = queue[i][2]
            gride.gride[queue[i][0]][queue[i][1]].contain = null
        }
    }

    show()
}

function addCell(x, y, type, cont = null, face = null) {
    gride.gride[x][y] = new cell(type, cont, face);
}


function initGride() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (nb_random(0, 20) == 10) {
                if (nb_random(0, 5) != 0) {
                    addCell(i, j, "mine", 1)
                } else {
                    addCell(i, j, "mine", 2)
                }
            } else {
                addCell(i, j, "empty")
            }
        }
    }
    show();
}

canvas.onclick = function (e) {
    let pos = gride.GetGrideCoordinate(e.x, e.y)
    addCell(pos[0], pos[1], hand.type, hand.contain, hand.face)
    update()
}

function nb_random(min, max) { //fonction générant un nobre aléatoir  min et max inclue
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

initGride()


document.getElementById("conv").addEventListener("click", function () {
    hand.type = "conv";
});

document.getElementById("add").addEventListener("click", function () {
    hand.type = "adder";
});

document.getElementById("del").addEventListener("click", function () {
    hand.type = "empty";
});

document.getElementById("col").addEventListener("click", function () {
    hand.type = "col";
})

document.getElementById("face").addEventListener("click", function () {
    hand.face = (hand.face + 1) % 6;
    document.getElementById("face").textContent = "face : " + hand.face;
    console.log(hand.face)
});