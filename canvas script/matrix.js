function matrix() {
    var symboleSize = 25;
    var listBinary;
    var mode = "every";
    var frameCounter = 0;
    var table;
    var IntervalTimeMatrix;
    var IntervalTimeMatrixMSactu = 40;
    const listSymbole = ["{", "}", "<", "-", "*", ":", "+", "#", "=", ">", "ç", "Z", "_", "\"", "1", "2", "3", "4", "5", "6", "7", "8", "9", "ﾊ", "ﾐ", "ﾋ", "ｰ", "ｳ", "ｼ", "ﾅ", "ﾓ", "ﾆ", "ｻ", "ﾜ", "ﾂ", "ｵ", "ﾘ", "ｱ", "ﾎ", "ﾃ", "ﾏ", "ｹ", "ﾒ", "ｴ", "ｶ", "ｷ", "ﾑ", "ﾕ", "ﾗ", "ｾ", "ﾈ", "ｽ", "ﾀ", "ﾇ", "ﾍ", "ｦ", "ｲ", "ｸ", "ｺ", "ｿ", "ﾁ", "ﾄ", "ﾉ", "ﾌ", "ﾔ", "ﾖ", "ﾙ", "ﾚ", "ﾛ", "ﾝ"];




    this.setup = function() { //fonction de setup executer 1 fois 
        canvas = document.getElementById("Matrix");
        ctx = canvas.getContext("2d");

        canvas.width = innerWidth - (innerWidth % symboleSize);
        canvas.height = innerHeight - (innerHeight % symboleSize);
        canvas.style.height = "100vh";
        canvas.style.width = "100vw";

        mode = "every";


        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = "20px Georgia";
        table = new Table();
        table.generateStreams();

    }

    this.Stop = function() {
        clearInterval(IntervalTimeMatrix)
    }

    this.Start = function() {
        clearInterval(IntervalTimeMatrix)
        this.setup()
        IntervalTimeMatrix = setInterval(draw, 40);
    }


    function draw() { //fonction executer en boucle 
        frameCounterAdd(); //incrémente le conteur de frame de 1
        ctx.fillStyle = "#090809"; //met le plan en noir
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //stream.frameSymbole();
        table.frameStreams();

    }

    function nb_random(min, max) { //fonction générant un nobre aléatoir  min et max inclue
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Symbol(x, y, speed, position, opacité) {
        this.x = x;
        this.y = y;
        this.value;
        this.speed = speed;
        this.position = position;
        this.opacity = (this.speed / 14) - (opacité) + 0.2;
        this.switchInterval = nb_random(2, 15);
        this.first = 0;

        this.changeColor = function() {
            if (nb_random(1, 3) == 1 && this.position == 1) {
                this.first = 1
            } else {
                this.first = 0
            }
        }

        this.changeSymbol = function() {
            if (frameCounter % this.switchInterval == 0) {
                this.setToRandomSymbol();
                //console.log(this.first);

            }
        }

        this.setToRandomSymbol = function() {
            //this.value = String.fromCharCode(0x30A0 + nb_random(0, 96))
            if (mode == "binary") {
                this.value = listBinary[nb_random(0, listBinary.length - 1)];
            } else if (mode == "number") {
                this.value = nb_random(0, 9999)
            } else if (mode == "every") {
                this.value = symboleEvery();
            }
        }

        this.render = function() {
            if (this.first == 1) {
                ctx.fillStyle = "#AFA";
                ctx.fillStyle = "rgba(170, 255, 170, " + this.opacity + ")"
                //ctx.font = symboleSize + "px Georgia";
                ctx.font = symboleSize + "px Arial";
                ctx.textAlign = "start";
                ctx.fillText(this.value, this.x, this.y);
            } else if (this.first == 0) {
                ctx.fillStyle = "#0F0";
                ctx.fillStyle = "rgba(0, 255, 60, " + this.opacity + ")"
                ctx.font = symboleSize + "px Arial";
                ctx.fillText(this.value, this.x, this.y);
            }
        }

        this.move = function() {
            if (this.y >= canvas.height + symboleSize) {
                this.y = this.y - (canvas.height + symboleSize);
                this.changeColor();
            } else {
                this.y += this.speed;
            }
        }
    }

    function Stream(x) {
        this.symbols = [];
        this.totalSymbols = nb_random(5, (canvas.height / (symboleSize + 5))); //nombre total de symboles que contient le stream
        this.speed = nb_random(5, 15); //vitesse du stream
        this.x = x; //position vertical

        this.generateSymbols = function() {
            this.y = nb_random(-1000, 0);
            for (var i = 0; i < this.totalSymbols; i++) {
                var newSymbole = new Symbol(this.x, this.y, this.speed, i, i / this.totalSymbols);
                newSymbole.setToRandomSymbol();
                this.symbols.push(newSymbole);
                this.y = this.y - (symboleSize + 5);
            }
        }

        this.frameSymbole = function() {
            for (var i = 1; i < this.totalSymbols; i++) {
                this.symbols[i].changeSymbol();
                this.symbols[i].move();
                this.symbols[i].render();
            }
        }
    }

    function Table() {
        this.streams = []
        this.totalStreams = canvas.width / (symboleSize - 10);

        this.generateStreams = function() {
            if (mode == "binary") {
                this.totalStreams = canvas.width / (symboleSize - 10)
                for (var i = 0; i < this.totalStreams; i++) {
                    var newStream = new Stream((symboleSize - 10) * i);
                    this.streams.push(newStream);
                    this.streams[i].generateSymbols();
                }
            }
            if (mode == "every") {
                this.totalStreams = canvas.width / (symboleSize - 4)
                for (var i = 0; i < this.totalStreams; i++) {
                    var newStream = new Stream((symboleSize - 4) * i);
                    this.streams.push(newStream);
                    this.streams[i].generateSymbols();
                }
            }
            if (mode == "number") {
                this.totalStreams = canvas.width / ((symboleSize - 10) * 3)
                for (var i = 0; i < this.totalStreams; i++) {
                    var newStream = new Stream(((symboleSize - 10) * 3) * i);
                    this.streams.push(newStream);
                    this.streams[i].generateSymbols();
                }
            }
            /*for(var i = 0; i < this.totalStreams; i ++){

                var newStream = new Stream(symboleSize * i);
                this.streams.push(newStream);
                this.streams[i].generateSymbols();
            }*/
        }

        this.frameStreams = function() {
            for (var i = 0; i < this.totalStreams; i++) {
                this.streams[i].frameSymbole();
            }
        }
    }

    function symboleEvery() {
        var typeOfSymb = nb_random(0, listSymbole.length - 1);

        /*if(typeOfSymb >= 0 && typeOfSymb <= listSymbole[0].length){
            return listSymbole[0][nb_random(0,listSymbole[0].length - 1)]// =><*+#
        }else if(typeOfSymb >= listSymbole[0].length && typeOfSymb <= (listSymbole[0].length + listSymbole[1].length) - 1){
            return listSymbole[1][nb_random(0,listSymbole[1].length - 1)] //0123456789
        }else if(typeOfSymb >= listSymbole[0].length + listSymbole[1].length && typeOfSymb <= (listSymbole[0].length + listSymbole[1].length + listSymbole[2].length) - 1){
            return listSymbole[2][nb_random(0,listSymbole[2].length - 1)]
        }
        else{
            return "undefine"
        }*/
        return listSymbole[typeOfSymb]

    }

    function frameCounterAdd() { //conteur de frame qui permet de changer le caractère du symbole
        frameCounter++;
        if (frameCounter > 200) {
            frameCounter = 0;
        }
    }
    //console.log(String.fromCharCode(0x30A0 + nb_random(0, 96)));

    function changeFrameRateMatrix(val) {
        clearInterval(IntervalTimeMatrix)
        if (val != 0) {
            IntervalTimeMatrix = setInterval(draw, val);
        }
        IntervalTimeMatrixMSactu = val;
    }

    function restartMatrix() {
        clearInterval(IntervalTimeMatrix)

        symboleSize = 25;
        listBinary;
        mode = "binary";
        frameCounter = 0;
        table;
        IntervalTimeMatrix;
        IntervalTimeMatrixMSactu = 40;

        setup();
    }

    function getFrameRateMatrix() {
        return IntervalTimeMatrixMSactu;
    }

    this.setup()
}

let matrixCanvas = new matrix()

window.addEventListener("resize", () => {
    matrixCanvas.setup()
});