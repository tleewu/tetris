(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var squarePiece = Tetris.squarePiece = function(game){
    var options = {"pos": [[0,0],[30,0],[30,30],[0,30]], "vel": [0,15],
                   "color": "yellow", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.squarePiece, Tetris.Piece);

})();
