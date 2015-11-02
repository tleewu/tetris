#Tetris

Tetris is a childhood favorite of mine, and I just had to build this. This game is built in Javascript and HTML5 Canvas.

You can play it [here] (https://www.theowu.me/tetris).

### Main Challenges

<b> Challenge 1: </b> Managing the relationships amongst pieces
- This initial structure is essential for determining when a player can move a piece or not or figuring out when a falling piece has stopped and the game needs to instantiate another piece.

<b> My Solution: </b>
Implement a grid (an array of arrays). To check if a move is valid, ensure that all of a piece's positions are empty on the grid. A value of 0 means that the position on the grid is empty; a value of 1 means that the position on the grid has been filled.
```
Game.prototype.isAnIllegalMove = function (arrayOfGridPositions) {
  var illegalMove = false;
  for (var i = 0; i < arrayOfGridPositions.length; i++) {
    var row = arrayOfGridPositions[i][0];
    var col = arrayOfGridPositions[i][1];

    if (row < 0 || col < 0 || col >= Constants.GRID_WIDTH || this.grid[row] === undefined || this.grid[row][col]) {
      illegalMove = true;
      break;

  }
  return illegalMove;
};
```

When a piece has been mounted, update the grid.
```
for (var i = 0; i < arrayOfGridPositions.length; i++) {
  var rowNumber = arrayOfGridPositions[i][0];
  var colNumber = arrayOfGridPositions[i][1];
  this.grid[rowNumber][colNumber] = 1;
}
```

<b> Challenge 2: </b>  Rotating pieces
- Yeah, it's pretty easy for square and straight pieces because the rotations are pretty minimal. But the other pieces involved a little bit more math.

<b> My Solution: </b>
Gave an internal angle and a center to pieces and used trigonometry to manipulate the position of other parts. Here's an example of what I did with the L-shaped Tetris piece.
```
var allPositions = [center];

var positionsToAddToCenter = [[2*parseInt(Math.sin(angle).toFixed()), 2*parseInt(Math.cos(angle).toFixed())],
                              [parseInt(Math.sin(angle).toFixed()), parseInt(Math.cos(angle).toFixed())],
                              [parseInt(Math.cos(angle).toFixed()), -parseInt(Math.sin(angle).toFixed())]];
```
By adjusting the other parts in relationship to the center, I could map out a piece at any rotation.

<b> Challenge 3: </b> Hard Drop
- In Tetris, a hard drop causes the piece to fall straight down.

<b> My Solution: </b>
Iterate through all possible "down" steps, starting from 1. When a step will cause an 'illegal move', stop.

```
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
```

<b> Challenge 4: </b> Wall Kick
- I took this feature for granted when I normally play the game, and it wasn't until one of my close friends pointed that my game was missing it. I'm not great at explaining what a wall kick is, so I'll refer you to [this] (www.tetris.wikia.com/wiki/Wall_kick).

<b> My Solution: </b>
If an attempt to rotate a piece is illegal, I moved the piece over one to the left and one to the right to see if the rotation is still illegal. If the move became legal, I rotated the piece and moved it over one.

```
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
```

### Features to be Implemented

* Optimize game to reduce flickering.
* Include player score and levels.
* Show 'next' piece.
