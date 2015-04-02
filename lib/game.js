(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.currentPiece = new Tetris.Piece({"location": [3, 0]});
    this.nextPiece = new Tetris.Piece();
    this.level = 0
    this.frozenLocations = new Array(20);
    this.goal = 10
    for (var i = 0; i < this.frozenLocations.length; i++) {
      this.frozenLocations[i] = new Array(10);
    }
    this.started = false;
  };

  Game.LEVELS = [1, 1.25, 1.5, 2, 2.66, 3.8, 5.25,
                 6.33, 9, 12.66, 18, 25, 38, 57, 76]
  Tetris.DIM_X = 800;
  Tetris.DIM_Y = (((Tetris.DIM_X/3)*2) + 6);

  Tetris.BG_COLOR = "black";
  Tetris.WRITE_COLOR = "#d3d3d3";
  Tetris.BLOCKSIZE = ((Tetris.DIM_Y - 6)/20);


  Game.prototype.startFalling = function () {
    this.started = true;
    this.falling = setInterval(
      function () {
        this.step()
      }.bind(this), 1000 / Game.LEVELS[this.level]
    );
  };

  Game.prototype.safeAction = function (action, collisionAction) {
    if (this.checkCollision(action)) {
      collisionAction && collisionAction.bind(this)();
    }
    else {
      action && this.currentPiece[action]();
    }
  };

  Game.prototype.checkCollision = function (action) {
    var collision = false;
    var testPiece = this.currentPiece.clone();
    action && testPiece[action]();
    testPiece.blockLocations().forEach(function (testLocation) {
      if (testLocation[0] < 0 || testLocation[0] > 9 ||
          testLocation[1] >= 20 || testLocation[1] < 0 ||
          this.frozenLocations[testLocation[1]][testLocation[0]]){
        collision = true;
        return;
      }
    }.bind(this));
    return collision;
  };


  Game.prototype.draw = function (ctx) {
    if (this.gameOver) {
      this.drawGameOver(ctx);
      return;
    }
    this.drawBackground(ctx);
    this.drawWell(ctx);
    this.drawNextPiece(ctx);
    this.drawGoal(ctx);
    this.drawLevel(ctx);
    this.drawInstructions(ctx);
    if (!this.started) {this.drawStart(ctx);}
    else {this.currentPiece.draw(ctx);}
    this.loopAllLocations(function (color, x, y) {
      if (color) {
        Tetris.Util.drawSquare(ctx, [x, y], color)
      }
    });
  };

  Game.prototype.drawStart = function (ctx) {
    ctx.fillStyle = Tetris.WRITE_COLOR
    ctx.font="24px Georgia";
    ctx.fillText("Press Enter for New Game", 10 * Tetris.BLOCKSIZE, 9 * Tetris.BLOCKSIZE, 10 * Tetris.BLOCKSIZE);
  };

  Game.prototype.drawTest = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.lineTo(20,100);
    ctx.lineTo(70,100);
    ctx.lineTo(70,20);
    ctx.lineTo(20,20);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.fillStyle = '#8ED6FF';
    ctx.fill();
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  };

  Game.prototype.drawInstructions = function (ctx) {
    ctx.fillStyle = Tetris.WRITE_COLOR
    ctx.font="24px Georgia";
    var instructions = "w - Rotate Piece"
    var maxLength = 9   * Tetris.BLOCKSIZE;
    ctx.fillText("w - Rotate Piece", 0, 2 * Tetris.BLOCKSIZE, maxLength);
    ctx.fillText("a - Move Piece Left", 0, 3 * Tetris.BLOCKSIZE, maxLength);
    ctx.fillText("d - Move Piece Right", 0, 4 * Tetris.BLOCKSIZE, maxLength);
    ctx.fillText("s - Move Piece Down", 0, 5 * Tetris.BLOCKSIZE, maxLength);
    ctx.fillText("space - Drop Piece", 0, 6 * Tetris.BLOCKSIZE, maxLength);
  };

  Game.prototype.drawNextPiece = function (ctx) {
    ctx.fillStyle = Tetris.WRITE_COLOR
    ctx.font="20px Georgia";
    ctx.fillText("Next Piece",22 * Tetris.BLOCKSIZE, 1 * Tetris.BLOCKSIZE);
    ctx.beginPath()
    ctx.lineWidth = "6";
    ctx.strokeStyle = Tetris.WRITE_COLOR;
    ctx.rect(22 * Tetris.BLOCKSIZE, 2 * Tetris.BLOCKSIZE,
      5 * Tetris.BLOCKSIZE, 4 * Tetris.BLOCKSIZE);
    ctx.stroke();
    this.nextPiece.draw(ctx);
    };

  Game.prototype.dropPiece = function () {
    while (!this.checkCollision("moveDown")) {
      this.currentPiece.moveDown();
    }
    this.step();
  };

  Game.prototype.drawGoal = function (ctx) {
    ctx.fillStyle = Tetris.WRITE_COLOR
    ctx.font="20px Georgia";
    ctx.fillText("Goal",21 * Tetris.BLOCKSIZE, 8 * Tetris.BLOCKSIZE);
    ctx.beginPath()
    ctx.lineWidth = "6";
    ctx.strokeStyle = Tetris.WRITE_COLOR;
    ctx.rect(21 * Tetris.BLOCKSIZE, 9 * Tetris.BLOCKSIZE,
              3 * Tetris.BLOCKSIZE, 3 * Tetris.BLOCKSIZE);
    ctx.stroke();
    ctx.font="40px Georgia";
    ctx.fillText(this.goal, 21.5 * Tetris.BLOCKSIZE, 11 * Tetris.BLOCKSIZE);
  };

  Game.prototype.drawLevel = function (ctx) {
    ctx.fillStyle = Tetris.WRITE_COLOR
    ctx.font="20px Georgia";
    ctx.fillText("Level",25 * Tetris.BLOCKSIZE, 8 * Tetris.BLOCKSIZE);
    ctx.beginPath()
    ctx.lineWidth = "6";
    ctx.strokeStyle = Tetris.WRITE_COLOR;
    ctx.rect(25 * Tetris.BLOCKSIZE, 9 * Tetris.BLOCKSIZE,
              3 * Tetris.BLOCKSIZE, 3 * Tetris.BLOCKSIZE);
    ctx.stroke();
    ctx.font="40px Georgia";
    ctx.fillText(this.level + 1, 26 * Tetris.BLOCKSIZE, 11 * Tetris.BLOCKSIZE);
  };

  Game.prototype.drawBackground = function (ctx) {
    ctx.clearRect (0, 0, Tetris.DIM_X, Tetris.DIM_Y);
  };

  Game.prototype.drawWell = function (ctx) {
    var left = (Tetris.DIM_X/3 - 3);
    var right = ((Tetris.DIM_X/3)*2) + 3;
    this.drawLine(ctx, [left, 0],
      [left, Tetris.DIM_Y]);
    this.drawLine(ctx, [right, 0],
      [right, Tetris.DIM_Y]);
    this.drawLine(ctx, [left, Tetris.DIM_Y - 3],
      [right, Tetris.DIM_Y - 3]);
  };

  Game.prototype.loopAllLocations = function (func) {
    this.frozenLocations.forEach(function (row, y) {
      row.forEach(function (block, x) {
        func(block, x, y);
      });
    });
  };

  Game.prototype.drawLine = function (ctx, start, end) {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = Tetris.WRITE_COLOR;
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  };

  Game.prototype.step = function () {
    this.safeAction("moveDown", this.freezePiece)
  };

  Game.prototype.freezePiece = function () {
    this.currentPiece.blockLocations().forEach(function (location) {
      this.frozenLocations[location[1]][location[0]] = this.currentPiece.color;
    }.bind(this));
    this.checkLines();
    this.currentPiece = this.nextPiece;
    this.nextPiece = new Tetris.Piece();
    this.currentPiece.location = [3, 0];
    this.safeAction(undefined, this.lost);
  };

  Game.prototype.lost = function () {
    this.gameOver = true;
    clearInterval(this.falling);
  };

  Game.prototype.drawGameOver = function (ctx) {
    this.currentPiece.draw(ctx);
    ctx.fillStyle = Tetris.WRITE_COLOR
    ctx.font="57px Georgia";
    ctx.fillText("Game Over", 10 * Tetris.BLOCKSIZE, 10 * Tetris.BLOCKSIZE);
    ctx.font="24px Georgia";
    ctx.fillText("Press Enter for New Game", 10 * Tetris.BLOCKSIZE, 12 * Tetris.BLOCKSIZE);
  };

  Game.prototype.checkLines = function () {
    this.frozenLocations.forEach(function (row, y) {
      var count = 0;
      row.forEach(function (block, x) {

        if (block) {count++;}
      })
      if (count === 10) {
        this.removeRow(y);
      }
    }.bind(this))
  };

  Game.prototype.removeRow = function (rowNum) {
    for (var y = rowNum; y > 0; y--) {
      for (var x = 0; x < this.frozenLocations[y].length; x++) {
        this.frozenLocations[y][x] = this.frozenLocations[y-1][x];
      }
    }
    for (var x = 0; x < this.frozenLocations[y].length; x++) {
      this.frozenLocations[0][x] = "";
    }
    this.linesCleared++;
    this.goal--;
    if (this.goal <= 0) {this.levelUp();}
  };

  Game.prototype.levelUp = function () {
    console.log("here");
    clearInterval(this.falling);
    this.level++;
    this.goal = 10;
    this.startFalling();
  };
})();
