let W = 900;
let H = 900;

let squareSize = 100
let fusionLength;

time = 0;


function setup() {
    createCanvas(windowWidth, windowHeight);
    W = windowWidth;
    H = windowHeight;
    stroke(200);
    strokeWeight(2);
}


function draw() {
    background(50);
    time++;
    fusionLength = (Math.cos(time/300)+1)*(squareSize*0.75)


    for (let i = -1; i <= (W / squareSize); i++) {
        for (let j = -1; j <= (H / squareSize); j++) {
            //point(i * squareSize, j * squareSize)
            if ((i + j) % 2 == 0) {
                //line(i*squareSize,j*squareSize,(i+1)*squareSize,(j+1)*squareSize)
                p1x = (i + 0.5) * squareSize;
                p2x = (i + 0.5) * squareSize;
                p1y = (j + 0.5) * squareSize - fusionLength/2;
                p2y = (j + 0.5) * squareSize + fusionLength/2;
                line(i*squareSize, j*squareSize, p1x, p1y);
                line((i+1)*squareSize, j*squareSize, p1x, p1y);
                line(i*squareSize, (j+1)*squareSize, p2x, p2y);
                line((i+1)*squareSize, (j+1)*squareSize, p2x, p2y);
                line(p1x, p1y, p2x, p2y);
            }else{
                p1x = (i + 0.5) * squareSize - fusionLength/2;
                p2x = (i + 0.5) * squareSize + fusionLength/2;
                p1y = (j + 0.5) * squareSize;
                p2y = (j + 0.5) * squareSize;
                line(i*squareSize, j*squareSize, p1x, p1y);
                line((i+1)*squareSize, j*squareSize, p2x, p2y);
                line(i*squareSize, (j+1)*squareSize, p1x, p1y);
                line((i+1)*squareSize, (j+1)*squareSize, p2x, p2y);
                line(p1x, p1y, p2x, p2y);
            }
        }
    }
}