var canvas;
var ctx;
var H;
var W;

var time;

var mode = 'road' //change after when the road is finally edited

var mousebtndown = false;
var mousePos = [];

var roadPoint = [];
var spawnPoint = [undefined, undefined];
var finishPoint = [undefined, undefined];

var cars = new car();
cars.init()

function setup() {
    var canvas = document.getElementById("IAcarsNeuroevolution");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;
    time = 0;

    setInterval(loop, 30);
}


function loop() {
    ctx.clearRect(0, 0, W, H)

    if (mode == 'road') {
        RoadEdit();
    }

    //draw road
    for (let i = 0; i < roadPoint.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(roadPoint[i][0], roadPoint[i][1]);
        ctx.lineTo(roadPoint[i + 1][0], roadPoint[i + 1][1]);
        ctx.stroke();
    }

    //draw spawn and finish point
    ctx.beginPath();
    ctx.arc(spawnPoint[0], spawnPoint[1], 5, 0, 6)
    ctx.fillStyle = "#F00";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(finishPoint[0], finishPoint[1], 5, 0, 6)
    ctx.fillStyle = "#0F0";
    ctx.fill();


    if (mode == "training") {
        if (time % 500 == 0) {
            cars.reset()
        }

        cars.render();
        cars.update();
        cars.collision();
        cars.sensorsUpdate();

        time++
    }
}

function car() {
    this.x;
    this.y;
    this.angle;
    this.gene = [];
    this.score;
    this.alive;
    this.timeAlive;
    this.color;
    this.maxLenghtSensor;

    //const
    this.speed;
    this.speedRot;
    this.sensorsAngle = []; //angle btw sensors and orientation, + indicate nb of sensor

    // output
    this.turn; //-1 left, 0 forward, 1 right

    //input
    this.sensors = []; //the value of sensors

    this.init = function() {
        this.color = getRndColor();
        this.speed = 2;
        this.speedRot = 0.05;
        this.turn = 0;
        this.maxLenghtSensor = 300;
        this.sensorsAngle = [-1.57, -0.78, 0, 0.78, 1.57]; //in rad
        //this.gene = getGene();
        this.reset()
    }

    this.reset = function() {
        this.alive = true;
        this.x = spawnPoint[0];
        this.y = spawnPoint[1];
        this.angle = 0;
        this.score = 0;
        this.timeAlive = 0;
    }

    this.update = function() {
        if (this.alive) {
            this.x += this.speed * Math.cos(this.angle)
            this.y += this.speed * Math.sin(this.angle)
            this.angle += this.turn * this.speedRot
            this.timeAlive ++;
        }
    }

    this.collision = function() {
        for (let i = 0; i < roadPoint.length - 1; i++) {
            if (lineCircle(roadPoint[i][0], roadPoint[i][1], roadPoint[i + 1][0], roadPoint[i + 1][1], this.x, this.y, 10)) {
                this.alive = false;
            }
        }
    }

    this.sensorsUpdate = function() {
        for (let i = 0; i < this.sensorsAngle.length; i++) {
            let dist = 0;
            for (let j = 0; j < roadPoint.length - 1; j++) {
                let newDist = SensorCollision(
                    this.x,
                    this.y,
                    this.x + this.maxLenghtSensor * Math.cos(this.angle + this.sensorsAngle[i]),
                    this.y + this.maxLenghtSensor * Math.sin(this.angle + this.sensorsAngle[i]),
                    roadPoint[j][0],
                    roadPoint[j][1],
                    roadPoint[j + 1][0],
                    roadPoint[j + 1][1],
                );
                if (newDist > dist) {
                    dist = newDist;
                }

            }

            this.sensors[i] = dist;
        }
    }

    this.render = function() {
        //ball
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 6);
        ctx.fill();

        //litle line pointer direction
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 20 * Math.cos(this.angle), this.y + 20 * Math.sin(this.angle));
        ctx.stroke();

        //sensors
        for (let i = 0; i < this.sensorsAngle.length; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + (1 - this.sensors[i]) * this.maxLenghtSensor * Math.cos(this.angle + this.sensorsAngle[i]), this.y + (1 - this.sensors[i]) * this.maxLenghtSensor * Math.sin(this.angle + this.sensorsAngle[i]));
            ctx.stroke();
        }
    }

    this.processe = function() {

    }

    this.getScore = function(){
        let distToGoal = Math.sqrt((this.x - finishPoint[0])*(this.x - finishPoint[0]) + (this.y - finishPoint[1])*(this.y - finishPoint[1]));
        let distOfStartToGoal = Math.sqrt((spawnPoint[0] - finishPoint[0])*(spawnPoint[0] - finishPoint[0]) + (spawnPoint[1] - finishPoint[1])*(spawnPoint[1] - finishPoint[1]));
        let proportionScore = 1;
        return (distOfStartToGoal - distToGoal)*proportionScore + this.timeAlive;
    }

}

function RoadEdit(option) {
    if (option != undefined) {
        if (option[0] == "mousedown" && mode == "road") {
            roadPoint.push([option[1], option[2]])
        }
    }
}


addEventListener('mousedown', (event) => {
    mousebtndown = true;
    RoadEdit(["mousedown", event.clientX, event.clientY])
});

addEventListener('mouseup', (event) => {
    mousebtndown = false;
    RoadEdit(["mouseup"])
});

document.addEventListener('keydown', function(event) {
    if (mode == "road") {
        if (event.keyCode == 83) { //s for spawn point
            spawnPoint = [mousePos[0], mousePos[1]];
        } else if (event.keyCode == 70) { //f for finish point
            finishPoint = [mousePos[0], mousePos[1]];
        } else if (event.keyCode == 32) { //space to start
            mode = "training";
        }
    } else if (mode == 'training') {
        if (event.keyCode == 37) { //left for debug
            cars.turn = -1
        } else if (event.keyCode == 39) { //right for debug
            cars.turn = 1
        } else if (event.keyCode == 32) { //space to start
            mode = "road";
        }
    }
});

document.addEventListener('keyup', function(event) {
    if (mode == 'training') {
        if (event.keyCode == 37) { //left for debug
            if (cars.turn == -1) {
                cars.turn = 0
            }
        } else if (event.keyCode == 39) { //right for debug
            if (cars.turn == 1) {
                cars.turn = 0
            }
        }
    }
});


addEventListener("mousemove", (event) => {
    mousePos = [event.clientX, event.clientY]
});


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

//Line to line collision detector modified
function SensorCollision(x1, y1, x2, y2, x3, y3, x4, y4) {

    // calculate the distance to intersection point
    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

        // optionally, draw a circle where the lines meet
        let intersectionX = x1 + (uA * (x2 - x1));
        let intersectionY = y1 + (uA * (y2 - y1));

        let dist = Math.sqrt((x1 - intersectionX) * (x1 - intersectionX) + (y1 - intersectionY) * (y1 - intersectionY));
        //normalize lenght btw 0 and 1
        dist = dist / (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
        //invert, lim -> 1 quand + en + proche du mur
        dist = 1 - dist;

        return dist;
    }
    return 0;
}

function sort(arr) {
    const byValueInvert = (a, b) => b[0] - a[0];
    return arr.sort(byValueInvert);
}



setup()