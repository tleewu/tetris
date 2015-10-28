(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var chairPiece = Tetris.chairPiece = function(game){
    var options = {"pos": [[0,1],[1,0],[1,1],[2,0]], "vel": [1,0],
                   "color": "red", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.chairPiece, Tetris.Piece);

})();
