let myShader;

let recording = false;
let gif;
let size;

let pos;
let vue;
let vueAng1 = 3.8;
let vueAng2 = 2.3;
let zoom = 1.3;
let speed = 0.08;
let dirSpeed = 0.02;

let fractNum = 0;

let norm = p5.Vector.normalize
let sub = p5.Vector.sub
let add = p5.Vector.add
let mult = p5.Vector.mult
let cross = p5.Vector.cross

let param = {
    ang1: -9.83,
    ang2: -1.16,
    scale: 1.9073,
    shift: [-3.508, -3.593, 3.295],
    color: [-0.29, 2.36, 0.06],
    it: 22,
    gamma: 1.5
}

function preload() {
    myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    let size = min(windowWidth, windowHeight);
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60)
    pixelDensity(2);
    pos = createVector(4, 5, 4);
    vue = createVector(0, 0, 0);
}

function draw() {
    move();

    myShader.setUniform('resolution', [width, height]);
    myShader.setUniform('mouse', [map(mouseX, 0, width, 0, 1), map(mouseY, 0, height, 0, 1)]);
    myShader.setUniform('time', millis() / 1000.0);
    myShader.setUniform('iposition', [pos.x, pos.y, pos.z]);
    myShader.setUniform('ivue', [vue.x, vue.y, vue.z]);
    myShader.setUniform('izoom', zoom);
    myShader.setUniform('iAng1', param.ang1);
    myShader.setUniform('iAng2', param.ang2);
    myShader.setUniform('iScale', param.scale);
    myShader.setUniform('iIt', param.it);
    myShader.setUniform('iGamma', param.gamma);
    myShader.setUniform('iShift', [param.shift[0], param.shift[1], param.shift[2]]);
    myShader.setUniform('iFracCol', [param.color[0], param.color[1], param.color[2]]);


    shader(myShader);
    rect(0, 0, width, height);
}

function changeFract(){
    fractNum = fractNum == fracts.length-1 ? 0 : fractNum+1;
    console.log("fractal num ", fractNum); 
    param.scale = fracts[fractNum][0]
    param.ang1 = fracts[fractNum][1]
    param.ang2 = fracts[fractNum][2]
    param.shift[0] = fracts[fractNum][3]
    param.shift[1] = fracts[fractNum][4]
    param.shift[2] = fracts[fractNum][5]
    param.color[0] = fracts[fractNum][6]
    param.color[1] = fracts[fractNum][7]
    param.color[2] = fracts[fractNum][8]
    param.it = fracts[fractNum][9]
    
    pos = createVector(4, 5, 4);
    vueAng1 = 3.8;
    vueAng2 = 2.3;
    speed = 0.08;
}


function move() {
    let forward = sub(vue, pos).normalize();
    let side = cross(createVector(0, 1, 0), forward).normalize();
    let up = cross(forward, side);


    if (keyIsDown(LEFT_ARROW)) {
        vueAng1 += dirSpeed
    }
    if (keyIsDown(RIGHT_ARROW)) {
        vueAng1 -= dirSpeed
    }
    if (keyIsDown(UP_ARROW)) {
        vueAng2 -= dirSpeed
    }
    if (keyIsDown(DOWN_ARROW)) {
        vueAng2 += dirSpeed
        vueAng2 = min(max(0.01, vueAng2), 3.1)
    }
    if (keyIsDown(65)) { //a
        pos.add(up.mult(-speed));
    }
    if (keyIsDown(69)) { //e
        pos.add(up.mult(speed));
    }
    if (keyIsDown(81)) { //q
        pos.add(side.mult(-speed));
    }
    if (keyIsDown(68)) { //d
        pos.add(side.mult(speed));
    }
    if (keyIsDown(90)) { //z
        pos.add(forward.mult(speed));
    }
    if (keyIsDown(83)) { //s
        pos.add(forward.mult(-speed));
    }
    vueAng1 -= movedX / 300;
    vueAng2 += movedY / 300;
    vueAng2 = min(max(0.01, vueAng2), 3.1) //clamp
    vue.y = cos(vueAng2) + pos.y
    vue.x = cos(vueAng1) * sin(vueAng2) + pos.x
    vue.z = sin(vueAng1) * sin(vueAng2) + pos.z

    if (keyIsDown(84)) { //t
        param.ang1 += 0.01
    }
    if (keyIsDown(89)) { //y
        param.ang1 -= 0.01
    }
    if (keyIsDown(71)) { //g
        param.ang2 += 0.01
    }
    if (keyIsDown(72)) { //h
        param.ang2 -= 0.01
    }
    if (keyIsDown(86)) { //v
        param.scale += 0.01
    }
    if (keyIsDown(66)) { //b
        param.scale -= 0.01
    }

    //param.shift
    if (keyIsDown(79)) { //o
        param.shift[0] += 0.01
    }
    if (keyIsDown(80)) { //p
        param.shift[0] -= 0.01
    }
    if (keyIsDown(76)) { //l
        param.shift[1] += 0.01
    }
    if (keyIsDown(77)) { //m
        param.shift[1] -= 0.01
    }
    if (keyIsDown(190)) { //;
        param.shift[2] += 0.01
    }
    if (keyIsDown(191)) { //:
        param.shift[2] -= 0.01
    }

    //param.color
    if (keyIsDown(49)) { //&
        param.color[0] += 0.01
    }
    if (keyIsDown(50)) { //é
        param.color[0] -= 0.01
    }
    if (keyIsDown(51)) { //"
        param.color[1] += 0.01
    }
    if (keyIsDown(52)) { //'
        param.color[1] -= 0.01
    }
    if (keyIsDown(53)) { //(
        param.color[2] += 0.01
    }
    if (keyIsDown(54)) { //-
        param.color[2] -= 0.01
    }

    //gamma
    if (keyIsDown(85)) { //u
        param.gamma = max(min(param.gamma - 0.03, 2.5), 0.5)
    }
    if (keyIsDown(73)) { //i
        param.gamma = max(min(param.gamma + 0.03, 2.5), 0.5)
    }

}

function keyPressed() {
    //iteration
    let maxIt = 35;
    let minIt = 10
    if (key === "w") {
        param.it = max(min(param.it - 1, maxIt), minIt)
        print("iteration : ", param.it)
    } 
    if (key === "x") {
        param.it = max(min(param.it + 1, maxIt), minIt)
        print("iteration : ", param.it)
    }

    //change fract
    if (keyCode == 32) {//barre espace
        changeFract()
    }
}

function mouseWheel(event) {
    if (event.delta < 0) {
        speed *= 2;
    } else {
        speed *= 0.5;
    }
    speed = min(speed, 0.16);
    speed = max(speed, 0.0000048828125);
}

function mouseClicked() {
    requestPointerLock();
}

function guide(){
    console.log("z:forward, s:backward, q:left, d:right, e:up, a:down")
    console.log("mouseWheelUP:speedUP, mouseWheelDOWN:speedDown")
    console.log("Mouse and ArrowKey control camera")
    console.log("x:increaseIteration, w:decreaseIteration")
    console.log("u:decreaseGamma, i:increaseGamme")
    console.log("spaceBar:LoadFract")

    console.log("v:decreaseScale, b:increaseScale")
    console.log("t:decreaseAngle1, y:increaseAngle1")
    console.log("g:decreaseAngle2, h:increaseAngle2")

    
    console.log("o:decreaseShift1, p:increaseShift1")
    console.log("l:decreaseShift2, m:increaseShift2")
    console.log(";:decreaseShift3, ::increaseShift3")

    console.log("&:decreaseColor1, é:increaseColor1")
    console.log("\":decreaseColor2, ':increaseColor2")
    console.log("(:decreaseColor3, -:increaseColor3")
}

guide()