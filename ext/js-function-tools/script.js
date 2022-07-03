

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var seed = Math.random()

function RNDseed(seed, val) { //seed must be between 0 and 1
    let nb = 4654681.14142135623730951 * (val ** seed) + 5897933.141592653589793
    return nb % 1
}

function RNDVect(x, y) {
    let theta = RNDseed(seed, 61333*x + 76697*y) * 2 * Math.PI;
    return {
        x: Math.cos(theta),
        y: Math.sin(theta)
    };
}

function dotProd(x, y, vx, vy) {
    let g_vect;
    let d_vect = {
        x: x - vx,
        y: y - vy
    };
    g_vect = RNDVect(vx, vy);
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
}

function interp(x, a, b){
    return a + smootherstep(x) * (b-a);
}

function smootherstep(x) {
    return 6*x**5 - 15*x**4 + 10*x**3;
}

function get(x, y) {
    let xf = Math.floor(x);
    let yf = Math.floor(y);
    //interpolate
    let tl = dotProd(x, y, xf, yf);
    let tr = dotProd(x, y, xf + 1, yf);
    let bl = dotProd(x, y, xf, yf + 1);
    let br = dotProd(x, y, xf + 1, yf + 1);
    let xt = interp(x - xf, tl, tr);
    let xb = interp(x - xf, bl, br);
    let v = interp(y - yf, xt, xb);

    return v;
}

canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

for (let i = 0; i < 500; i++) {
    for (let j = 0; j < 500; j++) {
        let val = (get(i/50,j/50) + 0.2*get(i/10,j/10) + 0.1*get(i/5,j/5))

        if (val < 0.2) {
            ctx.fillStyle = "#6282A1"
        }else if(val <0.26){
            ctx.fillStyle = "#BFB89E"
        }else if(val <0.3){
            ctx.fillStyle = "#667368"
        }else if(val <0.4){
            ctx.fillStyle = "#667368"
        }else if(val <0.52){
            ctx.fillStyle = "#909398"
        }else{
            ctx.fillStyle = "#F5F2F8"
        }
        ctx.fillRect(i*2,j*2,2,2)
    }
}

var c=0