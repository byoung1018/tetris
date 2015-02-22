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
        gameView.game.draw(gameView.ctx);
    // this.timerId = setInterval(
    //   function () {
    //   }, 1000 / Tetris.Game.FPS
    // );
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
