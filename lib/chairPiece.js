(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var chairPiece = Tetris.chairPiece = function(game){
    this.positionsToAddToCenter = [[1,-1],[-1,1]];
    this.nextPositionsToAdd = [[-1,-1], [-1,-1]];

    var options = {"center": [0,1], "pos": [[0,1],[1,0],[1,1],[0,2]], "vel": [1,0],
                   "color": "red", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.chairPiece, Tetris.Piece);

  chairPiece.prototype.allPositionsWhenRotated = function () {
    var allPositions = [this.center];
    allPositions.push(this.center.addAnotherArray([1,0]));

    allPositions.push(allPositions[0].addAnotherArray(this.nextPositionsToAdd[0]));
    allPositions.push(allPositions[1].addAnotherArray(this.nextPositionsToAdd[1]));
    return allPositions;
  };

  chairPiece.prototype.rotate = function () {
    var nextClone = this.nextPositionsToAdd.clone();
    this.nextPositionsToAdd = this.positionsToAddToCenter;
    this.positionsToAddToCenter = nextClone;
  };
})();
