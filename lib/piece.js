(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Piece = Tetris.Piece = function(options){
    this.center = options["center"];
    this.gridPos = options["pos"];
    this.vel = options["vel"];
    this.color = options["color"];
    this.game = options["game"];
  };

  Piece.LENGTH = 30;

  Piece.prototype.move = function (ctx, direction) {
    var newPos = this.gridPos.clone();
    var updateCenterPos;
    switch (direction) {
      case "down":
        newPos = newPos.addPosition(this.vel[1], this.vel[0]);
        if (this.game.isAnIllegalMove(newPos)) {
          this.game.stopCurrentPiece();
          return;
        }
        updateCenterPos = this.vel;
        break;
      case "left":
        newPos = newPos.addPosition(-1,0);
        if (this.game.isAnIllegalMove(newPos)){
          return;
        }
        updateCenterPos = [0,-1];
        break;
      case "right":
        newPos = newPos.addPosition(1,0);
        if (this.game.isAnIllegalMove(newPos)){
          return;
        }
        updateCenterPos = [0,1];
        break;
      case "rotate":
        newPos = this.allPositionsWhenRotated();
        if (this.game.isAnIllegalMove(newPos)){
          var leftPos = [], rightPos = [];
          for (var j = 0; j < newPos.length; j++) {
            leftPos.push(newPos.clone()[j].addAnotherArray([0,-1]));
            rightPos.push(newPos.clone()[j].addAnotherArray([0,1]));
          }

          if (this.game.isAnIllegalMove(leftPos) && this.game.isAnIllegalMove(rightPos)) {
            return;
          } else {
            if (this.game.isAnIllegalMove(leftPos)) {
              this.updateCenterPosition([0,1]);
              newPos = rightPos;
            } else {
              this.updateCenterPosition([0,-1]);
              newPos = leftPos;
            }
            this.rotate();
          }
        } else {
          this.rotate();
        }
        break;
      case "hardHit":
        updateCenterPos = this.hardHitPositionChange();
        if (updateCenterPos) {
          this.clear(ctx);
          for (var i = 0; i < this.gridPos.length; i++) {
            this.gridPos[i] = this.gridPos[i].addAnotherArray(updateCenterPos);
          }
        }
        // this.updateCenterPosition(updateCenterPos);
        this.game.stopCurrentPiece(ctx);
        return;
    }

    // if you get to this point, the move is valid and the game needs to be rerendered
    if (updateCenterPos) {
      this.updateCenterPosition(updateCenterPos);
    }

    this.clear(ctx);
    this.gridPos = newPos;
    this.game.draw(ctx);
  };

  Piece.prototype.hardHitPositionChange = function () {
    var newPos;

    var hardHit;
    while (!newPos || !this.game.isAnIllegalMove(newPos)) {
      if (!hardHit) {
        hardHit = 0;
      }
      hardHit++;
      newPos = [];
      for (var i = 0; i < this.gridPos.length; i++) {
        newPos.push(this.gridPos[i].addAnotherArray([hardHit,0]));
      }
    }
    return [hardHit-1, 0];
  };

  Piece.prototype.allPositionsWhenRotated = function () {
    // duck typing...
    return this.gridPos;
  };

  Piece.prototype.updateCenterPosition = function (changeInPos) {
    this.center = this.center.addAnotherArray(changeInPos);
  };

  Piece.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    for (var i = 0; i < this.gridPos.length; i++) {
      ctx.fillRect(this.gridPos[i][1] * Piece.LENGTH, this.gridPos[i][0] * Piece.LENGTH, Piece.LENGTH, Piece.LENGTH);
      ctx.strokeRect(this.gridPos[i][1] * Piece.LENGTH, this.gridPos[i][0] * Piece.LENGTH, Piece.LENGTH, Piece.LENGTH);
    }
  };

  Piece.prototype.clear = function (ctx) {
    ctx.strokeStyle="white";
    for (var i = 0; i < this.gridPos.length; i++) {
      var zeroPos = this.gridPos[i][0] * Piece.LENGTH;
      var firstPos = this.gridPos[i][1] * Piece.LENGTH;
      if (zeroPos) {
        zeroPos -= 1;
      }

      if (firstPos) {
        firstPos-=1;
      }
      console.log(firstPos);

      ctx.clearRect(firstPos, zeroPos, firstPos+31, zeroPos+31);
    }
  };

  Piece.prototype.stop = function () {
    this.vel = [0,0];
  };

  Piece.prototype.rotate = function () {
    // duck typing....
  };

  Piece.prototype.shiftDown = function (idx) {
    for (var i = 0; i < this.gridPos.length; i++) {
      if (this.gridPos[i][0] < idx) {
        this.gridPos[i] = this.gridPos[i].addAnotherArray([1,0]);
      }
    }
  };

  Piece.prototype.removeAllPositionsFromRow = function (rowNum, ctx) {
    var that = this;
    var positionsToCut = [];
    for (var i = 0; i < this.gridPos.length; i++) {
      if (this.gridPos[i][0] === rowNum) {
        positionsToCut.push(this.gridPos[i]);
      }
    }

    positionsToCut.map (function (position) {
      that.gridPos.splice(that.gridPos.indexOfArray(position),1);
      var zeroPos = position[0] * Piece.LENGTH;
      var firstPos = position[1] * Piece.LENGTH;
      ctx.clearRect(firstPos, zeroPos, firstPos+30, zeroPos+30);
    });
  };
})();
