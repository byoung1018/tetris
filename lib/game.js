(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.currentPiece = new Tetris.Piece();
    this.level = 1
    this.frozenLocations = new Array(20);
    for (var i = 0; i < this.frozenLocations.length; i++) {
      this.frozenLocations[i] = new Array(10);
    }
    this.falling = setInterval(
      function () {
        this.safeAction("moveDown", this.freezePiece)
      }.bind(this), 1000 / this.level
    );
  };

  Tetris.DIM_X = 800;
  Tetris.DIM_Y = (Tetris.DIM_X/3)*2;
  Tetris.BG_COLOR = "#d3d3d3";
  Tetris.BLOCKSIZE = Tetris.DIM_Y/20;
  Tetris.LEFTBORDER = Tetris.DIM_X/3 - 3;
  Tetris.RIGHTBORDER = ((Tetris.DIM_X/3)*2) + 3;


  Game.prototype.safeAction = function (action, collisionAction) {
    if (this.checkCollision(action)) {
      collisionAction && collisionAction.bind(this)();
    }
    else {
      this.currentPiece[action]();
    }
  };

  Game.prototype.checkCollision = function (action) {
    var collision = false;
    var testPiece = this.currentPiece.clone();
    testPiece[action]();
    testPiece.blockLocations().forEach(function (testLocation) {
      if (testLocation[0] < 0 || testLocation[0] > 9 ||
          testLocation[1] === 20 ||
          this.frozenLocations[testLocation[1]][testLocation[0]]){
        collision = true;
        return;
      }
    }.bind(this));
    return collision;
  };


  Game.prototype.draw = function (ctx) {
    ctx.fillStyle = Tetris.BG_COLOR;
    ctx.fillRect(0, 0, Tetris.DIM_X, Tetris.DIM_Y);
    this.drawLine(ctx, [Tetris.LEFTBORDER, 0],
      [Tetris.LEFTBORDER, Tetris.DIM_Y]);
    this.drawLine(ctx, [Tetris.RIGHTBORDER, 0],
      [Tetris.RIGHTBORDER, Tetris.DIM_Y]);
    this.currentPiece.draw(ctx);
    this.loopAllLocations(function (block, x, y) {
      if (block) {
        ctx.fillRect((x + 10) * Tetris.BLOCKSIZE, y * Tetris.BLOCKSIZE,
          Tetris.BLOCKSIZE, Tetris.BLOCKSIZE);
      }
    });
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
    ctx.lineWidth="6";
    ctx.strokeStyle="black";
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  };

  Game.prototype.step = function () {
    this.currentPiece.moveDown();
  };

  Game.prototype.freezePiece = function () {
    this.currentPiece.blockLocations().forEach(function (location) {
      this.frozenLocations[location[1]][location[0]] = true;
    }.bind(this));
    this.checkLines();
    this.currentPiece = new Tetris.Piece();
  };

  Game.prototype.checkLines = function () {
    this.frozenLocations.forEach(function (row, y) {
      var count = 0;
      row.forEach(function (block, x) {
        if (block) {count++;}
      })
      if (count === 9) {
        this.removeRow(y);
      }
    })
  };

  Game.prototype.removeRow = function (rowNum) {
    for (var y = rowNum; y > 0; y--) {
      for (var x = 0; x < this.frozenLocations[y].length; x++) {
        this.frozenLocations[x][y] = this.frozenLocations[x][y-1];
      }
    }
    for (var x = 0; x < this.frozenLocations[y].length; x++) {
      this.frozenLocations[x][0] = false;
    }
  };

})();
