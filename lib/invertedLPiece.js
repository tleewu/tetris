(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var invertedLPiece = Tetris.invertedLPiece = function(game){
    var options = {"pos": [[0,0],[30,0],[60,0],[60,30]], "vel": [0,15],
                   "color": "pink", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.invertedLPiece, Tetris.Piece);

})();
