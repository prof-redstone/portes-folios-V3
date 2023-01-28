var canvas;
var ctx;

var bgColor = "#222";
var drawColor = "#F22"

var w
var h
var mouseX = 0
var mouseY = 0
var lastmouseX = 0
var lastmouseY = 0
var mouseClick = false;

var captureImage = new Image();

var MainScreen;
var secondScreen;
var thirdScreen;

var time = 0;

// //test
// var imgSprite = new Image();
// imgSprite.src = "ppAI.png";

function setup() { //fonction de setup executer 1 fois 
    canvas = document.getElementById("ScreenFractal");
    ctx = canvas.getContext("2d");

    body = document.getElementsByTagName('html')[0];
    canvas.height = body.clientHeight;
    canvas.width = body.clientWidth;
    w = canvas.width
    h = canvas.height
    ctx.lineCap = 'round';


    MainScreen = new Screen();
    let space = 60;
    MainScreen.initMain(space, space, w-(space*2), h-(space*2));

    secondScreen = new Screen();
    secondScreen.init(100,100,0.7,0.5);

    thirdScreen = new Screen();
    thirdScreen.init(400,200,0.8,-0.4);


    MainScreen.capture()
    //captureImage = imgSprite;

    //rotateAndPaintImage(ctx, imgSprite, 0.2, 200, 100, 20, 30);

    IntervalTime = setInterval(loop, 50);
}

function loop() {
    ctx.fillStyle = bgColor
    ctx.strokeStyle = "#FFF";
    //ctx.clearRect(0,0,w,h);

    MainScreen.render()
    secondScreen.render();
    thirdScreen.render();
    ctx.fillStyle = "rgba(0,0,0,0.01)"
    ctx.fillRect(0,0,w,h);
    draw();
    MainScreen.capture();
    setTimeout(() => {
        
    MainScreen.drawBorder();
    secondScreen.drawBorder();
    thirdScreen.drawBorder();
    }, 30);
    time ++;

    //secondScreen.x =100+ 20*Math.cos(time/10)
}

function draw() {
    let drawMode = mouseClick;
    if (drawMode) {
        ctx.fillStyle = drawColor;
        ctx.beginPath();
        //ctx.arc(mouseX, mouseY, 50, 0, 2 * 3.1415);
        ctx.moveTo(lastmouseX,lastmouseY);
        ctx.lineTo(mouseX, mouseY);
        ctx.lineWidth = 100;
        ctx.stroke()
    }
}


function Screen() {
    this.x;
    this.y;
    this.w;
    this.h;
    this.angle; //angle
    this.scale;

    this.initMain = function(x, y, w, h) {
        this.scale = 1;
        this.angle = 0;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    this.init = function(x, y, s, a) {
        this.scale = s;
        this.angle = a;
        this.x = x;
        this.y = y;
        this.w = MainScreen.w * this.scale;
        this.h = MainScreen.h * this.scale;

    }

    this.render = function() {
        rotateAndPaintImage(ctx, captureImage, this.angle, this.x, this.y, this.w, this.h, MainScreen.x, MainScreen.y, MainScreen.w, MainScreen.h);
    }

    this.capture = function() {
        captureImage.src = canvas.toDataURL('image/png')
    }

    this.drawBorder = function() {
        ctx.lineWidth = 1;
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate(this.angle);

        ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);

        ctx.rotate(-this.angle);
        ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
    }
}

function rotateAndPaintImage(context, image, angle, dX, dY, dW, dH, sX, sY, sW, sH) {
    context.translate(dX + dW / 2, dY + dH / 2);
    context.rotate(angle);
    context.drawImage(image, sX, sY, sW, sH, -dW / 2, -dH / 2, dW, dH);
    context.rotate(-angle);
    context.translate(-(dX + dW / 2), -(dY + dH / 2));
}


function MouseCoordonate(event) { //fonction permettant de récupérer les coordonné x y de la souris sur la page
    lastmouseX = mouseX
    lastmouseY = mouseY
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function MouseDown(event) {
    mouseClick = true;
}

function MouseUp(event) {
    mouseClick = false;
}














setup()