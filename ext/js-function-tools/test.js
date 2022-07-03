noise.seed(Math.random());
t = 0.001

function setup() {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    

    setInterval(loop, 1)
}

function loop() {
    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 200; j++) {
            let val = noise.perlin3(i / 50, j / 50, t);

            if (val < 0.2) {
                ctx.fillStyle = "#6282A1"
            } else if (val < 0.26) {
                ctx.fillStyle = "#BFB89E"
            } else if (val < 0.3) {
                ctx.fillStyle = "#667368"
            } else if (val < 0.4) {
                ctx.fillStyle = "#667368"
            } else if (val < 0.52) {
                ctx.fillStyle = "#909398"
            } else {
                ctx.fillStyle = "#F5F2F8"
            }
            ctx.fillRect(i * 2, j * 2, 2, 2)
        }
    }

    t += 0.01
}



setup()