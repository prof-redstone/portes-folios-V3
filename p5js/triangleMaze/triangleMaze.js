let triW = 3;
let triH = triW * Math.sin(Math.PI / 3)
let triLarg = 0;
let triLong = 0;
let caseCol = [];
let grad = [];
let head = [0, 0];
let compt = 0;
let fini = false;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(1000);
    strokeWeight(1);
    stroke(0)
    triLarg = floor(width / (triW / 2))-2;
    triLong = floor(height / triH)-1;
    for (let i = 0; i < triLarg; i++) {
        caseCol[i] = []
        for (let j = 0; j < triLong; j++) {
            fill(0)
            //drawTri(i, j)
            caseCol[i][j] = -1;
            //caseCol[i][j] = 0;
        }
    }
    head = [0, 0];
    background(0)
}


function draw() {
    if(!fini){
        for (let i = 0; i < 800; i++) {
            make()
        }
    }
}

function make(){
    caseCol[head[0]][head[1]] = compt;
    let voisins = validVois(head[0], head[1]);
    if (compt == -1) {
        fini = true;
        print("c'est fini ! ");
    }
    if (voisins.length > 0) {
        let res = random(voisins);
        //strokeWeight(0);
        let color = HSLtoRGB(compt / 10000, 1, 1);
        stroke(color);
        fill(color);
        drawTri(res[0], res[1]);
        compt++;
        head[0] = res[0];
        head[1] = res[1];
    } else {
        let retourVois = getVois(head[0], head[1]);
        for (let i = 0; i < retourVois.length; i++) {
            if (caseCol[retourVois[i][0]][retourVois[i][1]] == compt - 1) {
                head[0] = retourVois[i][0];
                head[1] = retourVois[i][1];
                compt--;
                break
            }
        }
    }
}

function validVois(x, y) {
    let vois = getVois(x, y);
    let valid = [];
    for (let i = 0; i < vois.length; i++) {
        if (caseCol[vois[i][0]][vois[i][1]] == -1) {
            let voisin2 = getVois(vois[i][0], vois[i][1]);
            let flag = true
            for (let j = 0; j < voisin2.length; j++) {
                if (caseCol[voisin2[j][0]][voisin2[j][1]] != -1 && (voisin2[j][0] != x || voisin2[j][1] != y)) {
                    flag = false;
                }
            }
            if (flag) {
                append(valid, [vois[i][0], vois[i][1]]);
            }
        }
    }
    return valid;
}

function getVois(i, j) {
    let voisins = [];
    if (i - 1 >= 0) {
        append(voisins, [i - 1, j])
    }
    if (i + 1 < triLarg) {
        append(voisins, [i + 1, j])
    }
    if ((i + j) % 2 == 0) {
        if (j + 1 < triLong) {
            append(voisins, [i, j + 1])
        }
    } else {
        if (j - 1 >= 0) {
            append(voisins, [i, j - 1])
        }
    }
    return voisins;
}

function DrawMouse() {
    strokeWeight(5);
    let i = round(mouseX / (triW / 2));
    let j = round(mouseY / (triH));
    stroke("green");
    drawTri(i, j)
    stroke("red");
    drawTri(i + 1, j)
    drawTri(i - 1, j)
    stroke("blue");
    if ((i + j) % 2 == 0) {
        drawTri(i, j + 1)
    } else {
        drawTri(i, j - 1)
    }
}


function drawTri(i, j) {
    let margX = triW;
    let margY = triH;
    let x = i * triW / 2;
    let y = j * triH;
    if ((i + j) % 2 == 0) {
        beginShape()
        vertex(margX + x, margY + y - triH / 2)
        vertex(margX + x + triW / 2, margY + y + triH / 2)
        vertex(margX + x - triW / 2, margY + y + triH / 2)
        endShape(CLOSE)
    } else {
        beginShape()
        vertex(margX + x, margY + y + triH / 2)
        vertex(margX + x + triW / 2, margY + y - triH / 2)
        vertex(margX + x - triW / 2, margY + y - triH / 2)
        endShape(CLOSE)
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