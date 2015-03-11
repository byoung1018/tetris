(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Util = Tetris.Util = {};

  Util.drawSquare = function (ctx, pos, color) {
    ctx.fillStyle = color;
    ctx.fillRect((pos[0] + 10) * Tetris.BLOCKSIZE, pos[1] * Tetris.BLOCKSIZE,
                  Tetris.BLOCKSIZE, Tetris.BLOCKSIZE);
    ctx.beginPath()
    ctx.lineWidth = "2";
    ctx.strokeStyle = "grey";
    ctx.rect((pos[0] + 10) * Tetris.BLOCKSIZE, pos[1] * Tetris.BLOCKSIZE,
              Tetris.BLOCKSIZE, Tetris.BLOCKSIZE);
    ctx.stroke();
  };
})();
