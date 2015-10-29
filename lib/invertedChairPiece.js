(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var invertedChairPiece = Tetris.invertedChairPiece = function(game){
    this.nextPos = [-1,0];
    this.positionsToAddToCenter = [[0,1],[0,-1],[1,0]];

    var options = {"center": [0,1], "pos": [[0,0],[0,1],[1,1],[2,1]], "vel": [1,0],
                   "color": "green", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.invertedChairPiece, Tetris.Piece);

})();
