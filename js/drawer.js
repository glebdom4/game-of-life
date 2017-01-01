/**
 * Created by gleb on 12/24/16.
 */

function Drawer (canvas) {
    this.canvas = canvas;
    this._context = canvas.getContext("2d");
    this._realGridSize = 0;
}

Drawer.prototype.drawCell = function (r, c, pixelSize, shape, alive) {
    if (shape === "circle") {
        this._context.beginPath();
        this._context.arc(c * pixelSize, r * pixelSize, 0.5 * pixelSize, 0, 2 * Math.PI);
        this._context.fillStyle = alive ? 'rgb(204,204,159)' : 'rgb(51,51,45)';
        this._context.fill();
    } else if (shape === "square") {
        this._context.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
    } else {
        throw new Error("Unknown shape.");
    }
};

Drawer.prototype.renderGrid = function (grid, gridSize, pixelSize) {
    this._realGridSize = gridSize * pixelSize;
    this.canvas.width  = this._realGridSize;
    this.canvas.height = this._realGridSize;
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                var cell = grid[i][j];
                cell.setSize(pixelSize);
                this.drawCell(i, j, pixelSize, cell.getShape(), cell.isAlive());
            }
        }
};

Drawer.prototype.cleanGrid = function () {
    this._context.clearRect(0, 0, this._realGridSize, this._realGridSize);
};