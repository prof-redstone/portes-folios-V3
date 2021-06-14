function MagicWand() {
    var canvas;
    var ctx;
    var IntervalTimeMagicWand;

    var ColorBackground = "#111";

    var mousseX = 0;
    var mousseY = 0;
    var click;
    var mooving;

    var mode = 1;
    var M1Color = 19.35; //yellow

    var speedMultiplayer = 0.2;

    var activate = false;

    var collectionOfParticle = [];



    this.setup = function() { //fonction de setup executer 1 fois 
        canvas = document.getElementById("MagicWand");
        ctx = canvas.getContext("2d");

        mode = nb_random(1, 2);

        ctx.imageSmoothingEnabled = false;

        //console.log(innerWidth - (innerWidth % symboleSize));
        body = document.getElementsByTagName('body')[0];
        canvas.height = body.clientHeight;
        canvas.width = body.clientWidth;


        loop()
    }

    this.Stop = function() {
        clearInterval(IntervalTimeMagicWand)
    }

    this.Start = function() {
        clearInterval(IntervalTimeMagicWand)
        this.setup()
        IntervalTimeMagicWand = setInterval(loop, 20);
    }


    function loop() {
        ctx.fillStyle = ColorBackground; //met le plan en noir
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (activate == false) { //to start 
            if (mousseX != 0 || mousseY != 0) {
                activate = true
            }
        }

        if (mooving) {
            speedMultiplayer = 0.45
        } else {
            speedMultiplayer = 0.3
        }
        mooving = false;

        if (click) {
            speedMultiplayer = 0.6
        }

        if (activate) {
            if (mode == 1) {
                collectionOfParticle.push(new Particle(M1Color));
                if (click) {
                    collectionOfParticle.push(new Particle(M1Color));
                }
            } else {
                collectionOfParticle.push(new Particle());
                if (click) {
                    collectionOfParticle.push(new Particle());
                }
            }
        }

        for (let i = 0; i < collectionOfParticle.length; i++) {
            collectionOfParticle[i].Update();
            collectionOfParticle[i].Draw();

            if (collectionOfParticle[i].deletable == true) {
                collectionOfParticle.splice(i, 1);
            }

        }

    }


    function Particle(SColor) {
        this.size;
        this.direction;
        this.speed;
        this.posX;
        this.posY;
        this.maxTime = 100;
        this.timeCounter = 0;
        this.deletable = false;
        this.color;
        this.SpawnColor = SColor;


        this.Init = function() {
            this.direction = nb_random(0, 360);
            this.speed = nb_random(1, 5);
            this.size = nb_random(4, 10);
            this.posX = mousseX;
            this.posY = mousseY;
        }

        this.Update = function() {
            this.timeCounter++;
            if (this.maxTime == this.timeCounter) {
                this.deletable = true;
            }
            this.posX = this.posX + (this.speed * speedMultiplayer * Math.cos((this.direction * Math.PI) / 180));
            this.posY = this.posY + (this.speed * speedMultiplayer * Math.sin((this.direction * Math.PI) / 180));
        }

        this.Draw = function() {

            if (mode == 1) {
                this.color = "rgba(255, 255, 200," + (1 - this.timeCounter / 100) + ")";
                this.color = colorWheel(this.SpawnColor, 100, 0, (1 - this.timeCounter / 100));
            } else if (mode == 2) {
                var alpha = 1;
                if (this.timeCounter > 90) {
                    alpha = 1 - (this.timeCounter - 90) / 10;
                }
                this.color = colorWheel(this.timeCounter / 20 - 1, 50, 0, alpha)
            }

            ctx.beginPath();
            ctx.arc(this.posX, this.posY, this.size / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        this.Init();
    }


    function nb_random(min, max) { //fonction générant un nobre aléatoir  min et max inclue
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function MouseCoordonate(event) { //fonction permettant de récupérer les coordonnés x y de la souris sur la page
        if (event.clientX != 0 && event.clientY != 0) {
            mooving = true;
            mousseX = event.clientX
            mousseY = event.clientY
        }

    }

    function Click(bool) {
        click = bool;
        if (click) {
            ChangeColorClick();
        }
    }

    function ChangeColorClick() {
        if (mode == 1) {
            M1Color = nb_random(0, 60) / 10;
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

    document.querySelector("body").addEventListener('mousemove', e => {
        if (event.clientX != 0 && event.clientY != 0) {
            mooving = true;
            mousseX = event.clientX
            mousseY = event.clientY
        }
    });

    document.querySelector("body").addEventListener('mousedown', e => {
        click = true;
        ChangeColorClick();
    });
    document.querySelector("body").addEventListener('mouseup', e => {
        click = false;
    });

    this.setup();
}


let magicWandCanvas = new MagicWand()

window.addEventListener("resize", () => {
    magicWandCanvas.setup()
});