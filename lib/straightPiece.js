(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var straightPiece = Tetris.straightPiece = function(game){
    var options = {"pos": [[0,0],[0,1],[0,2],[0,3]], "vel": [1,0],
                   "color": "blue", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.straightPiece, Tetris.Piece);

})();
