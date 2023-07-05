
//POUR PAGE 1

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

//FIN PAGE 1

//les pages principales du site
document.getElementById("main").onscroll = function() { 

    var main = document.getElementById("main");
    if(Math.round(main.scrollTop) == 0 * main.clientHeight){
        NeuronWebCanvas.StartNeuroneWeb();
        grassSimulationCanvas.StopGrassSimulation();
    }else {
        NeuronWebCanvas.StopNeuronWeb()
    }
    if(Math.round(main.scrollTop) == 1 * main.clientHeight){
        UpdateScrollP2(0);//normal
    }else{
        UpdateScrollP2(1); //force l'arret de toutes les animations qui ne sont pas affichées
    }
    if(Math.round(main.scrollTop) == 2 * main.clientHeight){
        /*var autoTypeBoardGameOnlineTitle = new AutoType({
            parent: document.getElementById("BoardGameOnlineTitle"),
            writeSpeed: 220,
            opacityTransition: 0.2,
            className: ["rotHover"]
        }).Write("Board game online").Start()*/
    }
}


//PAGE 2
var HScrollProject = 0
const HScrollProjectMax = 4
function UpdateScrollP2(param = 0){ //pour arreter et démarer les annimations en fonction du scroll et de l'affichage pour la page 2 
    if(param == 0){//nomal, active et stop les animation en fonction de ce qui est affiché 
        try {
            grassSimulationCanvas.StopGrassSimulation()
            GameOfLifeCanvas.Stop()
            ClockBackgroundCanvas.Stop()
            matrixCanvas.Stop()

            if (HScrollProject == 0) {
                grassSimulationCanvas.StartGrassSimulation()
            }
        
            if (HScrollProject == 1) {
                ClockBackgroundCanvas.Start()
            }
        
            if (HScrollProject == 2) {
                matrixCanvas.Start()
            }
        
            if (HScrollProject == 3) {
                //rien (y'a pas de loop)
            }
        
            if (HScrollProject == 4) {//no loop
                GameOfLifeCanvas.Start()
            }
    
        } catch (error) {
            console.error(error)
        }
    }
    if (param == 1) { //stop toute les animations car on est sur une autre section
        try {
            grassSimulationCanvas.StopGrassSimulation()
            GameOfLifeCanvas.Stop()
            ClockBackgroundCanvas.Stop()
            matrixCanvas.Stop()
            //magicWandCanvas.Stop()
        } catch (error) {
            console.error(error)
        }
    }
    //décaller la page vers la postion selectionné 
    document.getElementById('pageContainer').style.transform = ("translateX(-"+HScrollProject*100+"vw)")
}

//les petites fleches sur la page 2 qui permet de naviguer entre les pages de gauche à droite
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

//page 4 section 4 fractal generator 

var fractalCollectionImg = document.getElementsByClassName('imgTopTransition');
var fractalImageShowIndex = 0 //0 = celle du fond qui n'est pas dans la liste


var fractalImageloop = setInterval(()=>{
    fractalImageShowIndex +=1
    fractalImageShowIndex %= fractalCollectionImg.length
    function Mod(x,a){
        while (x < 0){
            x+= a
        }
        return x % a
    }
    
    fractalCollectionImg[Math.abs(Mod(fractalImageShowIndex+1,fractalCollectionImg.length))].classList.remove("imgOpacityOut")
    fractalCollectionImg[Math.abs(Mod(fractalImageShowIndex+1,fractalCollectionImg.length))].classList.add("imgOpacityIn")
    fractalCollectionImg[Math.abs(Mod(fractalImageShowIndex-1,fractalCollectionImg.length))].classList.remove("imgOpacityIn")
    fractalCollectionImg[Math.abs(Mod(fractalImageShowIndex-1,fractalCollectionImg.length))].classList.add("imgOpacityOut")
    
    if (fractalImageShowIndex == fractalCollectionImg.length -1) {
        fractalCollectionImg[Math.abs(Mod(fractalImageShowIndex,fractalCollectionImg.length))].classList.remove("imgOpacityIn")
        fractalCollectionImg[Math.abs(Mod(fractalImageShowIndex,fractalCollectionImg.length))].classList.add("imgOpacityOut")
    }
    
},4000)

