
let canvas;
let collection = []
let W = 800;
let H = 800;
let space = 4;
let nbpoint = 100 ;
let radius = 5;
let speedmult = 0.0002;
let t = 50;

function setup() {
    W = windowWidth;
    H = windowHeight;
    nbpoint = (1.41*(max(W,H))/2)/space
    createCanvas(W, H);
    
    frameRate(120);
    background(0);
    noStroke();
    blendMode(ADD);
}


function draw() { 
    
    blendMode(BLEND);
    background(255);
    

    for (let j = 0; j < 3; j++) {
        blendMode(DARKEST );
        if(j==0){fill(255,255,0);}
        if(j==1){fill(0,255,255);}
        if(j==2){fill(255,0,255);}
        let offset = cos(t/100 +50);
        for (let i = 1; i < nbpoint; i++) {
            //circle(W/2 + cos((t-(j*offset))*speedmult*(nbpoint/(1.2 + cos(t/10)/5) - i))*(space*i), W/2 + sin((t-(j*offset))*speedmult*(nbpoint/(1.2 + cos(t/10)/5) - i))*(space*i), radius + (i/nbpoint)*20);
            //circle(W/2 + cos((t-(j*offset))*speedmult*(nbpoint/(1.2 + cos(t/10)/5) - i) + 3.14)*(space*i), W/2 + sin((t-(j*offset))*speedmult*(nbpoint/(1.2 + cos(t/10)/5) - i) + 3.14)*(space*i), radius + (i/nbpoint)*20);
            circle( 
                W/2 + cos((t ) * speedmult * (nbpoint/(1.5) - i) + cos(t/100)*1.5 - j*offset/(i+10)) * (space*i), 
                H/2 + sin((t ) * speedmult * (nbpoint/(1.5) - i) + cos(t/100)*1.5 - j*offset/(i+10)) * (space*i), 
                radius + (i/nbpoint)*20
            );
            circle( 
                W/2 + cos((t ) * speedmult * (nbpoint/(1.5) - i) + cos(t/100)*1.5 - j*offset/(i+10) + 3.14) * (space*i), 
                H/2 + sin((t ) * speedmult * (nbpoint/(1.5) - i) + cos(t/100)*1.5 - j*offset/(i+10) + 3.14) * (space*i), 
                radius + (i/nbpoint)*20
            );
        }
    }


    t++
}
