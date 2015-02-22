(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {

  };

  Tetris.DIM_X = 800;
  Tetris.DIM_Y = (Tetris.DIM_X/3)*2;
  Tetris.BG_COLOR = "#d3d3d3";
  Tetris.BLOCKSIZE = Math.floor(Tetris.DIM_Y/20);

  Game.prototype.draw = function (ctx) {
    ctx.fillStyle = Tetris.BG_COLOR;
    ctx.fillRect(0, 0, Tetris.DIM_X, Tetris.DIM_Y);
  };

})();
