let W = 900;
let H = 900;


let triW = 50;
let triH = triW * Math.sin(Math.PI / 3)
let time = 0

let mouseX = null;
let mouseY = null;
let timeMouse = 0;
let bool = false;


function setup() {
    createCanvas(windowWidth, windowHeight);
    W = windowWidth;
    H = windowHeight;

    stroke(200);
    strokeWeight(2);
    //noStroke()
    //colorMode(HSB);
}


function draw() {
    time++;
    timeMouse++;
    background(50);
    for (let i = -1; i <= W / triW; i++) {
        for (let j = 0; j <= H / triH + 1; j++) {
            col(i, j)
            ////console.log(noise(i, j, time/100))
            beginShape()
            vertex(i * triW + (triW / 2) * (j % 2), j * triH)
            vertex((i + 1) * triW + (triW / 2) * (j % 2), j * triH)
            vertex((i + j % 2) * triW + (triW / 2) * ((j + 1) % 2), (j + 1) * triH)
            endShape(CLOSE)

            col(i, j + 0.5)
            beginShape()
            vertex(i * triW + (triW / 2) * (j % 2), j * triH)
            vertex((i + 1) * triW + (triW / 2) * (j % 2), j * triH)
            vertex((i + j % 2) * triW + (triW / 2) * ((j + 1) % 2), (j - 1) * triH)
            endShape(CLOSE)
        }
    }
}

function col(i, j) {
    let res = 0;
    let dist = 0;
    let distX = i * triW - mouseX;
    let distY = j * triH - mouseY;
    if (mouseX != null) {
        let speed = 50;
        if (bool == false) {
            dist = max(timeMouse * speed - sqrt(distX * distX + distY * distY), 0);
        } else {
            dist = min(timeMouse * speed - sqrt(distX * distX + distY * distY), 0);
        }
        res = triWave((dist))
    }


    let col = HSLtoRGB(floor(res) * (time / 25 - sqrt(distX * distX + distY * distY)*0.002) + 2.3, 10, (noise(i / 0.1, j / 0.1, time / 100)) * 30)
    //let col = HSLtoRGB(2.3, 0, res * 50)
    //10 + (noise(i/10, j/10, time/100)-0.5)*10
    fill(col[0], col[1], col[2])
    stroke(col[0], col[1], col[2])
}

function triWave(x) {
    let size = 100;
    if (abs(x) > size) {
        return 0;
    } else {
        return abs(abs(x) - size) / size
    }
}

function HSLtoRGB(hue, saturation, darkness, alpha) {
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

function mouseClicked(event) {
    mouseX = event.x;
    mouseY = event.y;
    timeMouse = 0;
    bool = bool ? false : true //pour alterner
}