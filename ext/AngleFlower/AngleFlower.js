var canvas;
var ctx;
var H = 0;
var W = 0;

var posX = 0;
var posY = 0;
var zoom = 1;
var angle = 0;
var length = 3; //size of first seg
var stepByFrame = 10000; //nb de seg

var time = 1; //change on each frame
let state = 1; //change for each little segment

let waveCollection = []; //collection de fonction sin pour faire somme de fourier
noise.seed(Math.random()); //init de perlin noise

function setup() {
    canvas = document.getElementById("angleFlower")
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;

    posX = W / 2;
    posY = H / 2;


    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#FFF";

    for (let i = 0; i < 3; i++) {
        waveCollection.push(new wave());
    }

    setInterval(loop, 10);
}

function loop() {
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < waveCollection.length; i++) {
        waveCollection[i].update(0.1, 0.2, 0.3, 0.4); //4 param diff pour avoir des vals diff
    }

    let lastX = posX;
    let lastY = posY;

    //pour centrer la figure, moyenne de certain point et recentrage pour la prochaine
    let moyenneX = 0;
    let moyenneY = 0;
    let moyenneSize = 0;
    let moyenneCount = 0;

    for (let i = 0; i < stepByFrame; i++) {

        ctx.beginPath();
        ctx.moveTo(posX*zoom + (W / 2), posY*zoom + (H / 2));
        posX += Math.cos((angle) * 3.1415926 / 180) * length * Math.exp(-state / 5000);
        posY += Math.sin((angle) * 3.1415926 / 180) * length * Math.exp(-state / 5000);
        ctx.lineTo(posX*zoom + (W / 2), posY*zoom + (H / 2));
        ctx.stroke();

        angle += AngleAdder(state);

        if(i%50 == 0){
            moyenneX += posX;
            moyenneY += posY;
            moyenneSize += Math.sqrt(posX*posX + posY*posY);
            moyenneCount++;
        }

        state++;
    }

    zoom = ((H/2)/(moyenneSize/moyenneCount))/5;
    posX = (lastX - moyenneX/moyenneCount);//pour centrer la figure
    posY = (lastY - moyenneY/moyenneCount);
    angle = 0;
    time++;
    state = 0;

}



function AngleAdder(s) {
    let step = s / 50
    let a = 0;
    for (let i = 0; i < waveCollection.length; i++) {
        a += waveCollection[i].get(step);
    }
    a *= 0.2; //size mult
    return a;
}


function wave() {
    //4 parametre for sin wave
    this.a = 1;
    this.b = 1;
    this.c = 1;
    this.d = 1;

    this.get = function(x) {
        return Math.sin(x * this.a*0.1 + this.b) * this.c *1.5 + this.d / 1.5;
    }

    this.update = function(a = 1, b = 1, c = 1, d = 1) {
        this.a = noise.perlin2(a, time / 7000 + 0.001) * 10;
        this.b = noise.perlin2(b, time / 7000 + 0.001) * 10;
        this.c = noise.perlin2(c, time / 70000 + 0.001) * 5;
        this.d = noise.perlin2(d, time / 7000 + 0.001) * 10;
    }
}


setup() // start animation