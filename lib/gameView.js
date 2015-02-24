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
    var game = this.game;
    key('a', function () {game.safeAction("moveLeft")});
    key("d", function () {game.safeAction("moveRight")});
    key("s", function () {game.safeAction("moveDown", game.freezePiece)});
    key("w", function () {game.safeAction("rotate")});
    key("m", function () {
      game.levelUp();
    });
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
