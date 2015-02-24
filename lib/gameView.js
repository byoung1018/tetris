(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var GameView = Tetris.GameView = function (ctx) {
    this.ctx = ctx;
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
    key('a', function () {game.safeAction("moveLeft");});
    key("d", function () {game.safeAction("moveRight");});
    key("s", function () {game.safeAction("moveDown");});
    key("w", function () {game.safeAction("rotate");});
    key("space", function () {game.dropPiece();});
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
