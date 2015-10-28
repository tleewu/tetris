(function() {
  if(typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.allPieces= [];
    this.currentPiece = {};
    this.addRandomPiece();
  };

  Game.DIM_X = 300;
  Game.DIM_Y = 300;

  Game.PIECES = {
    1: new Tetris.tPiece(this),
    2: new Tetris.lPiece(this),
    3: new Tetris.invertedLPiece(this),
    4: new Tetris.chairPiece(this),
    5: new Tetris.invertedChairPiece(this),
    6: new Tetris.squarePiece(this),
    7: new Tetris.straightPiece(this)
  };

  Game.prototype.addRandomPiece = function () {
    var random = Math.floor((Math.random()*7)+1);
    this.currentPiece = Game.PIECES[random];
  };

  Game.prototype.draw = function(ctx){
    // for each piece in (this.allPieces), call draw on each object
    this.allPieces.forEach(function(piece){
      piece.draw(ctx);
    });

    this.currentPiece.draw(ctx);
  };

  Game.prototype.moveCurrentPiece = function(ctx){
    this.currentPiece.moveDown(ctx);
  };

  Game.prototype.createNewCurrentPiece = function () {
    this.currentPiece.stop();
    this.allPieces.push(this.currentPiece);
    this.addRandomPiece();
  };

  Game.prototype.checkBounds = function() {
    for (var i = 0; i < 4; i++) {
      if (this.currentPiece.pos[i][1] >= Game.DIM_Y) {
        this.createNewCurrentPiece();
        break;
      }

      for (var j = 0; j < this.allPieces.length; j++) {
        if (this.currentPiece.isCollidedWith(this.allPieces[j])) {
          this.createNewCurrentPiece();
          break;
        }
      }
    }
  };

})();
