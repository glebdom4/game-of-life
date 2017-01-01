/**
 * Created by gleb on 12/12/16.
 */

window.onload = function() {
    var gridSize = +document.getElementById('grid_size').value;
    var pixelSize = +document.getElementById('pixel_size').value;
    var ms = +document.getElementById('interval').value;

    var canvas = document.getElementById('grid');
    var drawer = new Drawer(canvas);
    var conway = new Conway(gridSize, drawer);
    drawer.renderGrid(conway.getGrid(), gridSize, pixelSize);
    var game = new Game(conway, drawer);
    document.getElementById('generation').innerHTML = conway.getGeneration().toString();
    document.getElementById('livecells').innerHTML = conway.getNumOfLiveCells().toString();
    document.getElementById('steptime').innerHTML = game.getStepTime().toString();
    game.setMs(ms);
    game.registerEvents();
};

