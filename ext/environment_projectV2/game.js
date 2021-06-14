
console.log("le script game.js de la V2 a bien été lancé");

var canvas;
var ctx;
var intervalFrameMode; //nombre de frame par seconde
var intervalFrameGame;
var intervalFrameGameOver;

var score = 0;
var totalItemCollect = -1;  //-1 du a un changement pourgarder une axeleration correct
var animationScore = 0;

var animationTitle = 0;

var imgFullCharge = true //var true si toutes les images sont chargées
var positionOfCloudX = [];
var positionOfCloudY = [];
var frameClouds = 0;

var perso1direction = 0; //variable pour les poubelles
var per1X;
var per1Y;
var per1type;
var per1etat;
var per1actualTrash;

var perso2direction = 0;
var per2X;
var per2Y;
var per2type;
var per2etat;
var per2actualTrash;

var speedPerso = 20;

const perSize = 100;

//var pour les boutons
var leftArrow = 0;
var rightArrow = 0;
var upArrow = 0;
var downArrow = 0;
var q = 0;
var d = 0;
var z = 0;
var s = 0;
var enter = 0;

var compteurFrameButtonMode = 0; //variables pour le selecteur de mode
var positionCurseur = 1;
var mode = 0;
var difficulte = 0;

var firstTrash; //paper plastic green unrecycable
var secondTrash;
var thirdTrash;
var fourthTrash;

const DifItemTrashBlack = 3;
const DifItemTrashBlue = 3;
const DifItemTrashYellow = 3;
const DifItemTrashGreen = 3;

//variable pour le gestionnaire d'objets
var collectionOfObjets = [];
var objSize = 100;
var lapsTime = 20;
var compteurLapsTime;
var speedObject = 5;

var couldownEnter = 0;
var couldownUp = 0;
var couldowndown = 0;
var couldownZ = 0;
var couldownS = 0;

var gameOver = 0;
var transitionGamrOver = 0;
var jokerP1;
var jokerP2;
var animationCoeur = 0;
var clignotementCoeurP1 = 0;
var clignotementCoeurP2 = 0;

var soundEtat = true;
var musicEtat = false;



function Setup() {

	canvas = document.getElementById("environmentGame");
	ctx = canvas.getContext("2d");

	ctx.imageSmoothingEnabled = false; //pour ne pas que les images soit floues

	//scoreHTML = document.getElementById("Score");

	window.addEventListener("keydown", checkKeyPress, true); //fonction pour mettre emplace les boutons
	window.addEventListener("keyup", checkKeyRelease, true);

	ctx.fillStyle = "#777";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//intervallFrame = setInterval(boucle, 40);

	//player = new Player(canvas, ctx)
	setTimeout(CheckIMG, 700, 1); //fonction regade si toutes les images sont chargées (le chargement d'image se fait dans un autre fichier)

}

function CheckIMG(secondeImgCharge) { //fonction qui regarde si tout les docs sont chargées
	//console.log(secondeImgCharge)
	MoveCloud("s");//setup pour le positionnement des nuages
	if (secondeImgCharge == 5) {
		console.log("problem de chargement d'image après " + secondeImgCharge + " seconde");
		intervalFrameMode = setInterval(boucleMode, 40);
	}

	imgFullCharge = true; //testeur pour voir si toutes les images sont chargées, passe à faux si une image ,n'est pas chargée

	if (EimgTileset1p == false) {
		imgFullCharge = false;
		console.log("l'image tileset1p n'est pas chargée");
	}
	if (EimgTileset2p == false) {
		imgFullCharge = false;
		console.log("l'image tileset2p n'est pas chargée");
	}
	if (EimgTilesetnormal == false) {
		imgFullCharge = false;
		console.log("l'image tilesetnormal n'est pas chargée");
	}
	if (EimgTilesethard == false) {
		imgFullCharge = false;
		console.log("l'image tilesethard n'est pas chargée");
	}
	if (EimgTilesetpoubelle == false) {
		imgFullCharge = false;
		console.log("l'image tilesetpoubelle n'est pas chargée");
	}
	if (EimgTileset == false) {
		imgFullCharge = false;
		console.log("l'image tileset n'est pas chargée");
	}
	if (EimgBackground == false) {
		imgFullCharge = false;
		console.log("l'image background n'est pas chargée");
	}
	if (Eimgoverlay == false) {
		imgFullCharge = false;
		console.log("l'image overlay n'est pas chargée");
	}
	if (Eimgsky == false) {
		imgFullCharge = false;
		console.log("l'image sky n'est pas chargée");
	}
	if (EAudioBackground == false) {//son
		imgFullCharge = false;
		console.log("le son audiobckground n'est pas chargée");
	}

	if (imgFullCharge == false && secondeImgCharge < 5) {
		setTimeout(CheckIMG, 1000, secondeImgCharge + 1);
	} else {
		intervalFrameMode = setInterval(boucleMode, 40);//40
	}
}

function Background(para){ //fonction qui s'occupe du background
	if(para == "b"){// b background
		ctx.fillStyle = "#a0d1e0";
		ctx.fillRect(0, 0, canvas.width, canvas.height);//font bleu
		ctx.drawImage(imgsky, 0, 0, 132, 110, 0, 0, 1200, 1000);

		MoveCloud("m");
		//ctx.drawImage(collectionOfCloud[10], 0, 0, 132, 110, collectionOfCloud[10].x,collectionOfCloud[10].y, 1200,1000);
		for (var i = 0; i <= 10; i++) {
			ctx.drawImage(collectionOfCloud[i], 0, 0, 132, 110, positionOfCloudX[i], positionOfCloudY[i], 1200, 1000);
		}
		//ctx.drawImage(collectionOfCloud[10], 0, 0, 132, 110, 200,0, 1200,1000);
		//console.log("le nuage fait " + collectionOfCloud[10].width + " pixel de large")
		ctx.drawImage(imgoverlay, 0, 0, 132, 110, 0, 0, 1200, 1000);
	}

	if(para == "o"){ //o over
		if(mode == 1){
			ctx.fillStyle = "#000";//le score
			ctx.font = "40px 'Press Start 2P', cursive";
			ctx.textAlign = "left";
			ctx.fillText('SCORE:' + score, 10, 55 + animationScore);

			if(clignotementCoeurP1 > 0){
				if(clignotementCoeurP1%5 < 3){
					for (var i = 0; i <= (jokerP1 + 1); i++) { //affichage des vies
						ctx.drawImage(imgTileset, 16, 32, 11, 9, 1200 - 75 * i, 15 + animationCoeur, 66, 54);
					}
					/*for(var i = 0;i < 3-joker; i++){ //affichage des coeur mort
						ctx.drawImage(imgTileset, 48, 48, 11, 11, 975 + 75 * i, 15, 66, 66);
					}*/
				}
			}else{
				for (var i = 0; i <= jokerP1; i++) { //affichage des vies
					ctx.drawImage(imgTileset, 16, 32, 11, 9, 1200 - 75 * i, 15 + animationCoeur, 66, 54);
				}
				/*for(var i = 0;i < 3-joker; i++){ //affichage des coeur mort
					ctx.drawImage(imgTileset, 48, 48, 11, 11, 975 + 75 * i, 15, 66, 66);
				}*/
			}
			if(clignotementCoeurP1 > 0){
				clignotementCoeurP1++
			}
			if(clignotementCoeurP1 > 14){
				clignotementCoeurP1 = 0;
			}
		}
		if(mode == 2){
			ctx.lineWidth = 5;//ligne de séparation de l'écrans
			ctx.beginPath();
			ctx.moveTo(600, 0);
			ctx.lineTo(600, 1000)
			ctx.stroke();

			//coeur player 1
			if(clignotementCoeurP1 > 0){
				if(clignotementCoeurP1%5 < 3){
					for (var i = 1; i <= (jokerP1 + 1); i++) { //affichage des vies
						ctx.drawImage(imgTileset, 16, 32, 11, 9, 1200 - 75 * i, 15 + animationCoeur, 66, 54);
					}
					/*for(var i = 0;i < 3-joker; i++){ //affichage des coeur mort
						ctx.drawImage(imgTileset, 48, 48, 11, 11, 975 + 75 * i, 15, 66, 66);
					}*/
				}
			}else{
				for (var i = 1; i <= jokerP1; i++) { //affichage des vies
					ctx.drawImage(imgTileset, 16, 32, 11, 9, 1200 - 75 * i, 15 + animationCoeur, 66, 54);
				}
				/*for(var i = 0;i < 3-joker; i++){ //affichage des coeur mort
					ctx.drawImage(imgTileset, 48, 48, 11, 11, 975 + 75 * i, 15, 66, 66);
				}*/
			}
			if(clignotementCoeurP1 > 0){
				clignotementCoeurP1++
			}
			if(clignotementCoeurP1 > 14){
				clignotementCoeurP1 = 0;
			}

			//player 2
			if(clignotementCoeurP2 > 0){
				if(clignotementCoeurP2%5 < 3){
					for (var i = 1; i <= (jokerP2 + 1); i++) { //affichage des vies
						ctx.drawImage(imgTileset, 16, 32, 11, 9, 600 - 75 * i, 15 + animationCoeur, 66, 54);
					}
					/*for(var i = 0;i < 3-joker; i++){ //affichage des coeur mort
						ctx.drawImage(imgTileset, 48, 48, 11, 11, 975 + 75 * i, 15, 66, 66);
					}*/
				}
			}else{
				for (var i = 1; i <= jokerP2; i++) { //affichage des vies
					ctx.drawImage(imgTileset, 16, 32, 11, 9, 600 - 75 * i, 15 + animationCoeur, 66, 54);
				}
				/*for(var i = 0;i < 3-joker; i++){ //affichage des coeur mort
					ctx.drawImage(imgTileset, 48, 48, 11, 11, 975 + 75 * i, 15, 66, 66);
				}*/
			}
			if(clignotementCoeurP2 > 0){
				clignotementCoeurP2++
			}
			if(clignotementCoeurP2 > 14){
				clignotementCoeurP2 = 0;
			}
		}
	}
}

function MoveCloud(mode) {
	if (mode == "s") {
		for (var i = 0; i <= 10; i++) {
			positionOfCloudX[i] = 0;
			positionOfCloudY[i] = 0;
		}
		positionOfCloudX[0] = 0;
		positionOfCloudY[0] = 20;

		positionOfCloudX[1] = 500;
		positionOfCloudY[1] = 0;

		positionOfCloudX[2] = -350;
		positionOfCloudY[2] = 50;

		positionOfCloudX[3] = 550;
		positionOfCloudY[3] = 220;

		positionOfCloudX[4] = 100;
		positionOfCloudY[4] = 150;

		positionOfCloudX[5] = -550;
		positionOfCloudY[5] = 70;

		positionOfCloudX[6] = -200;
		positionOfCloudY[6] = 300;

		positionOfCloudX[7] = 100;
		positionOfCloudY[7] = 450;

		positionOfCloudX[8] = -520;
		positionOfCloudY[8] = 220;

		positionOfCloudX[9] = -570;
		positionOfCloudY[9] = 450;

		positionOfCloudX[10] = 750;
		positionOfCloudY[10] = 330;
	}
	if (mode == "m") {
		frameClouds++
		if ((frameClouds + 3) % 15 == 0) {
			positionOfCloudX[0] += 7
			if (positionOfCloudX[0] > 1200) {
				positionOfCloudX[0] = 0 - 650; //100/11 coeficient d'agrandissement
			}
		}
		if ((frameClouds + 7) % 15 == 0) {
			positionOfCloudX[1] += 7
			if (positionOfCloudX[1] > 1200) {
				positionOfCloudX[1] = 0 - 650; //100/11 coeficient d'agrandissement
			}
		}
		if ((frameClouds + 5) % 15 == 0) {
			positionOfCloudX[2] += 7
			if (positionOfCloudX[2] > 1200) {
				positionOfCloudX[2] = 0 - 650; //100/11 coeficient d'agrandissement
			}
		}

		if ((frameClouds + 2) % 15 == 0) {
			positionOfCloudX[3] += 7
			if (positionOfCloudX[3] > 1200) {
				positionOfCloudX[3] = 0 - 650; //100/11 coeficient d'agrandissement
			}
		}
		if ((frameClouds + 8) % 15 == 0) {
			positionOfCloudX[4] += 7
			if (positionOfCloudX[4] > 1200) {
				positionOfCloudX[4] = 0 - 650; //100/11 coefficient d'agrandissement
			}
		}
		if ((frameClouds + 1) % 15 == 0) {
			positionOfCloudX[5] += 7
			if (positionOfCloudX[5] > 1200) {
				positionOfCloudX[5] = 0 - 656; //100/11 coefficient d'agrandissement
			}
		}
		if ((frameClouds + 9) % 15 == 0) {
			positionOfCloudX[6] += 7
			if (positionOfCloudX[6] > 1200) {
				positionOfCloudX[6] = 0 - 656; //100/11 coefficient d'agrandissement
			}
		}
		if ((frameClouds + 6) % 15 == 0) {
			positionOfCloudX[7] += 7
			if (positionOfCloudX[7] > 1200) {
				positionOfCloudX[7] = 0 - 656; //100/11 coefficient d'agrandissement
			}
		}
		if ((frameClouds + 4) % 15 == 0) {
			positionOfCloudX[8] += 7
			if (positionOfCloudX[8] > 1200) {
				positionOfCloudX[8] = 0 - 656; //100/11 coefficient d'agrandissement
			}
		}
		if ((frameClouds + 0) % 15 == 0) {
			positionOfCloudX[9] += 7
			if (positionOfCloudX[9] > 1200) {
				positionOfCloudX[9] = 0 - 656; //100/11 coefficient d'agrandissement
			}
		}
		if (frameClouds % 15 == 0) {
			positionOfCloudX[10] += 7
			if (positionOfCloudX[10] > 1200) {
				positionOfCloudX[10] = 0 - 650; //100/11 coefficient d'agrandissement
			}
		}
	}
}

function boucleMode() {
	Background("b");

	if(AudioBackground.paused && soundEtat == true && musicEtat == true){
		playAudio(7);
	}
	//console.log(compteurFrameButtonMode)

	compteurFrameButtonMode++; //compteur pour les frames de l'animation des bouttons max=40
	if (compteurFrameButtonMode > 20) { 
		compteurFrameButtonMode = 0 
	}
	
	animationTitle++;
	animationTitle %= 28

	if (animationTitle >= 0 && animationTitle < 7) { 
		ctx.drawImage(imgtilesetTitle, 0, 0, 76, 42, 250, 50, 608, 336);
	}
	if (animationTitle >= 7 && animationTitle < 14) { 
		ctx.drawImage(imgtilesetTitle, 0, 42, 76, 42, 250, 50, 608, 336);
	}
	if (animationTitle >= 14 && animationTitle < 21) { 
		ctx.drawImage(imgtilesetTitle, 0, 84, 76, 42, 250, 50, 608, 336);
	}
	if (animationTitle >= 21 && animationTitle < 28) { 
		ctx.drawImage(imgtilesetTitle, 0, 126, 76, 42, 250, 50, 608, 336);
	}
	
	


	if (positionCurseur == 1) {
		if (rightArrow == 1) {
			positionCurseur = 2
			playAudio(4);
		}
	}

	if (positionCurseur == 2) {
		if (leftArrow == 1) {
			positionCurseur = 1
			playAudio(4);
		}
	}

	if (mode == 0) {

		if (enter == 0) {
			couldownEnter = 0;
		}
		if (enter == 1 && couldownEnter == 0) {
			couldownEnter = 1;
			playAudio(2);
			mode = positionCurseur;
			positionCurseur = 1;
			console.log("fin de la selction du nombre de joueur")
			//clearInterval(intervalFrameMode);
		}

		//console.log(enter + " " + couldownEnter);
		if (positionCurseur != 1) {	//affichage de l'animation pour le boutton 1player
			if (compteurFrameButtonMode >= 0 && compteurFrameButtonMode <= 5) {
				ctx.drawImage(imgTileset1p, 0, 0, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 5 && compteurFrameButtonMode <= 10) {
				ctx.drawImage(imgTileset1p, 0, 32, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 10 && compteurFrameButtonMode <= 15) {
				ctx.drawImage(imgTileset1p, 0, 64, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 15 && compteurFrameButtonMode <= 20) {
				ctx.drawImage(imgTileset1p, 0, 32, 64, 32, 230, 536, 256, 128);
			}
		} else {
			if (compteurFrameButtonMode >= 0 && compteurFrameButtonMode <= 5) {
				ctx.drawImage(imgTileset1p, 64, 0, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 5 && compteurFrameButtonMode <= 10) {
				ctx.drawImage(imgTileset1p, 64, 32, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 10 && compteurFrameButtonMode <= 15) {
				ctx.drawImage(imgTileset1p, 64, 64, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 15 && compteurFrameButtonMode <= 20) {
				ctx.drawImage(imgTileset1p, 64, 32, 64, 32, 230, 536, 256, 128);
			}
		}

		if (positionCurseur != 2) {	//affichage de l'animation pour le boutton 2player
			if (compteurFrameButtonMode >= 0 && compteurFrameButtonMode <= 5) {
				ctx.drawImage(imgTileset2p, 0, 0, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 5 && compteurFrameButtonMode <= 10) {
				ctx.drawImage(imgTileset2p, 0, 32, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 10 && compteurFrameButtonMode <= 15) {
				ctx.drawImage(imgTileset2p, 0, 64, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 15 && compteurFrameButtonMode <= 20) {
				ctx.drawImage(imgTileset2p, 0, 32, 64, 32, 714, 536, 256, 128);
			}
		} else {
			if (compteurFrameButtonMode >= 0 && compteurFrameButtonMode <= 5) {
				ctx.drawImage(imgTileset2p, 64, 0, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 5 && compteurFrameButtonMode <= 10) {
				ctx.drawImage(imgTileset2p, 64, 32, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 10 && compteurFrameButtonMode <= 15) {
				ctx.drawImage(imgTileset2p, 64, 64, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 15 && compteurFrameButtonMode <= 20) {
				ctx.drawImage(imgTileset2p, 64, 32, 64, 32, 714, 536, 256, 128);
			}
		}
	} else if (difficulte == 0) {  //selection de la difficulté du jeux

		if (enter == 0) {
			couldownEnter = 0;
		}
		if (enter == 1 && couldownEnter == 0) {
			playAudio(2);
			//setTimeout(playAudio, 1400, 7);
			console.log("fin de la section de la difficultée");
			difficulte = positionCurseur;
			clearInterval(intervalFrameMode);
			SetupGame();

		}


		if (positionCurseur != 1) {	//affichage de l'animation pour le boutton 1player
			if (compteurFrameButtonMode >= 0 && compteurFrameButtonMode <= 5) {
				ctx.drawImage(imgTilesetnormal, 0, 0, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 5 && compteurFrameButtonMode <= 10) {
				ctx.drawImage(imgTilesetnormal, 0, 32, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 10 && compteurFrameButtonMode <= 15) {
				ctx.drawImage(imgTilesetnormal, 0, 64, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 15 && compteurFrameButtonMode <= 20) {
				ctx.drawImage(imgTilesetnormal, 0, 32, 64, 32, 230, 536, 256, 128);
			}
		} else {
			if (compteurFrameButtonMode >= 0 && compteurFrameButtonMode <= 5) {
				ctx.drawImage(imgTilesetnormal, 64, 0, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 5 && compteurFrameButtonMode <= 10) {
				ctx.drawImage(imgTilesetnormal, 64, 32, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 10 && compteurFrameButtonMode <= 15) {
				ctx.drawImage(imgTilesetnormal, 64, 64, 64, 32, 230, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 15 && compteurFrameButtonMode <= 20) {
				ctx.drawImage(imgTilesetnormal, 64, 32, 64, 32, 230, 536, 256, 128);
			}
		}

		if (positionCurseur != 2) {	//affichage de l'animation pour le boutton 2player
			if (compteurFrameButtonMode >= 0 && compteurFrameButtonMode <= 5) {
				ctx.drawImage(imgTilesethard, 0, 0, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 5 && compteurFrameButtonMode <= 10) {
				ctx.drawImage(imgTilesethard, 0, 32, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 10 && compteurFrameButtonMode <= 15) {
				ctx.drawImage(imgTilesethard, 0, 64, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 15 && compteurFrameButtonMode <= 20) {
				ctx.drawImage(imgTilesethard, 0, 32, 64, 32, 714, 536, 256, 128);
			}
		} else {
			if (compteurFrameButtonMode >= 0 && compteurFrameButtonMode <= 5) {
				ctx.drawImage(imgTilesethard, 64, 0, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 5 && compteurFrameButtonMode <= 10) {
				ctx.drawImage(imgTilesethard, 64, 32, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 10 && compteurFrameButtonMode <= 15) {
				ctx.drawImage(imgTilesethard, 64, 64, 64, 32, 714, 536, 256, 128);
			}
			if (compteurFrameButtonMode > 15 && compteurFrameButtonMode <= 20) {
				ctx.drawImage(imgTilesethard, 64, 32, 64, 32, 714, 536, 256, 128);
			}
		}

	}
}


function SetupGame() {
	console.log("Le nombre de joueur est de " + mode + " en difficulté " + difficulte)
	if (mode == 1 && difficulte == 1) { //en mode un joueur et facile
		per1etat = 1; //player 1 on
		per2etat = 0; //player 2 off
		per1type = 0; //numéro de poubelle
		per1X = 600;
		per1Y = 900;
		jokerP1 = 3;
		lapsTime = 55; //valeur max pour le compteur de frame (compteur movible)
		compteurLapsTime = 100; //timer pour l'aparition des déchets

		//choix des poubelles pour 1 joueur en facile
		var a = nb_random(1, 4);
		var b;

		do { //tant que b == a boucle, pour avoir 2 poubelle differents.
			b = nb_random(1, 4);
		} while (a == b);

		if (a == 1) { firstTrash = "unrecycable" }
		if (a == 2) { firstTrash = "paper" }
		if (a == 3) { firstTrash = "plastic" }
		if (a == 4) { firstTrash = "green" }

		if (b == 1) { secondTrash = "unrecycable" }
		if (b == 2) { secondTrash = "paper" }
		if (b == 3) { secondTrash = "plastic" }
		if (b == 4) { secondTrash = "green" }

	}
	else if (mode == 1 && difficulte == 2) {
		per1etat = 1; //player 1 on
		per2etat = 0; //player 2 off
		per1type = 0; //numéro de poubelle acctuel modification de valeur pour chager
		per1X = 600;//position de la poubelle
		per1Y = 900;
		jokerP1 = 3;//nombre de vie
		lapsTime = 55; //valeur max pour le compteur de frame (compteur movible)
		compteurLapsTime = 100; //timer pour l'aparition des déchets

		//choix des poubelles pour 1 joueur en facile
		var a = nb_random(1, 4);
		var b;
		var c;

		do { //tant que b == a boucle, pour avoir 2 poubelle differents.
			b = nb_random(1, 4);
		} while (a == b);

		do {
			c = nb_random(1, 4);
		} while (c == b || c == a);

		if (a == 1) { firstTrash = "unrecycable" }
		if (a == 2) { firstTrash = "paper" }
		if (a == 3) { firstTrash = "plastic" }
		if (a == 4) { firstTrash = "green" }

		if (b == 1) { secondTrash = "unrecycable" }
		if (b == 2) { secondTrash = "paper" }
		if (b == 3) { secondTrash = "plastic" }
		if (b == 4) { secondTrash = "green" }

		if (c == 1) { thirdTrash = "unrecycable" }
		if (c == 2) { thirdTrash = "paper" }
		if (c == 3) { thirdTrash = "plastic" }
		if (c == 4) { thirdTrash = "green" }
	}
	else if (mode == 2 && difficulte == 1) {
		per1etat = 1; //player 1 on
		per2etat = 1; //player 2 on
		per1type = 0; //numéro de poubelle acctuel modification de valeur pour chager
		per2type = 0; //numéro de poubelle acctuel modification de valeur pour chager
		per1X = 800;//position de la poubelle
		per1Y = 900;
		per2X = 400;//position de la poubelle
		per2Y = 900;
		jokerP1 = 3;//nombre de vie
		jokerP2 = 3;
		lapsTime = 55; //valeur max pour le compteur de frame (compteur movible)
		compteurLapsTime = 100; //timer pour l'aparition des déchets

		//choix des poubelles pour 1 joueur en facile
		var a = nb_random(1, 4);
		var b;

		do { //tant que b == a boucle, pour avoir 2 poubelle differents.
			b = nb_random(1, 4);
		} while (a == b);

		if (a == 1) { firstTrash = "unrecycable" }
		if (a == 2) { firstTrash = "paper" }
		if (a == 3) { firstTrash = "plastic" }
		if (a == 4) { firstTrash = "green" }

		if (b == 1) { secondTrash = "unrecycable" }
		if (b == 2) { secondTrash = "paper" }
		if (b == 3) { secondTrash = "plastic" }
		if (b == 4) { secondTrash = "green" }
	}
	else if (mode == 2 && difficulte == 2) {
		per1etat = 1; //player 1 on
		per2etat = 1; //player 2 on
		per1type = 0; //numéro de poubelle acctuel modification de valeur pour chager
		per2type = 0; //numéro de poubelle acctuel modification de valeur pour chager
		per1X = 800;//position de la poubelle
		per1Y = 900;
		per2X = 400;//position de la poubelle
		per2Y = 900;
		jokerP1 = 3;//nombre de vie
		jokerP2 = 3
		lapsTime = 55; //valeur max pour le compteur de frame (compteur movible)
		compteurLapsTime = 100; //timer pour l'aparition des déchets

		//choix des poubelles pour 1 joueur en facile
		var a = nb_random(1, 3);
		var b;
		var c;

		do { //tant que b == a boucle, pour avoir 2 poubelle differents.
			b = nb_random(1, 4);
		} while (a == b);

		do {
			c = nb_random(1, 4);
		} while (c == b || c == a);

		if (a == 1) { firstTrash = "unrecycable" }
		if (a == 2) { firstTrash = "paper" }
		if (a == 3) { firstTrash = "plastic" }
		if (a == 4) { firstTrash = "green" }

		if (b == 1) { secondTrash = "unrecycable" }
		if (b == 2) { secondTrash = "paper" }
		if (b == 3) { secondTrash = "plastic" }
		if (b == 4) { secondTrash = "green" }

		if (c == 1) { thirdTrash = "unrecycable" }
		if (c == 2) { thirdTrash = "paper" }
		if (c == 3) { thirdTrash = "plastic" }
		if (c == 4) { thirdTrash = "green" }
	}

	//montrer les diff dechets et poubelles 
	couldownEnter=1
	intervalFrameGame = setInterval(DiffTrashShow, 40)//montre les diff poubelles puis lance boucleGame()

	

}

function DiffTrashShow(){
	if(enter == 0){
		couldownEnter=0
	}
	if(couldownEnter==0 && enter == 1){
		setTimeout(playAudio, 10, 1);//fight sound
		clearInterval(intervalFrameGame);
		intervalFrameGame = setInterval(boucleGame, 40);
	}
	ctx.fillStyle = "#444";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	var marge = 200;
	if(firstTrash=="unrecycable" || secondTrash=="unrecycable" || thirdTrash=="unrecycable" || fourthTrash=="unrecycable"){
		ctx.drawImage(imgTilesetpoubelle, 0, 0, 16, 16, 200, marge, 100, 100);
		for(var i = 0; i < 3;i++){
			ctx.drawImage(imgTileset, 32, 48, 16, 16, 500, marge, perSize, perSize)
			ctx.drawImage(imgTileset, 0, 32, 16, 16, 650, marge, perSize, perSize)
			ctx.drawImage(imgTileset, 16, 0, 16, 16, 800, marge, perSize, perSize)
		}
		marge += 200
	}
	if(firstTrash=="paper" || secondTrash=="paper" || thirdTrash=="paper" || fourthTrash=="paper"){
		ctx.drawImage(imgTilesetpoubelle, 0, 16, 16, 16, 200, marge, 100, 100);
		for(var i = 0; i < 3;i++){
			ctx.drawImage(imgTileset, 0, 48, 16, 16, 500, marge, perSize, perSize)
			ctx.drawImage(imgTileset, 32, 0, 16, 16, 650, marge, perSize, perSize)
			ctx.drawImage(imgTileset, 16, 48, 16, 16, 800, marge, perSize, perSize)
		}
		marge += 200
	}
	if(firstTrash=="plastic" || secondTrash=="plastic" || thirdTrash=="plastic" || fourthTrash=="plastic"){
		ctx.drawImage(imgTilesetpoubelle, 48, 0, 16, 16, 200, marge, 100, 100);
		for(var i = 0; i < 3;i++){
			ctx.drawImage(imgTileset, 48, 0, 16, 16, 500, marge, perSize, perSize)
			ctx.drawImage(imgTileset, 32, 16, 16, 16, 650, marge, perSize, perSize)
			ctx.drawImage(imgTileset, 48, 32, 16, 16, 800, marge, perSize, perSize)
		}
		marge += 200
	}
	if(firstTrash=="green" || secondTrash=="green" || thirdTrash=="green" || fourthTrash=="green"){
		ctx.drawImage(imgTilesetpoubelle, 16, 0, 16, 16, 200, marge, 100, 100);
		for(var i = 0; i < 3;i++){
			ctx.drawImage(imgTileset, 0, 16, 16, 16, 500, marge, perSize, perSize)
			ctx.drawImage(imgTileset, 16, 16, 16, 16, 650, marge, perSize, perSize)
			ctx.drawImage(imgTileset, 48, 16, 16, 16, 800, marge, perSize, perSize)
		}
		marge += 200
	}
	
}

function boucleGame() {
	Background("b"); //mise a jour du background
	compteurLapsTime++;
	//ctx.font = '48px MinecraftiaRegular';
	//ctx.fillText('Hello world', 600, 500);
	if (mode == 1) {
		if (difficulte == 1) {
			if (upArrow == 1 && couldownUp == 0) { //mettre a jour la direction de la poubelle
				couldownUp = 1;
				per1type++
				//console.log(per1type)
				if (per1type == 2) {
					per1type = 0;
				}
			}

			if (downArrow == 1 && couldowndown == 0) {
				couldowndown = 1;
				per1type--
				//console.log(per1type)
				if (per1type == -1) {
					per1type = 1;
				}
			}
		}
		if (difficulte == 2) {
			if (upArrow == 1 && couldownUp == 0) { //mettre a jour la direction de la poubelle
				couldownUp = 1;
				per1type++
				//console.log(per1type)
				if (per1type == 3) {
					per1type = 0;
				}
			}

			if (downArrow == 1 && couldowndown == 0) {
				couldowndown = 1;
				per1type--
				//console.log(per1type)
				if (per1type == -1) {
					per1type = 2;
				}
			}
		}
		boucleObjets("s");//show
		Player1Show();

		boucleObjets("m");//move
		Player1Move();
		Player1Update();
		boucleObjets("u");//update

	} 
	
	
	else if (mode == 2) { //mode 2 joueur
		if (difficulte == 1) {
			if (upArrow == 1 && couldownUp == 0) { //mettre a jour la direction de la poubelle 1
				couldownUp = 1;
				per1type++
				//console.log(per1type)
				if (per1type == 2) {
					per1type = 0;
				}
			}

			if (downArrow == 1 && couldowndown == 0) {
				couldowndown = 1;
				per1type--
				//console.log(per1type)
				if (per1type == -1) {
					per1type = 1;
				}
			}

			if (z == 1 && couldownZ == 0) { //mettre a jour la direction de la poubelle 2
				couldownZ = 1;
				per2type++
				//console.log(per2type)
				if (per2type == 2) {
					per2type = 0;
				}
			}
			if (s == 1 && couldownS == 0) {
				couldownS = 1;
				per2type--
				//console.log(per2type)
				if (per2type == -1) {
					per2type = 1;
				}
			}
		}
		if (difficulte == 2) {
			if (upArrow == 1 && couldownUp == 0) { //mettre a jour la direction de la poubelle 1
				couldownUp = 1;
				per1type++
				if (per1type == 3) {
					per1type = 0;
				}
			}

			if (downArrow == 1 && couldowndown == 0) {
				couldowndown = 1;
				per1type--
				if (per1type == -1) {
					per1type = 2;
				}
			}

			if (z == 1 && couldownZ == 0) { //mettre a jour la direction de la poubelle 2
				couldownZ = 1;
				per2type++
				if (per2type == 3) {
					per2type = 0;
				}
			}
			if (s == 1 && couldownS == 0) {
				couldownS = 1;
				per2type--
				if (per2type == -1) {
					per2type = 2;
				}
			}
		}
		boucleObjets("s");//show
		Player1Show();
		Player2Show();

		boucleObjets("m");//move
		Player1Move();
		Player2Move();
		Player1Update();
		Player2Update();
		boucleObjets("u");//update
	}

	if(compteurLapsTime % 10 == 0){
		animationCoeur = 3
	}
	if(compteurLapsTime%20 == 0){
		animationCoeur = -2
	}
	
	if(compteurLapsTime % 10 == 0){
		animationScore = 3
	}
	if(compteurLapsTime% 20 == 0){
		animationScore = -2
	}

	Background("o")//over
	
	if (upArrow == 0) { couldownUp = 0 } //remise a zero des couldown pour les touches de clavier
	if (downArrow == 0) { couldowndown = 0 }
	if (z == 0) { couldownZ = 0 }
	if (s == 0) { couldownS = 0 }

	if (gameOver == 5) {
		//BoucleGameOver();
		intervalFrameGameOver = setInterval(BoucleGameOver, 40);
		clearInterval(intervalFrameGame);
		console.log("trans" + transitionGamrOver);
	}
	if(gameOver > 0){gameOver++}
}

function boucleObjets(para) { //boucle qui gère les déchets et autre (objets)
	if (para == "u") {
		if (mode == 1 && difficulte == 1) {//1 joueur difficulté 1
			if (compteurLapsTime + (totalItemCollect / 1.5) > lapsTime && collectionOfObjets.length < 10) { //tous les certains interval de temps
				compteurLapsTime = 0; //remettre à 0 le comteur de temps
				var type1 = nb_random(1, 2)  //paper plastic green unrecycable
				var type2;

				if (type1 == 1) {
					if (firstTrash == "unrecycable") { type2 = 0 }
					if (firstTrash == "paper") { type2 = 1 }
					if (firstTrash == "plastic") { type2 = 2 }
					if (firstTrash == "green") { type2 = 3 }
				}
				if (type1 == 2) {
					if (secondTrash == "unrecycable") { type2 = 0 }
					if (secondTrash == "paper") { type2 = 1 }
					if (secondTrash == "plastic") { type2 = 2 }
					if (secondTrash == "green") { type2 = 3 }
				}

				collectionOfObjets.push(new objets(type2, nb_random(0, 11) * 100, 0 - perSize, 1))
				totalItemCollect++;
			}
		}
		if (mode == 1 && difficulte == 2) {//1 joueur difficulté 1
			if (compteurLapsTime + (totalItemCollect / 1.5) > lapsTime && collectionOfObjets.length < 10) { //tous les certains interval de temps
				compteurLapsTime = 0; //remettre à 0 le comteur de temps
				var type1 = nb_random(1, 3)  //choisir la poubelle
				var type2; //couleur du déchet

				if (type1 == 1) {
					if (firstTrash == "unrecycable") { type2 = 0 }
					if (firstTrash == "paper") { type2 = 1 }
					if (firstTrash == "plastic") { type2 = 2 }
					if (firstTrash == "green") { type2 = 3 }
				}
				if (type1 == 2) {
					if (secondTrash == "unrecycable") { type2 = 0 }
					if (secondTrash == "paper") { type2 = 1 }
					if (secondTrash == "plastic") { type2 = 2 }
					if (secondTrash == "green") { type2 = 3 }
				}
				if (type1 == 3) {
					if (thirdTrash == "unrecycable") { type2 = 0 }
					if (thirdTrash == "paper") { type2 = 1 }
					if (thirdTrash == "plastic") { type2 = 2 }
					if (thirdTrash == "green") { type2 = 3 }
				}
				collectionOfObjets.push(new objets(type2, nb_random(0, 11) * 100, 0 - perSize, 1))
				totalItemCollect++;
			}
		}
		if (mode == 2 && difficulte == 1) {//1 joueur difficulté 1
			if (compteurLapsTime + (totalItemCollect / 1.5) > lapsTime && collectionOfObjets.length < 10) { //tous les certains interval de temps
				compteurLapsTime = 0; //remettre à 0 le comteur de temps
				var type1 = nb_random(1, 2)  //paper plastic green unrecycable
				var type2;

				if (type1 == 1) {
					if (firstTrash == "unrecycable") { type2 = 0 }
					if (firstTrash == "paper") { type2 = 1 }
					if (firstTrash == "plastic") { type2 = 2 }
					if (firstTrash == "green") { type2 = 3 }
				}
				if (type1 == 2) {
					if (secondTrash == "unrecycable") { type2 = 0 }
					if (secondTrash == "paper") { type2 = 1 }
					if (secondTrash == "plastic") { type2 = 2 }
					if (secondTrash == "green") { type2 = 3 }
				}
				collectionOfObjets.push(new objets(type2, nb_random(0, 5) * 100, 0 - perSize, 2));//premier dechet


				type1 = nb_random(1, 2)  //paper plastic green unrecycable

				if (type1 == 1) {
					if (firstTrash == "unrecycable") { type2 = 0 }
					if (firstTrash == "paper") { type2 = 1 }
					if (firstTrash == "plastic") { type2 = 2 }
					if (firstTrash == "green") { type2 = 3 }
				}
				if (type1 == 2) {
					if (secondTrash == "unrecycable") { type2 = 0 }
					if (secondTrash == "paper") { type2 = 1 }
					if (secondTrash == "plastic") { type2 = 2 }
					if (secondTrash == "green") { type2 = 3 }
				}

				collectionOfObjets.push(new objets(type2, nb_random(6, 11) * 100, 0 - perSize, 1));//seond dechet
				totalItemCollect++;
			}
		}
		if (mode == 2 && difficulte == 2) {//1 joueur difficulté 1
			if (compteurLapsTime + (totalItemCollect / 1.5) > lapsTime && collectionOfObjets.length < 10) { //tous les certains interval de temps
				compteurLapsTime = 0; //remettre à 0 le comteur de temps
				var type1 = nb_random(1, 3)  //choisir la poubelle
				var type2; //couleur du déchet

				if (type1 == 1) {
					if (firstTrash == "unrecycable") { type2 = 0 }
					if (firstTrash == "paper") { type2 = 1 }
					if (firstTrash == "plastic") { type2 = 2 }
					if (firstTrash == "green") { type2 = 3 }
				}
				if (type1 == 2) {
					if (secondTrash == "unrecycable") { type2 = 0 }
					if (secondTrash == "paper") { type2 = 1 }
					if (secondTrash == "plastic") { type2 = 2 }
					if (secondTrash == "green") { type2 = 3 }
				}
				if (type1 == 3) {
					if (thirdTrash == "unrecycable") { type2 = 0 }
					if (thirdTrash == "paper") { type2 = 1 }
					if (thirdTrash == "plastic") { type2 = 2 }
					if (thirdTrash == "green") { type2 = 3 }
				}
				collectionOfObjets.push(new objets(type2, nb_random(0, 5) * 100, 0 - perSize, 2));

				type1 = nb_random(1, 3)  //choisir la poubelle
				if (type1 == 1) {
					if (firstTrash == "unrecycable") { type2 = 0 }
					if (firstTrash == "paper") { type2 = 1 }
					if (firstTrash == "plastic") { type2 = 2 }
					if (firstTrash == "green") { type2 = 3 }
				}
				if (type1 == 2) {
					if (secondTrash == "unrecycable") { type2 = 0 }
					if (secondTrash == "paper") { type2 = 1 }
					if (secondTrash == "plastic") { type2 = 2 }
					if (secondTrash == "green") { type2 = 3 }
				}
				if (type1 == 3) {
					if (thirdTrash == "unrecycable") { type2 = 0 }
					if (thirdTrash == "paper") { type2 = 1 }
					if (thirdTrash == "plastic") { type2 = 2 }
					if (thirdTrash == "green") { type2 = 3 }
				}
				collectionOfObjets.push(new objets(type2, nb_random(6, 11) * 100, 0 - perSize, 1));
				totalItemCollect++;
			}
		}

		for (var i = 0; i < collectionOfObjets.length; i++) {//supprimer les objets mort ou récoltés
			if (collectionOfObjets[i].deletable == 1) {
				collectionOfObjets.splice(i, 1)
			}
		}
	}//fin de update

	if (para == "s") { //show
		for (var i = 0; i < collectionOfObjets.length; i++) {
			collectionOfObjets[i].show();
		}
	}
	if (para == "m") { //move
		for (var i = 0; i < collectionOfObjets.length; i++) {
			collectionOfObjets[i].move();
			for (var j = 0; j < collectionOfObjets.length; j++) {//supprimer les objets mort ou récoltés
				if (collectionOfObjets[j].deletable == 1) {
					collectionOfObjets.splice(j, 1)
				}
			}
		}
	}
}


function Player1Move() { //player 1
	if(mode == 1){
		if (perso1direction == -1 && per1X - perSize / 2 > 0) {
			per1X = per1X - speedPerso;
			if (per1X - perSize / 2 < 0) {
				per1X = 0 + perSize / 2
			}
		}
		if (perso1direction == 1 && per1X + perSize / 2 < canvas.width) {
			per1X = per1X + speedPerso;
			if (per1X + perSize / 2 > canvas.width) {
				per1X = canvas.width - perSize / 2
			}
		}
	}

	if(mode == 2){
		if (perso1direction == -1 && per1X - perSize / 2 > 600) {
			per1X = per1X - speedPerso;
			if (per1X - perSize / 2 < 600) {
				per1X = 600 + perSize / 2
			}
		}
		if (perso1direction == 1 && per1X + perSize / 2 < canvas.width) {
			per1X = per1X + speedPerso;
			if (per1X + perSize / 2 > canvas.width) {
				per1X = canvas.width - perSize / 2
			}
		}
	}
}


function Player1Update() { //player 1

	for (var i = 0; i < collectionOfObjets.length; i++) {
		if (collectionOfObjets[i].transitionTimer == 0) {
			if (ColisionDetection(collectionOfObjets[i].x + collectionOfObjets[i].margLeft * (100 / 16), collectionOfObjets[i].y, objSize - collectionOfObjets[i].margRight * (100 / 16) - collectionOfObjets[i].margLeft * (100 / 16), objSize, per1X - perSize / 2 + 100 / 16, per1Y - perSize + 100 / 16, perSize - 2 * (100 / 16), perSize - 100 / 16)) {
				//this.x + this.margLeft*(100/16), this.y, objSize - this.margRight*(100/16)-this.margLeft*(100/16), objSize
				//console.log("touché par poubelle");

				
				speedObject = speedObject * 1.05;
				speedPerso = speedPerso * 1.023;

				if (collectionOfObjets[i].categorie == per1actualTrash) {
					score += 100;
					collectionOfObjets[i].transitionTimer = 1;//clignotement pour bon
					playAudio(3);

					//console.log("bon");
				} else {
					collectionOfObjets[i].transitionTimer = 100;
					playAudio(5);
					//console.log("pas bon");
					//score -= 100	
					if (jokerP1 == 0) {
						gameOver = 1;
					}
					jokerP1--;
					clignotementCoeurP1 = 1;
				}
			}
		}
	}

	if (per1type == 0) {
		if (firstTrash == "unrecycable") {
			per1actualTrash = 0;
		}
		if (firstTrash == "paper") {
			per1actualTrash = 1;
		}
		if (firstTrash == "plastic") {
			per1actualTrash = 2;
		}
		if (firstTrash == "green") {
			per1actualTrash = 3;
		}
	}
	if (per1type == 1) {
		if (secondTrash == "unrecycable") {
			per1actualTrash = 0;
		}
		if (secondTrash == "paper") {
			per1actualTrash = 1;
		}
		if (secondTrash == "plastic") {
			per1actualTrash = 2;
		}
		if (secondTrash == "green") {
			per1actualTrash = 3;
		}
	}
	if (per1type == 2) {
		if (thirdTrash == "unrecycable") {
			per1actualTrash = 0;
		}
		if (thirdTrash == "paper") {
			per1actualTrash = 1;
		}
		if (thirdTrash == "plastic") {
			per1actualTrash = 2;
		}
		if (thirdTrash == "green") {
			per1actualTrash = 3;
		}
	}
}


//player 1
function Player1Show() { //player 1
	//ctx.fillStyle = "#00F"
	//ctx.fillRect(per1X - (perSize / 2) + 100/16, per1Y - perSize + 100/16, perSize - 2*(100/16), perSize - 100/16)
	//per1X - (perSize / 2), per1Y - perSize, perSize, perSize pour le carré
	//per1X - (perSize / 2) + 100/16, per1Y - perSize + 100/16, perSize - 2*(100/16), perSize - 100/16

	if (per1actualTrash == 0) {
		ctx.drawImage(imgTilesetpoubelle, 0, 0, 16, 16, per1X - (perSize / 2), per1Y - perSize, perSize, perSize);
	}
	if (per1actualTrash == 1) {
		ctx.drawImage(imgTilesetpoubelle, 0, 16, 16, 16, per1X - (perSize / 2), per1Y - perSize, perSize, perSize);
	}
	if (per1actualTrash == 2) {
		ctx.drawImage(imgTilesetpoubelle, 48, 0, 16, 16, per1X - (perSize / 2), per1Y - perSize, perSize, perSize);
	}
	if (per1actualTrash == 3) {
		ctx.drawImage(imgTilesetpoubelle, 16, 0, 16, 16, per1X - (perSize / 2), per1Y - perSize, perSize, perSize);
	}
}


function Player2Move() { //player 2
	if(mode == 1){
		if (perso2direction == -1 && per2X - perSize / 2 > 0) {
			per2X = per2X - speedPerso;
			if (per2X - perSize / 2 < 0) {
				per2X = 0 + perSize / 2
			}
		}
		if (perso2direction == 1 && per2X + perSize / 2 < canvas.width) {
			per2X = per2X + speedPerso;
			if (per2X + perSize / 2 > canvas.width) {
				per2X = canvas.width - perSize / 2
			}
		}
	}
	if(mode == 2){
		if (perso2direction == -1 && per2X - perSize / 2 > 0) {
			per2X = per2X - speedPerso;
			if (per2X - perSize / 2 < 0) {
				per2X = 0 + perSize / 2
			}
		}
		if (perso2direction == 1 && per2X + perSize / 2 < canvas.width - 600) {
			per2X = per2X + speedPerso;
			if (per2X + perSize / 2 > canvas.width - 600) {
				per2X = canvas.width - 600 - perSize / 2
			}
		}
	}
}


function Player2Update() { //player 2
	for (var i = 0; i < collectionOfObjets.length; i++) {
		if (collectionOfObjets[i].transitionTimer == 0) {
			if (ColisionDetection(collectionOfObjets[i].x + collectionOfObjets[i].margLeft * (100 / 16), collectionOfObjets[i].y, objSize - collectionOfObjets[i].margRight * (100 / 16) - collectionOfObjets[i].margLeft * (100 / 16), objSize, per2X - perSize / 2 + 100 / 16, per2Y - perSize + 100 / 16, perSize - 2 * (100 / 16), perSize - 100 / 16)) {
				//this.x + this.margLeft*(100/16), this.y, objSize - this.margRight*(100/16)-this.margLeft*(100/16), objSize
				//console.log("touché par poubelle");

				collectionOfObjets[i].transitionTimer = 1;
				speedObject = speedObject * 1.05;
				speedPerso = speedPerso * 1.023;

				if (collectionOfObjets[i].categorie == per2actualTrash) {
					score += 100;

					playAudio(3);
					
					//console.log("bon");
				} else {
					playAudio(5);
					//console.log("pas bon");
					//score -= 100	
					if (jokerP2 == 0) {
						gameOver = 1;
					}
					jokerP2--;
					clignotementCoeurP2++;
				}
			}
		}
	}

	if (per2type == 0) {
		if (firstTrash == "unrecycable") {
			per2actualTrash = 0;
		}
		if (firstTrash == "paper") {
			per2actualTrash = 1;
		}
		if (firstTrash == "plastic") {
			per2actualTrash = 2;
		}
		if (firstTrash == "green") {
			per2actualTrash = 3;
		}
	}
	if (per2type == 1) {
		if (secondTrash == "unrecycable") {
			per2actualTrash = 0;
		}
		if (secondTrash == "paper") {
			per2actualTrash = 1;
		}
		if (secondTrash == "plastic") {
			per2actualTrash = 2;
		}
		if (secondTrash == "green") {
			per2actualTrash = 3;
		}
	}
	if (per2type == 2) {
		if (thirdTrash == "unrecycable") {
			per2actualTrash = 0;
		}
		if (thirdTrash == "paper") {
			per2actualTrash = 1;
		}
		if (thirdTrash == "plastic") {
			per2actualTrash = 2;
		}
		if (thirdTrash == "green") {
			per2actualTrash = 3;
		}
	}
	if (per2type == 3) {
		if (fourthTrash == "unrecycable") {
			per2actualTrash = 0;
		}
		if (fourthTrash == "paper") {
			per2actualTrash = 1;
		}
		if (fourthTrash == "plastic") {
			per2actualTrash = 2;
		}
		if (fourthTrash == "green") {
			per2actualTrash = 3;
		}
	}
}



function Player2Show() { //player 2
	//ctx.fillStyle = "#00F"
	//ctx.fillRect(per1X - (perSize / 2) + 100/16, per1Y - perSize + 100/16, perSize - 2*(100/16), perSize - 100/16)
	//per1X - (perSize / 2), per1Y - perSize, perSize, perSize pour le carré
	//per1X - (perSize / 2) + 100/16, per1Y - perSize + 100/16, perSize - 2*(100/16), perSize - 100/16

	if (per2actualTrash == 0) {
		ctx.drawImage(imgTilesetpoubelle, 0, 0, 16, 16, per2X - (perSize / 2), per2Y - perSize, perSize, perSize);
	}
	if (per2actualTrash == 1) {
		ctx.drawImage(imgTilesetpoubelle, 0, 16, 16, 16, per2X - (perSize / 2), per2Y - perSize, perSize, perSize);
	}
	if (per2actualTrash == 2) {
		ctx.drawImage(imgTilesetpoubelle, 48, 0, 16, 16, per2X - (perSize / 2), per2Y - perSize, perSize, perSize);
	}
	if (per2actualTrash == 3) {
		ctx.drawImage(imgTilesetpoubelle, 16, 0, 16, 16, per2X - (perSize / 2), per2Y - perSize, perSize, perSize);
	}

}


function objets(categorie, x, y, p) {
	this.name;
	this.categorie = categorie;
	this.x = x;
	this.y = y;
	this.p = p; //player
	this.margLeft = 0;
	this.margRight = 0;
	this.deletable = 0;
	this.transitionTimer = 0;

	if (this.categorie == 0) {  //poubelle noir
		var type = nb_random(1, 3);
		if (type == 1) { this.name = "yaourt"; this.margLeft = 1; this.margRight = 1 }
		if (type == 2) { this.name = "cigarette" }
		if (type == 3) { this.name = "mouchoir" }

	}

	if (this.categorie == 1) {  //poubelle papier
		var type = nb_random(1, 3);
		if (type == 1) { this.name = "carton" }
		if (type == 2) { this.name = "papier"; this.margLeft = 2; this.margRight = 1 }
		if (type == 3) { this.name = "journal" }

	}

	if (this.categorie == 2) {  //poubelle plastique 
		var type = nb_random(1, 3);
		if (type == 1) { this.name = "bouteille"; this.margLeft = 4; this.margRight = 4 }
		if (type == 2) { this.name = "canette"; this.margLeft = 3; this.margRight = 3 }
		if (type == 3) { this.name = "briquette"; this.margLeft = 4; this.margRight = 3 }

	}

	if (this.categorie == 3) {  //poubelle vert
		var type = nb_random(1, 3);
		if (type == 1) { this.name = "feuille"; this.margLeft = 3; this.margRight = 2 }
		if (type == 2) { this.name = "banane" }
		if (type == 3) { this.name = "pomme"; this.margLeft = 3; this.margRight = 2 }

	}
	//console.log("new " + this.name);

	this.show = function () {
		//ctx.drawImage(imgTileset, 0, 0, 16, 16, this.x, this.y, perSize, perSize);

		//ctx.fillStyle = "#FF00FF";
		//ctx.fillRect(this.x + this.margLeft*(100/16), this.y, objSize - this.margRight*(100/16)-this.margLeft*(100/16), objSize);
		//this.x + this.margLeft*(100/16), this.y, objSize - this.margRight*(100/16)-this.margLeft*(100/16), objSize
		if(this.transitionTimer % 5 < 3 ||this.transitionTimer>=100){
			if (this.name == "pomme") { ctx.drawImage(imgTileset, 16, 16, 16, 16, this.x, this.y, perSize, perSize); }
			if (this.name == "banane") { ctx.drawImage(imgTileset, 0, 16, 16, 16, this.x, this.y, perSize, perSize); }
			if (this.name == "feuille") { ctx.drawImage(imgTileset, 48, 16, 16, 16, this.x, this.y, perSize, perSize); }

			if (this.name == "bouteille") { ctx.drawImage(imgTileset, 32, 16, 16, 16, this.x, this.y, perSize, perSize); }
			if (this.name == "canette") { ctx.drawImage(imgTileset, 48, 0, 16, 16, this.x, this.y, perSize, perSize); }
			if (this.name == "briquette") { ctx.drawImage(imgTileset, 48, 32, 16, 16, this.x, this.y, perSize, perSize); }

			if (this.name == "carton") { ctx.drawImage(imgTileset, 32, 0, 16, 16, this.x, this.y, perSize, perSize); }
			if (this.name == "papier") { ctx.drawImage(imgTileset, 0, 48, 16, 16, this.x, this.y, perSize, perSize); }
			if (this.name == "journal") { ctx.drawImage(imgTileset, 16, 48, 16, 16, this.x, this.y, perSize, perSize); }

			if (this.name == "yaourt") { ctx.drawImage(imgTileset, 32, 48, 16, 16, this.x, this.y, perSize, perSize); }
			if (this.name == "cigarette") { ctx.drawImage(imgTileset, 0, 32, 16, 16, this.x, this.y, perSize, perSize); }
			if (this.name == "mouchoir") { ctx.drawImage(imgTileset, 16, 0, 16, 16, this.x, this.y, perSize, perSize); }
		}
	}

	this.move = function () {
		if(this.transitionTimer == 0){
			this.y = this.y + speedObject;
		}
		if(this.transitionTimer ==100){
			this.x = this.x - this.transitionTimer/2
		}
		if(this.transitionTimer > 100){
			if(this.transitionTimer%2==0){
				this.x = this.x + this.transitionTimer/2;
			}
			if(this.transitionTimer%4==0){
				this.x = this.x - this.transitionTimer;
			}
		}

		if (this.y > 1000) {
			playAudio(6);
			this.deletable = 1;
			if(this.p == 1){
				if (jokerP1 == 0) {
					gameOver = 1;
				}
				jokerP1--;

				clignotementCoeurP1 = 1;
			}
			if(this.p == 2){
				if (jokerP2 == 0) {
					gameOver = 1;
				}
				jokerP2--;
				clignotementCoeurP2 = 1;
			}
			//console.log("fin du jeu : un item a touché le sol");
		}

		if (this.transitionTimer > 0) {
			this.transitionTimer++;
			if (this.transitionTimer > 10 && this.transitionTimer < 50 || this.transitionTimer > 110) {
				this.deletable = 1;
			}
		}
	}
}


function BoucleGameOver() {
	transitionGamrOver++
	if(transitionGamrOver == 1){
		clearInterval(intervalFrameGame);
		AudioBackground.pause();
		setTimeout(playAudio, 500, 8)
	}
	if (transitionGamrOver > 5 && transitionGamrOver < 10) {
		ctx.fillStyle = "rgba(0,0,0," + (0 + (transitionGamrOver - 5) / 5) + ")";
		ctx.fillRect(0, 0, canvas.width, canvas.height);//font noir
	}
	if (transitionGamrOver == 10) { //vidage de mémoire;
		collectionOfObjets = [];
	}
	if(mode == 1){
		if (transitionGamrOver >= 10) {
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, canvas.width, canvas.height);//font noir
			ctx.fillStyle = "#FFF";
			ctx.font = "80px 'Press Start 2P', cursive";
			ctx.textAlign = "center";
			ctx.fillText('SCORE:' + score, 600, 525);
		}
	}
	if(mode == 2){
		if(transitionGamrOver >= 10){
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, canvas.width, canvas.height);//font noir
			ctx.fillStyle = "#FFF";
			ctx.font = "80px 'Press Start 2P', cursive";
			ctx.textAlign = "center";
			if(jokerP1 > jokerP2){
				ctx.lineWidth = 4;//ligne de séparation de l'écrans
				ctx.strokeStyle = "#FFF";
				ctx.beginPath();
				ctx.moveTo(600, 0);
				ctx.lineTo(600, 1000)
				ctx.stroke();
				ctx.fillText('YOU', 900, 475);
				ctx.fillText('WIN', 900, 575);
				ctx.fillText('YOU', 300, 475);
				ctx.fillText('LOSE', 300, 575);
			}
			if(jokerP2 > jokerP1){
				ctx.lineWidth = 5;//ligne de séparation de l'écrans
				ctx.strokeStyle = "#FFF";
				ctx.beginPath();
				ctx.moveTo(600, 0);
				ctx.lineTo(600, 1000)
				ctx.stroke();
				ctx.fillText('YOU', 900, 475);
				ctx.fillText('LOSE', 900, 575);
				ctx.fillText('YOU', 300, 475);
				ctx.fillText('WIN', 300, 575);
			}
			if(jokerP2 == jokerP1){
				ctx.fillText('EQUALITY', 600, 525);
			}
		}
	}
	if (transitionGamrOver == 130) { //vidage de mémoire et réenitialisation;
		couldownEnter = 1
		gameOver = 0;
		mode = 0;
		difficulte = 0;
		transitionGamrOver = 0;
		positionCurseur = 1;
		totalItemCollect = 0;
		score = 0;
		clignotementCoeurP1 = 0;
		clignotementCoeurP2 = 0;
		speedPerso = 20;
		speedObject = 5;
		//clearInterval(intervalFrameGame);
		clearInterval(intervalFrameGameOver);
		intervalFrameMode = setInterval(boucleMode, 40);
	}
}


function checkKeyPress(key) {
	switch (key.key) {
		case "ArrowUp":
			upArrow = 1;
			break;
		case "ArrowDown":
			downArrow = 1;
			break;
		case "ArrowLeft":
			leftArrow = 1;
			perso1direction = -1
			break;
		case "ArrowRight":
			rightArrow = 1;
			perso1direction = +1
			break;
		case "Enter":
			enter = 1;
			break;
		case "q":
			q = 1;
			perso2direction = -1
			break;
		case "d":
			d = 1;
			perso2direction = +1
			break;
		case "z":
			z = 1;
			break;
		case "s":
			s = 1;
			break;
	}
}

function checkKeyRelease(key) {
	switch (key.key) {
		case "ArrowUp":
			upArrow = 0;
			break;
		case "ArrowDown":
			downArrow = 0;
			break;
		case "ArrowLeft":
			leftArrow = 0;
			if (rightArrow == 1) {
				perso1direction = 1
			} else {
				perso1direction = 0
			}
			break;
		case "ArrowRight":
			rightArrow = 0;
			if (leftArrow == 1) {
				perso1direction = -1
			} else {
				perso1direction = 0
			}
			break;
		case "Enter":
			enter = 0;
			break;
		case "q":
			q = 0;
			if (d == 1) {
				perso2direction = 1
			} else {
				perso2direction = 0
			}
			break;
		case "d":
			d = 0;
			if (q == 1) {
				perso2direction = -1
			} else {
				perso2direction = 0
			}
			break;
		case "z":
			z = 0;
			break;
		case "s":
			s = 0;
			break;
	}
}

function nb_random(min, max) {				//fonction générant un nombre aléatoir, min et max inclues
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playAudio(audio) {
	if(soundEtat == true){
		if (audio == 1) {
			fightAudio.play();
		}
		if (audio == 2) {
			selectAudio.pause();
			selectAudio.currentTime = 0;
			selectAudio.play();
		}
		if(audio == 3){
			recoltAudio.pause();
			recoltAudio.currentTime = 0;
			recoltAudio.play();
		}
		if(audio == 4){
			changeAudio.pause();
			changeAudio.currentTime = 0;
			changeAudio.play();
		}
		if(audio == 5){
			loseAudio.pause();
			loseAudio.currentTime = 0;
			loseAudio.play();
		}
		if(audio == 6){//lose 2
			lose2Audio.pause();
			lose2Audio.currentTime = 0;
			lose2Audio.play();
		}
		if(audio == 7){//lose 2
			AudioBackground.pause();
			AudioBackground.currentTime = 0;
			AudioBackground.volume = 0.3;
			AudioBackground.play();
			AudioBackground.loop = true
		}
		if(audio == 8){
			youWin.pause();
			youWin.currentTime = 0;
			youWin.play();
		}
	}
}



function ColisionDetection(ATopLeftX, ATopLeftY, Awidth, Aheight, BTopLeftX, BTopLeftY, Bwidth, Bheight) {
	var valBool = false;

	if (PointOnScare(ATopLeftX, ATopLeftY, Awidth, Aheight, BTopLeftX, BTopLeftY)) { valBool = true }
	if (PointOnScare(ATopLeftX, ATopLeftY, Awidth, Aheight, BTopLeftX + Bwidth, BTopLeftY)) { valBool = true }
	if (PointOnScare(ATopLeftX, ATopLeftY, Awidth, Aheight, BTopLeftX, BTopLeftY + Bheight)) { valBool = true }
	if (PointOnScare(ATopLeftX, ATopLeftY, Awidth, Aheight, BTopLeftX + Bwidth, BTopLeftY + Bheight)) { valBool = true }

	if (PointOnScare(BTopLeftX, BTopLeftY, Bwidth, Bheight, ATopLeftX, ATopLeftY)) { valBool = true }
	if (PointOnScare(BTopLeftX, BTopLeftY, Bwidth, Bheight, ATopLeftX + Awidth, ATopLeftY)) { valBool = true }
	if (PointOnScare(BTopLeftX, BTopLeftY, Bwidth, Bheight, ATopLeftX, ATopLeftY + Aheight)) { valBool = true }
	if (PointOnScare(BTopLeftX, BTopLeftY, Bwidth, Bheight, ATopLeftX + Awidth, ATopLeftY + Aheight)) { valBool = true }

	return valBool;
}

function PointOnScare(ATopLeftX, ATopLeftY, Awidth, Aheight, BX, BY) {//permet de faire fonctionner la fonction de détection de colision, renvoie true si un point est dans un rectangle sur un repère cadrier

	var valBool = false;

	if (ATopLeftX <= BX && BX <= ATopLeftX + Awidth && ATopLeftY <= BY && BY <= ATopLeftY + Aheight) {
		valBool = true;
	}
	return valBool;
}

function buttonSound(){
	var imageSound = document.getElementById("imgSound");
	if(soundEtat == true){
		soundEtat = false;
		AudioBackground.pause();
		AudioBackground.currentTime = 0;
		imageSound.src = "ressources/soundOff.png";
	}else if(soundEtat == false){
		soundEtat = true;
		imageSound.src = "ressources/soundOn.png";
	}
}

function buttonMusic(){
	var imageMusic = document.getElementById("imgMusic");
	if(musicEtat == true){
		musicEtat = false;
		AudioBackground.pause();
		AudioBackground.currentTime = 0;
		imageMusic.src = "ressources/musicOff.png";
	}else if(musicEtat == false){
		musicEtat = true;
		imageMusic.src = "ressources/musicOn.png";
	}
}

//Ne pas oublier de mettre la fonction setup ou autre pour démarer le programme
Setup();
