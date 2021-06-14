//<canvas onmousemove="MouseCoordonate(event);" class="neuronWeb" data-full_screen="true" width="800" height="500" data-number_orbs="100"></canvas>

function checkInstance(){
	var nameClassObjectCanvas = "neuronWeb" //insert the class's name of canvas elements
    if(document.getElementsByClassName(nameClassObjectCanvas).length > 0){ 
        var documentInstanceOfObject = document.getElementsByClassName(nameClassObjectCanvas)

        if(typeof instanceNeuronWeb != "undefined"){  //Keep attention to change this name of variable
            
        }else{
            instanceNeuronWeb = [] //Keep attention to change this name of variable
        }

        for(var i = 0; i < documentInstanceOfObject.length; i++){
            if(documentInstanceOfObject[i].dataset.target != "true"){
                documentInstanceOfObject[i].dataset.target = "true"
                if(documentInstanceOfObject[i].getAttribute("id") == null){
                    documentInstanceOfObject[i].setAttribute("id", "unnameSnowflake" + i)
                }
                instanceNeuronWeb[i] = new neuronWeb(i, documentInstanceOfObject[i].id) //Keep attention to change this name of variable ; and change the name of the new object
            }
        }
    }
}


function neuronWeb(theNumberOfNeuronWebInstance, IDcanvas){
    this.IntervalFrameTime;
    this.IDcanvas = IDcanvas;
    this.canvas;
    this.ctx;
    this.theNumberOfNeuronWebInstance = theNumberOfNeuronWebInstance;
    this.fullScreen;
    this.numberOfOrbs = 250; //250
    this.collectionOfBoule = []
    this.spaceLeft;
    this.spaceTop;
    this.sizeStroke = 170;
    this.postionMoveBallX;
    this.postionMoveBallY;
    this.moveOption; 
    this.frameCounter = 0;
    this.colorBackground = "#202224";

    this.setup = function(){
        this.canvas = document.getElementById(this.IDcanvas);
        this.ctx = this.canvas.getContext("2d");
        this.IntervalFrameTime = setInterval(this.frame, 30 ,this.theNumberOfNeuronWebInstance);
        mousseX = 0
        mousseY = 0
        click = false;
        visibilityMoussRadius = -0.5;
        if(this.canvas.dataset.full_screen === "True" || this.canvas.dataset.full_screen === "true"){
            this.full_screen = 1
            this.canvas.width = innerWidth 
            this.canvas.height = innerHeight 
            //console.log(this.canvas.width + " " + this.canvas.height)
            this.canvas.style.height = innerHeight + "px" ;
            this.spaceTop = 0
            this.spaceLeft = 0
            this.canvas.style.position = "absolute"
        }else{
            this.temp = getPosition(this.canvas)//to get the coordonate x y in the html page
            this.spaceLeft = this.temp[0] - 8
            this.spaceTop = this.temp[1]

        }
        
        if(this.canvas.dataset.number_orbs != undefined){
            this.numberOfOrbs = this.canvas.dataset.number_orbs
            
        }else{
            this.numberOfOrbs = (this.canvas.width * this.canvas.height) / 7000
        }

        for(var i = 0; i < this.numberOfOrbs; i++){
            this.collectionOfBoule[i] = new this.orbs(this.canvas.width, this.canvas.height, this.ctx, this.canvas, this.spaceLeft, this.spaceTop);
        }
        
    }
    
    this.draw = function(){
        this.postionMoveBallX = mousseX - this.spaceLeft;
        this.postionMoveBallY = mousseY - this.spaceTop + window.scrollY;

        if(click){
            visibilityMoussRadius = visibilityMoussRadius * 1.25
            console.log(visibilityMoussRadius)
            if(visibilityMoussRadius < -10){
                visibilityMoussRadius = -10
            }
        }else{
            visibilityMoussRadius = visibilityMoussRadius * 0.75
            if(visibilityMoussRadius > -0.5){
                visibilityMoussRadius = -0.5
            }
        }

        this.ctx.fillStyle = this.colorBackground;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.strokeStyle = "#CCEE00";

        for(var i = 0; i < this.numberOfOrbs; i++){
            var distanceToMouss = visibilityMoussRadius + (Math.sqrt(Math.pow(this.collectionOfBoule[i].x - this.postionMoveBallX, 2) + Math.pow(this.collectionOfBoule[i].y - this.postionMoveBallY, 2))) /400
            //console.log(distanceToMouss)
            var alphaColor;
            for(var j = 0; j < this.numberOfOrbs; j++){
                alphaColor = (1 - (Math.sqrt(Math.pow(this.collectionOfBoule[i].x - this.collectionOfBoule[j].x, 2) + Math.pow(this.collectionOfBoule[i].y - this.collectionOfBoule[j].y, 2))) / this.sizeStroke)
                
                if(distanceToMouss > 0){
                    alphaColor = alphaColor - distanceToMouss
                }
                

                if(Math.sqrt(Math.pow(this.collectionOfBoule[i].x - this.collectionOfBoule[j].x, 2) + Math.pow(this.collectionOfBoule[i].y - this.collectionOfBoule[j].y, 2)) < this.sizeStroke){//theoreme de pythagore
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.collectionOfBoule[i].x,this.collectionOfBoule[i].y);
                    this.ctx.lineTo(this.collectionOfBoule[j].x,this.collectionOfBoule[j].y);
                    this.ctx.strokeStyle = "rgba(47, 109, 161," + (alphaColor) + ")";
                    //distanceToMouss = alphaColor
                    this.ctx.stroke();
                }
                
            }
            //console.log(distanceToMouss);
            
            /*if(Math.sqrt(Math.pow(this.postionMoveBallX - this.collectionOfBoule[i].x, 2) + Math.pow(this.postionMoveBallY - this.collectionOfBoule[i].y, 2)) < this.sizeStroke){//theoreme de pythagore
                this.ctx.beginPath();
                this.ctx.moveTo(this.collectionOfBoule[i].x,this.collectionOfBoule[i].y);
                this.ctx.lineTo(this.postionMoveBallX,this.postionMoveBallY);
                this.ctx.strokeStyle = "rgba(128,128,128," + (1 - (Math.sqrt(Math.pow(this.postionMoveBallX - this.collectionOfBoule[i].x, 2) + Math.pow(this.postionMoveBallY - this.collectionOfBoule[i].y, 2))) / this.sizeStroke) + ")";
                this.ctx.stroke();
            }*/
            
        }
        for(var i = 0; i < this.numberOfOrbs; i++){
            this.collectionOfBoule[i].show(this.frameCounter);
            this.collectionOfBoule[i].move();
        }
        /*
        this.ctx.beginPath();
        this.ctx.fillStyle = "#CCEE00"
        this.ctx.arc(this.postionMoveBallX,this.postionMoveBallY, 10/2, 0, 2 * Math.PI);
        this.ctx.fill();
        */


        this.frameCounter = this.frameCounter + 1
    }

    this.frame = function(theNumberOfNeuronWebInstance){
        instanceNeuronWeb[theNumberOfNeuronWebInstance].draw(); 
        
    }

    this.orbs = function(maxWidth, maxHeigth, ctx, canvas, spaceLeft, spaceTop){
        this.maxWidth = maxWidth;
        this.maxHeigth = maxHeigth;
        this.ctx = ctx;
        this.canvas = canvas;
        this.spaceLeft = spaceLeft;
        this.spaceTop = spaceTop;

        this.x = nb_random(0 - 170, maxWidth + 170);
        this.y = nb_random(0 - 170, maxHeigth + 170);
        this.size = nb_random(3, 6);
        this.growSizeDec = nb_random(0, 6);
        this.direction = nb_random(0, 360);
        this.speed = nb_random(100,250) / 100

        this.frameCounter;


        this.move = function(){
            this.x = this.x + (this.speed * Math.cos((this.direction * Math.PI) / 180))
            this.y = this.y + (this.speed * Math.sin((this.direction * Math.PI) / 180))
            if(this.x - 170 > this.maxWidth ){
                this.x = 0 - 170
            }
            if(this.y - 170 > this.maxHeigth ){
                this.y = 0 - 170
            }
            if(this.x + 170 < 0 ){
                this.x = this.maxWidth + 170
            }
            if(this.y + 170 < 0 ){
                this.y = this.maxHeigth + 170
            }

        }

        this.show = function(frameCounter){ //show the orbs

            this.frameCounter = frameCounter
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(55,128,189," + (1 - (visibilityMoussRadius + (Math.sqrt(Math.pow(this.x - mousseX, 2) + Math.pow(this.y - mousseY, 2))) /400)) + ")";
            //console.log((-0.5 + (Math.sqrt(Math.pow(this.x - mousseX, 2) + Math.pow(this.y - mousseY, 2))) /400))
            this.ctx.arc(this.x,this.y, (this.size + (Math.sin(this.frameCounter / 28 + this.growSizeDec))*2)/2, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
    
    this.setup(); // start the setup fonction of the canvas
}



checkInstance(); //important to start the detection of canvas element


//tools function :






function nb_random(min, max){ //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function MouseCoordonate(event){ //fonction permettant de récupérer les coordonnés x y de la souris sur la page
    if(event.clientX != 0 && event.clientY != 0){
    mousseX = event.clientX
    mousseY = event.clientY
    }
}

function Click(bool){
    click = bool;
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

function colorFunction(colorPoint, fréquenceP){
    var fréquence
    if(fréquenceP != null){
        fréquence = fréquenceP
    }else{fréquence = 1}
    
    return "rgb(" + ( (Math.sin(fréquence * colorPoint) * 127 + 128) ) + "," + ( (Math.sin(fréquence * colorPoint + (2 * Math.PI / 3)) * 127 + 128) ) + "," + ( (Math.sin(fréquence * colorPoint + (4 * Math.PI / 3)) * 127 + 128) ) + ")"
}

// Author Tom Demagny in Frence
// Creation date 24/11/19
// please do not delete my name, kisses;)