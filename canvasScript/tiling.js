function Tiling() {
    let intervalTime;
    let canvas
    let ctx
    let tableau = []
    let taille = 40 // taille ds cases
    let lastCase = [0, 0] // postition de la souris 
    let PI = Math.PI;
    let time = 0;


    this.setup = function() { //fonction de setup executer 1 fois 
        canvas = document.getElementById("tilingCanvas");
        ctx = canvas.getContext("2d");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.fillStyle = "#0F1E3D";
        ctx.strokeStyle = "#897E58";

        for (let i = 0; i < window.innerWidth / taille; i++) {
            tableau[i] = []
            for (let j = 0; j < window.innerHeight / taille+1; j++) {
                tableau[i][j] = nb_random(0, 1);
            }
        }
        draw()
    }

    function draw() { //fonction executer en boucle 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        for (let i = 0; i < tableau.length; i++) {
            for (let j = 0; j < tableau[i].length; j++) {
                drawTile(i * taille , (j * taille + time)%(Math.ceil(ctx.canvas.height/taille)*taille + taille) - taille, taille, tableau[i][j]);
            }
        }
        time++;
    }

    function drawTile(x, y, w, t) {
        //x,y,width,height,type
        let ecart = 0.63;
    
        if (t == 0) {
            ctx.beginPath();
            ctx.arc(x, y, (1 - ecart) * w, 0, PI / 2);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(x, y, ecart * w, 0, PI / 2);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(x + w, y + w, (1 - ecart) * w, -PI / 2, PI, true);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(x + w, y + w, ecart * w, -PI / 2, PI, true);
            ctx.stroke()
    
        }
        if (t == 1) {
            ctx.beginPath();
            ctx.arc(x, y + w, (1 - ecart) * w, 0, -PI / 2, true);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(x, y + w, ecart * w, 0, -PI / 2, true);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(x + w, y, (1 - ecart) * w, PI / 2, PI);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(x + w, y, ecart * w, PI / 2, PI);
            ctx.stroke()
    
        }
    
    }

    this.Stop = function() {
        clearInterval(intervalTime)
    }

    this.Start = function() {
        clearInterval(intervalTime)
        this.setup()
        intervalTime = setInterval(() => {
            draw()
        }, 50)
    }


    function nb_random(min, max) { //fonction générant un nobre aléatoir  min et max inclue
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.setup(); //pour démarrer le script
}


let tilingCanvas = new Tiling()

window.addEventListener("resize", () => {
    tilingCanvas.setup()
});