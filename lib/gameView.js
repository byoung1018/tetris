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
    this.$body.on("tap", this.start.bind(this));

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
                      "up": "rotate",
                      "down": "moveDown",
                      }
  GameView.SWIPEBINDS = {
                      "tap": "rotate",
                      "swiperight": "moveRight",
                      "swipeleft": "moveLeft"}

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;
    key.unbind("enter");
    for (var keyPressed in GameView.KEYBINDS){
      var action = GameView.KEYBINDS[keyPressed];
      key(keyPressed, function (_event, key) {
        game.safeAction(GameView.KEYBINDS[key.shortcut]);
        });
    }
    key("space", function () {game.dropPiece();});
  };
  GameView.prototype.unBindKeyHandlers = function () {
    key.bind("enter", function () {this.newGame()}.bind(this));
    for (var keyPressed in GameView.KEYBINDS){
      key.unbind(keyPressed);
    }
    key.unbind("space");
  };

  GameView.prototype.bindSwipeHandlers = function () {
    this.$body.off("tap");
    var game = this.game;
    // for (var keyPressed in GameView.SWIPEBINDS){
    //   var action = GameView.KEYBINDS[keyPressed];
    //   this.$body.on(keyPressed, function () {game.safeAction(action);})
    //   this.$body.on(keyPressed, function () {game.safeAction(action);})
    // }

    this.$body.on("taphold", function () {game.dropPiece();})
  };

  GameView.prototype.unBindSwipeHandlers = function () {
    for (var keyPressed in GameView.SWIPEBINDS){
      this.$body.off(keyPressed);
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
