let nbEntity;
let geneCollection = [];
let geneRanking = [];
let patternLayer = [4, 3, 3, 1];
let activationFunction = "bin"; //"ReLU"
let geneMutProb = 10; //10%

function SetupNeuroevolutionNetwork(param) {
    nbEntity = param.nbEntity;
    patternLayer = param.pattern;

    InitGene();
}

function InitGene() {
    for (let i = 0; i < nbEntity; i++) {
        geneCollection[i] = getGene();
    }
}

//generate random gene for the first generation
function getGene() {
    var gene = []
    for (let i = 0; i < patternLayer.length - 1; i++) { //pour chaque layer
        gene[i] = [
            [],
            []
        ] //each layer contain weight and biais

        for (let j = 0; j < patternLayer[i + 1]; j++) { //generate weights
            //pour chaque neurone de cette couche
            gene[i][0][j] = []
            for (let k = 0; k < patternLayer[i]; k++) { //genere weights en fonction du nombre de neurone de la couche d'avant
                gene[i][0][j][k] = randomG()
            }
        }

        for (let j = 0; j < patternLayer[i + 1]; j++) { //generate biais
            gene[i][1][j] = [randomG()]
        }

    }
    return gene;
}

function networkProcesse(input, index) {
    var next = input;
    for (let i = 0; i < geneCollection[index].length; i++) {
        next = layer(next, geneCollection[index][i][0], geneCollection[index][i][1])
    }
    return next
}

function getScoreOfGeneration(arr) {
    geneRanking = [] //clear
    for (let i = 0; i < arr.length; i++) {
        geneRanking.push([deepCopyFunction(arr[i][0]), deepCopyFunction(geneCollection[arr[i][1]])]) //[1] is index of gene, [0] is score; deepcopy to avoid reference bug
    }
}

function nextGeneration() {
    /*
    1 copi de gene et recuperation des scores associe
    2 tri en F des scores
    3 supprimer les plus nuls
    4 dupli de la moitié + modif
    */

    //1 fait dans getScoreOfGeneration()

    //2
    sort(geneRanking)
    geneCollection = [];
    //console.log(geneRanking)

    for (let i = 0; i < geneRanking.length/2; i++) {
        geneCollection.push(deepCopyFunction(geneRanking[i][1])) 
    }
    //console.log(geneCollection)
    for (let i = 0; i < geneRanking.length/2; i++) {
        geneCollection.push(deepCopyFunction(geneRanking[i][1])) 
    }
    for (let i = 0; i < geneRanking.length/2; i++) {
        mutateGene(geneRanking.length/2 + i)//mutate the last push, (the current one)
    }
    //console.log(geneCollection)

}

function mutateGene(index){
    for (let i = 0; i < geneCollection[index].length; i++) { // each layer
        //each weight
        for (let j = 0; j < geneCollection[index][i][0].length; j++) {
            for (let k = 0; k < geneCollection[index][i][0][j].length; k++) {
                //console.log(geneCollection[index][i][0][j][k])
                if(geneMutProb >= nb_random(0,100)){
                    geneCollection[index][i][0][j][k] += randomG() / 10;
                }
            }
        }

        //each biais
        for (let j = 0; j < geneCollection[index][i][1].length; j++) {
            if(geneMutProb >= nb_random(0,100)){
                geneCollection[index][i][1][j][0] += randomG() / 10;
            }
        }
    }
}

//function that multiply 2 matrices 
function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function addingMatrices(m1, m2) {
    var result = []
    //fonctionne que pour des matrice col, mais j'ai pas besoin de plus.
    //c'est pas dutout les bons formats et mathM correct mais chut.
    for (let i = 0; i < m1.length; i++) {
        result[i] = [m1[i][0] + m2[i][0]];
    }
    return result;
}


//function that processe a layer by taking inputs, multiply by weights and adding biais
function layer(inputs, weights, biais) {
    //a layer can be processe with matrices, inputs -> mat col, weight -> matrice rect
    return activationF(addingMatrices(multiplyMatrices(weights, inputs), biais));
}

function activationF(mat) {
    let newMat = [];
    for (let i = 0; i < mat.length; i++) {
        if (activationFunction == "ReLU") {
            let a = mat[i][0];
            if (a < 0) {
                a = 0;
            }
            newMat[i] = [];
            newMat[i][0] = a;
        }
        if (activationFunction == "bin") {
            let a = mat[i][0];
            if (a < 0) {
                a = 0;
            } else {
                a = 1;
            }
            newMat[i] = [];
            newMat[i][0] = a;
        }
    }
    return newMat;
}

function randomG() { //gaussian
    var r = 0;
    var v = 4;
    for (var i = v; i > 0; i--) {
        r += Math.random();
    }
    return (r / v) * 2 - 1;
}



function nb_random(min, max) { //fonction générant un nombre aléatoire entier min et max inclue [min;max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//fonction qui fait une copie profonde d'un array, parfaitement dupliqué sans ref
const deepCopyFunction = (inObject) => {
    let outObject, value, key

    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
        value = inObject[key]

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopyFunction(value)
    }

    return outObject
}


function sort(arr) {
    const byValueInvert = (a, b) => b[0] - a[0];
    return arr.sort(byValueInvert);
}