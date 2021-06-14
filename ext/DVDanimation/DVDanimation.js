var color = 0; //600 max
var frameCounter = 0;

var positionX = 100;
var positionY = 0;
var height = 549;
var width = 1220;
var size = 0.3;
var speedX = 5;
var speedY = 5;


var DVDr = new Image();
DVDr.src = "DVDr.png";

var DVDg = new Image();
DVDg.src = "DVDg.png";

var DVDb = new Image();
DVDb.src = "DVDb.png";

function setup(){ //fonction de setup executer 1 fois 
    canvas = document.getElementById("DVDanimation");
    ctx = canvas.getContext("2d");

    //ctx.imageSmoothingEnabled = false;

    if(canvas.dataset.full_screen === "True"){
       // body = document.getElementsByTagName('body')[0];
        //canvas.height = body.clientHeight;
        //canvas.width = body.clientWidth;
        canvas.width = innerWidth
        canvas.height = innerHeight
    }


    IntervalTime = setInterval(draw, 30);
}

function draw(){ //fonction executer en boucle 
    ctx.filter = 'blur(0px)';
    ctx.fillStyle = "#050905"; //met le plan en noir
    ctx.globalAlpha = 0.8;
    ctx.fillRect(0,0,canvas.width,canvas.height);



    //ctx.drawImage(DVDr, 100,0,width * size, height * size);
    ctx.filter = 'blur(2px)';
    if(frameCounter >= 0 && frameCounter < 100){
        ctx.globalAlpha = 1 - (frameCounter/100 - 0);
        ctx.drawImage(DVDg, positionX, positionY, width * size, height * size);
        ctx.globalAlpha = 1;
        ctx.drawImage(DVDb, positionX-3, positionY, width * size, height * size);
        ctx.globalAlpha = frameCounter/100
        ctx.drawImage(DVDr, positionX+3, positionY, width * size, height * size);
    }
    if(frameCounter >= 100 && frameCounter < 200){
        ctx.globalAlpha = 1 - (frameCounter/100 - 1);
        ctx.drawImage(DVDb, positionX-3, positionY, width * size, height * size);
        ctx.globalAlpha = 1;
        ctx.drawImage(DVDr, positionX+3, positionY, width * size, height * size);
        ctx.globalAlpha = frameCounter/100 - 1
        ctx.drawImage(DVDg, positionX, positionY, width * size, height * size);
    }
    if(frameCounter >= 200 && frameCounter <= 300){
        ctx.globalAlpha = 1 - (frameCounter/100 - 2);
        ctx.drawImage(DVDr, positionX+3, positionY, width * size, height * size);
        ctx.globalAlpha = 1;
        ctx.drawImage(DVDg, positionX, positionY, width * size, height * size);
        ctx.globalAlpha = frameCounter/100 - 2
        ctx.drawImage(DVDb, positionX-3, positionY, width * size, height * size);
    }
    
    frameCounter += 0.5
    if(frameCounter > 300){frameCounter = 0}

    positionX += speedX;
    positionY += speedY;

    if(positionX + width*size > canvas.width){
        speedX *= -1
    }
    if(positionX < 0){
        speedX *= -1
    }
    if(positionY + height*size > canvas.height){
        speedY *= -1
    }
    if(positionY < 0){
        speedY *= -1
    }
}

function nb_random(min, max){ //fonction générant un nobre aléatoir  min et max inclue
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}



setup();