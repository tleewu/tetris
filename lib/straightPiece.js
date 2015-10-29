(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var straightPiece = Tetris.straightPiece = function(game){
    this.positionsToAddToCenter = [[0,-1], [0,1], [0,2]];

    var options = {"center": [0,1], "pos": [[0,0],[0,1],[0,2],[0,3]], "vel": [1,0],
                   "color": "blue", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.straightPiece, Tetris.Piece);

  straightPiece.prototype.allPositionsWhenRotated = function () {
    var updatePositions = [];
    var allPositions = [this.center];
    var that = this;

    for (var i = 0; i < this.positionsToAddToCenter.length; i++) {
      var position = this.positionsToAddToCenter.slice(0)[i];
      updatePositions.push([position[1],position[0]]);
    }

    updatePositions.map (function (newPosition) {
      allPositions.push(that.center.addAnotherArray(newPosition));
    });

    return allPositions;
  };

  straightPiece.prototype.rotate = function () {
    for (var i = 0; i < this.positionsToAddToCenter.length; i++) {
      var position = this.positionsToAddToCenter[i];
      this.positionsToAddToCenter[i]=[position[1],position[0]];
    }
  };
})();
