(function() {
  if(typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var GameView = Tetris.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function(){
    // this.bindKeyHandlers();
    setInterval(this.game.draw.bind(this.game, this.ctx), 20);
    setInterval(this.game.moveCurrentPiece.bind(this.game, this.ctx), 250);
    setInterval(this.game.checkBounds.bind(this.game), 20);
  };

  // GameView.prototype.bindKeyHandlers = function() {
  //   var that = this;
  //   key('up', function(){ that.game.battleship.power("forward") });
  //   key('left', function(){ that.game.battleship.rotate("left") });
  //   key('down', function(){ that.game.battleship.power("down") });
  //   key('right', function(){ that.game.battleship.rotate("right") });
  //   key('space', function(){ that.game.battleship.fireBullet() });
  // };

})();
