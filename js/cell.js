/**
 * Created by gleb on 12/12/16.
 */

function Cell () {
    this._size = 5; //default size
    this._alive = Math.random() > 0.7;
    this._shape = "circle";
    this._numOfNeighbors = 0; //alive neighbors
}

Cell.prototype.setState = function (alive) {
    this._alive = alive;
};

Cell.prototype.isAlive = function () {
    return this._alive;
};

Cell.prototype.setNumOfNeighbors = function (numOfNeighbors) {
    if (numOfNeighbors > 8) {
        throw new Error("Number of neighbors can't be more than 8.");
    } else if (numOfNeighbors < 0) {
        throw new Error("Number of neighbors can't be lower than 0.");
    } else {
        this._numOfNeighbors = numOfNeighbors;
    }
};

Cell.prototype.getNumOfNeighbors = function () {
    return this._numOfNeighbors;
};

Cell.prototype.setSize = function (size) {
    if (size < 0) {
        throw new Error("Size can't be less then 0.");
    }
    this._size = size;
};

Cell.prototype.getSize = function () {
  return this._size;
};

Cell.prototype.setShape = function (shape) {
    //check shape
    this._shape = shape;
};

Cell.prototype.getShape = function () {
    return this._shape;
};