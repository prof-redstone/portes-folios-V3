function NeuronWeb() {
    let canvasNeuronWeb = document.getElementById("neuronWeb")
    let ctxNeuronWeb = canvasNeuronWeb.getContext("2d")

    let activeLoop = true;
    let fps = 30;
    let lastUpdate = Date.now();
    let deltaTime;

    let mouseX = 0;
    let mouseY = 0;
    let click = false;
    let visibilityMoussRadius = -0.5

    let nbOrbs = 150
    let collectionOfOrbs = []
    let sizeStroke = 170;
    let shadowColor = "#1D3E5B10"

    function neuronWebSetup() {

        canvasNeuronWeb.height = innerHeight;
        canvasNeuronWeb.width = innerWidth;

        mouseX = canvasNeuronWeb.width / 2
        mouseY = canvasNeuronWeb.height / 2

        nbOrbs = ((canvasNeuronWeb.width + 340) * (canvasNeuronWeb.height + 340)) / 10000 //ratio cool

        for (var i = 0; i < nbOrbs; i++) {
            collectionOfOrbs[i] = new neuronWebOrbs(canvasNeuronWeb.width, canvasNeuronWeb.height);
        }

        window.addEventListener("resize", () => {
            canvasNeuronWeb.height = innerHeight;
            canvasNeuronWeb.width = innerWidth;
        });
        neuronWebLoop()
    }
    neuronWebSetup()

    function neuronWebLoop() {

        deltaTime = UpdateDelteTime()

        ctxNeuronWeb.clearRect(0, 0, canvasNeuronWeb.width, canvasNeuronWeb.height)

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

        ctxNeuronWeb.fillStyle = shadowColor
        for (let i = 0; i < 6; i++) {
            ctxNeuronWeb.beginPath()
            ctxNeuronWeb.arc(mouseX, mouseY, (100 * i + 400) * -visibilityMoussRadius, 0, Math.PI * 2)
            ctxNeuronWeb.fill()
        }



        for (let i = 0; i < collectionOfOrbs.length; i++) { //draw line between
            let distToMouse = visibilityMoussRadius + (Math.sqrt(Math.pow(collectionOfOrbs[i].x - mouseX, 2) + Math.pow(collectionOfOrbs[i].y - mouseY, 2))) / 500

            for (let j = i + 1; j < collectionOfOrbs.length; j++) {
                let distBet = (Math.sqrt(Math.pow(collectionOfOrbs[i].x - collectionOfOrbs[j].x, 2) + Math.pow(collectionOfOrbs[i].y - collectionOfOrbs[j].y, 2)))

                var alpha = (1 - (distBet / sizeStroke))
                if (distToMouse > 0) {
                    alpha = alpha - distToMouse
                }

                if (distBet < sizeStroke) {
                    ctxNeuronWeb.beginPath();
                    ctxNeuronWeb.moveTo(collectionOfOrbs[i].x, collectionOfOrbs[i].y);
                    ctxNeuronWeb.lineTo(collectionOfOrbs[j].x, collectionOfOrbs[j].y);
                    ctxNeuronWeb.strokeStyle = "rgba(47, 109, 161," + alpha + ")";
                    ctxNeuronWeb.stroke();
                }
            }
        }

        for (var i = 0; i < nbOrbs; i++) {
            collectionOfOrbs[i].show(); //draw ball
            collectionOfOrbs[i].move();
        }

        if (activeLoop) {

            setTimeout(function() {
                neuronWebLoop()
            }, 1000 / fps);
        }
    }

    function neuronWebOrbs() {
        this.x = nb_random(0 - 170, canvasNeuronWeb.width + 170);
        this.y = nb_random(0 - 170, canvasNeuronWeb.height + 170);
        this.size = nb_random(4, 6);
        this.growSizeDec = nb_random(0, 600); //decalage
        this.direction = nb_random(0, Math.PI * 2 * 1000) / 1000;
        this.speed = (nb_random(100, 250) / 3)

        this.move = function() {

            this.growSizeDec += 1
            this.x = this.x + ((this.size + (Math.sin(this.growSizeDec / 100)) * 1.8) * 10 * Math.cos(this.direction) * deltaTime)
            this.y = this.y + ((this.size + (Math.sin(this.growSizeDec / 100)) * 1.8) * 10 * Math.sin(this.direction) * deltaTime)
            if (this.x - 170 > canvasNeuronWeb.width) {
                this.x = 0 - 170
            }
            if (this.y - 170 > canvasNeuronWeb.height) {
                this.y = 0 - 170
            }
            if (this.x + 170 < 0) {
                this.x = canvasNeuronWeb.width + 170
            }
            if (this.y + 170 < 0) {
                this.y = canvasNeuronWeb.height + 170
            }

        }

        this.show = function() { //show the orbs

            ctxNeuronWeb.beginPath();
            ctxNeuronWeb.fillStyle = "rgba(55,128,189," + (1 - (visibilityMoussRadius + (Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2))) / 400)) + ")";
            ctxNeuronWeb.arc(this.x, this.y, (this.size + (Math.sin(this.growSizeDec / 100)) * 1.8) / 2, 0, 2 * Math.PI);
            ctxNeuronWeb.fill();
        }
    }

    this.StopNeuronWeb = function() {
        activeLoop = false
    }

    this.StartNeuroneWeb = function() {
        activeLoop = true
        requestAnimationFrame(neuronWebLoop)
    }

    function UpdateDelteTime() {
        let now = Date.now()
        let dt = (now - lastUpdate) / 1000
        lastUpdate = now
        return Math.min(dt,0.5)
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
    body.addEventListener("mousedown", () => {
        click = true
    })
    body.addEventListener("mouseup", () => {
        click = false
    })

    body.addEventListener("mousemove", e => {
        MouseCoordonate(e)
    })

}

//active by default 
var NeuronWebCanvas = new NeuronWeb()