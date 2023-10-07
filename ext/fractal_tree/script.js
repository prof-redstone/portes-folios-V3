//script realise par Tom Demagny, tous droits réserve


function checkInstance(){
	var nameClassObjectCanvas = "Fractal-tree" //insert the class's name of canvas elements
    if(document.getElementsByClassName(nameClassObjectCanvas).length > 0){ 
        var documentInstanceOfObject = document.getElementsByClassName(nameClassObjectCanvas)

        if(typeof instanceFractal_tree!= "undefined"){      //Keep attention to change this name of variable
        }else{
            instanceFractal_tree = [] //Keep attention to change this name of variable
        }

        for(var i = 0; i < documentInstanceOfObject.length; i++){
            if(documentInstanceOfObject[i].dataset.target != "true"){
                documentInstanceOfObject[i].dataset.target = "true"
                if(documentInstanceOfObject[i].getAttribute("id") == null){
                    documentInstanceOfObject[i].setAttribute("id", "Fractal-tree" + i) //change the name of the ID attribute
                }
                instanceFractal_tree[i] = new Fractal_tree(i, documentInstanceOfObject[i].id) //Keep attention to change this name of variable ; and change the name of the new object
            }
        }
    }
}



function Fractal_tree(theNumberOfcanvasObjectInstance, IDcanvas){ //change the name of the function
    this.IntervalFrameTime;
    this.IDcanvas = IDcanvas;
    this.canvas;
    this.ctx;
    this.theNumberOfcanvasObjectInstance = theNumberOfcanvasObjectInstance;

    this.drawAction = false;



    this.e = 12; //max iteration of branch, const
    this.t = []; // save all value of each floor
    this.tableSize = [135]; //enter the first value of the length of stroke
    this.angle1 = 90; //angle vers la droite
    this.angle2 = -0; //angle vers la guauche
    this.sizebegin = 100; //const
    this.actuPointX = window.innerWidth/2;
    this.actuPointY = window.innerHeight/2;
    this.actuAngle = 0 - 90;

    this.date = new Date(); //a finir
    this.minutes = this.date.getMinutes();
    this.hours = this.date.getHours()

    this.setup = function(){
        this.canvas = document.getElementById(this.IDcanvas);
        this.ctx = this.canvas.getContext("2d");
        this.IntervalFrameTime = setInterval(this.frame, 20 , this.theNumberOfcanvasObjectInstance);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    this.draw = function(){   //fonction de tracage de fractale

        if(this.drawAction == false){
            //this.drawAction = true;
            
            
            this.ctx.fillStyle = "rgb(191, 215, 234)"; //background
            this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.strokeStyle = "rgb(54, 53, 55)"; //background

            
                
            for(var i = 0; i < this.e; i++){ //pour set le tableau de ratio de taille
                this.tableSize.push(this.tableSize[i] * 0.66)  // 2/3 = 0.66
            }

            for(var i = 0; i < this.e; i++){ //pour ajouter les arrays 
                this.t.push([])
            }
            //console.log(this.t)

            this.t[0].push([this.actuAngle , this.actuPointX, this.actuPointY]);

            for(var i = 0; i < this.t.length; i++){
                //console.log(i);
                for(var j = 0; j < this.t[i].length; j++){

                    this.ctx.beginPath(); //ligne vers la droite

                    var angleRight = this.t[i][j][0] + this.angle1;
                    var x1 = this.t[i][j][1] + (this.tableSize[i] * Math.cos((angleRight * Math.PI) / 180) )
                    var y1 = this.t[i][j][2] + (this.tableSize[i] * Math.sin((angleRight * Math.PI) / 180) )

                    this.ctx.moveTo(this.t[i][j][1], this.t[i][j][2]);
                    this.ctx.lineTo( x1, y1);
                    this.ctx.stroke();

                    if(i < this.e - 1){
                        this.t[i + 1].push([ angleRight , x1, y1])
                    }

                    this.ctx.beginPath(); //ligne vers la gauche

                    var angleLeft = this.t[i][j][0] + this.angle2;
                    var x2 = this.t[i][j][1] + (this.tableSize[i] * Math.cos((angleLeft * Math.PI) / 180) )
                    var y2 = this.t[i][j][2] + (this.tableSize[i] * Math.sin((angleLeft * Math.PI) / 180) )

                    this.ctx.moveTo(this.t[i][j][1], this.t[i][j][2]);
                    this.ctx.lineTo( x2, y2);
                    this.ctx.stroke();

                    if(i < this.e - 1){
                        this.t[i + 1].push([ angleLeft , x2, y2])
                    }
                
                }
            }

            this.t = []
            this.speed = 0.6
            this.angle1 += 0.5*this.speed  //pour faire évoler la fractale 
            this.angle2 += 1.1356*this.speed
            
        }

    }

    this.frame = function(theNumberOfcanvasObjectInstance){
        instanceFractal_tree[theNumberOfcanvasObjectInstance].draw(); 
    }
    
    this.setup();
}

checkInstance();