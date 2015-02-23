(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var GameView = Tetris.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;

  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.draw(gameView.ctx);
      }, 1000 / Tetris.Game.FPS
    );
    this.bindKeyHandlers();
  };


  GameView.prototype.bindKeyHandlers = function () {
    var currentPiece = this.game.currentPiece;
    key('a', function () {currentPiece.moveLeft()});
    key("d", function () {currentPiece.moveRight()});
    key("s", function () {currentPiece.moveDown()});
    key("w", function () {currentPiece.rotate()});
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
