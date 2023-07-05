var intervalTime;
var canvas
var ctx
var tableau = []
var taille = 40 // taille ds cases
var PI = Math.PI;
//pour tout mettre en place
function setup() {
    canvas = document.getElementById("pattern");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "#0F1E3D";
    ctx.strokeStyle = "#897E58";
    var W = taille;
    var H = taille;

    for (let i = 0; i < window.innerWidth / taille; i++) {
        tableau[i] = []
        for (let j = 0; j < window.innerHeight / taille; j++) {
            tableau[i][j] = i%2 + 2*(j%2);
        }
    }
    intervalTime = setInterval(loop, 100);
}
//boucle d'affichage
function loop() {
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau[i].length; j++) {

            drawTile(i * taille, j * taille, taille, tableau[i][j]);



        }
    }
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
    }
    if (t == 1) {
        ctx.beginPath();
        ctx.arc(x, y + w, (1 - ecart) * w, 0, -PI / 2, true);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x, y + w, ecart * w, 0, -PI / 2, true);
        ctx.stroke()
    }
    if (t == 2) {
        ctx.beginPath();
        ctx.arc(x + w, y + w, (1 - ecart) * w, -PI / 2, PI, true);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x + w, y + w, ecart * w, -PI / 2, PI, true);
        ctx.stroke()
    }
    if (t == 3) {
        ctx.beginPath();
        ctx.arc(x + w, y, (1 - ecart) * w, PI / 2, PI);
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(x + w, y, ecart * w, PI / 2, PI);
        ctx.stroke()
    }

}


function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setup()