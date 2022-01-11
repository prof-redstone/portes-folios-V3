function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var noiseMap = new Noise()
var max = 0
var min = 1
for (let i = 0; i < 500; i++) {
    for (let j = 0; j < 500; j++) {
        let val = noiseMap.map(i, j);

        if (val > max) {
            max = val
        }
        if (val < min) {
            min = val
        }

        if (val < 0.35) { //bleu très foncé
            ctx.fillStyle = "#161D76"
        }else if (val < 0.43) { //bleu
            ctx.fillStyle = "#4A84FF"
        }else if (val < 0.56) { //bleu
            ctx.fillStyle = "#3D70A0"
        } else if (val < 0.58) { //sable
            ctx.fillStyle = "#BFB89E"
        } else if (val < 0.63) { //foret
            ctx.fillStyle = "#667368"
        } else if (val < 0.7) { //monatgne neige
            ctx.fillStyle = "#909398"
        } else {
            ctx.fillStyle = "#F5F2F8"
        }
        //ctx.fillStyle = "rgba(0,0,0," + (val) + ")"

        ctx.fillRect(i * 2, j * 2, 2, 2)
    }
}

console.log(min, max)


function Noise(seed = Math.random()) { //si pas de seed donné en cration on en prends une random
    this.seed = seed

    this.map = function(x, y, scale = 1) {
        let val = ((1 * this.get(x / 50, y / 50) + 0.2 * this.get(x / 10, y / 10) + 0.1 * this.get(x / 5, y / 5)) + 1.3) / 2.6
        return val
    }

    this.get = function(x, y) {
        let xf = Math.floor(x); //les coins
        let yf = Math.floor(y);
        //interpolate entre les coins 
        let tl = this.dotProd(x, y, xf, yf);
        let tr = this.dotProd(x, y, xf + 1, yf);
        let bl = this.dotProd(x, y, xf, yf + 1);
        let br = this.dotProd(x, y, xf + 1, yf + 1);
        let xt = this.interp(x - xf, tl, tr);
        let xb = this.interp(x - xf, bl, br);
        let v = this.interp(y - yf, xt, xb);

        return v;
    }

    this.RNDseed = function(seed, val) { //seed must be between 0 and 1
        let nb = 4654681.14142135623730951 * (val ** seed) + 5897933.141592653589793
        return nb % 1
    }

    this.RNDVect = function(x, y) {
        let theta = this.RNDseed(seed, 61333 * x + 76697 * y) * 2 * Math.PI;
        return {
            x: Math.cos(theta),
            y: Math.sin(theta)
        };
    }

    this.dotProd = function(x, y, vx, vy) {
        let g_vect;
        let d_vect = {
            x: x - vx,
            y: y - vy
        };
        g_vect = this.RNDVect(vx, vy);
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    }

    this.interp = function(x, a, b) {
        return a + this.smootherstep(x) * (b - a);
    }

    this.smootherstep = function(x) {
        return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
    }
}

function cone(x,y,rad = 100){
    this.radius = rad
    this.x = x
    this.y = y

    this.get = function(x,y){

    }
}