# human.js

The `Human` class represents a human player in a turn-based board game, allowing users to interact with pieces on the game board during different phases, such as placing, moving, and flying. This class extends the `Player` class, inheriting its properties and methods while focusing on managing user input and piece movements. The gameplay revolves around selecting, placing, moving pieces, and potentially destroying enemy pieces based on game rules.

## Class Definition

```javascript
class Human extends Player {
  constructor(username, marker) {
    super("human", username, marker);
    this.pieceSelected = undefined;
  }
}
```

- **Extends `Player`**: The `Human` class inherits from the `Player` class, implying it shares core player behavior, such as `username` and `marker`.
- **Constructor**:
  - **`username`**: The name of the human player.
  - **`marker`**: The symbol or token that represents the player in the game.
  - **`this.pieceSelected`**: Initially `undefined`, it stores the piece currently selected by the player.

## Key Methods

### 1. `pickPosition(position)`

Handles the player's action of selecting a position on the board, which could be for placing or moving a piece depending on the game phase.

```javascript
pickPosition(position) {
  const pieceSelected = UI.Pieces.isPieceSelected(position);
  const hasToDestroyEnemyPiece = GAME.hasToDestroyEnemyPiece;

  if (pieceSelected !== undefined) {
    if (this.phase === PHASE.PLACING || hasToDestroyEnemyPiece) {
      GAME.setPieceOnPosition(pieceSelected);
    } else if (this.phase === PHASE.MOVING || this.phase === PHASE.FLYING) {
      this.moveHandling(pieceSelected);
    }
  }
}
```

- **Steps**:
  1. **Check for selected piece**: Uses `UI.Pieces.isPieceSelected(position)` to determine if the player has clicked on a piece.
  2. **Check for enemy destruction**: If the player is forced to destroy an enemy piece, this is handled by checking `GAME.hasToDestroyEnemyPiece`.
  3. **Action based on phase**:
     - **Placing or Destroying**: If in the **Placing phase** or forced to destroy, the selected piece is placed on the board using `GAME.setPieceOnPosition(pieceSelected)`.
     - **Moving or Flying**: In the **Moving** or **Flying** phase, the movement of the selected piece is handled by `moveHandling(pieceSelected)`.

### 2. `moveHandling(position)`

Manages how pieces are moved on the board during the **Moving** and **Flying** phases.

```javascript
moveHandling(position) {
  const isOwnPiece = this.marker === GAME.board[position];
  const isEmptyPosition = GAME.board[position] === undefined;
  const hasPieceSelected = this.pieceSelected !== undefined;

  if (isOwnPiece) {
    if (GAME.isValidPosition(position, false)) {
      if (hasPieceSelected) {
        UI.Pieces.unselectPiece(this.pieceSelected, this.marker);
      }
      this.pieceSelected = position;
      UI.Pieces.selectPiece(position);
    }
  } else if (isEmptyPosition && hasPieceSelected) {
    if (GAME.isValidPosition(position) && GAME.isValidMovement(this.pieceSelected, position)) {
      GAME.movePiece(this.pieceSelected, position);
      this.pieceSelected = undefined;
      GAME.checkGameState(position);
    }
  }
}
```

- **Steps**:
  1. **Check for own piece**: Verifies if the selected piece belongs to the player (`isOwnPiece`).
  2. **Select or unselect a piece**:
     - If the piece is valid and belongs to the player, it gets selected or reselected via `UI.Pieces.selectPiece(position)`.
  3. **Move to an empty position**:
     - If an empty position is selected, and the move is valid (`GAME.isValidPosition` and `GAME.isValidMovement`), the piece is moved using `GAME.movePiece`.
     - After the move, the game state is checked (`GAME.checkGameState`).

## Key External Dependencies

### 1. `UI.Pieces`

Handles the graphical user interface for selecting and unselecting pieces.

- **`isPieceSelected(position)`**: Determines if a piece is selected at the specified position.
- **`selectPiece(position)`**: Visually indicates that a piece has been selected.
- **`unselectPiece(position, marker)`**: Unselects a previously selected piece, updating the UI accordingly.

### 2. `GAME`

Contains the core game logic and state, including game rules and checks for valid moves and placements.

- **`hasToDestroyEnemyPiece`**: Flag indicating if the player must destroy an enemy piece.
- **`setPieceOnPosition(piece)`**: Places a piece on the board at the specified position.
- **`isValidPosition(position, forMove)`**: Validates whether a position is valid for placing or moving a piece.
- **`isValidMovement(fromPosition, toPosition)`**: Ensures the movement between two positions follows the game rules.
- **`movePiece(fromPosition, toPosition)`**: Moves a piece from one position to another on the board.
- **`checkGameState(position)`**: Evaluates the game's state after a move, such as checking for victory or special conditions.

### 3. `PHASE`

Defines different phases of the game, such as:

- **`PLACING`**: When pieces are being placed on the board.
- **`MOVING`**: When pieces are being moved.
- **`FLYING`**: When special movement rules apply, typically when there are fewer pieces left.
