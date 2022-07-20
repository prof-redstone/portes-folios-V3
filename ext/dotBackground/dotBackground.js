var canvas
var ctx;
var H = 0;
var W = 0;
var space = 30;

var nbX = 0;
var nbY = 0;

var time = 0;

var coll = []

noise.seed(Math.random());

function setup() {
    canvas = document.getElementById("dotBackground")
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;
    ctx.fillStyle = "#0F1E3D";
    ctx.strokeStyle = "#897E58";

    nbX = W/space;
    nbY = H/space;


    setInterval(loop, 50);
}


function loop() {
    //ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = "#111";
    ctx.fillRect(0,0,W,H)

    for (let i = 0; i < nbX; i++) {
        for (let j = 0; j < nbY; j++) {
            //chut ça marche et fait un truc stylé
            ctx.fillStyle = colorWheel(i/30 + triangle(time/50,3)*j/20 + time/30 ,1,0, (noise.simplex3(i/20, j/20, time/200)+0.5)*2 -0.5 + triangle(time/200,3)*3)
            ctx.fillRect(i*space,j*space,2,2);
        }
    }



    time++;
}

function triangle(x, r){//generate triangle wave
    return Math.abs((x%r)-r/2)-r/4
}

function colorWheel(hue, saturation, darkness, alpha) {
    var red
    var green
    var blue

    hue = hue % 6;

    if (hue >= 0 && hue < 1) {
        red = 255
        green = hue * 255
        blue = 0;
    } else if (hue >= 1 && hue < 2) {
        green = 255
        red = 255 - ((hue - 1) * 255)
        blue = 0;
    } else if (hue >= 2 && hue < 3) {
        green = 255
        blue = (hue - 2) * 255
        red = 0;
    } else if (hue >= 3 && hue < 4) {
        blue = 255
        green = 255 - ((hue - 3) * 255)
        red = 0;
    } else if (hue >= 4 && hue < 5) {
        blue = 255
        red = (hue - 4) * 255
        green = 0;
    } else if (hue >= 5 && hue < 6) {
        red = 255
        blue = 255 - ((hue - 5) * 255)
        green = 0;
    }

    var sat = saturation / 100;
    red = red + (255 - red) * sat;
    green = green + (255 - green) * sat;
    blue = blue + (255 - blue) * sat;

    var dark = (100 - darkness) / 100;
    red = red * dark
    green = green * dark;
    blue = blue * dark;

    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}


setup()