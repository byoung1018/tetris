(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.currentPiece = new Tetris.Piece();
  };

  Tetris.DIM_X = 800;
  Tetris.DIM_Y = (Tetris.DIM_X/3)*2;
  Tetris.BG_COLOR = "#d3d3d3";
  Tetris.BLOCKSIZE = Tetris.DIM_Y/20;
  Tetris.LEFTBORDER = Tetris.DIM_X/3;
  Tetris.RIGHTBORDER = (Tetris.DIM_X/3)*2;

  Game.prototype.draw = function (ctx) {
    ctx.fillStyle = Tetris.BG_COLOR;
    ctx.fillRect(0, 0, Tetris.DIM_X, Tetris.DIM_Y);
    this.drawLine(ctx, [Tetris.LEFTBORDER, 0],
      [Tetris.LEFTBORDER, Tetris.DIM_Y]);
    this.drawLine(ctx, [Tetris.RIGHTBORDER, 0],
      [Tetris.RIGHTBORDER, Tetris.DIM_Y]);
    this.currentPiece.draw(ctx);
  };

  Game.prototype.drawLine = function (ctx, start, end) {
    ctx.beginPath();
    ctx.lineWidth="6";
    ctx.strokeStyle="black";
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  };


})();
