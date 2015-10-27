(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var chairPiece = Tetris.chairPiece = function(game){
    var options = {"pos": [[0,30],[30,30],[30,0],[60,0]], "vel": [0,15],
                   "color": "red", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.chairPiece, Tetris.Piece);

})();
