(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var squarePiece = Tetris.squarePiece = function(game){
    var options = {"center": [0,0], "pos": [[0,0],[1,0],[0,1],[1,1]], "vel": [1,0],
                   "color": "yellow", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.squarePiece, Tetris.Piece);

})();
