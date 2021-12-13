var canvas
var ctx;
var H = 0;
var W = 0;
var pixelSize = 3;
var circle = []
var pixelVal = []

function setup() {
    canvas = document.getElementById("inverted")
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;
    ctx.fillStyle = "#0F1E3D";
    ctx.strokeStyle = "#897E58";
    setInterval(loop, 50);
    for (let i = 0; i < 30; i++) {
        circle.push(new Circle())
    }
    for (let i = 0; i < W; i++) {
        pixelVal[i] = []
        for (let j = 0; j < H; j++) {
            pixelVal[i][j] = 0;
        }
    }
}

function loop() {
    console.log('loop')
    ctx.clearRect(0, 0, W, H)
    for (let i = 0; i < W; i+=pixelSize) {
        for (let j = 0; j < H; j+=pixelSize) {
            pixelVal[i][j] = 0;
        }
    }
    /*for (let i = 0; i < W; i+=pixelSize) {
        for (let j = 0; j < H; j+=pixelSize) {
            var nbCicleIn = 0
            for (let k = 0; k < circle.length; k++) {
                if (circle[k].size >= Math.sqrt((circle[k].x - i)*(circle[k].x - i) + (circle[k].y - j)*(circle[k].y - j))) {
                    nbCicleIn++
                }
                //Math.sqrt((circle[k].x - i*4)*(circle[k].x - i) + (circle[k].y - j)*(circle[k].y - j))
            }
            if (nbCicleIn%2) {
                
                ctx.fillStyle = "#EEE"
            }else{
                ctx.fillStyle = "#222"
            }
            ctx.fillRect( i, j, pixelSize, pixelSize );
        }
    }*/

    for (let k = 0; k < circle.length; k++) {
        for (let i = 0; i < circle[k].size*2; i+=1) {
            for (let j = 0; j < circle[k].size*2; j+=1) {
                if ( circle[k].size >= Math.sqrt( pow((circle[k].x + circle[k].size) - (i+circle[k].x)) + pow((circle[k].y + circle[k].size) - (j+circle[k].y)) ) ) {

                    if ((circle[k].x-circle[k].size+i) >= 0 && (circle[k].y-circle[k].size+j) >= 0 && (circle[k].x-circle[k].size+i) < W && (circle[k].y-circle[k].size+j) < H ) {
                        
                        pixelVal[circle[k].x-circle[k].size+i][circle[k].y-circle[k].size+j]++
                    }
                }
            }            
        }
    }
    
    ctx.fillStyle = "#222"
    for (let i = 0; i < W; i+=pixelSize) {
        for (let j = 0; j < H; j+=pixelSize) {
            if (pixelVal[i][j] %2) {
                
                ctx.fillStyle = "#EEE"
                ctx.fillRect( i, j, pixelSize, pixelSize );
                ctx.fillStyle = "#222"
            }else{
                ctx.fillRect( i, j, pixelSize, pixelSize );
            }
        }
    }

    for (let i = 0; i < circle.length; i++) {
        circle[i].update()
        /*ctx.beginPath()
        ctx.arc(circle[i].x, circle[i].y, circle[i].size, 0, 2 * Math.PI)
        ctx.stroke()*/
    }
}

function Circle() {
    this.x = nb_random(0, W)
    this.y = nb_random(0, H)
    this.size = nb_random(50, 100)
    this.direction = nb_random(0, 2 * 3.1415)
    this.speed = 5
    this.update = function() {
        this.x += Math.cos(this.direction)*this.speed;
        this.y += Math.sin(this.direction)*this.speed;

        if(this.x > W + this.size){
            this.x = 0 - this.size
        }
        if(this.y > H + this.size){
            this.y = 0 - this.size
        }
        if(this.x < 0 - this.size){
            this.x = W + this.size
        }
        if(this.y < 0 - this.size){
            this.y = H + this.size
        }
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
    }
}

function pow(x){
    return x*x
}

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


setup()