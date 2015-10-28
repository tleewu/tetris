(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Piece = Tetris.Piece = function(options){
    this.gridPos = options["pos"];
    this.vel = options["vel"];
    this.color = options["color"];
    this.game = options["game"];
  };

  Piece.LENGTH = 30;

  Piece.prototype.move = function (ctx, direction) {
    var newPos = this.gridPos.clone();

    switch (direction) {
      case "down":
        newPos = newPos.addPosition(this.vel[1], this.vel[0]);
        if (this.game.isAnIllegalMove(newPos)) {
          this.game.stopCurrentPiece();
          return;
        }
        break;
      case "left":
        newPos = newPos.addPosition(-1,0);
        if (this.game.isAnIllegalMove(newPos)){
          return;
        }
        break;
      case "right":
        newPos = newPos.addPosition(1,0);
        if (this.game.isAnIllegalMove(newPos)){
          return;
        }
        break;
    }

    // if you get to this point, the move is valid and the game needs to be rerendered
    this.clear(ctx);
    this.gridPos = newPos;
  };

  Piece.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    for (var i = 0; i < this.gridPos.length; i++) {
      ctx.fillRect(this.gridPos[i][1] * Piece.LENGTH, this.gridPos[i][0] * Piece.LENGTH, Piece.LENGTH, Piece.LENGTH);
    }
  };

  Piece.prototype.clear = function (ctx) {
    for (var i = 0; i < this.gridPos.length; i++) {
      var zeroPos = this.gridPos[i][0] * Piece.LENGTH;
      var firstPos = this.gridPos[i][1] * Piece.LENGTH;
      ctx.clearRect(firstPos, zeroPos, firstPos+30, zeroPos+30);
    }
  };

  Piece.prototype.stop = function () {
    this.vel = [0,0];
  };

})();
