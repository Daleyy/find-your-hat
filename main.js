const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(arr) {
        this.field = arr;
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
            console.log('Please enter a valid direction. (U, D, L, R)\n')
        }

        if (this.currentPos() && this.currentPos() != 'O') {
            if (this.currentPos() == '^'){
                console.log('You win!');
                this.running = false;
            } else {
                this.markPath();
            }
        } else {
            console.log('You lose!')
            this.running = false;
        }
        
    }

    currentPos() {
        const currentPos = this.field[this.playerPos[0]][this.playerPos[1]];
        return currentPos;
    }

    markPath() {
        this.field[this.playerPos[0]][this.playerPos[1]] = '*'
    }

    print() {
        this.field.forEach(line => console.log(line.join('')));
    }

    printPos() {
        return `Your current position is X: ${this.playerPos[1]}, Y: ${this.playerPos[0]}`
    }
}


// Test Field
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '░', '░'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

console.log('Welcome to Find your Hat');
console.log('Here is your starting field.');

while (myField.running) {
    myField.print();
    console.log(myField.printPos())
    let direction = prompt('Which direction would you like to move? (U, D, L, R)\n').toLowerCase();
    myField.movePlayer(direction);
}