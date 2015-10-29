(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var invertedChairPiece = Tetris.invertedChairPiece = function(game){
    this.positionsToAddToCenter = [[1,1],[-1,-1]];
    this.nextPositionsToAdd = [[-1,1], [-1,1]];

    var options = {"center": [0,1], "pos": [[0,1],[1,0],[0,2], [1,1]], "vel": [1,0],
                   "color": "green", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.invertedChairPiece, Tetris.Piece);

  invertedChairPiece.prototype.allPositionsWhenRotated = function () {
    var allPositions = [this.center];
    allPositions.push(this.center.addAnotherArray([1,0]));

    allPositions.push(allPositions[0].addAnotherArray(this.nextPositionsToAdd[0]));
    allPositions.push(allPositions[1].addAnotherArray(this.nextPositionsToAdd[1]));
    return allPositions;
  };

  invertedChairPiece.prototype.rotate = function () {
    var nextClone = this.nextPositionsToAdd.clone();
    this.nextPositionsToAdd = this.positionsToAddToCenter;
    this.positionsToAddToCenter = nextClone;
  };

})();
