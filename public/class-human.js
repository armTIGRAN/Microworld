
class Human extends LivingCreature{

    constructor(x, y, index)
    {
        super(x, y, index);
        this.energy = 125;
    }


    getNewCoor() {
        this.direct = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell2(character1, character2) {
        this.getNewCoor();
        var found = [];
        for (var i in this.direct) {
            var x = this.direct[i][0];
            var y = this.direct[i][1];
            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.direct[i])
                }
            }
        }
        return found;
    }

    die() {

        matrix[this.y][this.x] = 0;

        for (var i in humanArr) {
            if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
               humanArr.splice(i, 1);
                 ++weather;

            }
        }
    }

    move() {
        var Cel = this.chooseCell2(0, 1);
        var rCel = random(Cel);
        if (rCel) {
            var x = rCel[0];
            var y = rCel[1];
            if (matrix[y][x] == 0) {
                matrix[this.y][this.x] = 0;
            }
            else if (matrix[y][x] == 1) {
                matrix[this.y][this.x] = 1;
            }

            matrix[y][x] = 4;


            this.x = x;
            this.y = y;
            this.energy--;

        }
        if (this.energy < 1) {
            this.die();
        }
    }
    mul() {

        var emptyCells = this.chooseCell2(0, 1);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            var human = new Human(newX, newY, this.index);
            humanArr.push(human);
            this.multiply = 0;
            ++weather;
           

            
        }
    }




    eat() {
        var hum = this.chooseCell(3);
        var randhum = random(hum);
        if (randhum) {
            var x = randhum[0];
            var y = randhum[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

             if(this.gender == 2){
                this.multiply++;
            }


            this.energy = this.energy++;
            if(this.energy>150/(Math.round((weather/100))%2)+1)
            {
                this.energy = 150/(Math.round((weather/100))%2)+1;
            }

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }

        
            if (this.multiply > 3*(WeatherR+1)) {

                if(this.timeout%2 == 0){
                  this.mul(); 
                }
                
                ++this.timeout;
                
              
          }



        }

        else {
            this.move();

        }
    }
}





