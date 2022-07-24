var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var W = 400;
var H = 700;
ctx.canvas.width = W;
ctx.canvas.height = H;

var time = 0;


var nbBird = 100; //multiple de 2 pls
var listbird = []

var collecGene = []
var timeGeneation = 500;
var ratioMuteGene = 30;


//number of neurone for each layer, first is input, last is output
var patternLayer = [4, 3, 3, 1]

for (let i = 0; i < nbBird; i++) {
    listbird[i] = new bird()
    listbird[i].init()
}


//la boite noir qu'il faut toucher au maximum
var g = new goal()
g.reset()

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


    time++;

    if (time % timeGeneation == 0) {
        //end generation, get best gene score, and reproduce to make better generation
        /*
        1 copi de gene
        2 tri en F des scores
        3 supprimer les plus nuls
        4 dupli de la moitié + modif
        */

        //1
        collecGene = [];
        for (let i = 0; i < listbird.length; i++) {
            collecGene[i] = [deepCopyFunction(listbird[i].score), deepCopyFunction(listbird[i].gene)]
        }

        //2
        sort(collecGene)

        //3 , on supprime la moitie des birds pour garder que les meilleurs
        for (let i = 0; i < listbird.length / 2; i++) {
            collecGene.pop()
        }

        //4
        for (let i = 0; i < listbird.length / 2; i++) { //premiere moitie, on redonne les genes
            listbird[i].setGene(collecGene[i][1])
        }
        for (let i = 0; i < listbird.length / 2; i++) { //seconde moitie, on donnes les meme genes mais on les mutes
            listbird[i + listbird.length / 2].setGene(collecGene[i][1])
            listbird[i + listbird.length / 2].mutateGene();
        }

        //nouveau depart, normalement meilleur.
        for (let i = 0; i < listbird.length; i++) {
            listbird[i].reset();
        }

    }

}



function bird() {
    this.x = 30
    this.y = H/2
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

    this.reset = function(){
        this.y = H/2;
        this.score = 0;
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

    this.setGene = function(newGene) {
        this.gene = deepCopyFunction(newGene);
    }

    this.mutateGene = function() {
        for (let i = 0; i < this.gene.length; i++) { // each layer
            //each weight
            for (let j = 0; j < this.gene[i][0].length; j++) {
                for (let k = 0; k < this.gene[i][0][j].length; k++) {
                    this.gene[i][0][j][k] += randomG() / ratioMuteGene;
                }
            }

            //each biais
            for (let j = 0; j < this.gene[i][1].length; j++) {
                this.gene[i][1][j][0] += randomG() / ratioMuteGene;
            }
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
        this.y = nb_random(30, H - this.h - 30)
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

//fonction qui fait une copie profonde d'un array, parfaitement dupliqué sans ref
const deepCopyFunction = (inObject) => {
    let outObject, value, key

    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
        value = inObject[key]

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopyFunction(value)
    }

    return outObject
}

function sort(arr) {
    const byValueInvert = (a, b) => b[0] - a[0];
    return arr.sort(byValueInvert);
}


setup()