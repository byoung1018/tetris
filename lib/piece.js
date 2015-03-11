(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Piece = Tetris.Piece = function (options) {
    if (!options) {options = {}};
    this.location = options.location || [12.5, 3];
    var pieceNumber = Math.floor(Math.random() * 7);
    this.offsets = options.offsets || Piece.PIECES[pieceNumber].offsets;
    this.color = options.color || Piece.PIECES[pieceNumber].color;
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
  Piece.PIECES = [
        {"offsets": [ [[1, 0], [2, 0], [2, 1], [3, 1]],
                       [[3, 0], [2, 1], [3, 1], [2, 2]],
                     ],
          "color": "red"
        },
        {"offsets": [ [[2, 0], [2, 1], [1, 1], [3, 0]],
                      [[1, 0], [1, 1], [2, 1], [2, 2]]
                    ],
         "color": "green"
        },

        {"offsets": [ [[2, 0], [1, 1], [2, 1], [3, 1]],
                      [[2, 0], [1, 1], [2, 1], [2, 2]],
                      [[1, 1], [3, 1], [2, 1], [2, 2]],
                      [[2, 0], [3, 1], [2, 1], [2, 2]]
                    ],
         "color": "purple"
        },
        {"offsets": [ [[0, 0], [1, 0], [2, 0], [3, 0]],
                      [[2, -2], [2, -1], [2, 0], [2, 1]]
                    ],
        "color": "cyan"
        },

        {"offsets": [ [[1, 0], [1, 1], [2, 0], [2, 1]]
          ],
          "color": "yellow"
        },
        {"offsets": [ [[1, 0], [2, 0], [3, 1], [3, 0]],
                      [[2, -1], [2, 0], [1, 1], [2, 1]],
                      [[1, 0], [1, 1], [2, 1], [3, 1]],
                      [[1, -1], [2, -1], [1, 0], [1, 1]]
                    ],
         "color": "blue"
        },
        {"offsets": [ [[1, 1], [2, 1], [3, 0], [3, 1]],
                      [[1, 0], [1, 1], [2, 2], [1, 2]],
                      [[1, 1], [1, 0], [2, 0], [3, 0]],
                      [[1, 0], [2, 0], [2, 1], [2, 2]]
                    ],
         "color": "orange"
        },
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
      var pos = [this.location[0] + offset[0], this.location[1] + offset[1]];
      Tetris.Util.drawSquare(ctx, pos, this.color)
    }.bind(this))
  };

})();
