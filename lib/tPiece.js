(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var tPiece = Tetris.tPiece = function(game){
    var options = {"pos": [[0,0],[30,0],[60,0],[30,30]], "vel": [0,15],
                   "color": "purple", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.tPiece, Tetris.Piece);

  //
  // Piece.prototype.hasCollidedWith = function(movingPiece){
  //   movingPiece.pos.forEach (function (pos) {
  //
  //   })
  // };

  // Piece.prototype.stop = function () {
  //   this.vel = 0;
  // };

})();
