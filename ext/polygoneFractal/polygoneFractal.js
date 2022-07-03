console.log("oui")

var listePoints = [];
var nbPoints = 4;
var size = 400;

var pos;
var loopPerFrame = 1000;
var lastPoint = 0;
var changePoint = true

function setup() {
    createCanvas(2*size, 2*size);
    pos = createVector(0, 0);
    strokeWeight(1);
    for (var i = 0; i < nbPoints; i++) {
        listePoints[i] = createVector(cos(i * ((2 * PI) / nbPoints)), sin(i * ((2 * PI) / nbPoints)));
    }
}

function draw() {
    translate(width / 2, height / 2);
    rotate(-PI/2)
    for (let i = 0; i < loopPerFrame; i++) {
        var last = pos;
        var point;
        do {
            point = floor(random(0, nbPoints));
        } while (point == lastPoint && changePoint);
        lastPoint = point;
        pos = createVector( (pos.x + listePoints[point].x)/2, (pos.y + listePoints[point].y)/2);
        drawPoint(pos);
    }
}

function drawPoint(p) {
    //console.log(p)
    line(floor(p.x * size), floor(p.y * size), floor(p.x * size) + 1, floor(p.y * size) + 1);
}