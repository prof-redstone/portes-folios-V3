var intervalTime;
var canvas
var ctx
var tableau = []
var taille = 40 // taille ds cases
var lastCase = [0, 0] // postition de la souris 
var PI = Math.PI;
var time = 0;

//pour tout mettre en place
function setup() {
    canvas = document.getElementById("tilingCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "#0F1E3D";
    ctx.strokeStyle = "#897E58";

    for (let i = 0; i < window.innerWidth / taille; i++) {
        tableau[i] = []
        for (let j = 0; j < window.innerHeight / taille +1; j++) {
            tableau[i][j] = nb_random(0, 1);
        }
    }
    intervalTime = setInterval(loop, 50);
}
//boucle d'affichage
function loop() {
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau[i].length; j++) {
            drawTile(i * taille , (j * taille + time)%(Math.ceil(ctx.canvas.height/taille)*taille + taille) - taille, taille, tableau[i][j]);
        }
    }
    time++
}

function drawTile(x, y, w, t) {
    //x,y,width,height,type
    let ecart = 0.63;

    if (t == 0) {
        ctx.beginPath();
        ctx.arc(x, y, (1 - ecart) * w, 0, PI / 2);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x, y, ecart * w, 0, PI / 2);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x + w, y + w, (1 - ecart) * w, -PI / 2, PI, true);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x + w, y + w, ecart * w, -PI / 2, PI, true);
        ctx.stroke()

    }
    if (t == 1) {
        ctx.beginPath();
        ctx.arc(x, y + w, (1 - ecart) * w, 0, -PI / 2, true);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x, y + w, ecart * w, 0, -PI / 2, true);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x + w, y, (1 - ecart) * w, PI / 2, PI);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x + w, y, ecart * w, PI / 2, PI);
        ctx.stroke()

    }

}


//changer la case au survole de la souris
document.getElementById("tilingCanvas").addEventListener("mousemove", function(event) {
    if (lastCase[0] != Math.floor(event.x / taille) || lastCase[1] != Math.floor(event.y / taille)) {
        lastCase = [Math.floor(event.x / taille), Math.floor(event.y / taille)]
        tableau[Math.floor(event.x / taille)][Math.floor(event.y / taille)] = (tableau[Math.floor(event.x / taille)][Math.floor(event.y / taille)] == 1) ? 0 : 1
    }
})


function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setup()