

function HexagonalGride(width = 11, height = 11, hexRadius = 50, ligneDirection = 0, firstOffset = 0, marge = 1){
    //gride
    this.width = width;
    this.height = height;
    this.ligneDirection = ligneDirection;
    this.firstOffset = firstOffset;
    this.gride = [];

    //hexagone
    this.hexRadius = hexRadius;
    this.marge = marge;

    this.grideCoordinate = []


    this.init = function (){
        for(let i = 0; i < this.height; i++){
            this.gride[i] = []
            this.grideCoordinate[i] = []
            for(let j = 0; j < this.width; j++){
                this.gride[i][j] = 0;
                this.grideCoordinate[i][j] = 0;
            }
        }
        this.UpdateGrideCoordinate();
    }


    this.GetXYCoordinate = function(x,y){
        return this.grideCoordinate[y][x]
    }

    this.UpdateGrideCoordinate = function(){
        if(this.ligneDirection == 0){
            let distance = Math.cos(1/6*Math.PI) * this.hexRadius 
            for(let x = 0; x < this.width; x++){
                for(let y = 0; y < this.height; y++){
                    let posX = ((distance*2) * x) + ((this.firstOffset + y)%2 * distance) + (this.marge*distance)
                    let posY = this.hexRadius + (this.hexRadius*1.5)*y - (this.hexRadius/2 * (1-this.marge))
                    this.grideCoordinate[y][x] = [parseFloat(posX.toFixed(2)), parseFloat(posY.toFixed(2))];
                }
            }
        }
        if(this.ligneDirection == 1){
            let distance = Math.cos(1/6*Math.PI) * this.hexRadius
            for(let x = 0; x < this.width; x++){
                for(let y = 0; y < this.height; y++){
                    //console.log(x + " " + y)
                    let posX = ((distance*2) * y) + ((this.firstOffset + x)%2 * distance) + (this.marge*distance)
                    let posY = this.hexRadius + (this.hexRadius*1.5)*x - (this.hexRadius/2 * (1-this.marge))
                    this.grideCoordinate[y][x] = [parseFloat(posY.toFixed(2)), parseFloat(posX.toFixed(2))];
                }
            }
        }
    }

    this.PathDrawHex = function(x,y, ctx){
        ctx.beginPath();
        if (this.ligneDirection == 0) {
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(x + this.hexRadius * Math.sin(1/3*Math.PI * i), y + this.hexRadius * Math.cos(1/3*Math.PI * i));
            }
        }else if(this.ligneDirection == 1){
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(x + this.hexRadius * Math.cos(1/3*Math.PI * i), y + this.hexRadius * Math.sin(1/3*Math.PI * i));
            }
        }
        ctx.closePath();
    }

    this.SizeGride = function (){
        if (this.marge == 1) {
            if (this.ligneDirection == 0) {
                return [((this.width+0.5)*Math.cos(1/6*Math.PI) * this.hexRadius*2 ),(this.height*this.hexRadius*1.5 + this.hexRadius/2)]
            }
            if (this.ligneDirection == 1) {
                return [(this.width*this.hexRadius*1.5 + this.hexRadius/2),((this.height + 0.5)*Math.cos(1/6*Math.PI) * this.hexRadius*2)]
            }
        }
        if (this.marge == 0) {
            if (this.ligneDirection == 0) {
                return [((this.width - 0.5)*Math.cos(1/6*Math.PI) * this.hexRadius*2 ),(this.height*this.hexRadius*1.5 - this.hexRadius/2)]
            }
            if (this.ligneDirection == 1) {
                return [(this.width*this.hexRadius*1.5 - this.hexRadius/2),((this.height - 0.5)*Math.cos(1/6*Math.PI) * this.hexRadius*2)]
            }
        }
    }

    this.GetGrideCoordinate = function(x,y){
        let closest = [0,0]
        let distance = Infinity
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (Math.pow(this.grideCoordinate[j][i][0]-x ,2) + Math.pow(this.grideCoordinate[j][i][1]-y ,2) < distance) {
                    distance = Math.pow(this.grideCoordinate[j][i][0]-x ,2) + Math.pow(this.grideCoordinate[j][i][1]-y ,2)
                    closest = [j,i]
                }
            }
        }
        return closest
    }

    this.GetNeighbourCoordinate = function(x,y){
        if (this.ligneDirection == 0) {
            let TL = [x-Math.abs((y+(1-this.firstOffset))%2), y-1]
            let TR = [x-Math.abs((y-(1-this.firstOffset))%2) + 1, y-1]
            let R  = [x+1,y]
            let BR = [x-Math.abs((y-(1-this.firstOffset))%2) + 1, y+1]
            let BL = [x-Math.abs((y+(1-this.firstOffset))%2), y+1]
            let L  = [x-1,y]

            let neighbour = [TL,TR,R,BR,BL,L]
            for (let i = 0; i < neighbour.length; i++) {
                if (neighbour[i][0] < 0 || neighbour[i][1] < 0) {
                    neighbour[i] = [undefined,undefined];
                }
                if (neighbour[i][0] >= this.width || neighbour[i][1] >= this.height) {
                    neighbour[i] = [undefined,undefined];
                }
            }
            return neighbour
        }
        if (this.ligneDirection == 1) {
            let T  = [x,y+1]
            let TR = [x+1,y-Math.abs((x-(1-this.firstOffset))%2)]
            let BR = [x+1,y+Math.abs((x+(this.firstOffset))%2)]
            let B  = [x,y-1]
            let BL = [x-1,y+Math.abs((x+(this.firstOffset))%2)]
            let TL = [x-1,y-Math.abs((x-(1-this.firstOffset))%2)]

            let neighbour = [T,TR,BR,B,BL,TL]
            for (let i = 0; i < neighbour.length; i++) {
                if (neighbour[i][0] < 0 || neighbour[i][1] < 0) {
                    neighbour[i] = [undefined,undefined];
                }
                if (neighbour[i][0] >= this.width || neighbour[i][1] >= this.height) {
                    neighbour[i] = [undefined,undefined];
                }
            }
            return neighbour
        }

        
    }

    this.Reset = function(val){
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.gride[i][j] = val
            }
            
        }
    }

}