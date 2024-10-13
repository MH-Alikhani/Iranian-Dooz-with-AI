class AI extends Player {
  constructor(username, marker) {
    super("AI", username, marker);
  }

  pickPosition() {
    let position, piecePosition, pieceAndPosition;
    const isFirstRound = this.stockPieces === 12;

    if (isFirstRound) {
      position = Math.floor(Math.random() * GAME.boardSize);
    } else {
      switch (this.phase) {
        case PHASE.PLACING:
          position = this.findPlacingPosition();
          break;
        case PHASE.MOVING:
          pieceAndPosition = this.findMovingPieceAndPosition();
          position = pieceAndPosition[pieceAndPosition.length - 1];
          piecePosition = pieceAndPosition[0];
          break;
        case PHASE.FLYING:
          pieceAndPosition = this.findFlyingPosition();
          position = pieceAndPosition[pieceAndPosition.length - 1];
          piecePosition = pieceAndPosition[0];
          break;
        default:
          pieceAndPosition = this.findPlacingPosition();
      }
    }

    if (piecePosition !== undefined) {
      GAME.destroyPiece(piecePosition);
    }
    GAME.setPieceOnPosition(position);
  }

  setLinesWeight() {
    const weightedLines = [];

    GAME.lines.forEach((line, index) => {
      let weight = 0;
      let ok = true;
      line.forEach((element) => {
        if (ok) {
          if (GAME.board[element] === this.marker) {
            weight++;
          } else if (GAME.board[element] !== undefined) {
            ok = false;
            weight = 0;
          }
        }
      });

      if (ok && weight > 0 && weight < 3) {
        weightedLines.push([index, weight]);
      }
    });

    return weightedLines;
  }

  pickEmptyPositionFromLine(lineIndex) {
    const line = GAME.lines[lineIndex];
    let selectedPosition;

    line.forEach((element) => {
      if (GAME.board[element] === undefined) {
        selectedPosition = element;
      }
    });

    return selectedPosition;
  }

  getEmptyLine() {
    let emptyLine;

    GAME.lines.forEach((line) => {
      if (line.every((position) => GAME.board[position] === undefined)) {
        emptyLine = line;
      }
    });

    return emptyLine;
  }

  dangerousEnemyLine() {
    let selectedLine;

    GAME.lines.forEach((line, index) => {
      if (selectedLine === undefined) {
        let sum = 0;
        line.forEach((element) => {
          if (
            GAME.board[element] !== undefined &&
            GAME.board[element] !== this.marker
          ) {
            sum++;
          }
        });

        if (sum === 2 && this.pickEmptyPositionFromLine(index) !== undefined) {
          selectedLine = index;
        }
      }
    });

    return selectedLine;
  }

  selectEnemyVulnerablePieceFromLine(lineIndex) {
    let selectedPiece;

    if (lineIndex !== undefined) {
      const line = GAME.lines[lineIndex];
      line.forEach((element) => {
        if (
          GAME.board[element] !== undefined &&
          GAME.board[element] !== this.marker &&
          !GAME.isLineComplete(element)
        ) {
          selectedPiece = element;
        }
      });
    }

    return selectedPiece;
  }

  selectEnemyVulnerablePieceFromBoard() {
    let selectedPiece;

    GAME.board.forEach((marker, index) => {
      if (
        marker !== undefined &&
        marker !== this.marker &&
        !GAME.isLineComplete(index)
      ) {
        selectedPiece = index;
      }
    });

    return selectedPiece;
  }

  selectEnemyPiece() {
    const lineIndex = this.dangerousEnemyLine();
    let enemyPiece = this.selectEnemyVulnerablePieceFromLine(lineIndex);

    if (enemyPiece === undefined) {
      enemyPiece = this.selectEnemyVulnerablePieceFromBoard();
    }

    return enemyPiece;
  }

  findNearbyPieceFor(position) {
    let nearbyPiece;

    GAME.graph.forEach((element) => {
      if (element[0] === position && GAME.board[element[1]] === this.marker) {
        nearbyPiece = element[1];
      } else if (
        element[1] === position &&
        GAME.board[element[0]] === this.marker
      ) {
        nearbyPiece = element[0];
      }
    });

    return nearbyPiece;
  }

  findAllNearbyPiecesFor(position) {
    const nearbyPieces = [];

    GAME.graph.forEach((element) => {
      if (element[0] === position && GAME.board[element[1]] === this.marker) {
        if (!nearbyPieces.includes(element[1])) {
          nearbyPieces.push(element[1]);
        }
      } else if (
        element[1] === position &&
        GAME.board[element[0]] === this.marker
      ) {
        if (!nearbyPieces.includes(element[0])) {
          nearbyPieces.push(element[0]);
        }
      }
    });

    return nearbyPieces;
  }

  findEmptyPositionWithNearbyPiece() {
    let selectedPosition, nearbyPiece;

    GAME.board.forEach((marker, position) => {
      if (
        marker === undefined &&
        (selectedPosition === undefined || nearbyPiece === undefined)
      ) {
        selectedPosition = position;
        nearbyPiece = this.findNearbyPieceFor(position);
      }
    });

    return [selectedPosition, nearbyPiece];
  }

  findAllEmptyPositionsWithNearbyPieces() {
    const emptyPositions = [];

    GAME.board.forEach((marker, position) => {
      let nearbyPieces = undefined;
      if (marker === undefined) {
        nearbyPieces = this.findAllNearbyPiecesFor(position);
        if (nearbyPieces !== undefined) {
          emptyPositions.push([position, nearbyPieces]);
        }
      }
    });

    return emptyPositions;
  }

  defensivePieces() {
    const totaltab = [];

    GAME.board.forEach((marker, index) => {
      if (marker === this.marker && GAME.intersection.includes(index)) {
        let total = 0;
        GAME.lines.forEach((line) => {
          if (line.includes(index)) {
            const tab = line.map((element) => GAME.board[element]);
            total += tab.filter(
              (element) => element !== this.marker && element !== undefined
            ).length;
          }
        });
        totaltab.push([index, total]);
      }
    });

    return totaltab;
  }

  findAnyPieceNotOnLine(lineIndex) {
    const line = GAME.lines[lineIndex];
    let selectedPiece;

    GAME.board.forEach((marker, index) => {
      if (marker === this.marker && !line.includes(index)) {
        selectedPiece = index;
      }
    });

    return selectedPiece;
  }

  prepareNextRoundAttack() {
    let selectedPosition, selectedPiece;
    const defensivePieces = this.defensivePieces()
      .filter((element) => element[1] >= 3)
      .map((element) => element[0]);
    const emptyPositions = this.findAllEmptyPositionsWithNearbyPieces();

    emptyPositions.forEach((position) => {
      const currentPosition = position[0];
      const nearbyPieces = position[1];
      nearbyPieces.forEach((piece) => {
        if (selectedPosition === undefined || selectedPiece === undefined) {
          GAME.board[currentPosition] = this.marker;
          GAME.board[piece] = undefined;
          if (!defensivePieces.includes(piece)) {
            const weightedLines = this.setLinesWeight();
            weightedLines.forEach((element) => {
              if (
                selectedPosition === undefined ||
                selectedPiece === undefined
              ) {
                const foundPosition = this.pickEmptyPositionFromLine(
                  element[0]
                );
                const tempPiece = this.findNearbyPieceFor(foundPosition);
                GAME.board[foundPosition] = this.marker;
                GAME.board[tempPiece] = undefined;
                if (GAME.isLineComplete(foundPosition)) {
                  selectedPiece = tempPiece;
                  selectedPosition = currentPosition;
                }
                GAME.board[foundPosition] = undefined;
                GAME.board[tempPiece] = this.marker;
              }
            });
          }
          GAME.board[currentPosition] = undefined;
          GAME.board[piece] = this.marker;
        }
      });
    });

    return [selectedPosition, selectedPiece];
  }

  findPlacingPosition() {
    let selectedPosition, dangerPosition;
    const weightedLines = this.setLinesWeight();
    const dangerLine = this.dangerousEnemyLine();

    if (dangerLine !== undefined) {
      dangerPosition = this.pickEmptyPositionFromLine(dangerLine);
    }

    if (weightedLines.length > 0) {
      const sortedWeightedLines = weightedLines.sort((a, b) => b[1] - a[1]);
      if (sortedWeightedLines[0][1] === 2) {
        selectedPosition = this.pickEmptyPositionFromLine(
          sortedWeightedLines[0][0]
        );
      } else if (dangerPosition !== undefined) {
        selectedPosition = dangerPosition;
      } else {
        selectedPosition = this.pickEmptyPositionFromLine(
          sortedWeightedLines[0][0]
        );
      }
    }

    if (selectedPosition === undefined) {
      if (dangerPosition !== undefined) {
        selectedPosition = dangerPosition;
      } else {
        const emptyLine = this.getEmptyLine();
        if (emptyLine !== undefined) {
          selectedPosition =
            emptyLine[Math.floor(Math.random() * emptyLine.length)];
        } else {
          selectedPosition = Math.floor(Math.random() * GAME.boardSize);
        }
      }
    }

    return selectedPosition;
  }

  findMovingPieceAndPosition() {
    let selectedPiece, selectedPosition, dangerPosition;
    const weightedLines = this.setLinesWeight();
    const dangerLine = this.dangerousEnemyLine();

    if (dangerLine !== undefined) {
      dangerPosition = this.pickEmptyPositionFromLine(dangerLine);
    }

    if (weightedLines.length > 0) {
      const filteredWeightedLines = weightedLines.filter(
        (line) => line[1] === 2
      );
      filteredWeightedLines.forEach((element) => {
        if (selectedPosition === undefined || selectedPiece === undefined) {
          selectedPosition = this.pickEmptyPositionFromLine(element[0]);
          const tempPiece = this.findNearbyPieceFor(selectedPosition);
          GAME.board[selectedPosition] = this.marker;
          GAME.board[tempPiece] = undefined;
          if (GAME.isLineComplete(selectedPosition)) {
            selectedPiece = tempPiece;
          }
          GAME.board[selectedPosition] = undefined;
          GAME.board[tempPiece] = this.marker;
        }
      });
    }

    if (
      (selectedPosition === undefined || selectedPiece === undefined) &&
      dangerPosition !== undefined
    ) {
      selectedPosition = dangerPosition;
      selectedPiece = this.findNearbyPieceFor(dangerPosition);
    }

    if (selectedPosition === undefined || selectedPiece === undefined) {
      const nextMove = this.prepareNextRoundAttack();
      selectedPosition = nextMove[0];
      selectedPiece = nextMove[1];
    }

    if (selectedPosition === undefined || selectedPiece === undefined) {
      const emptyPositionAndNearbyPiece =
        this.findEmptyPositionWithNearbyPiece();
      selectedPosition = emptyPositionAndNearbyPiece[0];
      selectedPiece = emptyPositionAndNearbyPiece[1];
    }

    return [selectedPiece, selectedPosition];
  }

  findFlyingPosition() {
    let selectedPiece, selectedPosition, dangerPosition;
    const weightedLines = this.setLinesWeight();
    const dangerLine = this.dangerousEnemyLine();

    if (dangerLine !== undefined) {
      dangerPosition = this.pickEmptyPositionFromLine(dangerLine);
    }

    if (weightedLines.length > 0) {
      const sortedWeightedLines = weightedLines.sort((a, b) => b[1] - a[1]);
      if (sortedWeightedLines[0][1] === 2) {
        selectedPosition = this.pickEmptyPositionFromLine(
          sortedWeightedLines[0][0]
        );
        selectedPiece = this.findAnyPieceNotOnLine(sortedWeightedLines[0][0]);
      }
    }

    if (
      (selectedPosition === undefined || selectedPiece === undefined) &&
      dangerPosition !== undefined
    ) {
      selectedPosition = dangerPosition;
      selectedPiece = this.findAnyPieceNotOnLine(dangerLine);
    }

    if (selectedPosition === undefined || selectedPiece === undefined) {
      weightedLines.forEach((element) => {
        if (selectedPosition === undefined || selectedPiece === undefined) {
          selectedPosition = this.pickEmptyPositionFromLine(element[0]);
          selectedPiece = this.findAnyPieceNotOnLine(element[0]);
        }
      });
    }

    return [selectedPiece, selectedPosition];
  }
}
