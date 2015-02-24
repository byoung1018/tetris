(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var GameView = Tetris.GameView = function (ctx) {
    this.ctx = ctx
    this.newGame();
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.draw(gameView.ctx);
        this.checkOver();
      }.bind(this), 1000 / Tetris.Game.FPS
    );
    this.bindKeyHandlers();
  };



  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;
    key('a', game.safeAction.bind(game, "moveLeft"));
    key("d", game.safeAction.bind(game, "moveRight"));
    key("s", game.safeAction.bind(game, "moveDown"));
    key("w", game.safeAction.bind(game, "rotate"));
    key("space", game.dropPiece.bind(game));
  };

  GameView.prototype.checkOver = function () {
    if (!this.game.gameOver) {
      return;
    }
    console.log("here");
    this.stop();
    key.unbind('a');
    key.unbind("d");
    key.unbind("s");
    key.unbind("w");
    key.unbind("space");
    key("enter", function () {this.newGame()}.bind(this));
    //clear out all pieces
  };

  GameView.prototype.newGame = function () {
    this.game = new Tetris.Game();;
    this.start();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
