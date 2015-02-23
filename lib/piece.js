(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Piece = Tetris.Piece = function (options) {
    if (!options) {options = {}};
    this.location = options.location || [3, 0];
    var pieceNumber = Math.floor(Math.random() * 5);
    this.offsets = options.offsets || Piece.OFFSETS[pieceNumber];
    this.currentOffset = options.currentOffset || 0;

  };

  Piece.prototype.clone = function () {
    return new Piece({"location": this.location.slice(0),
                      "offsets": this.offsets.slice(0),
                      "currentOffset": this.currentOffset
                    });
  };

  Piece.prototype.blockLocations = function () {
    var locations = [];
    this.offsets[this.currentOffset].forEach(function (offset) {
      locations.push([this.location[0] + offset[0],
                      this.location[1] + offset[1]])
    }.bind(this));
    return locations;
  };

  Piece.OFFSETS = [
    [ [[0, 0], [1, 0], [1, 1], [2, 1]],
      [[2, 0], [1, 1], [2, 1], [1, 2]],
    ],
    [ [[1, 0], [1, 1], [0, 1], [2, 0]],
      [[0, 0], [0, 1], [1, 1], [1, 2]]
    ],
    [ [[0, 0], [1, 0], [2, 0], [3, 0]],
      [[2, -2], [2, -1], [2, 0], [2, 1]]
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

  Piece.prototype.move = function (displace) {
    this.location[0] += displace[0];
    this.location[1] += displace[1];
  };

  Piece.prototype.moveLeft = function () {
    this.move([-1, 0]);
  };

  Piece.prototype.moveRight = function () {
    this.move([1, 0]);
  };

  Piece.prototype.moveDown = function () {
    this.move([0, 1]);
  };

  Piece.prototype.draw = function (ctx) {
    this.offsets[this.currentOffset].forEach(function (offset) {
      this.drawBlock(ctx, offset);
    }.bind(this))
  };

  Piece.prototype.drawBlock = function (ctx, offset) {
    var startX = ((this.location[0] + offset[0] + 10) * Tetris.BLOCKSIZE) ;
    var startY = (this.location[1] + offset[1]) * Tetris.BLOCKSIZE;
    ctx.fillStyle = "red";
    ctx.fillRect(startX, startY,
        Tetris.BLOCKSIZE, Tetris.BLOCKSIZE);
  };



})();
