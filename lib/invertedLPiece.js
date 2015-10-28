(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var invertedLPiece = Tetris.invertedLPiece = function(game){
    var options = {"pos": [[0,0],[0,1],[0,2],[1,2]], "vel": [1,0],
                   "color": "pink", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.invertedLPiece, Tetris.Piece);

})();
