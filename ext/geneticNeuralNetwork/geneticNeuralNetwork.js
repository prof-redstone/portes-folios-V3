var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var W = 400;
var H = 400
ctx.canvas.width = W;
ctx.canvas.height = H;


var patternLayer = [4, 5, 5, 1] //number of neurone for each layer, first is input, last is output

var g = new goal() //la boite noir qu'il faut toucher au maximum
g.reset()

var nbBird = 20;
var listbird = []

for (let i = 0; i < nbBird; i++) {
    listbird[i] = new bird()
    listbird[i].init()
}


function setup() {
    setInterval(loop, 30);
}


function loop() {
    ctx.clearRect(0, 0, W, H)
    for (let i = 0; i < listbird.length; i++) {

        listbird[i].update()
        listbird[i].render()
        listbird[i].processe()
    }

    g.update()
    g.render()
}



function bird() {
    this.x = 30
    this.y = 100
    this.speedX = 0
    this.speedY = 0
    this.jump //true or false
    this.accF = -10 // force
    this.alive = true;
    this.radius = 5;
    this.color = 0;
    this.score = 0;
    this.gene = []

    this.init = function() {
        this.color = getRndColor();
        this.gene = getGene();
    }

    this.update = function() {
        if (this.jump) {
            this.speedY = this.accF;
        }

        this.y += this.speedY;

        if (this.alive) {
            this.speedY += 1 //gravity
        }

        this.jump = false

        //border collision
        if (this.y > H) {
            this.y = H
            this.speedY = 0
        }
        if (this.y < 0) {
            this.y = 0
            this.speedY = 0
        }

        if (RectCircleColliding(this.x, this.y, this.radius, g.x, g.y, g.w, g.h)) {
            this.score += 1
        }
    }

    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI)
        ctx.fill()
    }

    //execute le réseau de neurones
    this.processe = function() {
        var inputs = [
            [this.y],
            [this.speedY],
            [g.x],
            [g.y]
        ]
        var next = inputs;
        for (let i = 0; i < this.gene.length; i++) {
            next = layer(next, this.gene[i][0], this.gene[i][1])
        }
        if (next[0] > 0) {
            this.jump = true;
        }
    }

}


function goal() {
    this.x = 0
    this.y = 0
    this.w = 30
    this.h = 30

    this.update = function() {
        this.x -= 1

        if (this.x < 5) {
            this.reset()
        }
    }

    this.reset = function() {
        this.x = 90;
        this.y = nb_random(10, H - 10 - this.h)
    }

    this.render = function() {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h)
        ctx.fill()
    }
}


//generate random gene for the first generation
function getGene() {
    var gene = [] 
    for (let i = 0; i < patternLayer.length - 1; i++) { //pour chaque layer
        gene[i] = [
            [],
            []
        ] //each layer contain weight and biais

        for (let j = 0; j < patternLayer[i + 1]; j++) { //generate weights
            //pour chaque neurone de cette couche
            gene[i][0][j] = []
            for (let k = 0; k < patternLayer[i]; k++) { //genere weights en fonction du nombre de neurone de la couche d'avant
                gene[i][0][j][k] = randomG()
            }
        }

        for (let j = 0; j < patternLayer[i + 1]; j++) { //generate biais
            gene[i][1][j] = [randomG()]
        }

    }
    return gene;
}


//function that multiply 2 matrices 
function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function addingMatrices(m1, m2) {
    var result = []
    //fonctionne que pour des matrice col, mais j'ai pas besoin de plus.
    //c'est pas dutout les bons formats et mathM correct mais chut.
    for (let i = 0; i < m1.length; i++) {
        result[i] = [m1[i][0] + m2[i][0]];
    }
    return result
}

//function that processe a layer by taking inputs, multiply by weights and adding biais
function layer(inputs, weights, biais) {
    //a layer can be processe with matrices, inputs -> mat col, weight -> matrice rect
    return addingMatrices(multiplyMatrices(weights, inputs), biais)
}


//fonction de debogage pour tester 
document.addEventListener('keydown', function(event) {
    if (event.code == "Space") {
        a.jump = true;

    }
});


function RectCircleColliding(Cx, Cy, Cr, Rx, Ry, Rw, Rh) { //collision detection btw circle and rect
    var distX = Math.abs(Cx - Rx - Rw / 2);
    var distY = Math.abs(Cy - Ry - Rh / 2);

    if (distX > (Rw / 2 + Cr)) {
        return false;
    }
    if (distY > (Rh / 2 + Cr)) {
        return false;
    }

    if (distX <= (Rw / 2)) {
        return true;
    }
    if (distY <= (Rh / 2)) {
        return true;
    }

    var dx = distX - Rw / 2;
    var dy = distY - Rh / 2;
    return (dx * dx + dy * dy <= (Cr * Cr));
}

function randomG() { //gaussian
    var r = 0;
    var v = 4;
    for (var i = v; i > 0; i--) {
        r += Math.random();
    }
    return (r / v) * 2 - 1;
}



function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndColor() {
    var r = 255 * Math.random() | 0,
        g = 255 * Math.random() | 0,
        b = 255 * Math.random() | 0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


setup()