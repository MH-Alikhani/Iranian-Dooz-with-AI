# Morabaraba.js

## Game Initialization

The `GAME` object serves as the core of the Morabaraba game, initializing all components such as the game board, players, and event listeners.

### Key Variables:

- **players**: An array storing two player objects (AI and Human).
- **currentPlayer**: Randomly selects either the AI or Human to start the game.
- **boardSize**: The total number of positions on the board (24 positions).
- **board**: An array representing the current state of the board (each position holds a player’s marker or is empty).
- **graph** and **lines**: Define valid connections between board positions and the positions that form a complete line (mill).

### Initialization Flow:

- The `init()` function initializes the game state and UI.
- AI and Human player objects are created and stored in `players[]`.
- The starting player is randomly selected using `Math.round(Math.random())`.
- A game board of 24 positions is created, each initialized as `undefined`.
- An event listener for user clicks is set up using `UI.Pieces.piecesCanvas.addEventListener("click", this.listenClick)`.

## Game Board Setup

The Morabaraba board consists of 24 positions, connected by edges defined in the **graph** array.

- **Graph**: This array contains pairs of adjacent positions. For example, `[0,1]` means position 0 is adjacent to position 1.
- **Lines**: These sub-arrays define the winning lines (mills), consisting of three positions in a row.

### Board Initialization:

- The board is represented as an array of 24 positions, each initialized as `undefined` (unoccupied).
- The game loops through the board, preparing it for gameplay.

## Player Management

The game supports two types of players: **AI** and **Human**.

### Player Properties:

- **marker**: Defines the player's symbol on the board.
- **stockPieces**: The number of pieces left to place on the board.
- **phase**: Players progress through three phases (PLACING, MOVING, FLYING).

### AI Player:

- Uses programmatic logic to make decisions automatically.

### Human Player:

- Interacts via mouse clicks on the UI.

## Game Phases

Morabaraba progresses through three phases for each player:

1. **PLACING**: Players take turns placing their pieces on the board.
2. **MOVING**: After placing all pieces, players move their pieces to adjacent positions.
3. **FLYING**: When reduced to three pieces, players can move to any position on the board.

### Phase Transition:

- Players automatically move between phases based on their board state.

## AI Logic

The AI player makes decisions programmatically based on the game state:

- **`pickPosition()`**: Chooses a valid position to place or move a piece.
- **`isDestructionOption()`**: Checks if a mill has been created and selects an enemy piece to destroy.
- **`destroyPiece()`**: Removes one of the opponent’s pieces after forming a mill.

## Event Handling

User interaction is managed through event listeners:

- **`listenClick()`**: Triggered when a player clicks on the board. If it's the human’s turn, the move is processed.
- **Piece Placement**: Human clicks initiate piece placement by calling `pickPosition()`.

## Game State Management

Several functions manage the game state:

- **`setPieceOnPosition()`**: Places a piece on the board and verifies the move.
- **`checkGameState()`**: After placing a piece, checks if the player has won, needs to destroy an opponent's piece, or should end their turn.
- **`endTurn()`**: Alternates between AI and Human turns after each move.

## Endgame Conditions

The game ends when one of the following conditions is met:

- **Win Condition**: A player reduces the opponent to fewer than three pieces or makes further moves impossible.
- **Tie Condition**: If neither player can win after a set number of moves, the game ends in a tie.

## Performance Considerations

The game employs efficient algorithms to ensure smooth performance:

- **Board History**: Tracks the board state to avoid infinite loops from repeated configurations.

## UI Integration

The game’s logic integrates with the user interface via the **UI** object, ensuring that the UI reflects the current game state dynamically.

## Full Code Explanation

```javascript
var GAME = {
  init: function () {
    (this.players = []), // Array to store the two players.
      (this.players[0] = new AI("the computer", !0)), // AI player setup.
      (this.players[1] = new Human("player", !1)), // Human player setup.
      // Randomly select a player to start the game.
      (this.currentPlayer = this.players[Math.round(Math.random())]),
      // Initialize various game settings.
      (this.winMessage = !1),
      (this.newGameButton = !1),
      (this.catchCountdown = 50),
      (this.finalCountdown = 10);

    // Board setup with 24 positions.
    var e = 24;
    for (
      this.boardSize = e,
        this.board = [],
        this.boardHistory = [],
        this.speed = 100;
      e--;

    )
      this.board.push(void 0); // Initialize all board positions as undefined.

    // Graph defining all valid moves (adjacency relationships between positions).
    (this.graph = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 0],
      [1, 9],
      [3, 11],
      [5, 13],
      [7, 15],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 8],
      [9, 17],
      [11, 19],
      [13, 21],
      [15, 23],
      [16, 17],
      [17, 18],
      [18, 19],
      [19, 20],
      [20, 21],
      [21, 22],
      [22, 23],
      [23, 16],
      [0, 8],
      [2, 10],
      [4, 12],
      [6, 14],
      [8, 16],
      [10, 18],
      [12, 20],
      [14, 22],
    ]),
      (this.graphLength = this.graph.length);

    // Lines that represent mills (sets of 3 connected positions).
    (this.lines = [
      [0, 1, 2],
      [2, 3, 4],
      [4, 5, 6],
      [6, 7, 0],
      [8, 9, 10],
      [10, 11, 12],
      [12, 13, 14],
      [14, 15, 8],
      [16, 17, 18],
      [18, 19, 20],
      [20, 21, 22],
      [22, 23, 16],
      [1, 9, 17],
      [3, 11, 19],
      [5, 13, 21],
      [0, 8, 16],
      [2, 10, 18],
      [4, 12, 20],
      [6, 14, 22],
      [7, 15, 23],
    ]),
      // Intersection points that can form multiple mills.
      (this.intersection = [
        1, 9, 17, 3, 11, 19, 5, 13, 21, 7, 15, 23, 0, 8, 16, 2, 10, 18, 4, 12,
        20, 6, 14, 22,
      ]);

    // Initialize the user interface and set up event listeners.
    UI.init(this.boardSize),
      UI.Pieces.piecesCanvas.addEventListener("click", this.listenClick),
      // Start the game.
      this.run();
  },

  // Event listener for human player clicks.
  listenClick: function (e) {
    if ("human" === GAME.currentPlayer.type) {
      GAME.currentPlayer.pickPosition(e); // Human selects a position to place or move a piece.
    }
  },

  // Set piece on a position.
  setPieceOnPosition: function (e) {
    if (void 0 === this.board[e]) {
      // Ensure the position is valid (empty).
      var t = this.currentPlayer.marker;
      (this.board[e] = t), // Place current player's marker on the board.
        // Check for a mill and update the game state.
        UI.Pieces.drawPiece(e, t),
        this.currentPlayer.stockPieces--,
        this.checkGameState(e);
    }
  },

  // Check the state of the game after each move.
  checkGameState: function (e) {
    if (this.currentPlayer.stockPieces <= 0) {
      // Transition to MOVING phase.
      this.currentPlayer.phase = "MOVING";
    }
    // Check if the current player has formed a mill.
    var t = this.currentPlayer.hasMill(e);
    if (t) {
      this.currentPlayer.removeOpponentPiece();
    } else {
      this.endTurn();
    }
  },

  // Change the turn to the next player.
  endTurn: function () {
    this.currentPlayer =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];
    // Delay AI move for a smoother experience.
    setTimeout(() => {
      this.currentPlayer.autoPlay();
    }, this.speed);
  },

  // Method to run the game.
  run: function () {
    if (this.winMessage) return;
    // Check tie or win conditions.
    this.checkTie(), this.checkWin();
  },
};
```
