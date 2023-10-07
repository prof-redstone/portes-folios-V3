var cenX;
var cenY;
var mX;
var mY;
var selected = -1;
var size = 100;
var depth = 6;
var col1;
var col2;
var mode = 2;

var param = [
    [0.4, 0, -200, 0],
    [0.4, 1, 0, -200],
    [0.4, 0, 200, 0],
    [0.4, 0, 0, 200],
]

function setup() {
    createCanvas(windowWidth, windowHeight)
    H = height;
    W = width;
    cenX = W / 2;
    cenY = H / 2;
    colorMode(RGB);
    col1 = color(54, 53, 55);
    col2 = color(191, 215, 234);
}

function pt(x, y) {
    this.x = x;
    this.y = y;

    this.init = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.rot = function(a) {
        const newX = this.x * Math.cos(a) - this.y * Math.sin(a);
        const newY = this.x * Math.sin(a) + this.y * Math.cos(a);
        this.x = newX;
        this.y = newY;
    }

    this.scale = function(a) {
        this.x *= a;
        this.y *= a;
    }

    this.trans = function(a, b) {
        this.x += a;
        this.y += b;
    }

    this.sh = function(i) {
        this.scale(param[i][0]);
        this.rot(param[i][1]);
        this.trans(param[i][2], param[i][3])
    }

    this.sh1 = function() {
        this.scale(map(noiseInd(0), 0.6, 0.9));
        this.rot(map(noiseInd(1), 0, 2 * pi));
        this.trans(map(noiseInd(2), -200, 200), map(noiseInd(3), -200, 200))
    }

    this.sh2 = function() {
        this.scale(map(noiseInd(4), 0.6, 0.9));
        this.rot(map(noiseInd(5), 0, 2 * pi));
        this.trans(map(noiseInd(6), -200, 200), map(noiseInd(7), -200, 200))
    }

    this.sh3 = function() {
        this.scale(map(noiseInd(8), 0.6, 0.9));
        this.rot(map(noiseInd(9), 0, 2 * pi));
        this.trans(map(noiseInd(10), -200, 200), map(noiseInd(11), -200, 200))
    }
}

function draw() {
    background(col2)
    mX = mouseX - W / 2;
    mY = mouseY - H / 2;
    move()
    if(mode == 1){
        for (let j = depth; j >= 0; j--) {
            for (let i = 0; i < (param.length ** j); i++) {
                plot(i, j)
            }
        }
    }else if(mode == 2){
        for (let j = 0; j <= depth; j++) {
            for (let i = 0; i < (param.length ** j); i++) {
                plot(i, j)
            }
        }
    }else if(mode == 3){
        j = depth;
        for (let i = 0; i < (param.length ** j); i++) {
            plot(i, j)
        }
    }
    
}

function plot(n, d) {
    let pt1 = new pt(-size, -size);
    let pt2 = new pt(-size, size);
    let pt3 = new pt(size, size);
    let pt4 = new pt(size, -size);

    for (let i = 0; i < d; i++) {
        let rep = Math.floor(n / (param.length ** i)) % param.length
        pt1.sh(rep)
        pt2.sh(rep)
        pt3.sh(rep)
        pt4.sh(rep)
    }

    //fill(d * 30)
    //stroke(d * 30)
    colorOfDepth(d)
    quad(pt1.x + cenX, pt1.y + cenY, pt2.x + cenX, pt2.y + cenY, pt3.x + cenX, pt3.y + cenY, pt4.x + cenX, pt4.y + cenY)
}

function colorOfDepth(d){
    const col = lerpColor(col1, col2, d/(depth+3));
    fill(col)
    stroke(col)
}



function move() {
    let grabDist = 50
    if (mouseIsPressed === true) {
		selected = -1;
        for (let i = 0; i < param.length; i++) {
            if (len(param[i][2], param[i][3], mX, mY) < grabDist) {
				selected = i;
                param[i][2] = mX;
                param[i][3] = mY;
                break;
            }
        }
    }

	if(selected != -1){
		let speed1 = 0.01;
		let speed2 = 0.03;
		if (keyIsDown(LEFT_ARROW)) {
			param[selected][1] -= speed2
		}
		if (keyIsDown(RIGHT_ARROW)) {
			param[selected][1] += speed2
		}
		if (keyIsDown(UP_ARROW)) {
			param[selected][0] -= speed1
		}
		if (keyIsDown(DOWN_ARROW)) {
			param[selected][0] += speed1
		}
	}
}

function mouseWheel(event) {
    if (event.delta < 0) {
        size += 2;
    } else {
        size -= 2;
    }
}

function keyPressed() {

    if (keyCode == 32) {//barre espace
        mode++;
        if(mode == 4){ mode = 1}
    }
}

function len(a, b, c, d) {
    return Math.sqrt((a - c) ** 2 + (b - d) ** 2);
}
