/**
 * Created by gleb on 12/12/16.
 */

function Conway (size, drawer) {
    this._size = size;
    this._generation = 0;
    this._numOfLiveCells = 0;
    this._grid = this.generateGrid(size);
    this._directions = [ [-1,-1], [-1, 0], [-1, 1], [0,-1], [0, 1], [1,-1], [1, 0], [1, 1] ];
    this._drawer = drawer;
}

Conway.prototype.setSize = function (size) {
    if (size < 0) {
        throw new Error("Size of a ground can't be lower than 0.");
    }
  this._size = size;
};

Conway.prototype.getSize = function () {
  return this._size;
};

Conway.prototype.setGeneration = function (generation) {
    if (generation < 0) {
        throw new Error("Generation number can't be lower than 0.");
    }
    this._generation = generation;
};

Conway.prototype.getGeneration = function () {
  return this._generation;
};

Conway.prototype.setNumOfLiveCells = function (numOfLiveCells) {
    if (numOfLiveCells < 0) {
        throw new Error("Number of live cells can't be lower than 0.");
    }
    this._numOfLiveCells = numOfLiveCells;
};

Conway.prototype.getNumOfLiveCells = function () {
    return this._numOfLiveCells;
};

Conway.prototype.generateGrid = function (size) {
    var grid = [];
    for (var i = 0; i < size; i++) {
        var row = [];
        for (var j = 0; j < size; j++) {
            var cell = new Cell();
            if (cell.isAlive()) {
                this._numOfLiveCells++;
            }
            row.push(cell);
        }
        grid.push(row);
    }
    return grid;
};

Conway.prototype.getGrid = function () {
  return this._grid;
};

Conway.prototype.isUnderpopulated = function (r, c) {
    var cell = this._grid[r][c];
    return cell.getNumOfNeighbors() < 2;
};

Conway.prototype.isOverpopulated = function (r, c) {
    var cell = this._grid[r][c];
    return cell.getNumOfNeighbors() > 3;
};

Conway.prototype.isResurrectable = function (r, c) {
    var cell = this._grid[r][c];
    return !cell.isAlive() && cell.getNumOfNeighbors() === 3;
};

Conway.prototype.isInBounds = function (r, c) {
    return r >= 0 && r < this._size && c >= 0 && c < this._size;
};

Conway.prototype.updateNumOfNeighbors = function (r, c) {
    var cell = this._grid[r][c];
    var numOfNeighbors = 0;
    cell.setNumOfNeighbors(0);
    for (var i = 0; i < this._directions.length; i++) {
        var direction = this._directions[i];
        var dr = direction[0];
        var dc = direction[1];
        if (this.isInBounds(r + dr, c + dc)) {
            var neighbor = this._grid[r + dr][c + dc];
            if (neighbor.isAlive()) {
                numOfNeighbors++;
                cell.setNumOfNeighbors(numOfNeighbors);
            }
        }
    }
};

Conway.prototype.updateCells = function () {
    for (var i = 0; i < this._size; i++){
        for (var j = 0; j < this._size; j++) {
            this.updateNumOfNeighbors(i,j);
        }
    }
};

Conway.prototype.updateStateForCell = function (r, c) {
    var cell = this._grid[r][c];
    var alive;
    if (cell.isAlive() && (this.isUnderpopulated(r,c) || this.isOverpopulated(r,c))) {
        alive = false;
        cell.setState(alive);
        this._numOfLiveCells--;
        this._drawer.drawCell(r, c, cell.getSize(), cell.getShape(), alive);
    } else if (this.isResurrectable(r,c)) {
        alive = true;
        cell.setState(alive);
        this._numOfLiveCells++;
        this._drawer.drawCell(r, c, cell.getSize(), cell.getShape(), alive);
    }
};

Conway.prototype.updateStates = function () {
    for (var i = 0; i < this._size; i++){
        for (var j = 0; j < this._size; j++) {
            this.updateStateForCell(i,j);
        }
    }
};