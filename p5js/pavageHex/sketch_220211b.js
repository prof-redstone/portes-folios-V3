var layer1 = []
var size = 50
var size2 = 100
var layer2 = []
var timer = 0

function setup() {
    createCanvas(windowWidth, windowHeight)
    for (let i = 0; i < (height / (size*3/2))+1; i++) {
        layer1[i] = []
        for (let j = 0; j < width / (size * 1.732) ; j++) {
            var x = 1.73205 * (j + (i % 2) / 2) * size //1.7320508075688772 = sqrt(3)
            var y = 1.5 * i * size
            layer1[i][j] = new Hex(x, y, size, -500);
        }
    }

    for (let i = 0; i < windowHeight / (size2); i++) {
        layer2[i] = []
        for (let j = 0; j < windowWidth / (size2 * 2) * 1.2; j++) {
            var x = 1.73205 * (j + (i % 2) / 2) * size2 //1.7320508075688772 = sqrt(3)
            var y = 1.5 * i * size2
            layer2[i][j] = new Hex(x, y, size2, -500);
        }
    }
}


function draw() {
    background("#283038")

    if (timer % 500 == 0) {
        for (let i = 0; i < layer1.length; i++) {
            for (let j = 0; j < layer1[0].length; j++) {
                layer1[i][j].time = map(noise(i / 5, j / 5, timer/100), 0, 1, -3.5, -1);
                let r = random(0, 4)
                switch (floor(r)) {
                    case 0:
                        layer1[i][j].color = "#FE6868";
                        break;
                    case 1:
                        layer1[i][j].color = "#F2DC6C";
                        break;
                    case 2:
                        layer1[i][j].color = "#50D0C1";
                        break;
                    case 3:
                        layer1[i][j].color = "#F6FBF2";
                        break;
                }
            }
        }
    }
    if ((timer) % 600 == 0) {
        for (let i = 0; i < layer2.length; i++) {
            for (let j = 0; j < layer2[0].length; j++) {
                layer2[i][j].time = map(random(0,1), 0, 1, -3.5, -1);
                let r = random(0, 4)
                switch (floor(r)) {
                    case 0:
                        layer2[i][j].color = "#FE6868";
                        break;
                    case 1:
                        layer2[i][j].color = "#F2DC6C";
                        break;
                    case 2:
                        layer2[i][j].color = "#50D0C1";
                        break;
                    case 3:
                        layer2[i][j].color = "#F6FBF2";
                        break;
                }
            }
        }
    }


    for (let i = 0; i < layer2.length; i++) {
        for (let j = 0; j < layer2[0].length; j++) {

            if (layer2[i][j].time < 2.5) {

                layer2[i][j].render()
            }
            layer2[i][j].time += 0.01 * (deltaTime/13.5)
        }
    }
    for (let i = 0; i < layer1.length; i++) {
        for (let j = 0; j < layer1[0].length; j++) {

            if (layer1[i][j].time < 2.5) {

                layer1[i][j].render()
            }
            layer1[i][j].time += 0.014 * (deltaTime/13.5)
        }
    }
    timer += 1 
}


function Hex(x, y, s, t) {
    this.x = x
    this.y = y
    this.size = s
    this.time = t
    this.decalage = 1.1
    this.color = "#FE6867"

    this.render = function() {

        let ratio = Sig(this.time, 5, 5);
        let ratio2 = Sig(this.time + this.decalage, 5, 5);
        if(abs(ratio - ratio2) < 0.0008){
            return
            //pour les perf
        }
        let col = color(this.color);
        if (ratio > 0.97) {
            col.setAlpha((1 - ratio) * 70 * 255)
        }
        fill(col)
        stroke(col)
        for (let i = 0; i < 6; i++) {
            beginShape();
            vertex(this.x + sin((PI / 3) * i) * (this.size * ratio), this.y + cos((PI / 3) * i) * (this.size * ratio));
            vertex(this.x + sin((PI / 3) * (i + 1)) * (this.size * ratio), this.y + cos((PI / 3) * (i + 1)) * (this.size * ratio));
            vertex(this.x + sin((PI / 3) * (i + 1)) * ((this.size) * ratio2), this.y + cos((PI / 3) * (i + 1)) * ((this.size) * ratio2));
            vertex(this.x + sin((PI / 3) * i) * ((this.size) * ratio2), this.y + cos((PI / 3) * i) * ((this.size) * ratio2));
            endShape(CLOSE)
        }
    }
}

function Jump(x) {
    return Sig(x, 5, 5) * Sig(x, -5, -15)
}

function Sig(x, coef = 1, off = 0) {
    return 1 / (1 + 2.718281 ** (off - coef * x))
}