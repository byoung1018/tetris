(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Piece = Tetris.Piece = function () {
    this.location = [5, 5];
    var pieceNumber = Math.floor(Math.random() * 5);
    pieceNumber = 6;
    this.offsets = Piece.OFFSETS[pieceNumber];
    this.currentOffset = 0
  };

  Piece.OFFSETS = [
    [ [[0, 0], [1, 0], [1, 1], [2, 1]],
      [[2, 0], [1, 1], [2, 1], [1, 2]],
    ],
    [ [[1, 0], [1, 1], [0, 1], [2, 0]],
      [[0, 0], [0, 1], [1, 1], [1, 2]]
    ],
    [ [[0, 2], [1, 2], [2, 2], [3, 2]],
      [[2, 0], [2, 1], [2, 2], [2, 3]]
    ],
    [ [[1, 0], [0, 1], [1, 1], [2, 1]],
      [[1, 0], [0, 1], [1, 1], [1, 2]],
      [[0, 1], [2, 1], [1, 1], [1, 2]],
      [[1, 0], [2, 1], [1, 1], [1, 2]]
    ],
    [ [[0, 0], [0, 1], [1, 0], [1, 1]]
    ],
    [ [[0, 1], [1, 1], [2, 2], [2, 1]],
      [[1, 0], [1, 1], [0, 2], [1, 2]],
      [[0, 1], [0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 0], [0, 1], [0, 2]]
    ],
    [ [[0, 1], [1, 1], [2, 0], [2, 1]],
      [[0, 0], [0, 1], [1, 2], [0, 2]],
      [[0, 1], [0, 0], [1, 0], [2, 0]],
      [[0, 0], [1, 0], [1, 1], [1, 2]]
    ],
  ];

  Piece.prototype.rotate = function () {
    this.currentOffset++;
    if (this.currentOffset >= this.offsets.length) {
      this.currentOffset = 0;
    }
  };

  Piece.prototype.move = function (direction) {
    this.location[0] += direction
  };

  Piece.prototype.moveLeft = function () {
    this.move(-1);
  };

  Piece.prototype.moveRight = function () {
    this.move(1);
  };

  Piece.prototype.draw = function (ctx) {
    this.offsets[this.currentOffset].forEach(function (offset) {
      this.drawBlock(ctx, offset);
    }.bind(this))
  };

  Piece.prototype.drawBlock = function (ctx, offset) {
    var startX = (this.location[0] + offset[0]) * Tetris.BLOCKSIZE;
    var startY = (this.location[1] + offset[1]) * Tetris.BLOCKSIZE;
    ctx.fillStyle = "red";
    ctx.fillRect(startX, startY,
        Tetris.BLOCKSIZE, Tetris.BLOCKSIZE);
  };

})();
