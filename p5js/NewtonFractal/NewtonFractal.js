let myShader;

let zoom = 2;
let showDot = true;
let pos = [0,0];
let mX
let mY
let mousePos

let p1 = [1,0]
let p2 = [-0.5, 0.866025]
let p3 = [-0.5, -0.866025]
let p4 = [0.0, -1.5]
let p5 = [0.0, 1.5]


function preload() {
    myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60)
    pixelDensity(2);
}

function draw() {
    move();
    let time = millis() / 1000.0;

    myShader.setUniform('resolution', [width, height]);
    myShader.setUniform('imouse', mousePos);
    myShader.setUniform('ipos', pos);
    myShader.setUniform('time', time);
    myShader.setUniform('izoom', zoom);
    myShader.setUniform('showDot', showDot);
    myShader.setUniform('ip1', p1);
    myShader.setUniform('ip2', p2);
    myShader.setUniform('ip3', p3);
    myShader.setUniform('ip4', p4);
    myShader.setUniform('ip5', p5);
    myShader.setUniform('ic1', [255, 188, 66]);
    myShader.setUniform('ic2', [216, 17, 89]);
    myShader.setUniform('ic3', [115, 210, 222]);
    myShader.setUniform('ic4', [33, 131, 128]);
    myShader.setUniform('ic5', [143, 45, 86]);
    myShader.setUniform('nbPoint', 5);


    shader(myShader);
    rect(0, 0, width, height);
}

function move(){
    
    mX = map(mouseX, 0, width, 0, 1);
    mY = map(height-mouseY, 0, height, 0, 1);
    mousePos = [(mX - 0.5)*zoom*2*(width/height) - pos[0]*(width/height),(mY - 0.5)*zoom*2 - pos[1]]

    let speed = zoom/80;
    if (keyIsDown(LEFT_ARROW)) {
        pos[0] += speed
    }
    if (keyIsDown(RIGHT_ARROW)) {
        pos[0] -= speed
    }
    if (keyIsDown(UP_ARROW)) {
        pos[1] -= speed
    }
    if (keyIsDown(DOWN_ARROW)) {
        pos[1] += speed
    }

    if (mouseIsPressed === true) {
        let grabDist = 0.15
        if (mouseButton === LEFT) {
            if(len(p1, mousePos) < grabDist){
                p1[0] = mousePos[0];
                p1[1] = mousePos[1];
            }else
            if(len(p2, mousePos) < grabDist){
                p2[0] = mousePos[0];
                p2[1] = mousePos[1];
            }else
            if(len(p3, mousePos) < grabDist){
                p3[0] = mousePos[0];
                p3[1] = mousePos[1];
            }else
            if(len(p4, mousePos) < grabDist){
                p4[0] = mousePos[0];
                p4[1] = mousePos[1];
            }else
            if(len(p5, mousePos) < grabDist){
                p5[0] = mousePos[0];
                p5[1] = mousePos[1];
            }
        }
    }
}

function mouseWheel(event) {
    if (event.delta < 0) {
        zoom *= 0.85;
    } else {
        zoom *= 1.15;
    }
    zoom = min(zoom, 100);
    zoom = max(zoom, 0.000001);
}

function keyPressed() {
    if (keyCode == 32) {//barre espace
        showDot = (showDot ? false : true)
    }
}

function len(a, b){
    return sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2);
}