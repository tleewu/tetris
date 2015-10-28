(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var lPiece = Tetris.lPiece = function(game){
    var options = {"pos": [[0,0],[0,1],[0,2],[1,0]], "vel": [1,0],
                   "color": "orange", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.lPiece, Tetris.Piece);

})();
