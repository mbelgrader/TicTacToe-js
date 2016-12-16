const Board = require('./board');

const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Game {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = playerOne;
    this.board = new Board;
  }

  run(completionCallback) {
    this.getInput((pos) => {
      this.makeMove(pos);
      if (this.gameOver()) {
        console.log(`${this.currentPlayer} wins!`);
        completionCallback();
      } else {
        this.switchPlayers();
        this.run(completionCallback);
      }
    });

  }

  getInput(callback) {
    console.log(this.board.toString());
    console.log(`${this.currentPlayer}'s turn`);
    reader.question('What row?', row => {
      row = parseInt(row);
      reader.question('What column?', col => {
        col = parseInt(col);
        console.log(row, col);
        callback([row, col]);
      });
    });
  }

  switchPlayers() {
    this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
  }

  makeMove(pos) {
    if (this.board.empty(pos)) {
      this.board.placeMark(pos, this.currentPlayer);
    } else {
      console.log('Invalid move');
      this.switchPlayers();
    }
  }

  gameOver() {
    return this.board.winner(this.currentPlayer);
  }


}

const g = new Game("O", "X");

g.run(() => reader.close());
