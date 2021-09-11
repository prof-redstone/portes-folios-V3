//underscore animation blinking
let blinkState = 1;
let i = setInterval(() => {
    blinkState = (blinkState == 1) ? 0 : 1
    $(".cursorBlinker").css("opacity", blinkState)
}, 700)

//animation auto type
var helloText = document.getElementById("hello-text")
var autoTypeHelloText = new AutoType({
        parent: helloText,
        writeSpeed: 200,
        deleteSpeed: 200,
        opacityTransition: 0.2,
        loop: true,
        className: ["rotHover", "rotEvent"]
    })
    .Write("Hi !")
    .Sleep(6000)
    .Delete(100)
    .Write("Welcome,")
    .Sleep(6000)
    .Delete(100)
    .Write("Hello,")
    .Sleep(5300)
    .Delete(1)
    .Write(" World !")
    .Sleep(2700)
    .Delete(100)
    .Start()

//auto type write 
var autoTypeImTom = new AutoType({
    parent: document.getElementById("ImTom"),
    writeSpeed: 150,
    opacityTransition: 0.2,
    className: ["rotHover", "rotEvent"]
}).Write("I'm Tom,").Start()
//auto type write 
var autoTypewebDeveloper = new AutoType({
    parent: document.getElementById("webDeveloper"),
    writeSpeed: 150,
    opacityTransition: 0.2,
    className: ["rotHover", "rotEvent", "colorRed"]
}).Write("web developer").Start()

//animation hover des lettres
$(".rotHover").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function() {
    $(this).removeClass("rotationAnimation")
})
$(".rotHover").hover(function() {
    $(this).addClass("rotationAnimation");
})
//characters random qui toune tous les 4s
let intervalAnimLetter = setInterval(() => {
    var el = document.getElementsByClassName('rotEvent');
    var nb = nb_random(0, el.length - 1)
    var classes = ["Yrotation", "Zrotation", "Xrotation"]
    var nbClass = nb_random(0, classes.length - 1)
    el[nb].classList.add(classes[nbClass])
    setTimeout(function(el, classes) {
        for (let u = 0; u < classes.length; u++) {
            el.classList.remove(classes[u])
        }
    }, 2000, el[nb], classes)
}, 4000)

function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var scrollPostion = 0 //full-page-scroll.js change this valu on scroll
function ScroollPostion(x) {
    if (x != scrollPostion) {
        scrollPostion = x

        if (scrollPostion == 0) {
            NeuronWebCanvas.StartNeuroneWeb()
            grassSimulationCanvas.StopGrassSimulation()
        } else {
            NeuronWebCanvas.StopNeuronWeb()
        }
        if (scrollPostion == 100) {
            UpdateScrollP2()
            
        }
        if (scrollPostion == 200) {
            
            var autoTypeBoardGameOnlineTitle = new AutoType({
                parent: document.getElementById("BoardGameOnlineTitle"),
                writeSpeed: 170,
                opacityTransition: 0.2,
                className: ["rotHover"]
            }).Write("Board game online").Start()
        }
    }
}

window.onscroll = function() { //pour reset la scroll bar sinon bug
    window.scroll(0, 0);
}
new fullScroll({ //scroll magique avec puce
    mainElement: "main",
    sections: 'section',
    displayDots: true,
    dotsPosition: "right",
    animateTime: 0.5,
    animateFunction: "ease",
});



//Page 2 part 1
var HScrollProject = 0
var HScrollProjectMax = 4
function UpdateScrollP2(){
    
    try {
        if (HScrollProject == 0) {
            grassSimulationCanvas.StartGrassSimulation()
        }else{
            grassSimulationCanvas.StopGrassSimulation()
        }
    
        if (HScrollProject == 1) {
            GameOfLifeCanvas.Start()
        }else{
            GameOfLifeCanvas.Stop()
        }
    
        if (HScrollProject == 2) {
            ClockBackgroundCanvas.Start()
        }else{
            ClockBackgroundCanvas.Stop()
        }
    
        if (HScrollProject == 3) {
            matrixCanvas.Start()
        }else{
            matrixCanvas.Stop()
        }
    
        if (HScrollProject == 4) {
            magicWandCanvas.Start()
        }else{
            magicWandCanvas.Stop()
        }

    } catch (error) {
        console.error(error)
    }

    

    document.getElementById('pageContainer').style.transform = ("translateX(-"+HScrollProject*100+"vw)")
}

let P2BtnRight = document.getElementById("P2btnRight")
P2BtnRight.addEventListener("click", ()=>{
    HScrollProject = (HScrollProject+1 > HScrollProjectMax) ? 0 : HScrollProject+1
    UpdateScrollP2()
})
let P2BtnLeft = document.getElementById("P2btnLeft")
P2BtnLeft.addEventListener("click", ()=>{
    HScrollProject = (HScrollProject-1 < 0) ? HScrollProjectMax : HScrollProject-1
    UpdateScrollP2()
})