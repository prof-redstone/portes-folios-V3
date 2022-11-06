var canvas;
var ctx;
var H = 0;
var W = 0;
var size = 800;
var offset = 300;
var maxStage = 8;
var mode = 1;
var angle = 0;
//[[0, 0],[0.333, 0],[0.5, 0.288],[0.666, 0],[1, 0]]
//[[0, 0],[0.333, 0],[0.333, 0.333],[0.666, 0.333],[0.666, 0],[1, 0]]
//[[0, 0],[0.25, 0],[0.25, 0.25],[0.5, 0.25],[0.5, 0],[0.5, -0.25],[0.75, -0.25],[0.75, 0],[1, 0]]
var listpoint = [
    [0, 0],
    [0.327, 0],
    [0.5, 0.419],
    [0.673, 0],
    [1, 0]
];
//fractalStagePoint
var fsp = [
    [ //stage 1
        [0, 0], //point co x y
        [1, 0]
    ]
]

function setup() {
    canvas = document.getElementById("fractalGen")
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    H = ctx.canvas.height;
    W = ctx.canvas.width;
    ctx.strokeStyle = "#EEE";
    setInterval(loop, 50);
}

function loop() {
    if (mode == 1) {
        
        angle += 0.01;
        angle %= Math.PI
        if (angle > Math.PI/2) {
            listpointGen(Math.PI - angle);
        }else{
            listpointGen(angle);
        }
        processe();
        draw()
        console.log(angle)
    }
    if (mode == 0) {
        if (fsp.length < maxStage) {
            nextStage();
            draw();
        }
    }
}

function draw() {
    ctx.fillRect(0, 0, W, H);
    for (let i = fsp.length - 1; i < fsp.length; i++) {
        let stage = i

        for (let j = 0; j < fsp[stage].length - 1; j++) {
            ctx.beginPath()
            ctx.moveTo(fsp[stage][j][0] * size, fsp[stage][j][1] * size + offset)
            ctx.lineTo(fsp[stage][j + 1][0] * size, fsp[stage][j + 1][1] * size + offset)
            ctx.stroke()
        }
    }
}

function processe() {
    while (fsp.length < maxStage) {
        nextStage();
    }
}

function nextStage() {
    let currenteStage = fsp.length - 1; //stage allready evaluated
    fsp.push([]) //new/next stage 
    fsp[currenteStage + 1].push([0, 0]) //add first value

    for (let i = 0; i < fsp[currenteStage].length - 1; i++) {
        let angle = Math.atan2(fsp[currenteStage][i + 1][1] - fsp[currenteStage][i][1], fsp[currenteStage][i + 1][0] - fsp[currenteStage][i][0]);
        let distance = Math.sqrt((fsp[currenteStage][i + 1][1] - fsp[currenteStage][i][1]) ** 2 + (fsp[currenteStage][i + 1][0] - fsp[currenteStage][i][0]) ** 2);
        for (let j = 0; j < listpoint.length - 1; j++) {
            let dist2 = Math.sqrt((listpoint[j + 1][1] - listpoint[j][1]) ** 2 + (listpoint[j + 1][0] - listpoint[j][0]) ** 2);
            let angl2 = Math.atan2(listpoint[j + 1][1] - listpoint[j][1], listpoint[j + 1][0] - listpoint[j][0]);
            let lastX = fsp[currenteStage + 1][fsp[currenteStage + 1].length - 1][0];
            let lastY = fsp[currenteStage + 1][fsp[currenteStage + 1].length - 1][1];
            fsp[currenteStage + 1].push([
                lastX + Math.cos(angle + angl2) * dist2 * distance,
                lastY + Math.sin(angle + angl2) * dist2 * distance
            ])
        }

    }
}

function listpointGen(a) {
    //a -> premier angle de la fractal
    let x1 = 1;
    let y1 = 0;
    let x2 = 1 + Math.cos(a);
    let y2 = 0 + Math.sin(a);
    let x3 = 1 + 2 * Math.cos(a);
    let y3 = 0;
    let x4 = 2 + 2 * Math.cos(a);
    let y4 = 0;

    let mult = 2 + 2 * Math.cos(a)

    listpoint = [
        [0, 0],
        [1 / mult, 0],
        [0.5, Math.sin(a) / mult],
        [(1 + 2 * Math.cos(a)) / mult, 0],
        [1, 0]
    ]

    fsp = [
        [
            [0, 0],
            [1, 0]
        ]
    ]

}

setup()