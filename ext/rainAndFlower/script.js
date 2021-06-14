canvas = document.getElementById("rainandflower")
ctx = canvas.getContext("2d")


let lastUpdate = Date.now();
let deltaTime = 0;

let particle = [];
let nbParticle = 120;
let modeTransition = 0;
let interval;

let mouse = {
    x: null,
    y: null
}
canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})


function UpdateDelteTime() {
    let now = Date.now()
    let dt = (now - lastUpdate) / 40
    lastUpdate = now

    return dt
}

function setup(params) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineCap = "round"

    for (let i = 0; i < nbParticle; i++) {
        particle.push(new particleRaF())
    }

    interval = setInterval(() => {
        frame()
    }, 20);
}

function frame() {
    deltaTime = UpdateDelteTime()

    modeTransition -= (modeTransition - (Math.min(Math.max((mouse.y - canvas.height * 0.2) / (canvas.height * 0.6), 0), 1))) * 0.1

    let deg1 = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    deg1.addColorStop(0.1, ColorTrans([83, 129, 134, 1], [189, 238, 237, 1], modeTransition)); //242, 254, 178,
    deg1.addColorStop(0.7, ColorTrans([38, 72, 75, 1], [240, 237, 170, 1], modeTransition));
    deg1.addColorStop(1, ColorTrans([26, 51, 56, 1], [211, 234, 158, 1], modeTransition));
    ctx.fillStyle = deg1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particle.length; i++) {
        particle[i].draw()
    }
}

class particleRaF {
    constructor() {
        this.generate()
    }
    generate() {
        this.x = nb_random(0, canvas.width);
        this.y = nb_random(0, canvas.height);
        //rain
        this.dir = Math.PI / 2;
        this.speed = nb_random(80, 100) / 3;
        this.size = nb_random(45,55)/10;
        this.length = nb_random(55,75);
        this.color1 = [230, 230, 230, 0];
        this.color2 = [230, 230, 230, 0.3];
        //flower
        this.flowerDir = nb_random(0, 2 * Math.PI * 100) / 100;
        this.flowerSpeed = nb_random(50, 100) / 20;
        this.flowerSize = nb_random(40, 120) / 4
        this.flowerLength = -35
        this.flowerColor1 = colorChange((nb_random(0, 60) / 10), nb_random(40, 50), nb_random(5, 15), nb_random(80,100)/100);
        this.flowerColor2 = this.flowerColor1; //the same color for no gradient

        this.actuSpeed = this.speed;
        this.actuColor1 = ColorTrans(this.color1);
        this.actuColor2 = ColorTrans(this.color2);
        this.actuDir = this.dir;
        this.actuLength = this.length;
        this.actuSize = this.size;

    }
    UpdateValue() {
        this.actuSpeed = this.speed + (this.flowerSpeed - this.speed) * modeTransition;
        this.actuDir = this.dir + (this.flowerDir - this.dir)/2 * modeTransition;
        this.actuLenght = this.lenght + (this.flowerLenght - this.lenght) * modeTransition;
        this.actuSize = this.size + (this.flowerSize - this.size) * modeTransition;
        this.actuColor1 = ColorTrans(this.color1, this.flowerColor1, modeTransition)
        this.actuColor2 = ColorTrans(this.color2, this.flowerColor2, modeTransition)
        this.actuLenght = this.length + (this.flowerLength - this.length) * modeTransition;
        if (this.actuLenght < 0) {
            this.actuLenght = 0
        }
    }
    Update() {
        this.x = this.x + (this.actuSpeed * Math.cos(this.actuDir) * deltaTime)
        this.y = this.y + (this.actuSpeed * Math.sin(this.actuDir) * deltaTime)

        if (this.x + this.actuSize < 0) {
            this.x = canvas.width + this.actuSize
        }
        if (this.x - this.actuSize > canvas.width) {
            this.x = 0 - this.actuSize
        }

        if (this.y + this.actuSize < 0) {
            this.y = canvas.height + this.actuSize;
            this.x = nb_random(0, canvas.width + this.actuSize)
        }
        if (this.y - this.actuSize - this.actuLenght > canvas.height) {
            this.y = 0 - this.actuSize + (this.y - (canvas.height + this.actuSize)) - this.actuLenght;
            this.x = nb_random(0, canvas.width + this.actuSize)
        }
    }
    draw() {
        this.UpdateValue()
        this.Update()
        /*ctx.beginPath();
        ctx.arc(this.x, this.y, this.actuSize, 0, 2 * Math.PI);
        ctx.fillStyle = this.actuColor;
        ctx.fill();*/
        var grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.length);
        grad.addColorStop(1, this.actuColor1);
        grad.addColorStop(0.1, this.actuColor2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.actuSize;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.actuLenght);

        ctx.stroke();
    }
}


function ColorTrans(c1, c2, value) {
    if (c2 != undefined && value != undefined) {
        let r = (c1[0] + (c2[0] - c1[0]) * value)
        let g = (c1[1] + (c2[1] - c1[1]) * value)
        let b = (c1[2] + (c2[2] - c1[2]) * value)
        let a = (c1[3] + (c2[3] - c1[3]) * value)
        return `rgb(${r},${g},${b},${a})`
    } else {
        return `rgb(${c1[0]},${c1[1]},${c1[2]},${c1[3]})`
    }
}

function colorChange(hue, saturation, darkness, alpha) {
    /*
    hue :
    0 : red; 1 : yellow; 2 : green; 3 : cyan; 4 : blue; 5 : purple; 6 : red
    hue  0 == 6   6 is one cycle rotation
    
    saturation [0;100]
    darkness [0;100]
    alpha [0;1]
    
    */

    var red
    var green
    var blue

    hue = hue % 6;

    if (hue >= 0 && hue < 1) {
        red = 255
        green = hue * 255
        blue = 0;
    } else if (hue >= 1 && hue < 2) {
        green = 255
        red = 255 - ((hue - 1) * 255)
        blue = 0;
    } else if (hue >= 2 && hue < 3) {
        green = 255
        blue = (hue - 2) * 255
        red = 0;
    } else if (hue >= 3 && hue < 4) {
        blue = 255
        green = 255 - ((hue - 3) * 255)
        red = 0;
    } else if (hue >= 4 && hue < 5) {
        blue = 255
        red = (hue - 4) * 255
        green = 0;
    } else if (hue >= 5 && hue < 6) {
        red = 255
        blue = 255 - ((hue - 5) * 255)
        green = 0;
    }

    var sat = saturation / 100;
    red = red + (255 - red) * sat;
    green = green + (255 - green) * sat;
    blue = blue + (255 - blue) * sat;

    var dark = (100 - darkness) / 100;
    red = Math.round(red * dark)
    green = Math.round(green * dark);
    blue = Math.round(blue * dark);

    return [red, blue, green, alpha];
}

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


setup()