
class Predator extends LivingCreature
{
    constructor(x, y, index)
    {
        super(x, y, index);
        this.energy = 180;
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
    };


     die() {

        matrix[this.y][this.x] = 0;

        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                ++weather;

            }
        }
    };

    move() {
        var newCel = this.chooseCell2(0, 1);
        var randCel = random(newCel);
        if (randCel) {
            var x = randCel[0];
            var y = randCel[1];
            if (matrix[y][x] == 0) {
                matrix[this.y][this.x] = 0;
            }
            else if (matrix[y][x] == 1) {
                matrix[this.y][this.x] = 1;
            }

            matrix[y][x] = 3;


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
            var predator = new Predator(newX, newY, this.index);
            predatorArr.push(predator);
            this.multiply = 0;
            ++weather;
            
        }
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



    eat() {
        var gishatich = this.chooseCell(2);
        var randgishatich = random(gishatich);
        if (randgishatich) {
            var x = randgishatich[0];
            var y = randgishatich[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

             if(this.gender == 2){
                this.multiply++;
            }
            this.energy += 2;
            if (this.energy > 200) {
                this.energy = 200;
            }

            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }

            if (this.multiply > 1) {

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




