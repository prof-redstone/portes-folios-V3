var canvas ;
var ctx ;
var score = 0;
var carreaux = 50;
var map;
var taille_ecran ;
var etat_jeux = 1;
var largueur_map ;
var longueur_map ;
var current_position_x = 0;
var current_position_y = 0;
var next_position_x;
var next_position_y;
var the_next_value_ground;
var the_befor_value_ground = 0;
var set_timer = 0;
var balance = 0;
var TableauMap;
var a = 0;
var z = 0;
var q = 0;
var s = 0;
var d = 0;
var timer_a = 0;
var timer_z = 0;
var timer_q = 0;
var timer_s = 0;
var timer_d = 0;

var pomme_etat = 0;
var pomme_x;
var pomme_y;

console.log("version 2.2 modification le 19/08/19");

setup();
setInterval(principal, 30);

function setup(){
    canvas = document.getElementById("jeuDesPommes");
    ctx = canvas.getContext("2d");
    score = document.getElementById("scoreJeuDesPommes");
    score.textContent = 0;
    
    largueur_map = canvas.height / carreaux ;
    longueur_map = canvas.width / carreaux ;
    
    
    TableauMap = new Array(longueur_map);

    for (var i = 0; i < longueur_map; i++){
        TableauMap[i] = new Array(largueur_map);
    }

    for(var x = 0; x < longueur_map; x++){
        for(var y = 0; y < largueur_map; y++){
            TableauMap[x][y] = 0;
        }
    }
    
    TableauMap[current_position_x][current_position_y] = 1
    
    window.addEventListener("keydown", checkKeyPress, true);
    window.addEventListener("keyup", checkKeyRelease, true);
    
}



function affiche(){
    ctx.fillStyle = "#00F";
    for(var x = 0; x < longueur_map; x++){
        for(var y = 0; y < largueur_map; y++){
            if(TableauMap[x][y] === 0){
                ctx.fillStyle = "#00F";
            }else if(TableauMap[x][y] === 1){
                ctx.fillStyle = "#0DF"; 
            }else if(TableauMap[x][y] === 2){
                ctx.fillStyle = "#F00";
            }else{
                ctx.fillStyle = "#0F0";
            }
            ctx.fillRect(x * carreaux, y * carreaux, carreaux, carreaux);
            //console.log(TableauMap[x][y])
            
        }
    }
    
}



function principal(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    affiche();
    game();
    update_position_perso();
    restart(0);
    timer(0);
    
}

function game(){
    if(etat_jeux === 1){
        if(pomme_etat == 0){
            pomme_x = nb_random(0, longueur_map - 1);
            pomme_y = nb_random(0, largueur_map  - 1);
            TableauMap[pomme_x][pomme_y] = 3;

            pomme_etat = 1;
        }else{
            if(current_position_x === pomme_x && current_position_y === pomme_y){
                score.textContent = parseInt(score.textContent) + 1;

                the_befor_value_ground = 2;
                pomme_etat = 0;  
            }
        }
    }else{
        game_over();
    }
}

function game_over(){
    current_position_x = 0;
    current_position_y = 0;
    the_befor_value_ground = 0;
    for(var x = 0; x < longueur_map; x++){
        for(var y = 0; y < largueur_map; y++){
            TableauMap[x][y] = 0;
        }
    }
    if(timer(1) === 1){
        if(balance === 1){
            balance = 0;
        }else{
            balance = 1;
        }
    }
    if(balance === 1){
        for(var x = 0; x < longueur_map; x++){
            for(var y = 0; y < largueur_map; y++){
                TableauMap[x][y] = 1;
            }
        }
    }
}


function position_perso(direction){
    if( etat_jeux === 1){
        if(direction === "right" && current_position_x < longueur_map - 1){
            the_next_value_ground = TableauMap[current_position_x + 1][current_position_y];
            TableauMap[current_position_x][current_position_y] = the_befor_value_ground;
            current_position_x = current_position_x + 1;
            the_befor_value_ground = the_next_value_ground;
            if(the_befor_value_ground === 2){
                etat_jeux = 0;
            } 
        }
        if(direction === "down" && current_position_y < largueur_map - 1){
            the_next_value_ground = TableauMap[current_position_x ][current_position_y + 1];
            TableauMap[current_position_x][current_position_y] = the_befor_value_ground;
            current_position_y = current_position_y + 1;
            the_befor_value_ground = the_next_value_ground;
            if(the_befor_value_ground === 2){
                etat_jeux = 0;
            } 
        }
        if(direction === "left" && current_position_x > 0){
            the_next_value_ground = TableauMap[current_position_x - 1][current_position_y];
            TableauMap[current_position_x][current_position_y] = the_befor_value_ground;
            current_position_x = current_position_x - 1;
            the_befor_value_ground = the_next_value_ground;
            if(the_befor_value_ground === 2){
                etat_jeux = 0;
            }  
        }
        if(direction === "up" && current_position_y > 0){
            the_next_value_ground = TableauMap[current_position_x][current_position_y - 1];
            TableauMap[current_position_x][current_position_y] = the_befor_value_ground;
            current_position_y = current_position_y - 1;
            the_befor_value_ground = the_next_value_ground;
            if(the_befor_value_ground === 2){
                etat_jeux = 0;
            }  
        }

    }
}

function update_position_perso(){
    if(z === 1 && s === 0){
        if(timer_z === 0){
            position_perso("up");
            timer_z = 5;
        }else{
            timer_z = timer_z - 1;
        }
    }else{
        timer_z = 0;
    }
    if(s === 1 && z === 0){
        if(timer_s === 0){
            position_perso("down");
            timer_s = 5;
        }else{
            timer_s = timer_s - 1;
        }
    }else{
        timer_s = 0;
    }
    if(d === 1 && q === 0){
        if(timer_d === 0){
            position_perso("right");
            timer_d = 5;
        }else{
            timer_d = timer_d - 1;
        }
    }else{
        timer_d = 0;
    }
    if(q === 1 && d === 0){
        if(timer_q === 0){
            position_perso("left");
            timer_q = 5;
        }else{
            timer_q = timer_q - 1;
        }
    }else{
        timer_q = 0;
    }
    TableauMap[current_position_x][current_position_y] = 1;
}

function restart(number){
    if(a === 1 || number === 1){
        for(var x = 0; x < longueur_map; x++){
            for(var y = 0; y < largueur_map; y++){
                TableauMap[x][y] = 0;
            }
        }
        current_position_x = 0;
        current_position_y = 0;
        score.textContent = 0;
        if(taille_ecran === 0){
            carreaux = 100; //4 carreaux
        }
        if(taille_ecran === 1){
            canvas.height = 400; //8 carreaux
            canvas.width = 400;
			carreaux = 50;
        }
        if(taille_ecran === 2){
            canvas.height = 400; //16 carreaux
            canvas.width = 400;
			carreaux = 40;
        }
        if(taille_ecran === 3){
            canvas.height = 400; //20 carreaux
            canvas.width = 400;
			carreaux = 25;
        }
        setup();
        etat_jeux = 1;
        pomme_etat = 0;
    }
}

function timer (option){
    if(option == 0){
        set_timer = set_timer + 1;
        //console.log(set_timer);
    }
    if(option == 1){
        if(set_timer >= 5){
            set_timer = 0;
            return 1 ;
        }else{
            return 0 ;
        }
    }
    if(option == 2){
        set_timer = 0;
    }
    if(option == 3){
        return set_timer;
    }
    
}
function checkKeyPress(key) {
    switch(key.key){
        case "a":
            a = 1;
            break;
        case "z":
            z = 1;
            break;
        case "s":
            s = 1;
            break;
        case "q":
            q = 1;
            break;
        case "d":
            d = 1;
            break;
        case "ArrowUp":
            z = 1;
            break;
        case "ArrowDown":
            s = 1;
            break;
        case "ArrowLeft":
            q = 1;
            break;
        case "ArrowRight":
            d = 1;
            break;
    }
	if(key.keyCode === 32){
		a = 1;
	}
}

function checkKeyRelease(key) {
    switch(key.key){
        case "a":
            a = 0;
            break;
        case "z":
            z = 0;
            break;
        case "s":
            s = 0;
            break;
        case "q":
            q = 0;
            break;
        case "d":
            d = 0;
            break;
        case "ArrowUp":
            z = 0;
            break;
        case "ArrowDown":
            s = 0;
            break;
        case "ArrowLeft":
            q = 0;
            break;
        case "ArrowRight":
            d = 0;
            break;
    }
	if(key.keyCode === 32){
		a = 0;
	}
}

function nb_random(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function size_button(number){
    if(number == 0){
        taille_ecran = 0;
    }if(number == 1){
        taille_ecran = 1;
    }if(number == 2){
        taille_ecran = 2;
    }if(number == 3){
        taille_ecran = 3;
    }
	restart(1);
}

