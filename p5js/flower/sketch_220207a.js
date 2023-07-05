var zoff = 0;
var noiseMax1 = 3;
var noiseMax2 = 3;
var size = 0

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("#0a1045");
    var col = color("#d1345b")
    col.setAlpha(0.1 *255)
    stroke(col);
    noFill();
}


function draw() {
    //background(0);
    translate(width / 2, height / 2);
    var col = color(LerpPalette([color("#a682ff"),color("#715aff"),color("#5887ff"),color("#55c1ff")], mod((zoff/8)**0.5,1)))
    col.setAlpha(0.1 *255)
    stroke(col);

    beginShape();
    for (let a = 0; a <= TWO_PI; a += (TWO_PI / min(size*40,2000))) {
        let xoff = map(cos(a), -1, 1, 0, noiseMax1);
        let yoff = map(sin(a), -1, 1, 0, noiseMax1);
        let r = map(noise(xoff, yoff, zoff), 0, 1, size, size *2);
        let x = r * cos(a);
        let y = r * sin(a);
        vertex(x, y);
    }
    endShape();

    zoff += 0.01
    size += 0.3
}


function LerpPalette(pal = [], x = 0, loop = true){
    let col = color("#000");
    if(pal.length == 0){return color("#000");} //pas de couleur renvoi noir
    if(pal.length == 1){return color(pal[0]);} //si 1 couleur la renvoi

    let len = pal.length;//min 2
    let interpPal = x * (len);
    let col1 = floor(interpPal)
    let col2;
    if (loop) {
        col2 = (col1+1)%(len)
    }else{
        col2 = (col1+1)
        if(col2 >= len){col2 = len-1};
    }
    
    if(col1 == col2){return color(pal[col1]);}

    let interIndex = interpPal - col1

    col = color(
        pal[col1].levels[0] + (pal[col2].levels[0] - pal[col1].levels[0]) * interIndex,
        pal[col1].levels[1] + (pal[col2].levels[1] - pal[col1].levels[1]) * interIndex,
        pal[col1].levels[2] + (pal[col2].levels[2] - pal[col1].levels[2]) * interIndex
    )

    return col
}

function mod(x,y){
    while(x > y){
        x -= y;
    }
    return x
}