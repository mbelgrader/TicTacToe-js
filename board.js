class Board {
  constructor() {
    this.grid = this.generateGrid();

  }

  generateGrid() {
    let rows = [];
    for (let rowCount=0; rowCount < 3; rowCount++) {
        rows[rowCount] = [];
        for (let colCount=0; colCount < 3; colCount++) {
            rows[rowCount][colCount] = " ";
        }
    }
    return rows;
  }

  won(mark) {
    return this.checkRows(mark) ||
           this.checkCols(mark) ||
           this.checkDiags(mark);
  }

  winner(mark) {
    return this.won(mark) === mark;
  }

  transpose(array) {
    var newArray = array[0].map(function(col, i) {
      return array.map(function(row) {
        return row[i];
      });
    });
    return newArray;
  }

  empty(pos) {
    let x = pos[0];
    let y = pos[1];
    return this.grid[x][y] === ' ';
  }

  placeMark(pos, mark) {
    let x = pos[0];
    let y = pos[1];
    if (this.empty(pos)) { this.grid[x][y] = mark; }
  }

  checkRows(mark) {
    this.grid.forEach(function(row) {
      if (row[0] === mark &&
          row[1] === mark &&
          row[2] === mark) { return true; }
    });
    return false;
  }

  checkCols(mark) {
    const cols = this.transpose(this.grid);
    cols.forEach(function(row) {
      if (row[0] === mark &&
          row[1] === mark &&
          row[2] === mark) { return true; }
    });
    return false;
  }

  checkDiags(mark) {
    if (this.grid[0][0] === mark &&
        this.grid[1][1] === mark &&
        this.gird[2][2] === mark) { return true; }
    else if (this.grid[2][0] === mark &&
             this.grid[1][1] === mark &&
             this.grid[0][2] === mark) { return true; }
    else { return false; }
  }

  toString() {
    this.grid.forEach(function(row) {
      console.log(` ${row[0]} | ${row[1]} | ${row[2]} `);
      console.log('-----------');
    });
  }
}

module.exports = Board;
