
//flowing function
//winding function



function checkInstance(){
    if(document.getElementsByClassName("neuronWeb").length > 0){ //insert the class's name of canvas elements
        var documentInstanceOfSnowflake = document.getElementsByClassName("neuronWeb")

        if(typeof instanceSnowflake != "undefined"){
            
        }else{
            instanceSnowflake = []
        }

        for(var i = 0; i < documentInstanceOfSnowflake.length; i++){
            if(documentInstanceOfSnowflake[i].dataset.target != "true"){
                documentInstanceOfSnowflake[i].dataset.target = "true"
                if(documentInstanceOfSnowflake[i].getAttribute("id") == null){
                    documentInstanceOfSnowflake[i].setAttribute("id", "unnameSnowflake" + i)
                }
                instanceSnowflake[i] = new Snow_flake(i, documentInstanceOfSnowflake[i].id)
            }
        }
    }
}


function Snow_flake(theNumberOfSnowFlakeInstance, IDcanvas){
    this.IntervalFrameTime;
    this.IDcanvas = IDcanvas;
    this.canvas;
    this.ctx;
    this.theNumberOfSnowFlakeInstance = theNumberOfSnowFlakeInstance;
    this.fullScreen;
    this.numberOfBoule = 250;
    this.collectionOfBoule = []
    this.spaceLeft;
    this.spaceTop;
    this.moveOption; 

    this.setup = function(){
        this.canvas = document.getElementById(this.IDcanvas);
        this.ctx = this.canvas.getContext("2d");
        this.IntervalFrameTime = setInterval(this.frame, 35 ,this.theNumberOfSnowFlakeInstance);
        //console.log(this.IDcanvas)
        mousseX = 0
        mousseY = 0
        if(this.canvas.dataset.full_screen === "True" || this.canvas.dataset.full_screen === "true"){
            this.full_screen = 1
            this.canvas.width = innerWidth 
            this.canvas.height = innerHeight 
            this.canvas.style.height = innerHeight + "px" ;
            this.spaceTop = 0
            this.spaceLeft = 0
            this.canvas.style.position = "absolute"
        }else{
            this.temp = getPosition(this.canvas)
            this.spaceLeft = this.temp[0] - 8
            this.spaceTop = this.temp[1]

        }
        if(this.canvas.dataset.mode_move == undefined || this.canvas.dataset.mode_move == "flowing"){
            this.moveOption = "flowing"
        }else if(this.canvas.dataset.mode_move == "winding"){
            this.moveOption = "winding"
        }else if(this.canvas.dataset.mode_move == "snowing"){
            this.moveOption = "snowing"
        }else{
            this.moveOption = "flowing"
        }
        if(this.canvas.dataset.number_flakes != undefined){
            this.numberOfBoule = this.canvas.dataset.number_flakes
        }

        for(var i = 0; i < this.numberOfBoule; i++){
            this.collectionOfBoule[i] = new this.boule(this.canvas.width, this.canvas.height, this.ctx, this.canvas, this.moveOption, this.spaceLeft, this.spaceTop);
        }
        
    }
    
    this.draw = function(){
        this.ctx.fillStyle = "#007fff" //"#fdbcbd";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        for(var i = 0; i < this.numberOfBoule; i++){
            this.collectionOfBoule[i].move();
            this.collectionOfBoule[i].show();
        }
    }

    this.frame = function(theNumberOfSnowFlakeInstance){
        instanceSnowflake[theNumberOfSnowFlakeInstance].draw();
    }

    this.boule = function(maxWidth, maxHeigth, ctx, canvas, moveOption, spaceLeft, spaceTop){
        this.maxWidth = maxWidth;
        this.maxHeigth = maxHeigth;
        this.ctx = ctx;
        this.canvas = canvas
        this.moveOption = moveOption;
        this.spaceLeft = spaceLeft;
        this.spaceTop = spaceTop;

        if(this.moveOption == "flowing"){
            this.x = nb_random(0, maxWidth);
            this.y = nb_random(0, maxHeigth);
            this.size = nb_random(7, 12);
            this.direction = nb_random(0, 360);
            this.speed = 2;
        }

        if(this.moveOption == "snowing"){
            this.x = nb_random(0, maxWidth);
            this.y = nb_random(0, maxHeigth);
            this.size = nb_random(3, 12);
            this.direction = 90;
            this.speed = this.size / 2;
        }
        if(this.moveOption == "winding"){
            this.x = nb_random(0, maxWidth);
            this.y = nb_random(0, maxHeigth);
            this.size = nb_random(3, 12);
            this.direction = 90;
            this.speed = this.size / 2;
        }

        this.move = function(){
            if(this.moveOption == "flowing"){
                this.x = this.x + (this.speed * Math.cos((this.direction * Math.PI) / 180))
                this.y = this.y + (this.speed * Math.sin((this.direction * Math.PI) / 180))
                if(this.x > this.maxWidth + this.size){
                    this.x = 0 - this.size
                }
                if(this.y > this.maxHeigth + this.size){
                    this.y = 0 - this.size
                }
                if(this.x < 0 - this.size){
                    this.x = this.maxWidth
                }
                if(this.y < 0 - this.size){
                    this.y = this.maxHeigth
                }
            }

            if(this.moveOption == "snowing"){
                this.x = this.x + (this.speed * Math.cos((this.direction * Math.PI) / 180))
                this.y = this.y + (this.speed * Math.sin((this.direction * Math.PI) / 180))
                if(this.x > this.maxWidth + this.size){
                    this.x = 0 - this.size
                }
                if(this.y > this.maxHeigth + this.size){
                    this.y = 0 - this.size
                }
                if(this.x < 0 - this.size){
                    this.x = this.maxWidth
                }
                if(this.y < 0 - this.size){
                    this.y = this.maxHeigth
                }
            }

            if(this.moveOption == "winding"){
                this.x = this.x + (this.speed * Math.cos((this.direction * Math.PI) / 180))
                this.y = this.y + (this.speed * Math.sin((this.direction * Math.PI) / 180))
                if(this.x > this.maxWidth + this.size){
                    this.x = 0 - this.size
                }
                if(this.y > this.maxHeigth + this.size){
                    this.y = 0 - this.size
                }
                if(this.x < 0 - this.size){
                    this.x = this.maxWidth
                }
                if(this.y < 0 - this.size){
                    this.y = this.maxHeigth
                }
                if((mousseX - this.spaceLeft) < (this.maxWidth / 2)){ //calcule la poussée de vent vers la gauches
                    this.direction = 90 + ( ( (this.maxWidth / 2) - (mousseX - this.spaceLeft)) /((this.maxWidth / 2)/60))
                    this.speed = this.size / 2 + (((this.maxWidth / 2) - (mousseX - this.spaceLeft)) /((this.maxWidth / 2)/60)) / 5
                    if(this.direction > 90 + 60){
                        this.direction = 90 + 60
                        this.speed = this.size/2 + 60/5
                    }
                }
                if((mousseX - this.spaceLeft) > (this.maxWidth / 2)){ //calcule la poussée de vent vers la droite
                    this.direction = 90 - ( (mousseX - this.spaceLeft - (this.maxWidth / 2)) /((this.maxWidth / 2)/60))
                    this.speed = this.size / 2 + ( (mousseX - this.spaceLeft - (this.maxWidth / 2)) /((this.maxWidth / 2)/60)) / 5
                    if(this.direction < 90 - 60){
                        this.direction = 90 - 60
                        this.speed = this.size/2 + 60/5
                    }
                }
            }
        }

        this.show = function(){ //show the snow flake
            this.ctx.beginPath();
            //console.log(this.canvas)
            this.ctx.fillStyle = /*"#f0f5ee"*/ colorFunction(this.y/70 - this.x/200);
            this.ctx.arc(this.x,this.y, this.size/2, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
    
    this.setup(); // start the setup fonction of the canvas
}

checkInstance(); //important to start the detection canvas element

function nb_random(min, max){ //fonction générant un nombre aléatoire  min et max inclue
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function MouseCoordonate(event){ //fonction permettant de récupérer les coordonnés x y de la souris sur la page
    mousseX = event.clientX
    mousseY = event.clientY
}

function getPosition(element) //fonction pour avoir les coordonné d'un ellement dans un page
{
    var left = 0;
    var top = 0;
    /*On récupère l'élément*/
    var e = element;
    /*Tant que l'on a un élément parent*/
    while (e.offsetParent != undefined && e.offsetParent != null)
    {
        /*On ajoute la position de l'élément parent*/
        left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
        top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
        //console.log(e.offsetParent)
        //console.log(e.offsetLeft)
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