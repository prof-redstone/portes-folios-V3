var intervalTime;
var canvas
var ctx
var tableau = []
var taille = 30 // taille ds cases
var lastCase = [0,0] // postition de la souris 
//pour tout mettre en place
function setup(){
    canvas = document.getElementById("tilingCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "#0F1E3D";
    ctx.strokeStyle = "#897E58";
    var W = taille;
    var H = taille;
    
    for (let i = 0; i < window.innerWidth/taille; i++) {
        tableau[i] = []
        for (let j = 0; j < window.innerHeight/taille; j++) {
            tableau[i][j] = nb_random(0,1);
        }
    }
    intervalTime = setInterval(loop, 100);
}
//boucle d'affichage
function loop(){
    ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height)
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau[i].length; j++) {
            if (tableau[i][j] == 0) {
                ctx.beginPath()
                ctx.moveTo(i*taille,j*taille)
                ctx.lineTo((i+1)*taille,(j+1)*taille)
                ctx.stroke()
            }else{
                ctx.beginPath()
                ctx.moveTo((i+1)*taille,j*taille)
                ctx.lineTo((i)*taille,(j+1)*taille)
                ctx.stroke()
            }
        }
    }
}
//changer la case au survole de la souris
document.getElementById("tilingCanvas").addEventListener("mousemove", function(event){
    if(lastCase[0] != Math.floor(event.x/taille) || lastCase[1] != Math.floor(event.y/taille)){
        lastCase = [Math.floor(event.x/taille),Math.floor(event.y/taille)]
        tableau[Math.floor(event.x/taille)][Math.floor(event.y/taille)] = (tableau[Math.floor(event.x/taille)][Math.floor(event.y/taille)] == 1)? 0 : 1
    }
})


function nb_random(min, max){ //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

setup()