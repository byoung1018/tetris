(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.currentPiece = new Tetris.Piece();
    this.level = 1
    this.frozenPieces = [];
    this.falling = setInterval(
      function () {
        this.checkCollision("moveDown");
        this.currentPiece.moveDown();
      }.bind(this), 1000 / this.level
    );
  };

  Tetris.DIM_X = 800;
  Tetris.DIM_Y = (Tetris.DIM_X/3)*2;
  Tetris.BG_COLOR = "#d3d3d3";
  Tetris.BLOCKSIZE = Tetris.DIM_Y/20;
  Tetris.LEFTBORDER = Tetris.DIM_X/3 - 3;
  Tetris.RIGHTBORDER = ((Tetris.DIM_X/3)*2) + 3;

  Game.prototype.checkCollision = function (action) {
    var collision = false;
    var testPiece = this.currentPiece.clone();
    testPiece[action]();
    testPiece.blockLocations().forEach(function (testLocation) {
      if (testLocation[1] === 20) {
        collision = true
        return;
      }
      this.frozenPieces.forEach(function (frozenPiece) {
        frozenPiece.blockLocations().forEach(function (existingLocation) {
          if (testLocation[0] === existingLocation[0] &&
              testLocation[1] === existingLocation[1]) {
            return;
          }
        })
      })
    }.bind(this));
    return collision;
  };


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

  Game.prototype.step = function () {
    this.currentPiece.moveDown();
  };


})();
