(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var straightPiece = Tetris.straightPiece = function(game){
    var options = {"pos": [[0,0],[30,0],[60,0],[90,0]], "vel": [0,15],
                   "color": "blue", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.straightPiece, Tetris.Piece);

})();
