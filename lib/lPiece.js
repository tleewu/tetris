(function(){

  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var lPiece = Tetris.lPiece = function(game){
    this.angle = 0;
    var options = {"center": [0,0], "pos": this.calculateAllPositions(this.angle, [0,0]),
                   "vel": [1,0], "color": "orange", "game": game};
    Tetris.Piece.call(this, options);
  };

  Tetris.Util.inherits (Tetris.lPiece, Tetris.Piece);

  lPiece.prototype.calculateAllPositions = function (angle, center) {
    if (center === undefined) {
      center = this.center.slice(0);
    }

    var allPositions = [center];

    var positionsToAddToCenter = [[2*parseInt(Math.sin(angle).toFixed()), 2*parseInt(Math.cos(angle).toFixed())],
                                  [parseInt(Math.sin(angle).toFixed()), parseInt(Math.cos(angle).toFixed())],
                                  [parseInt(Math.cos(angle).toFixed()), -parseInt(Math.sin(angle).toFixed())]];
    // [-2 sin theta, -2 cos theta] , [-sin theta, cos theta], [cos theta, -sin theta]
    positionsToAddToCenter.map(function (position) {
      allPositions.push(center.addAnotherArray(position));
    });

    return allPositions;
  };

  lPiece.prototype.allPositionsWhenRotated = function () {
    potentialAngle = this.angle + (Math.PI/2);
    return this.calculateAllPositions(potentialAngle);
  };

  lPiece.prototype.rotate = function () {
    this.angle += (Math.PI/2);
  };

})();
