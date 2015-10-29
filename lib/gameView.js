(function() {
  if(typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var GameView = Tetris.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function(){
    this.bindKeyHandlers();
    setInterval(this.game.draw.bind(this.game, this.ctx), 50);
    setInterval(this.game.clearLines.bind(this.game, this.ctx), 50);
    setInterval(this.game.moveCurrentPiece.bind(this.game, this.ctx), 250);
    // setInterval(this.game.checkBounds.bind(this.game), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    key('left', function(){ that.game.currentPiece.move(that.ctx, "left");});
    key('down', function(){ that.game.currentPiece.move(that.ctx, "down");});
    key('right', function(){ that.game.currentPiece.move(that.ctx, "right");});
    key('up', function(){ that.game.currentPiece.move(that.ctx, "rotate");});

    // key('space', function(){ that.game.battleship.fireBullet() });
  };

})();
