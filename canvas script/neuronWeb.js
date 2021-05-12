let canvas = document.getElementById("neuronWeb")
let ctx = canvas.getContext("2d")

let activeLoop = true;
var fps = 30;
let lastUpdate = Date.now();
let deltaTime;

let mouseX = 0;
let mouseY = 0;
let click = false;
let visibilityMoussRadius = -0.5

let nbOrbs = 150
let collectionOfOrbs = []
let sizeStroke = 170;
let colorBackground = "#202224";
let shadowColor = "#1D3E5B60"
let interval;

function neuronWebSetup() {

    canvas.height = innerHeight;
    canvas.width = innerWidth;

    mouseX = canvas.width/2
    mouseY = canvas.height/2

    nbOrbs = ((canvas.width +340)*(canvas.height+340))/10000 //ratio cool

    for (var i = 0; i < nbOrbs; i++) {
        collectionOfOrbs[i] = new neuronWebOrbs(canvas.width, canvas.height);
    }

    window.addEventListener("resize", ()=>{
        canvas.height = innerHeight;
    canvas.width = innerWidth;
    });
    neuronWebLoop()
}
neuronWebSetup()

function neuronWebLoop() {
    
    deltaTime = UpdateDelteTime()

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (click) {
        visibilityMoussRadius = visibilityMoussRadius * 1.1
        //console.log(visibilityMoussRadius)
        if (visibilityMoussRadius < -10) {
            visibilityMoussRadius = -10
        }
    } else {
        visibilityMoussRadius = visibilityMoussRadius * 0.8
        if (visibilityMoussRadius > -0.9) {
            visibilityMoussRadius = -0.9
        }
    }

    //big circle
    let grad = ctx.createRadialGradient(mouseX ,mouseY,600,mouseX,mouseY, -1050*visibilityMoussRadius)
    grad.addColorStop(0, shadowColor);
    grad.addColorStop(1, "#1010105F");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);



    for (let i = 0; i < collectionOfOrbs.length; i++) { //draw line between
        let distToMouse = visibilityMoussRadius + (Math.sqrt(Math.pow(collectionOfOrbs[i].x - mouseX, 2) + Math.pow(collectionOfOrbs[i].y - mouseY, 2))) / 500
        
        for (let j = i+1; j < collectionOfOrbs.length; j++) {
            let distBet = (Math.sqrt(Math.pow(collectionOfOrbs[i].x - collectionOfOrbs[j].x, 2) + Math.pow(collectionOfOrbs[i].y - collectionOfOrbs[j].y, 2)))

            var alpha = (1 - (distBet / sizeStroke)  )
            if (distToMouse > 0) {
                alpha = alpha - distToMouse
            }

            if (distBet < sizeStroke) {
                ctx.beginPath();
                ctx.moveTo(collectionOfOrbs[i].x, collectionOfOrbs[i].y);
                ctx.lineTo(collectionOfOrbs[j].x, collectionOfOrbs[j].y);
                ctx.strokeStyle = "rgba(47, 109, 161," + alpha + ")";
                ctx.stroke();
            }
        }
    }

    for (var i = 0; i < nbOrbs; i++) {
        collectionOfOrbs[i].show(); //draw ball
        collectionOfOrbs[i].move();
    }

    if(activeLoop){
        
        setTimeout(function() {
            neuronWebLoop()
        }, 1000 / fps);
    }
}

function neuronWebOrbs() {
    this.x = nb_random(0 - 170, canvas.width + 170);
    this.y = nb_random(0 - 170, canvas.height + 170);
    this.size = nb_random(4, 6);
    this.growSizeDec = nb_random(0, 600); //decalage
    this.direction = nb_random(0, Math.PI * 2 * 1000) / 1000;
    this.speed = (nb_random(100, 250) / 3)

    this.move = function() {
        
        this.growSizeDec += 1
        this.x = this.x + ((this.size + (Math.sin(this.growSizeDec / 100)) * 1.8)*10  * Math.cos(this.direction) * deltaTime)
        this.y = this.y + ((this.size + (Math.sin(this.growSizeDec / 100)) * 1.8)*10  * Math.sin(this.direction) * deltaTime)
        if (this.x - 170 > canvas.width) {
            this.x = 0 - 170
        }
        if (this.y - 170 > canvas.height) {
            this.y = 0 - 170
        }
        if (this.x + 170 < 0) {
            this.x = canvas.width + 170
        }
        if (this.y + 170 < 0) {
            this.y = canvas.height + 170
        }

    }

    this.show = function() { //show the orbs

        ctx.beginPath();
        ctx.fillStyle = "rgba(55,128,189," + (1 - (visibilityMoussRadius + (Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2))) / 400)) + ")";
        ctx.arc(this.x, this.y, (this.size + (Math.sin(this.growSizeDec / 100)) * 1.8) / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function StopNeuronWeb() {
    activeLoop =false
}
function StartNeuroneWeb() {
    activeLoop = true
    requestAnimationFrame(neuronWebLoop)
}

function UpdateDelteTime() {
    let now = Date.now()
    let dt = (now - lastUpdate) / 1000
    lastUpdate = now

    return dt
}

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MouseCoordonate(event) { //fonction permettant de récupérer les coordonnés x y de la souris sur la page
    if (event.clientX != 0 && event.clientY != 0) {
        mouseX = event.clientX
        mouseY = event.clientY
    }
}

let body = document.querySelector("body")
body.addEventListener("mousedown", e =>{
    click = true
})
body.addEventListener("mouseup", e =>{
    click = false
})

function colorFunction(colorPoint, fréquenceP) {
    var fréquence
    if (fréquenceP != null) {
        fréquence = fréquenceP
    } else {
        fréquence = 1
    }

    return "rgb(" + ((Math.sin(fréquence * colorPoint) * 127 + 128)) + "," + ((Math.sin(fréquence * colorPoint + (2 * Math.PI / 3)) * 127 + 128)) + "," + ((Math.sin(fréquence * colorPoint + (4 * Math.PI / 3)) * 127 + 128)) + ")"
}