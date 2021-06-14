var canvas;
var ctx;   

var ColorBackground = "#111";
var opacityApparition = 0.2; 

var mousseX = 0;
var mousseY = 0;
var click; 
var mooving;

var activate = false;


const listSymboleMatrix = ["{","}","<","-","*",":","+","#","=",">","ç","Z","_","\"","1", "2", "3","4","5","6","7","8","9","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ","ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ","ｹ","ﾒ","ｴ","ｶ","ｷ","ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ","ｦ","ｲ","ｸ","ｺ","ｿ","ﾁ","ﾄ","ﾉ","ﾌ","ﾔ","ﾖ","ﾙ","ﾚ","ﾛ","ﾝ"];
var mode = "every";
var frameCounter = 0;
var symboleSize = 25;
var symboleSpace = 15;

var lastSpawnX;

let lastUpdate = Date.now();
let deltaTime = 0;

var symbols = []; //tableau qui contient les symbole

var listStream = []; //tableau de stream

var IntervalTime;


function setup(){ //fonction de setup executer 1 fois 
    canvas = document.getElementById("MatrixWand");
    ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;

    ctx.font = symboleSize + "px Arial";
    ctx.textAlign ="start";


    if(canvas.dataset.full_screen === "True"){
        //console.log(innerWidth - (innerWidth % symboleSize));
        body = document.getElementsByTagName('body')[0];
        canvas.height = innerHeight;
        canvas.width = innerWidth;
    }

    IntervalTime = setInterval(LoopMatrixWand, 35);
}

function UpdateDelteTime() {
    let now = Date.now()
    let dt = (now - lastUpdate) / 40
    lastUpdate = now

    return dt
}

function LoopMatrixWand(){
    deltaTime = UpdateDelteTime()

    ctx.fillStyle = ColorBackground; //met le plan en noir
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if(activate == false){ //to start programme when the mouss move
        if(mousseX != 0 || mousseY != 0){
            activate = true
        }
    }

    if(mooving){ //if mouss move on screeen
        //speedMultiplayer = 0.2
        //listStream.push(new Stream(mousseX, mousseY));
        if(Math.floor(mousseX/symboleSpace) != lastSpawnX){
            lastSpawnX = Math.floor(mousseX/symboleSpace);
            listStream.push(new Stream(Math.floor(mousseX/symboleSpace) * symboleSpace, mousseY));
        }
    }else{
        //speedMultiplayer = 0.1
    }
    mooving = false;

    if(click){ //if mouss click
        //speedMultiplayer = 0.25;
        //new Stream(mousseX, mousseY)
    }

    if(activate){ 
    }


    ctx.font = symboleSize + "px Arial";
    ctx.textAlign ="start";

    for(var i = 0; i < symbols.length; i ++){
        symbols[i].changeSymbol();
        symbols[i].move();
        symbols[i].render();

        if(symbols[i].deletable){
            symbols.splice(i, 1);
        }
    }

    for(var i = 0; i < listStream.length; i++){
        if(listStream[i].deletable){
            listStream.splice(i, 1);
        }
    }

    frameCounterAdd(); //incrémente le conteur de frame de 1

}

function Stream(x, y) {
    this.totalSymbols = nb_random(5, 15); //nombre total de symboles que contient le stream
    this.speed = nb_random(5,15); //vitesse de chute
    this.x = x; //position vertical
    this.y = y;
    this.deletable = false;

    for(var i = 0; i < this.totalSymbols; i ++){
        var newSymbole = new Symbol(this.x, this.y - symboleSize*i, this.speed, i, i/this.totalSymbols, this.y); //i/this.totalSymbols pour avoir un dégradé du début à la fin
        newSymbole.setToRandomSymbol();
        symbols.push(newSymbole);
    }

    this.deletable = true;
}


function Symbol(x, y, speed, first, opacité, YtoShow){
    this.x = x;
    this.y = y;
    this.value; //symbole
    this.speed = speed; 
    this.opacity = opacité ;
    this.YtoShow = YtoShow;
    this.switchInterval = nb_random(2,15); //interval de temps à la quel il change de symbole
    this.first = first; //couleur blanche de premier positon
    this.whiteColor = false; //white if he is the first
    this.opacityApparition = 1;
    this.deletable = false;

    if(this.first == 0){ //une chance/3 que le caractere en première position soit blanc
        var a = nb_random(0,2);
        if(a == 0){
            this.whiteColor = true;
        }
    }

    this.changeSymbol = function() { //a un certain interval on change de caractere
        if(frameCounter % this.switchInterval == 0){
            this.setToRandomSymbol();
        }
    }

    this.setToRandomSymbol = function(){
        if(mode == "binary"){
            this.value = listBinary[nb_random(0,listBinary.length - 1)];
        }else if(mode == "number"){
            this.value = nb_random(0, 9999)
        }else if(mode == "every"){
            this.value = symboleEvery();
        }
    }

    this.render = function(){
        if(this.opacityApparition > 0 && this.y > this.YtoShow){
            this.opacityApparition =  this.opacityApparition - opacityApparition;
        }

        if(this.whiteColor == true){
            ctx.fillStyle = "#AFA";
            ctx.fillStyle = "rgba(170, 255, 170, " + (( 1 - this.opacity) - this.opacityApparition) + ")";
            ctx.fillText(this.value, this.x, this.y);
        }else{
            ctx.fillStyle = "#0F0"; 
            ctx.fillStyle = "rgba(0, 255, 60, " + (( 1 - this.opacity) - this.opacityApparition) + ")";
            ctx.fillText(this.value, this.x, this.y);
        }
    }

    this.move = function() {  
        if(this.y >= canvas.height + symboleSize){  //en bas de l'ecrans
            this.deletable = true;
        }else{
            this.y += this.speed * deltaTime;
        } 
    }

}

function changeFrameRateMatrixWand(val){
    clearInterval(IntervalTime)
    if(val != 0){
        IntervalTime = setInterval(LoopMatrixWand, val);
    }
    //IntervalTimeMatrixMSactu = val;
}

function frameCounterAdd(){ //conteur de frame qui permet de changer le caractère du symbole
    frameCounter ++ ;
    if(frameCounter > 200){
        frameCounter = 0;
    }
}

function symboleEvery(){
    var typeOfSymb = nb_random(0,listSymboleMatrix.length - 1);
    return listSymboleMatrix[typeOfSymb]
}

function nb_random(min, max){ //fonction générant un nobre aléatoir  min et max inclue
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function MouseCoordonate(event){ //fonction permettant de récupérer les coordonnés x y de la souris sur la page
    if(event.clientX != 0 && event.clientY != 0){
        mooving = true;
        mousseX = event.clientX 
        mousseY = event.clientY 
    }

}

function Click(bool){
    click = bool;
    if(click){
        
    }
}


function colorWheel(hue, saturation, darkness, alpha){ //saturation[0,255]
    /*
    var red = ( (Math.sin(hue) * 127 + 128) );
    var green = ( (Math.sin(hue + (2 * Math.PI / 3)) * 127 + 128) );
    var blue = ( (Math.sin(hue + (4 * Math.PI / 3)) * 127 + 128) )
    */
    
    var red = Math.round( (Math.sin(hue) * 127 + 128) );
    var green = Math.round( (Math.sin(hue + (2 * 3.1415 / 3)) * 127 + 128) ); //3.1415 is PI
    var blue = Math.round( (Math.sin(hue + (4 * 3.1415 / 3)) * 127 + 128) )
    
    if(saturation > 0){
        if(red < saturation){red = saturation}
        if(green < saturation){green = saturation}
        if(blue < saturation){blue = saturation}
    }

    //add darkness option

    return "rgb(" + red + "," + green + "," + blue + "," + alpha + ")";
}

setup();