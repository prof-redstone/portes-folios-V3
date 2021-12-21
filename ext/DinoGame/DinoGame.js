var canvas = document.getElementById("DinoGame")
var ctx = canvas.getContext("2d")
var intervalTime;
var H = 200
var W = 600

const groundHight = 135
var speed = 4
var groundpos = 0 //le deplacer avec le temps

const SpriteDino = 0
const SpriteGround = 2
const Spritecactus = 3

var gameRuning = false
var frame = 0
var cactusTimer = 0

var dino = new Dino
var cactus = []

var SpriteName = [
    //1 dino
    [765, 2, 44, 47],
    //2 dino
    [809, 2, 44, 47],
    //Ground
    [2, 53, 1200, 14],
    //cactus 1
    [332, 2, 25, 50],
    //cactus 2
    [382, 2, 25, 50],
    //cactus 3
    [228, 2, 17, 35],
    //cactus 4
    [262, 2, 17, 35]
]

let img = new Image(); //68 par 1204
img.onload = function() {
    console.log("image loaded")
    requestAnimationFrame(loop)
};

function setup() {
    ctx.canvas.width = W
    ctx.canvas.height = H

    ctx.font = '30px sans-serif';
}


function loop() {
    ctx.clearRect(0, 0, W, H)

    //score
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.fillText(Math.floor(frame / 3), 10, 50);

    if (cactusTimer > 25) { //spawner de cactus
        if (nb_random(0, 20) == 0) {
            cactus.push(new Cactus(W, groundHight))
            cactusTimer = 0
        }
    }


    //ground
    groundpos += speed
    DrawSprite(SpriteGround, -(groundpos) % 1200, 170)
    DrawSprite(SpriteGround, -(groundpos) % 1200 + 1200, 170)

    //update les cactus
    for (let i = cactus.length - 1; i >= 0; i--) { //décrementation pour éviter les bug quand on supprime un cactus

        if (CollisionDetection(dino.posX + dino.BoxOffset, dino.posY, dino.width, dino.height, cactus[i].posX + cactus[i].BoxOffset, cactus[i].posY, cactus[i].width, cactus[i].height)) {
            clearInterval(intervalTime)
            ctx.fillStyle = "#000"
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", W / 2, 100);
            gameRuning = false
        }

        DrawSprite(cactus[i].sprite + Spritecactus, cactus[i].posX, cactus[i].posY)

        cactus[i].Update()

        if (cactus[i].posX < -50) { //retirer quand or d'ecran
            cactus.splice(i, 1)
        }
    }



    dino.update()
    DrawSprite(dino.walkFrame, dino.posX, dino.posY) //dino sprite

    if (frame % 250 == 0) { //augmenter la vitesse 
        speed += 0.5
        console.log(speed)
    }

    //troll
    if (Math.floor(frame / 3) == 1000) {
        for (let i = 0; i < 20; i++) {
            cactus.push(new Cactus(nb_random(W, W * 2), nb_random(10, groundHight + 20)))
        }
    }


    frame++
    cactusTimer++
    if (gameRuning) {
        requestAnimationFrame(loop)
    }
}

function Dino() {
    this.posX = 50
    this.posY = 135
    this.height = 35;
    this.width = 30;
    this.velo = 0
    this.JumpVelo = 12
    this.gravity = -0.8
    this.BoxOffset = 5
    this.jumpPress = false
    this.walkFrame = 0

    this.update = function() {
        if (frame % 10 > 5) {
            this.walkFrame = 1
        } else {
            this.walkFrame = 0
        }

        if (this.velo > -10) {
            this.velo += this.gravity
        }


        this.posY -= this.velo
        this.posY = this.posY > groundHight ? groundHight : this.posY //ne pas passer a traver le sol

        if (this.jumpPress) {
            this.velo = this.posY < groundHight ? this.velo : this.JumpVelo //check jump possible et change velo
        }
    }


}

function Cactus(x, y) {
    this.posX = x;
    this.posY = y;
    this.BoxOffset = 5
    this.height = 50
    this.width = 15
    this.sprite = nb_random(0, 3)

    switch (this.sprite) {
        case 2:
            this.posY += 15
            break
        case 3:
            this.posY += 15
    }

    this.Update = function() {
        this.posX -= speed
    }
}

function Reset() {
    console.log('reset')
    cactus = []
    frame = 0
    speed = 6
    groundpos = 0
    dino = new Dino()
    gameRuning = true
    requestAnimationFrame(loop)
}

function CollisionDetection(X1, Y1, W1, H1, X2, Y2, W2, H2) {
    if (X1 < X2 + W2 &&
        X1 + W1 > X2 &&
        Y1 < Y2 + H2 &&
        H1 + Y1 > Y2) {
        return true
    } else {
        return false
    }

}

function DrawSprite(name, x, y) {
    ctx.drawImage(img, SpriteName[name][0], SpriteName[name][1], SpriteName[name][2], SpriteName[name][3], x, y, SpriteName[name][2], SpriteName[name][3])
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 38 || event.code == "Space") {
        dino.jumpPress = true
        if (gameRuning == false) {
            Reset()
        }
    }

});
document.addEventListener('keyup', function(event) {
    if (event.keyCode == 38 || event.code == "Space") {
        dino.jumpPress = false
    }

});


function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setup()
img.src = "res.png";