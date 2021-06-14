
var EimgBackground = false; //image du background
var imgBackground = new Image();
imgBackground.src = 'ressources/background.png';
imgBackground.onload = function(){
	EimgBackground = true;
	console.log("background chargé.")
}

var EimgTileset1p = false; //image du tileset pour animation 1 joueur
var imgTileset1p = new Image();
imgTileset1p.src = 'ressources/tileset1p2.png';
imgTileset1p.onload = function(){
	EimgTileset1p = true;
	console.log("tileset1p chargé.")
}

var EimgTileset2p = false; //image du tilesset pour animation 2 joueur
var imgTileset2p = new Image();
imgTileset2p.src = 'ressources/tileset2p2.png';
imgTileset2p.onload = function(){
	EimgTileset2p = true;
	console.log("tileset2p chargé.")
}

var EimgTilesetnormal = false; //image du tilesset pour animation mode normal
var imgTilesetnormal = new Image();
imgTilesetnormal.src = 'ressources/tilesetnormal.png';
imgTilesetnormal.onload = function(){
	EimgTilesetnormal = true;
	console.log("tilesetnormal chargé.")
}

var EimgTilesethard = false; //image du tileset pour animation mode hard
var imgTilesethard = new Image();
imgTilesethard.src = 'ressources/tilesethard.png';
imgTilesethard.onload = function(){
	EimgTilesethard = true;
	console.log("tilesethard chargé.")
}

var EimgTilesetpoubelle = false; //image du tileset pour les différentes poubelles
var imgTilesetpoubelle = new Image();
imgTilesetpoubelle.src = 'ressources/tilesetpoubelle.png';
imgTilesetpoubelle.onload = function(){
	EimgTilesetpoubelle = true;
	console.log("tilesetpoubelle chargé.")
}

var EimgTileset = false; //image du tileset des déchets
var imgTileset = new Image();
imgTileset.src = 'ressources/tileset.png';
imgTileset.onload = function(){
	EimgTileset = true;
	console.log("tileset chargé.")
}

var EchangeAudio = false; //audio mouvement des flèches sur le mode
var changeAudio = new Audio();
changeAudio.src = 'ressources/change.mp3'
changeAudio.onloadstart = function() {
    console.log("musique change est chargé")
};

var EselectAudio = false;  //audio selection du mode 
var selectAudio = new Audio();
selectAudio.src = 'ressources/select.mp3'
selectAudio.onloadstart = function() {
    console.log("musique select est chargé")
};

var EfightAudio = false; //audio "fight" pour le démarrage 
var fightAudio = new Audio();
fightAudio.src = 'ressources/fight.mp3'
fightAudio.onloadstart = function() {
    console.log("musique fight est chargé")
};

var ErecoltAudio = false; //audio "récolte"
var recoltAudio = new Audio();
recoltAudio.src = 'ressources/recolt.mp3'
recoltAudio.onloadstart = function() {
    console.log("musique recolt est chargé")
};

var EyouWin = false; //audio "récolte"
var youWin = new Audio();
youWin.src = 'ressources/youWin.mp3'
youWin.onloadstart = function() {
    console.log("musique youWin est chargé")
};

/*var EtenPointsAudio = false; //audio "10points"
var tenPointsAudio = new Audio();
tenPointsAudio.src = 'ressources/10points.mp3'
tenPointsAudio.onloadstart = function() {
    console.log("musique tenPoints est chargé")
};*/

var EloseAudio = false; //audio "lose"
var loseAudio = new Audio();
loseAudio.src = 'ressources/lose.mp3'
loseAudio.onloadstart = function() {
    console.log("musique lose est chargé")
};

var Elose2Audio = false; //audio "lose2"
var lose2Audio = new Audio();
lose2Audio.src = 'ressources/lose2.mp3'
lose2Audio.onloadstart = function() {
    console.log("musique lose2 est chargé")
};

var EAudioBackground = false; //audio "background audio"
var AudioBackground = new Audio();
AudioBackground.src = 'ressources/audiobackground.mp3'
AudioBackground.onloadstart = function() {
	EAudioBackground = true;
    console.log("musique audiobackground est chargé")
};

var Eimgoverlay = false; //image du overlay
var imgoverlay = new Image();
imgoverlay.src = 'ressources/background/overlay.png';
imgoverlay.onload = function(){
	Eimgoverlay = true;
	console.log("overlay chargé.")
}

var Eimgsky = false; //image du sky
var imgsky = new Image();
imgsky.src = 'ressources/background/sky.png';
imgsky.onload = function(){
	Eimgsky = true;
	console.log("sky chargé.")
}
var EimgtilesetTitle = false; //image du tilesetTitle
var imgtilesetTitle = new Image();
imgtilesetTitle.src = 'ressources/tilesetTitle.png';
imgtilesetTitle.onload = function(){
	EimgtilesetTitle = true;
	console.log("tilesetTitle chargé.")
}

var collectionOfCloud = [];
for(var i = 0;i <= 10; i++){
	collectionOfCloud.push(new Image());
	//console.log(" cloud n"+i)
	collectionOfCloud[i].src = 'ressources/background/nuage' + i + ".png"
}