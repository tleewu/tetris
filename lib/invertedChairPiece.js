(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var invertedChairPiece = Tetris.invertedChairPiece = function(game){
    var options = {"pos": [[0,0],[30,0],[30,30],[60,30]], "vel": [0,15],
                   "color": "green", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.invertedChairPiece, Tetris.Piece);

})();
