(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var GameView = Tetris.GameView = function (ctx) {
    this.ctx = ctx;
    this.game = new Tetris.Game();
    this.game.draw(ctx);
    key("enter", this.start.bind(this));
  };

  GameView.prototype.start = function () {
    this.timerId = setInterval(
      function () {
        this.game.draw(this.ctx);
        this.checkOver();
      }.bind(this), 1000 / Tetris.Game.FPS
    );
    this.game.startFalling();
    this.bindKeyHandlers();
  };

  GameView.prototype.drawStart = function (ctx) {
    ctx.fillText("Press Enter for New Game", 10.1 * Tetris.BLOCKSIZE, 12 * Tetris.BLOCKSIZE);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;
    key.unbind("enter");
    key('a', function () {game.safeAction("moveLeft");});
    key("d", function () {game.safeAction("moveRight");});
    key("s", function () {game.safeAction("moveDown");});
    key("w", function () {game.safeAction("rotate");});
    key('left', function () {game.safeAction("moveLeft");});
    key("right", function () {game.safeAction("moveRight");});
    key("down", function () {game.safeAction("moveDown");});
    key("up", function () {game.safeAction("rotate");});
    key("space", function () {game.dropPiece();});
  };

  GameView.prototype.bindSwipes = function () {
    var body = $("body");
    var game = this.game;
    body.on("swipeleft", game.safeAction("moveLeft"));
    body.on("swipeup", game.safeAction("moveRight");
    body.on("swipedown", game.safeAction("moveDown");
    body.on("swiperight", game.safeAction("rotate");
  };

  GameView.prototype.checkOver = function () {
    if (!this.game.gameOver) {
      return;
    }
    this.stop();
    key.unbind('a');
    key.unbind("d");
    key.unbind("s");
    key.unbind("w");
    key.unbind("space");
    key("enter", function () {this.newGame()}.bind(this));
  };

  GameView.prototype.newGame = function () {
    this.game = new Tetris.Game();
    this.start();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
