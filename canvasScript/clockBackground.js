function ClockBackground() {
    var canvas;
    var ctx;
    var IntervalTime

    var ColorBackground = "#03254c";
    var firtColor = "#2a9df4";
    var secondeColor = "#187bcd";
    var thirdColor = "#1167b1";
    var fourthColor = "#054175"

    var binaryDigit = [
        [0, 0, 0, 0, 0, 0, 0, 0], //second
        [0, 0, 0, 0, 0, 0, 0, 0], //minute
        [0, 0, 0, 0, 0, 0, 0, 0] //hours
    ]

    var binaryDigitAnimation = [ //0=>100
        [0, 0, 0, 0, 0, 0, 0, 0], //second
        [0, 0, 0, 0, 0, 0, 0, 0], //minute
        [0, 0, 0, 0, 0, 0, 0, 0] //hours
    ]
    var valAdd = 0.1
    var valSub = -0.1

    var date = new Date();

    this.setup = function() { //fonction de setup executer 1 fois 
        canvas = document.getElementById("ClockBackground");
        ctx = canvas.getContext("2d");

        ctx.imageSmoothingEnabled = false;

        body = document.getElementsByTagName('html')[0];
        canvas.height = body.clientHeight;
        canvas.width = body.clientWidth;

        Ycenter = canvas.height / 2;
        Xcenter = canvas.width / 2;

        loop()
    }

    this.Stop = function() {
        clearInterval(IntervalTime)
    }

    this.Start = function() {
        clearInterval(IntervalTime)
        IntervalTime = setInterval(loop, 20);
    }


    function loop() {
        date = new Date();
        Draw();
    }

    function Draw() {
        ctx.fillStyle = ColorBackground; //background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //draw arc
        ctx.strokeStyle = firtColor;
        ctx.lineCap = "round";

        //arc secondes
        ctx.lineWidth = 13;
        ctx.beginPath();
        ctx.arc(Xcenter, Ycenter, 302, 0 - Math.PI / 2, (date.getSeconds() + date.getMilliseconds() / 1000) / (60 / (2 * Math.PI)) - Math.PI / 2)
        ctx.stroke();

        //arc minutes
        ctx.strokeStyle = secondeColor;
        ctx.lineWidth = 17;
        ctx.beginPath();
        ctx.arc(Xcenter, Ycenter, 278, 0 - Math.PI / 2, (date.getMinutes() + (date.getSeconds() * 100 / 60) / 100 + date.getMilliseconds() / 100000) / (60 / (2 * Math.PI)) - Math.PI / 2)
        //console.log((date.getMinutes() + date.getMinutes() * 100/60) / (60 / (2*Math.PI)) - Math.PI/2)
        ctx.stroke();

        //arc hours
        var hours = date.getHours() + (date.getMinutes() * 100 / 60) / 100;
        if (hours > 12) {
            hours -= 12;
        }

        ctx.strokeStyle = thirdColor;
        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.arc(Xcenter, Ycenter, 250, 0 - Math.PI / 2, (hours) / (12 / (Math.PI * 2)) - Math.PI / 2);
        //console.log((date.getMinutes() + date.getMinutes() * 100/60) / (60 / (2*Math.PI)) - Math.PI/2)
        ctx.stroke();

        //binary clock
        let arrS = GetBinary(date.getSeconds())
        let arrM = GetBinary(date.getMinutes())
        let arrH = GetBinary(date.getHours())
        binaryDigit = [arrS, arrM, arrH]
        for (let i = 0; i < binaryDigit.length; i++) {
            for (let j = 0; j < binaryDigit[i].length; j++) {
                if (binaryDigit[i][j] == 1) {
                    binaryDigitAnimation[i][j] += valAdd
                    if (binaryDigitAnimation[i][j] > 1) {
                        binaryDigitAnimation[i][j] = 1
                    }
                } else {
                    binaryDigitAnimation[i][j] += valSub
                    if (binaryDigitAnimation[i][j] < 0) {
                        binaryDigitAnimation[i][j] = 0
                    }
                }
            }
        }

        DrawBinaryClock()
    }

    function DrawBinaryClock() {
        var blocx = Xcenter + 125
        var lignex = -25 //-25
        var ligney = Ycenter - 100 //-25
        for (let i = 0; i < binaryDigit.length; i++) { //block
            lignex = -25
            for (let j = 0; j < 2; j++) { //ligne block
                ligney = Ycenter - 100
                for (let k = 0; k < 4; k++) {
                    ctx.fillStyle = fourthColor
                    ctx.roundRect(blocx + lignex - 13, ligney + 13, 26, 26, 5)
                    ctx.fill()
                    ctx.fillStyle = `rgba(42,157,244,${binaryDigitAnimation[i][4*j + k]})`
                    ctx.fill()

                    ligney += 50
                }
                lignex += 50
            }
            blocx -= 125
        }

    }

    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    }

    //stackOverflow
    function padStart(string, length, char) {
        //  can be done via loop too:
        //    while (length-- > 0) {
        //      string = char + string;
        //    }
        //  return string;
        return length > 0 ?
            padStart(char + string, --length, char) :
            string;
    }
    //stackOverflow
    function numToString(num, radix, length = num.length) {
        const numString = num.toString(radix);
        return numString.length === length ?
            numString :
            padStart(numString, length - numString.length, "0")
    }

    function GetBinary(a) {
        let str = numToString(a, 2, 8)
        let arr = []
        for (let i = 0; i < str.length; i++) {
            arr.push(parseInt(str[i]))
        }
        return arr
    }

    window.onresize = function() {
        canvas.height = body.clientHeight;
        canvas.width = body.clientWidth;
        Ycenter = canvas.height / 2;
        Xcenter = canvas.width / 2;
    }


    function nb_random(min, max) { //fonction générant un nobre aléatoir  min et max inclue
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.setup();
}

let ClockBackgroundCanvas = new ClockBackground()

window.addEventListener("resize", () => {
    ClockBackgroundCanvas.setup()
});