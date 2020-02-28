class Player extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 100;
        this.human = 0;
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



    move() {

      

            if (k == "w") {
                mUY = UY;
                mUX = UX;
                UY--;
            }
            else if (k == "s") {
                mUY = UY;
                mUX = UX;
                UY++;
            }
            else if (k == "a") {
                mUY = UY;
                mUX = UX;
                UX--;
            }
            else if (k == "d") {
                mUY = UY;
                mUX = UX;
                UX++;
            }

            if (UX > l || UY > l) {
                UX = 100000;
                UY = 100000;
                alert("you lose, reload the page")

            }

            k = 5;
            matrix[mUY][mUX] = 0;
            this.energy--;
            console.log(this.energy + " energy");
            this.x = UX;
            this.y = UY;

            if (this.energy < 1) {
                this.die();
            }
            else {
                this.eat();
            }

       
    }


    die() {
        var die = this.chooseCell(1);

        if (die) {


            UX = 100000;
            UY = 100000;
            alert("you lose, you not have energy, reload the page");

        }


    }

    eat() {


        var play = this.chooseCell(4);
        var randplay = random(play);
        if (randplay) {
            var x = randplay[0];
            var y = randplay[1];
            matrix[y][x] = 0;

            this.energy += 10;
            this.human++;
            if (this.human % 5 == 0) {
                alert("you already eat " + this.human + " human")
            }
            console.log("+10 ENERGY");
            console.log(this.energy + " energy");
            for (var i in humanArr) {
                if (x == humanArr[i].x && y == humanArr[i].y) {
                    humanArr.splice(i, 1);
                     ++weather;

                }
            }

        }
    }
   

}
