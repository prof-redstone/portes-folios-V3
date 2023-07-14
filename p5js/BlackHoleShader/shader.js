let img;
let myShader;

function preload() {
    myShader = loadShader('shader.vert', 'shader.frag');
    img = loadImage("imgLow.jpg");
}

function setup() {
    let size = min(windowWidth, windowHeight);
    createCanvas(size, size, WEBGL);
    pixelDensity(1);
    textureWrap(REPEAT);
}

function draw() {
    background(220);
    myShader.setUniform('resolution', [width, height]);
    myShader.setUniform('mouse', [map(mouseX, 0, width, 0, 1), map(mouseY, 0, height, 0, 1)]);
    myShader.setUniform('time', millis() / 1000.0);
    myShader.setUniform('texture', img);

    shader(myShader);
    rect(0, 0, width, height);
}