var canvas;
var ctx;
var w;
var h;


let dt = 0.01;
let scale = 15;
let pathLength = 150;

let nbDot = 250;
let dotCollec = []

let time = 0;
let angleSpeed = 200;

let attractorType = "lorenz";



function setup() { //fonction de setup executer 1 fois 
    canvas = document.getElementById("LorenzAttractor");
    ctx = canvas.getContext("2d");

    body = document.getElementsByTagName('html')[0];
    canvas.height = body.clientHeight;
    canvas.width = body.clientWidth;
    w = canvas.width;
    h = canvas.height;

    for (let i = 0; i < nbDot; i++) {
        dotCollec[i] = new Dot();
        dotCollec[i].init();
    }

    initParam();

    setInterval(loop, 10);
}

function initParam(){
    if (attractorType == "lorenz") {
        dt = 0.01;
        scale = 15;
        angleSpeed = 200;
        pathLength = 150;
    }
    if (attractorType == "halvorsen") {
        dt = 0.003;
        scale = 20;
        angleSpeed = 200;
        pathLength = 150;
    }
    if (attractorType == "aizawa") {
        dt = 0.01;
        scale = 200;
        angleSpeed = 400;
        pathLength = 100;
    }
}


function loop() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "rgba(255,255,255,0.2)"
    for (let i = 0; i < nbDot; i++) {
        dotCollec[i].update();
        //console.log(dotCollec[i].path)
        ctx.beginPath();
        //ctx.moveTo((dotCollec[i].path[dotCollec[i].indexPath][0]) * scale + w / 2, (dotCollec[i].path[dotCollec[i].indexPath][1]) * scale + h / 2);
        for (let j = 0; j < pathLength - 1; j++) {
            let x = (dotCollec[i].path[(dotCollec[i].indexPath + j) % (pathLength)][0]);
            let y = (dotCollec[i].path[(dotCollec[i].indexPath + j) % (pathLength)][1]);
            let z = (dotCollec[i].path[(dotCollec[i].indexPath + j) % (pathLength)][2]);
            ctx.lineTo((Math.cos(time / angleSpeed) * x + Math.sin(time / angleSpeed) * z) * scale + w / 2, (y) * scale + h / 2);
        }
        ctx.stroke();
    }

    time++;
}


function Dot() {
    this.x;
    this.y;
    this.z;

    this.path = [];
    this.indexPath = 0;


    this.init = function() {
        this.x = 0 + nb_random(0, 1000) / 10000;
        this.y = 0 + nb_random(0, 1000) / 10000;
        this.z = 0 + nb_random(0, 1000) / 10000;
        for (let i = 0; i < pathLength; i++) {
            this.path[i] = [this.x, this.y, this.z];
        }
    }

    this.update = function() {
        let res = attractor(this.x, this.y, this.z, attractorType);
        this.x = res[0];
        this.y = res[1];
        this.z = res[2];
        if (isNaN(this.x)) {
            this.init()
        }
        if (isNaN(this.y)) {
            this.init()
        }
        if (isNaN(this.z)) {
            this.init()
        }

        this.path[this.indexPath] = [this.x, this.y, this.z];
        this.indexPath = (this.indexPath >= pathLength - 1) ? 0 : this.indexPath + 1;
    }
}

function attractor(x, y, z, type) {

    let nx;
    let ny;
    let nz;

    let dx;
    let dy;
    let dz;
    if (type == "lorenz") {
        let a = 10;
        let b = 18;
        let c = 8 / 3;

        dx = a * (y - x);
        dy = b * x - y - x * z;
        dz = x * y - c * z;
    }
    if (type == "halvorsen") {
        let a = 1.4;

        dx = -a * x - 4 * y - 4 * z - y * y;
        dy = -a * y - 4 * z - 4 * x - z * z;
        dz = -a * z - 4 * x - 4 * y - x * x;
    }
    if (type == "aizawa") {
        let a = 0.95;
        let b = 0.7
        let c = 0.6
        let d = 3.5
        let e = 0.25
        let f = 0.1

        dx = (z - b) * x - d * y;
        dy = d * x + (z - b) * y;
        dz = c + a * z - z * z * z / 3 - (x * x + y * y) * (1 + e * z) + f * z * x * x * x;
    }

    nx = x + dx * dt;
    ny = y + dy * dt;
    nz = z + dz * dt;

    return [nx, ny, nz];
}

function change(){
    if(attractorType == "lorenz"){
        attractorType = "halvorsen";
    }else if(attractorType == "halvorsen"){
        attractorType = "aizawa";
    }else if(attractorType == "aizawa"){
        attractorType = "lorenz";
    }

    initParam();

    for (let i = 0; i < nbDot; i++) {
        dotCollec[i].init();
    }

    console.log("Attractor :",attractorType);
}

console.log("Execute change() on the console to change the attractor type");

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setup()