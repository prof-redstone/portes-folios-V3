class AutoType {
    constructor(param) {
        this.location = param.parent || "";
        this.state = param.state || "";
        this.typeElement = this.typeElement || "span";
        this.ClassArray = param.className || ["autoType"];
        this.loop = param.loop || false;
        this.writeSpeed = param.writeSpeed || 50;
        this.deleteSpeed = param.deleteSpeed || 40;
        this.opacityTransition = param.opacityTransition || false
        this.actuUpdateSpeed = 0;
        this.intervalTime;
        this.CheckInterval;
        this.action = [] //-1:delete 0:pause 1:write
        this.actionNumber = 0; //compteur des actions
        this.actionChar = 0; //compteur pour les caractères
        this.start = false;
        //different effect
        this.decrypt = param.decrypt || false

    }

    Start() {
        this.start = true;
        this.ClearChar()
        this.SetIntervalTime(this.writeSpeed)

        if (this.opacityTransition != false) {
            this.CheckInterval = setInterval(this.CheckInterval, 20, this) //20
        }

        return this
    }

    Pause() {
        this.start = false;
        this.SetIntervalTime(0)
    }

    SetIntervalTime(a) {
        if (a != this.actuUpdateSpeed) {
            clearInterval(this.intervalTime)
            if (a != 0) {
                this.intervalTime = setInterval(() => {
                    this.Update()
                }, a);
            }
            this.actuUpdateSpeed = a;
        }
    }

    CheckInterval(obj){
        for (let i = 0; i < obj.location.childElementCount; i++) {
            if(obj.location.childNodes[i].getAttribute("appear") === null){
                obj.location.childNodes[i].dataset.appear -= -0.05
                obj.location.childNodes[i].style.opacity = obj.location.childNodes[i].dataset.appear
                if(obj.location.childNodes[i].dataset.appear > 1){
                    delete obj.location.childNodes[i].dataset.appear
                }
            }
            if(obj.location.childNodes[i].dataset.delete){
                if(obj.location.childNodes[i].dataset.delete <= 0){
                    obj.location.removeChild(obj.location.childNodes[i])
                }else{
                    obj.location.childNodes[i].dataset.delete -= 0.0303 //0.001
                    obj.location.childNodes[i].style.opacity = (obj.location.childNodes[i].dataset.delete/obj.opacityTransition)/2
                }
            }
        }
    }

    Update() {
        if (this.action[this.actionNumber][0] == 1) { //write
            if (this.action[this.actionNumber][1].length > this.actionChar) {
                this.AddChar(this.action[this.actionNumber][1][this.actionChar])
                this.SetIntervalTime(this.writeSpeed)
                this.actionChar += 1
            } else {
                this.actionChar = 0
                this.actionNumber += 1
            }
        } else if (this.action[this.actionNumber][0] == -1) { // delete
            if (this.action[this.actionNumber][1] > this.actionChar) {
                if (this.state == "") {
                    this.actionNumber += 1
                    this.actionChar = 0
                }else{
                    this.SetIntervalTime(this.deleteSpeed)
                    this.DeleteChar()
                    this.actionChar += 1
                }
            } else {
                this.actionChar = 0
                this.actionNumber += 1
            }
        } else if (this.action[this.actionNumber][0] == 2) { //break 
            let br = document.createElement("br")
            this.location.append(br)
            this.state += " " //pour eviter bug quand delete

            this.actionNumber += 1
        } else if (this.action[this.actionNumber][0] == 0) { //pause
            this.SetIntervalTime(0)
            setTimeout(() => {
                if (this.start == true) {
                    this.SetIntervalTime(this.writeSpeed)
                }
            }, this.action[this.actionNumber][1]);
            this.actionNumber += 1
        } else if (this.action[this.actionNumber][0] == 3) { //state
            for (let i = this.state.length; i > 0; i--) {
                this.DeleteChar()
            }
            for (let i = 0; i < this.action[this.actionNumber][1].length; i++) {
                this.AddChar(this.action[this.actionNumber][1][i])
            }
            this.actionNumber += 1
        }else if(this.action[this.actionNumber][0] == -2 ){
            this.ClearChar();
            this.actionNumber += 1
            this.SetIntervalTime(1)
        }


        if (this.actionNumber >= this.action.length) {
            if (this.loop == true) {
                this.actionNumber = 0
                this.actionChar = 0
            }else{
                this.Pause()
            }
        }
    }

    DeleteChar() { //methode
        this.state = this.state.slice(0, -1)

        //DOM
        if(!this.opacityTransition){
            this.location.removeChild(this.location.lastElementChild)
        }else{
            for (let i = this.location.childElementCount-1; i >= 0; i--) {
                if(!this.location.childNodes[i].dataset.delete){
                    this.location.childNodes[i].dataset.delete = this.opacityTransition
                    i = -Infinity
                }
            }
        }
    }
    AddChar(char) { //methode
        this.state += char

        //add to DOM
        let p = document.createElement(this.typeElement);
        for (let i = 0; i < this.ClassArray.length; i++) {
            if (char != " ") {
                p.classList.add(this.ClassArray[i])
            }
        }
        if(this.opacityTransition){
            p.dataset.appear = 0;
            p.style.opacity = 0;
        }
        p.innerHTML = char
        this.location.append(p)

        //add for this page
        $(".rotHover").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function() {
            $(this).removeClass("rotationAnimation")
        })
        
        $(".rotHover").hover(function() {
            $(this).addClass("rotationAnimation");
        })
    }
    ClearChar(){ //methode
        while(this.location.firstChild){
            this.location.removeChild(this.location.firstChild)
        }
        this.state = ""
    }

    TypeElement(element) { //user
        this.typeElement = element;
    }
    State(str) {
        this.action.push([3, str])
        return this
    }
    Write(str) { //user
        this.action.push([1, str])
        return this
    }
    Break() { //user
        this.action.push([2, "break"])
        return this
    }
    Sleep(time) { //user
        this.action.push([0, time])
        return this
    }
    Delete(nb) { //user
        this.action.push([-1, nb])
        return this
    }
    Clear(){
        this.action.push([-2])
        return this
    }
}



function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}