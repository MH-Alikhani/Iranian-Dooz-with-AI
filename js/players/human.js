class Human extends Player {
  constructor(username, marker) {
    super("human", username, marker);
    this.pieceSelected = undefined;
  }

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
      if (
        GAME.isValidPosition(position) &&
        GAME.isValidMovement(this.pieceSelected, position)
      ) {
        GAME.movePiece(this.pieceSelected, position);
        this.pieceSelected = undefined;
        GAME.checkGameState(position);
      }
    }
  }
}
