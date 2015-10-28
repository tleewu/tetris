(function() {
  if(typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.grid = new Array(10);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = [0,0,0,0,0,0,0,0,0,0];
    }

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
    this.currentPiece.pos.map (function (position) {
      this.allOccupiedPositions.shift(position);
    });

    this.addRandomPiece();
  };

  Game.prototype.checkForValidPosition = function (arrayOfGridPositions) {
    var legalMove = true;
    for (var i = 0; i < arrayOfGridPositions.length; i++) {
      var positionX = arrayOfGridPositions[i][1];
      var positionY = arrayOfGridPositions[i][0];
      if (this.grid[positionY][positionX]) {
        legalMove = false;
        break;
      }
    }
    return legalMove;
  };

  Game.prototype.updateGrid = function (arrayOfGridPositions) {
    for (var i = 0; i < arrayOfGridPositions.length; i++) {
      var rowNumber = arrayOfGridPositions[i][0];
      var colNumber = arrayOfGridPositions[i][1];
      this.grid[rowNumber][colNumber] = 1;
    }
  };

})();
