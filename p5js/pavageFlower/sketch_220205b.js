var shape = []
var size = 30;
var frame = 0

function setup() {
    createCanvas(windowWidth, windowHeight)

    /*var test = new Shape(300, 300)
    test.render()*/
    for (let i = 0; i < windowHeight/(size*1); i++) {
        shape[i] = []
        for (let j = 0; j < windowWidth/(size*1.6); j++) {
            var x = 1.73205 * (j + (i % 2) / 2) * size //1.7320508075688772 = sqrt(3)
            var y = 1.5 * i * size
            //point(x, y);
            shape[i][j] = new Shape(x,y)
        }
    }
}


function draw() {
    background("#2a324b")
    stroke("#f7c59f")
    translate(-50,-50)
    
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {

            //let Nsize = map(noise(i/100,j/100,frame/200),0,1,30,120)
            //let Nang = map(noise(i/30,j/30,frame/150),0,1,0.4,1.6)
            let Nsize = map(sin(frame/120 + i/50),-1,1,30,120)
            let Nang = map(sin(frame/240+ j/50 ),-1,1,0.4,1.6)
            shape[i][j].size = Nsize
            shape[i][j].secAng = Nang
            shape[i][j].render()
        }
    }

    frame += 0.5
}


function Shape(x, y) {
    this.x = x
    this.y = y
    this.size = 30
    this.secAng = 1

    this.render = function() {
        noFill()
        beginShape();
        for (let i = 0; i < 12; i++) {
            if (i%2) {
                vertex(this.x + cos((PI / 6) * i) * (this.size), this.y + sin((PI / 6) * i) * (this.size ))
            }else{
                //sqrt(3)/2 = 0.866025
                vertex(this.x + cos((PI / 6) * i) * (this.size*0.866025*this.secAng), this.y + sin((PI / 6) * i) * (this.size *0.866025*this.secAng))
            }

        }
        endShape(CLOSE)
    }
}