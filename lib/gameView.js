(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var GameView = Tetris.GameView = function (ctx) {
    this.$canvas = $("canvas");
    this.ctx = ctx;
    this.game = new Tetris.Game();
    this.game.draw(ctx);
    key("enter", this.start.bind(this));
    // this.$canvas.on("tap", "canvas", this.start.bind(this));
    // $("canvas").on("click", "canvas", function (event) {
    //   console.log((event.currentTarget))
    //   this.start.bind(this)
    // }.bind(this));
    this.$canvas.on("tap", "canvas", this.start.bind(this));

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
    key("enter", function () {this.newGame()}.bind(this));
    for (var keyPressed in GameView.KEYBINDS){
      key.unbind(keyPressed);
    }
    key.unbind("space");
  };

  GameView.prototype.bindSwipeHandlers = function () {
    this.$canvas.off("tap");
    var game = this.game;
    // for (var keyPressed in GameView.SWIPEBINDS){
    //   var action = GameView.KEYBINDS[keyPressed];
    //   this.$canvas.on(keyPressed, "canvas", function () {game.safeAction(action);})
    // }
    this.$canvas = $("canvas");

    this.$canvas.on("swiperight", "canvas", function (event) {alert(event.currentTarget); game.safeAction("moveRight");})
    this.$canvas.on("tap", "canvas", function (event) {alert(event.currentTarget); game.safeAction("rotate");})
    this.$canvas.on("swipeleft", "canvas", function (event) {alert(event.currentTarget); game.safeAction("moveLeft");})
    this.$canvas.on("taphold", "canvas", function (event) {alert(event.currentTarget); game.dropPiece();})
  };

  GameView.prototype.unBindSwipeHandlers = function () {
    for (var keyPressed in GameView.SWIPEBINDS){
      this.$canvas.off(keyPressed);
    }
    this.$canvas.off("taphold");
    this.$canvas.on("tap", "canvas", function () {this.newGame()}.bind(this));
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
