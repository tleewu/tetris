(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Piece = Tetris.Piece = function(options){
    this.pos = options["pos"];
    this.vel = options["vel"];
    this.color = options["color"];
    this.game = options["game"];
  };

  Piece.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0][0], this.pos[0][1], 30, 30);
    ctx.fillRect(this.pos[1][0], this.pos[1][1], 30, 30);
    ctx.fillRect(this.pos[2][0], this.pos[2][1], 30, 30);
    ctx.fillRect(this.pos[3][0], this.pos[3][1], 30, 30);
  };

  Piece.prototype.clear = function (ctx) {
    ctx.clearRect(this.pos[0][0], this.pos[0][1], this.pos[0][0]+30, this.pos[0][1]+30);
    ctx.clearRect(this.pos[1][0], this.pos[1][1], this.pos[1][0]+30, this.pos[1][1]+30);
    ctx.clearRect(this.pos[2][0], this.pos[2][1], this.pos[2][0]+30, this.pos[2][1]+30);
    ctx.clearRect(this.pos[3][0], this.pos[3][1], this.pos[3][0]+30, this.pos[3][1]+30);
  };

  Piece.prototype.moveDown = function (ctx) {
    this.clear(ctx);
    var that = this;
    this.pos.forEach (function (position){
      position[1] += that.vel[1];
    });
  };

  Piece.prototype.moveLeft = function (ctx) {
    var canMoveLeft = true;

    for (var i = 0; i < 4; i++) {
      if (this.pos[i][0] === 0) {
        canMoveLeft = false;
        break;
      }
    }

    if (canMoveLeft) {
      this.clear(ctx);
      var that = this;
      this.pos.forEach (function (position){
        position[0] -= 15;
      });
    }
  };

  Piece.prototype.moveRight = function (ctx) {
    var canMoveRight = true;

    for (var i = 0; i < 4; i++) {
      if (this.pos[i][0] === 285) {
        canMoveRight = false;
        break;
      }
    }

    if (canMoveRight) {
      this.clear(ctx);
      var that = this;
      this.pos.forEach (function (position){
        position[0] += 15;
      });
    }
  };

  Piece.prototype.playerMove = function (move, ctx) {
    switch (move) {
      case "down":
        this.moveDown(ctx);
        break;
      case "left":
        this.moveLeft(ctx);
        break;
      case "right":
        this.moveRight(ctx);
        break;
    }
  };

  Piece.prototype.stop = function () {
    this.vel = [0,0];
  };

  Piece.prototype.isCollidedWith = function (anotherPiece) {
    // piece [this] will refer to currentPiece
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if ((this.pos[j][1] + 30) === anotherPiece.pos[j][1]){
          return true;
        }
      }
    }
    return false;
  };

})();
