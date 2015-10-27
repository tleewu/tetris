(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var lPiece = Tetris.lPiece = function(game){
    var options = {"pos": [[0,30],[30,30],[60,30],[60,0]], "vel": [0,15],
                   "color": "orange", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.lPiece, Tetris.Piece);

})();
