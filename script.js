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
    className: ["rotHover", "rotEvent"]
}).Write("web developer").Start()

//animation hover des lettres
$(".rotHover").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function() {
    $(this).removeClass("rotationAnimation")
})
$(".rotHover").hover(function() {
    $(this).addClass("rotationAnimation");
})
//caractere random qui toune tous les 4s
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