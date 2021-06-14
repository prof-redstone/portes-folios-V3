function GameOfLife() {
    var canvas;
    var ctx;
    var Gride = [];
    var GrideCopie = [];
    var GrideWidth;
    var GrideHeight;
    var GrideCellSize = 15;
    var ColorBackground = "#111";
    var ColorCell = "#0B0"; //555
    var mousseX;
    var mousseY;
    var clickBool = false;
    var IntervalTime


    this.setup = function() { //fonction de setup executer 1 fois 
        canvas = document.getElementById("GameOfLife");
        ctx = canvas.getContext("2d");

        ctx.imageSmoothingEnabled = false;
        body = document.getElementsByTagName('body')[0];
        canvas.height = body.clientHeight;
        canvas.width = body.clientWidth;

        GrideHeight = Math.ceil(canvas.height / GrideCellSize) + 1;
        GrideWidth = Math.ceil(canvas.width / GrideCellSize) + 1;

        Gride = new Array(GrideWidth);

        for (var i = 0; i < GrideWidth; i++) {
            Gride[i] = new Array(GrideHeight);
        }

        for (var x = 0; x < GrideWidth; x++) {
            for (var y = 0; y < GrideHeight; y++) {
                Gride[x][y] = 0;
            }
        }

        for (var i = 0; i < GrideWidth; i++) {
            GrideCopie[i] = new Array(GrideHeight);
        }

        for (var x = 0; x < GrideWidth; x++) {
            for (var y = 0; y < GrideHeight; y++) {
                GrideCopie[x][y] = 0;
            }
        }

        InitGrideCells()

        draw()
        //IntervalTime = setInterval(draw, 100);
    }

    function draw() { //fonction executer en boucle 

        ctx.fillStyle = ColorBackground; //met le plan en noir
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        UpdateCells();
        AddClickCell();

        ctx.strokeStyle = ColorCell;

        for (var x = 0; x < GrideWidth; x++) {
            for (var y = 0; y < GrideHeight; y++) {
                if (Gride[x][y] == 1) {
                    //ctx.fillRect(x * GrideCellSize, y * GrideCellSize, GrideCellSize, GrideCellSize)
                    ctx.beginPath();
                    ctx.arc(x * GrideCellSize, y * GrideCellSize, 5, 0, 2 * Math.PI, true);
                    ctx.stroke();
                }
            }
        }
    }

    this.Stop = function() {
        clearInterval(IntervalTime)
    }

    this.Start = function() {
        clearInterval(IntervalTime)
        this.setup()
        IntervalTime = setInterval(() => {
            draw()
        }, 110)
    }

    function UpdateCells() {

        for (var x = 0; x < GrideWidth; x++) {
            for (var y = 0; y < GrideHeight; y++) {
                GrideCopie[x][y] = Gride[x][y];
            }
        }


        for (var x = 0; x < GrideWidth - 1; x++) {
            for (var y = 0; y < GrideHeight; y++) {
                var i = 0;
                if (x > 0 && y > 0) {
                    i = GrideCopie[x][y + 1] + GrideCopie[x + 1][y + 1] + GrideCopie[x + 1][y] + GrideCopie[x + 1][y - 1] + GrideCopie[x][y - 1] + GrideCopie[x - 1][y - 1] + GrideCopie[x - 1][y] + GrideCopie[x - 1][y + 1];
                }
                if (x == 0 && y > 0) {
                    i = GrideCopie[x][y + 1] + GrideCopie[x + 1][y + 1] + GrideCopie[x + 1][y] + GrideCopie[x + 1][y - 1] + GrideCopie[x][y - 1];
                }
                if (x > 0 && y == 0) {
                    i = GrideCopie[x][y + 1] + GrideCopie[x + 1][y + 1] + GrideCopie[x + 1][y] + GrideCopie[x - 1][y] + GrideCopie[x - 1][y + 1];
                }

                if (GrideCopie[x][y] == 1) {
                    if (!(i == 2 || i == 3)) {
                        Gride[x][y] = 0;
                    }
                } else {
                    if (i == 3) {
                        Gride[x][y] = 1;
                    }
                }
            }
        }


    }

    function InitGrideCells() {
        for (var x = 0; x < GrideWidth - 1; x++) { //-1 sinon ça marche pas mais jsp pq
            for (var y = 0; y < GrideHeight; y++) {
                Gride[x][y] = nb_random(0, 1);
            }
        }


        Gride[5][5] = 1;
        Gride[5][6] = 1;
        Gride[5][7] = 1;
    }

    function AddClickCell() {
        if (clickBool) {
            var x = Math.round(mousseX / GrideCellSize);
            var y = Math.round(mousseY / GrideCellSize)
            Gride[x][y] = 1;
        }
    }

    function nb_random(min, max) { //fonction générant un nobre aléatoir  min et max inclue
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    this.setup(); //pour démarrer le script
}


let GameOfLifeCanvas = new GameOfLife()

window.addEventListener("resize", () => {
    GameOfLifeCanvas.setup()
});