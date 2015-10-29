(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var tPiece = Tetris.tPiece = function(game){
    this.nextPos = [-1,0];
    this.positionsToAddToCenter = [[0,1],[1,0],[0,-1]];
    var options = {"center": [0,1], "pos": [[0,0],[0,1],[0,2],[1,1]], "vel": [1,0],
                   "color": "purple", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.tPiece, Tetris.Piece);


  tPiece.prototype.allPositionsWhenRotated = function () {
    var allPositions = [this.center];
    var clonedPositionsToAdd = this.positionsToAddToCenter.clone();
    var clonedNextPos = this.nextPos.slice(0);
    clonedPositionsToAdd.shift();
    clonedPositionsToAdd.push(clonedNextPos);
    var that = this;

    clonedPositionsToAdd.map(function (position) {
      allPositions.push(that.center.addAnotherArray(position));
    });

    return allPositions;
  };

  tPiece.prototype.rotate = function () {
    var clonedNextPos = this.nextPos.slice(0);
    this.nextPos = this.positionsToAddToCenter.shift();
    this.positionsToAddToCenter.push(clonedNextPos);
  };
})();
