(function() {
  if(typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.grid = new Array(10);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = [0,0,0,0,0,0,0,0,0,0];
    }
    this.allPieces = [];
    this.currentPiece = {};
    this.addRandomPiece();
  };

  Game.DIM_X = 300;
  Game.DIM_Y = 300;

  Game.prototype.addRandomPiece = function () {
    var random = Math.floor((Math.random()*7)+1);
    var piece;
    switch (random) {
      case 1:
        piece = new Tetris.tPiece(this);
        break;
      case 2:
        piece = new Tetris.lPiece(this);
        break;
      case 3:
        piece = new Tetris.invertedLPiece(this);
        break;
      case 4:
        piece = new Tetris.chairPiece(this);
        break;
      case 5:
        piece = new Tetris.invertedChairPiece(this);
        break;
      case 6:
        piece = new Tetris.squarePiece(this);
        break;
      case 7:
        piece = new Tetris.straightPiece(this);
        break;
    }
    this.currentPiece = new Tetris.squarePiece(this);
  };

  Game.prototype.draw = function(ctx){
    // for each piece in (this.allPieces), call draw on each object
    this.allPieces.forEach(function(piece){
      piece.draw(ctx);
    });

    this.currentPiece.draw(ctx);
  };

  Game.prototype.moveCurrentPiece = function(ctx){
    this.currentPiece.move(ctx, "down");
  };

  Game.prototype.stopCurrentPiece = function () {
    this.currentPiece.stop();
    this.updateGrid(this.currentPiece.gridPos);
    this.addRandomPiece();
  };

  Game.prototype.isAnIllegalMove = function (arrayOfGridPositions) {
    var illegalMove = false;
    for (var i = 0; i < arrayOfGridPositions.length; i++) {
      var row = arrayOfGridPositions[i][0];
      var col = arrayOfGridPositions[i][1];

      if (row < 0 || col < 0 || col > 9 || this.grid[row] === undefined || this.grid[row][col]) {
        illegalMove = true;
        break;
      }
    }
    return illegalMove;
  };

  Game.prototype.updateGrid = function (arrayOfGridPositions) {
    for (var i = 0; i < arrayOfGridPositions.length; i++) {
      var rowNumber = arrayOfGridPositions[i][0];
      var colNumber = arrayOfGridPositions[i][1];
      this.grid[rowNumber][colNumber] = 1;
    }
    this.allPieces.push(this.currentPiece);
  };

  Game.prototype.stopCurrentPieceFromMovingLaterally = function () {
    this.currentPiece.resetLateralVelocity();
  };

})();
