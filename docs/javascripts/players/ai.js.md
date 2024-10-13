# ai.js

This ai.js File provides a detailed technical analysis of the AI system implemented in the accompanying JavaScript code. It focuses on the algorithms and techniques the AI employs to guide an artificial player through multiple phases of gameplay—placing, moving, and flying pieces. The AI adapts its strategy based on the current game state, leveraging randomness, state evaluation, heuristic search, and decision-making algorithms to determine its moves.

The AI demonstrates a blend of offensive and defensive strategies, switching from random initial decisions to more sophisticated evaluations as the game progresses.

## Key AI Concepts Utilized

### 1. Randomness in Decision Making

In the early phases, the AI uses randomness to introduce unpredictability in its behavior. For example, the `pickPosition()` method generates a random number to select board positions during the placing phase when no clear strategy is apparent.

### 2. State Evaluation

The AI continuously evaluates the game board, identifying vulnerable pieces, open positions, and strategic lines. Key functions, such as `setLinesWeight()`, `dangerousEnemyLine()`, and `defensivePieces()`, guide these decisions:

- **`setLinesWeight()`**: Assigns weights to lines based on how many AI pieces are present and the potential to complete a line. This helps in formulating offensive strategies.
- **`dangerousEnemyLine()`**: Detects lines where the opponent is close to completing a win, enabling the AI to block these lines.

### 3. Heuristic Search

The AI implements a heuristic search to optimize move selection. It uses game-specific heuristics to prioritize moves, such as blocking enemy progress, completing its own lines, or defending key pieces. Functions like `findPlacingPosition()` and `findMovingPieceAndPosition()` utilize these heuristics to find the best available moves.

### 4. Minimax Algorithm (with Adaptations)

Although not explicitly implemented, the AI’s behavior resembles a minimax approach, considering both offensive and defensive opportunities. By evaluating future moves, the AI aims to maximize its advantage while minimizing the opponent's threats:

- **`prepareNextRoundAttack()`**: Simulates future game states to strategize upcoming moves, mimicking minimax-like decision-making.

### 5. Greedy Algorithm

In certain scenarios, the AI employs a greedy algorithm to maximize immediate gains, such as completing a winning line. This is evident in the `findFlyingPosition()` and `findMovingPieceAndPosition()` methods, where the AI prioritizes moves that lead to quick victories or block the opponent.

### 6. Defensive Strategy

Defensive play is essential to the AI's strategy. Methods like `dangerousEnemyLine()` and `defensivePieces()` allow the AI to block the opponent's winning moves and protect its own critical pieces.

### 7. Graph-Based Search for Nearby Pieces

The game board is treated as a graph, where the AI evaluates connected components of its pieces during the moving and flying phases. The `findAllNearbyPiecesFor()` method traverses this graph to identify all nearby pieces, enhancing the AI’s ability to plan strategic moves based on adjacency.

## Detailed Breakdown of AI Methods

### - `pickPosition()`

Determines the position where the AI will place a piece. Initially uses randomness but becomes more sophisticated by considering line weights and enemy threats as the game progresses.

### - `setLinesWeight()`

Assigns a weight to each line based on the presence of the AI’s pieces, guiding offensive and defensive strategies.

### - `dangerousEnemyLine()`

Identifies lines where the opponent is close to forming a complete line, allowing the AI to block these critical threats.

### - `findMovingPieceAndPosition()`

Finds the optimal piece to move during the moving phase. The AI evaluates line weights, nearby pieces, and potential threats to select the best move.

### - `findFlyingPosition()`

Determines the best piece to move and its destination in the flying phase. Prioritizes moves that either complete lines or block the opponent.

### - `selectEnemyPiece()`

This and related methods help the AI identify vulnerable enemy pieces to target, focusing on pieces not part of a complete line to disrupt the opponent's strategy.

## AI Techniques Summary

- **Random Decision Making**: Adds unpredictability in the early phases.
- **Heuristic Search**: Optimizes move selection based on board state evaluation.
- **Greedy Algorithm**: Prioritizes quick wins, like completing lines.
- **Minimax Principles**: Implicit in strategies that maximize the AI’s advantage while minimizing the opponent's.
- **Graph Search**: Evaluates nearby pieces and connected components for strategic planning.
- **Defensive and Offensive Play**: Balances both attacking and defending throughout the game.
