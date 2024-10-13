# ui.js

This file contains a JavaScript-based implementation of a user interface (UI) for a board game. The UI is built using the HTML5 `<canvas>` element and applies modular, object-oriented design principles to manage the game board, pieces, and user interactions.

## Key Features

- **Canvas-based Rendering**: Leverages HTML5 canvas for rendering the game board and pieces.
- **Modular Design**: Separates concerns for easy maintainability by creating distinct objects for the game board and pieces.
- **Interactive Gameplay**: Handles user interactions such as selecting and moving game pieces.
- **Object-Oriented Approach**: Code is structured with objects for better scalability and extendability.

## Components Overview

### 1. **UI Initialization (`UI.init`)**

This function sets up the game environment by initializing the game board and pieces. It uses two canvases for rendering:

```js
init: function (boardSize) {
  this.size = 600;
  let boardCanvas = document.getElementById("board");
  let piecesCanvas = document.getElementById("pieces");
  boardCanvas.width = this.size;
  boardCanvas.height = this.size;
  piecesCanvas.width = this.size;
  piecesCanvas.height = this.size;
  this.Board.init(this.size, boardCanvas, boardSize);
  this.Pieces.init(this.size, piecesCanvas);
}
```

### 2. **Board Object (`UI.Board`)**

Handles drawing and managing the game board, including the background, points, and lines.

#### a. Board Initialization (`Board.init`)

Initializes the board with the provided size and canvas context for rendering:

```js
init: function (size, boardCanvas, boardSize) {
  this.size = size;
  this.ctx = boardCanvas.getContext("2d");
  this.boardSize = boardSize;
  this.draw();
}
```

#### b. Drawing the Board (`Board.draw`)

Orchestrates the drawing of the board elements:

```js
draw: function () {
  this.drawBackground();
  this.drawPoints();
  this.drawLines();
}
```

- **`drawBackground`**: Fills the canvas with a background color.
- **`drawPoints`**: Draws points on the board where pieces can be placed.
- **`drawLines`**: Connects the points with lines to form a game grid.

### 3. **Pieces Object (`UI.Pieces`)**

Manages the game pieces, including drawing, selecting, and clearing pieces from the board.

#### a. Drawing a Piece (`Pieces.drawPiece`)

Renders a player's piece at the specified position:

```js
drawPiece: function (position, currentPlayerMarker) {
  let ctx = this.ctx;
  let pointPosition = UI.Board.points[position];
  let piece = new Piece(pointPosition.x, pointPosition.y, currentPlayerMarker);
  ctx.beginPath();
  ctx.arc(piece.x, piece.y, this.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = piece.marker === true ? COLORS.player1 : COLORS.player2;
  ctx.fill();
  ctx.closePath();
}
```

#### b. Selecting a Piece (`Pieces.isPieceSelected`)

Detects whether a piece has been selected based on user input:

```js
isPieceSelected: function (position) {
  let indexFound;
  _.each(UI.Board.points, function (point, index) {
    if (!indexFound) {
      let xRange = position.offsetX >= point.x - this.radius && position.offsetX <= point.x + this.radius;
      let yRange = position.offsetY >= point.y - this.radius && position.offsetY <= point.y + this.radius;
      if (xRange && yRange) {
        indexFound = index;
      }
    }
  });
  return indexFound;
}
```

## Variables and Constants

- **`COLORS`**: The color scheme, expected to be defined elsewhere, likely includes properties for:
  - `background`: Board background color.
  - `points`: Point color.
  - `lines`: Line color.
  - `player1` and `player2`: Colors for the two players' pieces.

## Detailed Breakdown

### Drawing the Board

1. **Background (`Board.drawBackground`)**: Fills the canvas with the background color.
2. **Points (`Board.drawPoints`)**: Uses an offset and spacing pattern to position points on the board. Points are represented as small circles, drawn using `drawPoint`.
3. **Lines (`Board.drawLines`)**: Connects the points with lines to form a grid structure. Lines are drawn between points based on their index to create the game grid.

### Handling Pieces

- **Drawing Pieces (`Pieces.drawPiece`)**: Each piece is drawn based on the current player's marker, which determines its color.
- **Selecting Pieces (`Pieces.isPieceSelected`)**: Detects user clicks to check if they match the location of a piece.

## Helper Libraries

The code makes use of `underscore.js` to simplify array operations, like iterating over points and drawing lines on the board.
