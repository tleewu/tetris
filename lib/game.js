(function() {
  if(typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.grid = new Array(Constants.GRID_WIDTH);
    for (var i = 0; i < Constants.GRID_HEIGHT; i++) {
      this.grid[i] = Constants.GRID_ROW.slice(0);
    }
    this.linesCleared = 0;
    this.allPieces = [];
    this.currentPiece = {};
    this.gameOver = true;
  };

  Game.prototype.start = function () {
    if(this.gameOver){
      this.gameOver = false;
      this.addRandomPiece();
    }
  };

  Game.prototype.clearCurrentPiece = function (ctx) {
    this.currentPiece.clear(ctx);
  };

  Game.prototype.addRandomPiece = function () {
    if (!this.gameOver) {
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

      if (this.isAnIllegalMove(piece.gridPos)){
        this.resetGame();
      } else {
        this.currentPiece = piece;
      }
    }
  };

  Game.prototype.resetGame = function () {
    for (var i = 0; i < Constants.GRID_HEIGHT; i++) {
      for (var j = 0; j < Constants.GRID_WIDTH; j++) {
        this.grid[i][j] = 0;
      }
    }
    this.linesCleared = 0;
    this.allPieces = [];
    this.currentPiece = {};
    this.gameOver = true;
  };

  Game.prototype.clearLines = function (ctx) {
    var that = this;
    var clonedGrid = this.grid.clone();
    var indicesToCut = [];

    for (var i = 0; i < clonedGrid.length; i++) {
      if (clonedGrid[i].isFullLine()) {
        this.grid.splice(i,1);
        this.grid.unshift(Constants.GRID_ROW.slice(0));
        indicesToCut.push(i);
      }
    }

    indicesToCut.map(function (idx) {
      that.allPieces.forEach(function (piece) {
        piece.removeAllPositionsFromRow(idx, ctx);
        piece.shiftDown(idx);
      });
    });

    if (indicesToCut.length > 0) {
      this.clearBoard(ctx);
    }
  };

  Game.prototype.deleteClearedPieces = function () {
    var newAllPieces = [];
    this.allPieces.map(function (piece) {
      if (piece.gridPos.length) {
        newAllPieces.push(piece);
      }
    });
    this.allPieces = newAllPieces;
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

  Game.prototype.stopCurrentPiece = function (ctx) {
    this.currentPiece.stop();
    this.updateGrid(this.currentPiece.gridPos);
    this.clearLines(ctx);
    this.addRandomPiece();
  };

  Game.prototype.isAnIllegalMove = function (arrayOfGridPositions) {
    var illegalMove = false;
    for (var i = 0; i < arrayOfGridPositions.length; i++) {
      var row = arrayOfGridPositions[i][0];
      var col = arrayOfGridPositions[i][1];

      if (row < 0 || col < 0 || col >= Constants.GRID_WIDTH || this.grid[row] === undefined || this.grid[row][col]) {
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

  Game.prototype.clearBoard = function (ctx) {
    ctx.clearRect(0, 0, Constants.GAME_DIM_X, Constants.GAME_DIM_Y);
  };

})();
