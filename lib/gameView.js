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
    this.ctx.font = "15px Work Sans";
    this.ctx.fillText("Press Enter to start the game...", 35, 270);
    // set Interval to check to see if the game is over. if the game is over
  };

  GameView.prototype.startGame = function () {
    if (this.game.gameOver){
      this.game.start();
      this.ctx.clearRect(0,0, 300, 540);

      this.drawInterval = setInterval(this.game.draw.bind(this.game, this.ctx), 1000/60);
      this.clearInterval = setInterval(this.game.clearLines.bind(this.game, this.ctx), 1000/60);
      this.deleteInterval = setInterval(this.game.deleteClearedPieces.bind(this.game), 1000/60);
      this.moveInterval = setInterval(this.game.moveCurrentPiece.bind(this.game, this.ctx), 1000/3);
      this.overInterval = setInterval(this.checkIfGameOver.bind(this), 1000/60);
    }
  };

  GameView.prototype.checkIfGameOver = function () {
    if (this.game.gameOver) {
      clearInterval(this.drawInterval);
      clearInterval(this.clearInterval);
      clearInterval(this.deleteInterval);
      clearInterval(this.moveInterval);
      clearInterval(this.overInterval);

      this.ctx.clearRect(0,0, 300, 540);

      this.ctx.fillStyle = "black";
      this.ctx.font = "20px Work Sans";
      this.ctx.fillText("GAME OVER", 80, 200);
      this.ctx.font = "15px Work Sans";

      this.ctx.fillText("Press Enter to play again...", 35, 270);
    }
  };

  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    key('left', function(){ that.game.currentPiece.move(that.ctx, "left");});
    key('down', function(){ that.game.currentPiece.move(that.ctx, "down");});
    key('right', function(){ that.game.currentPiece.move(that.ctx, "right");});
    key('up', function(){ that.game.currentPiece.move(that.ctx, "rotate");});
    key('space', function(){ that.game.currentPiece.move(that.ctx, "hardHit");});
    key('enter', function () {that.startGame();});
  };

})();
