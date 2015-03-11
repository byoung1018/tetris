(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var GameView = Tetris.GameView = function (ctx) {
    this.$body = $("body");
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
    this.bindSwipeHandlers();
  };

  GameView.prototype.drawStart = function (ctx) {
    ctx.fillText("Press Enter for New Game", 10.1 * Tetris.BLOCKSIZE, 12 * Tetris.BLOCKSIZE);
  };

  GameView.KEYBINDS = {
                      'a': "moveLeft",
                      "d": "moveRight",
                      "s": "moveDown",
                      "w": "rotate",
                      'left': "moveLeft",
                      "right": "moveRight",
                      "down": "moveDown",
                      "up": "rotate"}
  GameView.SWIPEBINDS = {
                      "tap": "rotate",
                      "swiperight": "moveRight",
                      "swipeleft": "moveLeft"}

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;
    key.unbind("enter");
    for (var key in GameView.KEYBINDS){
      var action = GameView.KEYBINDS[key];
      key(key, function () {game.safeAction(action);});
    }
    key("space", function () {game.dropPiece();});
  };
  GameView.prototype.unBindKeyHandlers = function () {
    key.bind("enter", function () {this.newGame()}.bind(this));
    for (var key in GameView.KEYBINDS){
      key.unbind(key);
    }
    key.unbind("space");
  };

  GameView.prototype.bindSwipeHandlers = function () {
    this.$body.off("tap");
    var game = this.game;
    for (var key in GameView.SWIPEBINDS){
      var action = GameView.KEYBINDS[key];
      this.$body.on(key, function () {game.safeAction(action);})
    }
    this.$body.on("taphold", function () {game.dropPiece();})
  };

  GameView.prototype.unBindSwipeHandlers = function () {
    for (var key in GameView.SWIPEBINDS){
      this.$body.off(key);
    }
    this.$body.off("taphold");
    this.$body.on("tap", function () {this.newGame()}.bind(this));
  };

  GameView.prototype.checkOver = function () {
    if (!this.game.gameOver) {
      return;
    }
    this.stop();
    this.unBindKeyHandlers();
    this.unBindSwipeHandlers();
  };

  GameView.prototype.newGame = function () {
    this.game = new Tetris.Game();
    this.start();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
