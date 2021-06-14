//<canvas onmousemove="MouseCoordonate(event);" class="neuronWeb" data-full_screen="true" width="800" height="500" data-number_orbs="100"></canvas>

var mousseX = -100;
var mousseY = -100;
var speedMultiplayer = 0.2;
var click = false;
var mooving = false;

function checkInstance(){
	var nameClassObjectCanvas = "MagicWand" //insert the class's name of canvas elements
    if(document.getElementsByClassName(nameClassObjectCanvas).length > 0){ 
        var documentInstanceOfObject = document.getElementsByClassName(nameClassObjectCanvas)

        if(typeof instanceMagicWand != "undefined"){  //Keep attention to change this name of variable
            
        }else{
            instanceMagicWand = [] //Keep attention to change this name of variable
        }

        for(var i = 0; i < documentInstanceOfObject.length; i++){
            if(documentInstanceOfObject[i].dataset.target != "true"){
                documentInstanceOfObject[i].dataset.target = "true"
                if(documentInstanceOfObject[i].getAttribute("id") == null){
                    documentInstanceOfObject[i].setAttribute("id", "unnameSnowflake" + i)
                }
                instanceMagicWand[i] = new magicWand(i, documentInstanceOfObject[i].id) //Keep attention to change this name of variable ; and change the name of the new object
            }
        }
    }
}

checkInstance(); //important to start the detection of canvas element

function UpdateDelteTime() {
    let now = Date.now()
    let dt = (now - lastUpdate) / 40
    lastUpdate = now

    return dt
}


function magicWand(theNumberOfMagicWandInstance, IDcanvas){
    
    this.setup = function(){
        this.IntervalFrameTime;
        this.IntervalFrameTimeMSactu = 10;
        this.IDcanvas = IDcanvas;
        this.theNumberOfMagicWandInstance = theNumberOfMagicWandInstance;
        this.canvas;
        this.ctx;
        this.fullScreen;
        this.colorBackground = "#111";

        this.mode= 1;
        this.M1Color = 19.35;
        this.mousseX = -100;
        this.mousseY = -100;

        this.click;
        this.clickCD = false;

        this.activate = false;

        this.collectionOfParticle = [];

        this.canvas = document.getElementById(this.IDcanvas);
        this.ctx = this.canvas.getContext("2d");


        this.mode = nb_random(1, 2);

        this.ctx.imageSmoothingEnabled = false;

        if (this.canvas.dataset.full_screen === "True") {
            //console.log(innerWidth - (innerWidth % symboleSize));
            this.body = document.getElementsByTagName('body')[0];
            this.canvas.height = window.innerHeight;
            this.canvas.width = this.body.clientWidth;
        }
        this.IntervalFrameTime = setInterval(this.frame, 10 , this.theNumberOfMagicWandInstance);

    }
    
    this.draw = function(){
        this.ctx.fillStyle = this.colorBackground; //met le plan en noir
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


        if (this.activate == false) { //to start 
            if (mousseX != 0 || mousseY != 0) {
                this.activate = true
            }
        }

        if (mooving) {
            speedMultiplayer = 0.2 
        } else {
            speedMultiplayer = 0.1 
        }
        mooving = false;

        if(click == false){
            this.clickCD = true;
        }

        if (click) {
            speedMultiplayer = 0.25
        }
        
        if (click && this.clickCD) {
            if (this.mode == 1) {
                this.M1Color = nb_random(0, 60) / 10;
            }
        }
        //console.log(click)
        if(click){
            this.clickCD = false
        }

        if (this.activate) {
            if (this.mode == 1) {
                this.collectionOfParticle.push(new this.Particle(this.ctx,this.mode, this.mousseX, this.mousseY, this.M1Color));
                if (click) {
                    this.collectionOfParticle.push(new this.Particle(this.ctx,this.mode, this.mousseX, this.mousseY, this.M1Color));
                }
            } else {
                this.collectionOfParticle.push(new this.Particle(this.ctx,this.mode, this.mousseX, this.mousseY));
                if (click) {
                    this.collectionOfParticle.push(new this.Particle(this.ctx,this.mode, this.mousseX, this.mousseY));
                }
            }
        }

        for (let i = 0; i < this.collectionOfParticle.length; i++) {
            this.collectionOfParticle[i].Update();
            this.collectionOfParticle[i].Draw();

            if (this.collectionOfParticle[i].deletable == true) {
                this.collectionOfParticle.splice(i, 1);
            }

        }
    }

    this.frame = function(theNumberOfMagicWandInstance){ //pour le démarrage 
        instanceMagicWand[theNumberOfMagicWandInstance].draw();
    }

    this.Particle = function(ctx, mode, PmousseX, PmousseY, SColor) {
        this.ctx = ctx;
        this.mode = mode
        this.size;
        this.direction;
        this.speed;
        this.posX = PmousseX;
        this.posY = PmousseY;
        this.maxTime = 100;
        this.timeCounter = 0;
        this.deletable = false;
        this.color;
        this.SpawnColor = SColor;
        this.lastUpdate = Date.now();
        this.deltaTime = 0;
        
        this.Init = function() {
            this.direction = nb_random(0, 360);
            this.speed = nb_random(1, 5);
            this.size = nb_random(4, 10);
        }

        this.UpdateDelteTime = ()=>{
            let now = Date.now()
            let dt = (now - this.lastUpdate) / 9
            this.lastUpdate = now
            return dt
        }
    
        this.Update = function() {
            this.deltaTime = this.UpdateDelteTime()

            this.timeCounter += 1*this.deltaTime*0.8;
            if (this.maxTime <= this.timeCounter) {
                this.deletable = true;
            }
            this.posX = this.posX + (this.speed * speedMultiplayer * this.deltaTime * Math.cos((this.direction * Math.PI) / 180));
            this.posY = this.posY + (this.speed * speedMultiplayer * this.deltaTime * Math.sin((this.direction * Math.PI) / 180));
        }
    
        this.Draw = function() {
            if (this.mode == 1) {
                this.color = "rgba(255, 255, 200," + (1 - this.timeCounter / 100) + ")";
                this.color = colorWheel(this.SpawnColor, 100, 0, (1 - this.timeCounter / 100));
            } else if (this.mode == 2) {
                var alpha = 1;
                if (this.timeCounter > 90) {
                    alpha = 1 - (this.timeCounter - 90) / 10;
                }
                this.color = colorWheel(this.timeCounter / 20 - 1, 50, 0, alpha)
            }
    
            this.ctx.beginPath();
            this.ctx.arc(this.posX, this.posY, this.size / 2, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    
        this.Init();
    }
    
    this.setup(); // start the setup fonction of the canvas
}




function changeFrameRateMagicWand(val){
    for (let i = 0; i < instanceMagicWand.length; i++) {
        clearInterval(instanceMagicWand[i].IntervalFrameTime)
        if(val != 0){
            instanceMagicWand[i].IntervalFrameTime = setInterval(instanceMagicWand[i].frame, val , instanceMagicWand[i].theNumberOfMagicWandInstance);
        }
        instanceMagicWand[i].IntervalFrameTimeMSactu = val;
    }
}

function getFrameRateMagicWand(){
    if(instanceMagicWand.length > 0){
        return instanceMagicWand[0].IntervalFrameTimeMSactu;
    }
    return 0;
}

function nb_random(min, max) { //fonction générant un nobre aléatoir  min et max inclue
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function MouseCoordonate(event) { //fonction permettant de récupérer les coordonnés x y de la souris sur la page
    if (event.clientX != 0 && event.clientY != 0) {
        mooving = true;
        mousseX = event.clientX
        mousseY = event.clientY

        for (let i = 0; i < instanceMagicWand.length; i++) {
            let offset = getPosition(document.getElementById(instanceMagicWand[i].IDcanvas))
            instanceMagicWand[i].mousseX = mousseX - offset[0]
            instanceMagicWand[i].mousseY = mousseY - offset[1]
        }
    }

}

function getPosition(element) //fonction pour avoir les coordonné x y d'un element dans la page
{
    var left = 0;
    var top = 0;
    var e = element;
    /*Tant que l'on a un élément parent*/
    while (e.offsetParent != undefined && e.offsetParent != null)
    {
        /*On ajoute la position de l'élément parent*/
        left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
        top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
        
        e = e.offsetParent;
    }
    return new Array(left,top);
}

function Click(bool) {
    click = bool;
}

function restartMagicWand(){

    for (let i = 0; i < instanceMagicWand.length; i++) {
        clearInterval(instanceMagicWand[i].IntervalFrameTime)
    }

    for (let i = 0; i < instanceMagicWand.length; i++) {
        instanceMagicWand[i].setup()
    }
    
}

function colorWheel(hue, saturation, darkness, alpha) { //saturation[0,255]
    /*
    var red = ( (Math.sin(hue) * 127 + 128) );
    var green = ( (Math.sin(hue + (2 * Math.PI / 3)) * 127 + 128) );
    var blue = ( (Math.sin(hue + (4 * Math.PI / 3)) * 127 + 128) )
    */

    var red = Math.round((Math.sin(hue) * 127 + 128));
    var green = Math.round((Math.sin(hue + (2 * 3.1415 / 3)) * 127 + 128)); //3.1415 is PI
    var blue = Math.round((Math.sin(hue + (4 * 3.1415 / 3)) * 127 + 128))

    if (saturation > 0) {
        if (red < saturation) {
            red = saturation
        }
        if (green < saturation) {
            green = saturation
        }
        if (blue < saturation) {
            blue = saturation
        }
    }

    //add darkness option

    return "rgb(" + red + "," + green + "," + blue + "," + alpha + ")";
}