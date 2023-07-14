var grid = [];
var next = [];
let canvas;

let Da = 1.0;
let Db = .5;
let f = .039;
let k = .058;
let delta = 1.0;

//for laplace 
let neighborh = 0.2;
let diagonal = 0.05;

let updatePerLoop = 3

function setup() {
    canvas = createCanvas(200, 200);
    canvas.width = 500;
    pixelDensity(1);
    frameRate(90)

    for (let i = 0; i < width; i++) {
        grid[i] = [];
        next[i] = [];
        for (let j = 0; j < height; j++) {

            grid[i][j] = [1., 0.];
            next[i][j] = [1., 0.];
        }
    }


    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (sqrt((100 - x) ** 2 + (100 - y) ** 2) < 10) {
                grid[x][y][1] = 1;
            }
        }
    }
}


function draw() {

    //console.log(frameRate())

    if (mouseIsPressed) {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2) < 10) {
                    grid[x][y][1] = 1;
                }
            }
        }
    }

    loadPixels();

    for (let l = 0; l < updatePerLoop; l++) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                //updating part
                let a = grid[i][j][0];
                let b = grid[i][j][1];
                let newa = a + ((Da * laplaceA(i, j)) - (a * b * b) + (f * (1 - a))) * delta;
                let newb = b + ((Db * laplaceB(i, j)) + (a * b * b) - ((k + f) * b)) * delta;

                next[i][j][0] = constrain(newa, 0, 1);
                next[i][j][1] = constrain(newb, 0, 1);

                //drawing part
                if (l == updatePerLoop - 1) {
                    let pix = (i + j * width) * 4;
                    let c = constrain(floor((next[i][j][0] - next[i][j][1]) * 255), 0, 255)
                    pixels[pix + 0] = c;
                    pixels[pix + 1] = c;
                    pixels[pix + 2] = c;
                    pixels[pix + 3] = 255;
                }
            }
        }

        Swap();
    }

    updatePixels();

}


function laplaceA(x, y) {
    let sumA = 0;

    sumA += V(x, y)[0] * -1;
    sumA += V(x - 1, y)[0] * neighborh;
    sumA += V(x + 1, y)[0] * neighborh;
    sumA += V(x, y - 1)[0] * neighborh;
    sumA += V(x, y + 1)[0] * neighborh;
    sumA += V(x + 1, y + 1)[0] * diagonal;
    sumA += V(x + 1, y - 1)[0] * diagonal;
    sumA += V(x - 1, y + 1)[0] * diagonal;
    sumA += V(x - 1, y - 1)[0] * diagonal;

    return sumA;
}

function laplaceB(x, y) {
    let sumB = 0;

    sumB += V(x, y)[1] * -1;
    sumB += V(x - 1, y)[1] * neighborh;
    sumB += V(x + 1, y)[1] * neighborh;
    sumB += V(x, y - 1)[1] * neighborh;
    sumB += V(x, y + 1)[1] * neighborh;
    sumB += V(x + 1, y + 1)[1] * diagonal;
    sumB += V(x + 1, y - 1)[1] * diagonal;
    sumB += V(x - 1, y + 1)[1] * diagonal;
    sumB += V(x - 1, y - 1)[1] * diagonal;

    return sumB;
}

function V(x, y) {
    if (x >= 0 && x < width && y >= 0 && y < width) {
        return grid[x][y]
    } else {
        return [0, 0]
    }
}


function Swap() {
    let temp = grid;
    grid = next;
    next = temp;
}