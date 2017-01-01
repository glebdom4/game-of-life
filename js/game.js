/**
 * Created by gleb on 12/24/16.
 */

function Game(logicObj, guiObj) {
    this.conway = logicObj;
    this.drawer = guiObj;
    this._interval = {};
    this._ms = 0;
    this._stepTime = 0;
}

Game.prototype.go = function () {
    this._interval  = setInterval(function () {
        var stepTime = (new Date());
        this.conway.updateCells();
        this.conway.updateStates();
        var numOfLiveCells = this.conway.getNumOfLiveCells();
        var generation = this.conway.getGeneration();
        generation++;
        this.conway.setGeneration(generation);
        this._stepTime= (new Date()) - stepTime;
        document.getElementById('generation').innerHTML = generation.toString();
        document.getElementById('livecells').innerHTML = numOfLiveCells.toString();
        document.getElementById('steptime').innerHTML = this._stepTime.toString();
    }.bind(this), this._ms);
};

Game.prototype.reset = function () {
    clearInterval(this._interval);
    this.drawer.cleanGrid();
    var gridSize = this.conway.getSize();
    var grid = this.conway.getGrid();
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var cell = grid[i][j];
            cell.setState(false);
        }
    }
    var generation = 0;
    var numOfLiveCells = 0;
    this._stepTime = 0;
    this.conway.setGeneration(generation);
    this.conway.setNumOfLiveCells(numOfLiveCells);
    document.getElementById('generation').innerHTML = generation.toString();
    document.getElementById('livecells').innerHTML = numOfLiveCells.toString();
    document.getElementById('steptime').innerHTML = this._stepTime.toString();
};

Game.prototype.registerEvents = function () {
    var game = this;

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            document.getElementById('button_run').value = "Stop";
            clearInterval(interval);
            game.go();
        } else if (e.keyCode === 46) {
            game.reset();
        }
    });

    var canvas = this.drawer.canvas;
    canvas.addEventListener("click", function (e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.pageX - rect.left - window.pageXOffset;
        var mouseY = e.pageY - rect.top - window.pageYOffset;
        var conway = game.conway;
        var pixelSize = conway.getGrid()[0][0].getSize();
        var c = Math.round(mouseX / pixelSize);
        var r = Math.round(mouseY / pixelSize);
        var cell = conway.getGrid()[r][c];
        var alive = !cell.isAlive();
        cell.setState(alive);
        var numOfLiveCells = conway.getNumOfLiveCells();
        if (alive === true) {
            numOfLiveCells++;
        } else {
            numOfLiveCells--;
        }
        conway.setNumOfLiveCells(numOfLiveCells);
        document.getElementById('livecells').innerHTML = numOfLiveCells.toString();
        game.drawer.drawCell(r, c, pixelSize, cell.getShape(), alive);
    });

    var runButton = document.getElementById('button_run');
    runButton.addEventListener("click", function () {
        if (this.value === "Run") {
            this.value = "Stop";
            game.go();
        } else if (this.value === "Stop") {
            this.value = "Run";
            clearInterval(game._interval);
        }
    });

    var stepButton = document.getElementById('button_step');
    stepButton.addEventListener("click", function () {
        var stepTime = (new Date());
        var conway = game.conway;
        conway.updateCells();
        conway.updateStates();
        var generation = conway.getGeneration();
        generation++;
        conway.setGeneration(generation);
        game._stepTime= (new Date()) - stepTime;
        document.getElementById('generation').innerHTML = generation.toString();
        document.getElementById('livecells').innerHTML = conway.getNumOfLiveCells().toString();
        document.getElementById('steptime').innerHTML = game._stepTime.toString();
    });

    var cleanButton = document.getElementById('button_clean');
    cleanButton.addEventListener("click", function () {
        game.reset();
        document.getElementById('button_run').value = "Run";
    });

    var applyButton = document.getElementById('button_apply');
    applyButton.addEventListener("click", function () {
        var gridSize = +document.getElementById('grid_size').value;
        var pixelSize = +document.getElementById('pixel_size').value;
        game._ms = +document.getElementById('interval').value;
        game._stepTime = 0;
        game.conway = new Conway(gridSize, game.drawer);
        var conway = game.conway;
        game.drawer.renderGrid(conway.getGrid(), gridSize, pixelSize);
        document.getElementById('generation').innerHTML = conway.getGeneration().toString();
        document.getElementById('livecells').innerHTML = conway.getNumOfLiveCells().toString();
        document.getElementById('steptime').innerHTML = game._stepTime.toString();
    });
};

Game.prototype.setMs = function (ms) {
    if (ms < 0) {
        throw new Error("Delay(with millisecond resolution) can't be less than 0.");
    }
    this._ms = ms;
};

Game.prototype.getMs = function (ms) {
    return this._ms;
};

Game.prototype.getStepTime = function () {
    return this._stepTime;
};

