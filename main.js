const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor() {
        this.field = [];
        this.running = true;
        this.playerPos = [0, 0];
    }

    movePlayer(direction) {
        if (direction == 'u') {
            this.playerPos[0] = this.playerPos[0] - 1;
        } else if (direction == 'd') {
            this.playerPos[0] = this.playerPos[0] + 1;
        } else if (direction == 'l') {
            this.playerPos[1] = this.playerPos[1] - 1;
        } else if (direction == 'r') {
            this.playerPos[1] = this.playerPos[1] + 1;
        } else {
            console.log('Please enter a valid direction. (U, D, L, R)\n');
        }
        console.log(this.printPos());

        if (this.currentPos() && this.currentPos() != 'O') {
            if (this.currentPos() == '^'){
                console.log('You win!');
                this.running = false;
            } else {
                this.markPath();
            }
        } else {
            console.log('You lose!');
            this.running = false;
        }
        
    }

    generateField(height, width, percentage) {
        const hat = '^';
        const hole = 'O';
        const fieldCharacter = '░';
        const pathCharacter = '*';

        for (let i = 0; i < height; i++) {
            this.field.push(new Array(width).fill(fieldCharacter))
        }
        // Set start
        this.field[0][0] = pathCharacter;

        // Set goal
        const goalX = Math.floor(Math.random() * width);
        const goalY = height - 1;
        this.field[goalY][goalX] = hat;

        // Set holes
        const numHoles = (height * width) * (percentage / 100);
        for (let i = 0; i < numHoles; i++) {
            let y = Math.floor(Math.random() * height);
            let x = Math.floor(Math.random() * width);
            this.markHole(y, x);
        }
    }

    currentPos() {
        const currentPos = this.field[this.playerPos[0]][this.playerPos[1]];
        return currentPos;
    }

    markPath() {
        this.field[this.playerPos[0]][this.playerPos[1]] = '*';
    }

    markHole(yCoord, xCoord) {
        if (this.field[yCoord][xCoord] == '░') {
            this.field[yCoord][xCoord] = 'O';
        }
    }

    print() {
        this.field.forEach(line => console.log(line.join('')));
    }

    printPos() {
        return `Your current position is X: ${this.playerPos[1]}, Y: ${this.playerPos[0]}`
    }
}

const myField = new Field();
myField.generateField(10, 10, 20);

console.log('Welcome to Find your Hat');
console.log('Here is your starting field.');

while (myField.running) {
    myField.print();
    let direction = prompt('Which direction would you like to move? (U, D, L, R)\n').toLowerCase();
    myField.movePlayer(direction);
}

// TODO: Add check to markHole to check for start, hat or hole to ensure correct number of holes.
// TODO: Try adding a way to validate the field if it can be completed.
// TODO: Allow player to type in width, height and percentage of holes upon game start.