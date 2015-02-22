(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Piece = Tetris.Piece = function (location, offsets) {
    this.location = location;
    this.offsets = offsets;
  };


  Piece.prototype.draw = function (ctx) {
    this.offsets.forEach(function (offset) {
      this.drawBlock(ctx, offset);
    }.bind(this))
  };

  Piece.prototype.drawBlock = function (ctx, offset) {
    var startX = (this.location[0] + offset[0]) * Tetris.BLOCKSIZE;
    var startY = (this.location[1] + offset[1]) * Tetris.BLOCKSIZE;
    debugger
    ctx.fillStyle = "red";
    ctx.fillRect(startX, startY,
        Tetris.BLOCKSIZE, Tetris.BLOCKSIZE);
  };

})();
