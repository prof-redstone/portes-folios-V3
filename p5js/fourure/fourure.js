
var zoom = 10
var conc = 13 //concentration
var noisezoom = 50

var size = 450
var margeTop = 0
var margeLeft = 0

var rotSpeed = 0.2
var addercoef = 1 //higher speed of rotation on bottom (multiply ba this coef)
var koff = 0.0
var gride = []

function setup() {
	createCanvas(windowWidth,windowHeight)
	strokeWeight(3)
	for (let i = 0; i < size/conc; i++) {
		gride[i] = []
		for (let j = 0; j < size/conc; j++) {
			gride[i][j] = 0
		}
	}
	margeLeft = (windowWidth-size)/2
	margeTop = (windowHeight-size)/2
}


function draw() {
	background("#13293d")
	
    for (let i = 0; i < size/conc; i++) {
        for (let j = 0; j < size/conc; j++) {
			var angle = noise(i/noisezoom, j/noisezoom, koff) - 0.5;
			gride[i][j] += angle*rotSpeed
			let lenght = (j*addercoef + conc/2)//*sin(gride[i][j])
			strokeWeight(j/(size/conc)*4 + 3)
			var angCol = lerpColor(color("#BB3E03"), color("#f4e9cd"), abs(cos(gride[i][j])))
			var col = lerpColor(color("#13293d"),angCol, j/(size/conc)+0.1)
			stroke(col)
			line(
				margeLeft + i*conc - cos(gride[i][j])*lenght,
				margeTop + j*conc - sin(gride[i][j])*lenght, 
				margeLeft + i*conc + cos(gride[i][j])*lenght, 
				margeTop + j*conc + sin(gride[i][j])*lenght
			)
        }
    }

	koff += 0.015
}
