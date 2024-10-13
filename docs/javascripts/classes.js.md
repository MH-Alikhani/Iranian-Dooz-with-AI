# classes.js

This file defines essential classes and components that model the structure of a **game involving pieces**, players, and phases of gameplay. It uses **object-oriented programming (OOP)** concepts in JavaScript such as classes, inheritance, and object instantiation to manage points on a game board, pieces placed on it, and player interactions.

Here’s a detailed breakdown of each part:

---

## 1. **The Point Class**

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

### Purpose:

- The `Point` class represents a **coordinate** on a 2D grid, such as a position on a game board.

### Explanation:

- **Constructor**:
  - **`x`**: The x-coordinate of the point.
  - **`y`**: The y-coordinate of the point.

The `Point` class is fundamental for any game that operates on a grid or board. It helps in representing any position or cell, enabling easy reference by its `(x, y)` coordinates.

---

## 2. **The Piece Class** (Inheriting from Point)

```javascript
class Piece extends Point {
  constructor(x, y, marker = undefined) {
    super(x, y);
    this.marker = marker;
  }
}
```

### Purpose:

- The `Piece` class represents a **game piece** on the board, located at a specific point (inherited from the `Point` class) and identified by a **marker**.

### Explanation:

- **Inheritance**:

  - `Piece` **inherits** from `Point`, meaning it has the coordinates `x` and `y` defined in the parent class.

- **Constructor**:

  - **`x`**: The x-coordinate where the piece is placed.
  - **`y`**: The y-coordinate of the piece’s location.
  - **`marker`**: A symbol or identifier for the piece, such as the player's token or piece type. The marker could represent different types of pieces (e.g., a player’s piece or an empty spot).

- **super(x, y)**:
  - The `super()` function calls the parent class (`Point`) constructor to ensure that the `x` and `y` coordinates are properly initialized.

The `Piece` class combines the positional aspect of the game (coordinates) with an identifier (the marker), making it suitable for any game where pieces need to be moved or placed on a grid.

---

## 3. **The PHASE Object**

```javascript
const PHASE = {
  PLACING: { value: 0, name: "Placing pieces" },
  MOVING: { value: 1, name: "Moving pieces" },
  FLYING: { value: 2, name: "Flying" },
};
```

### Purpose:

- The `PHASE` object is an **enumeration (enum)** that defines the different **phases** or stages of the game.

### Explanation:

- **Enumeration**:
  - The phases of the game are represented as an object with a `value` and `name` for each phase:
    - **`PLACING`**: (Value 0) The phase where players place pieces on the board.
    - **`MOVING`**: (Value 1) The phase where players move pieces around the board.
    - **`FLYING`**: (Value 2) A special phase where pieces may "fly" (move to any position).

The `PHASE` object helps manage the current state of the game, ensuring that different phases follow their respective rules and logic.

---

## 4. **The Player Class**

```javascript
class Player {
  constructor(type, username, marker) {
    this.type = type;
    this.stockPieces = 12;
    this.username = username;
    this.marker = marker;
    this.phase = PHASE.PLACING;
  }
}
```

### Purpose:

- The `Player` class represents a **player in the game**, tracking their type (e.g., human or AI), name, number of available pieces, marker, and which phase they are currently in.

### Explanation:

- **Constructor**:
  - **`type`**: The player’s type, which could be `"human"` or `"AI"`.
  - **`username`**: The player’s unique name or identifier.
  - **`marker`**: The symbol or token used to represent the player’s pieces on the board (e.g., "X" or "O").
  - **`stockPieces`**: Initially set to `12`, this could represent the number of pieces the player has left to place on the board.
  - **`phase`**: The player's current phase of gameplay, initially set to `PHASE.PLACING` (i.e., the player starts in the "Placing" phase).

The `Player` class models essential player-related attributes, managing their interaction with the game (i.e., placing and moving pieces based on game phases).

---

## 5. **Code Workflow and Structure**

### Workflow Summary:

1. **`Point` Class**: Defines the basic coordinate system for positions on the game board.
2. **`Piece` Class**: Inherits from `Point` to represent pieces placed at specific positions with additional attributes (e.g., marker).
3. **`PHASE` Object**: Enum-like object to control the flow of the game by defining different phases (placing, moving, flying).
4. **`Player` Class**: Manages each player’s attributes, including their marker, the number of pieces left, and the current game phase.

### How It Fits Together:

- **Inheritance**: `Piece` inherits from `Point`, allowing it to use the `x` and `y` coordinates as part of the board’s coordinate system.
- **Phases**: The `PHASE` object defines the different stages of the game, determining how the `Player` interacts with the board (placing or moving pieces).
- **Player Actions**: The `Player` class holds information about the player's status in the game, such as how many pieces are left and what phase they are in.

## Code Structure

- **`Point` Class**: Manages the grid system, defining positions on the board.
- **`Piece` Class**: Represents game pieces placed on specific points on the board, marked by a player’s token or symbol.
- **`PHASE` Object**: Enum-like object defining different stages of gameplay (placing, moving, flying).
- **`Player` Class**: Defines a player’s properties, tracking their pieces, phase, and actions in the game.

This code forms a foundational structure for a grid-based game where players place and move pieces in multiple phases. It is extendable, flexible, and provides a solid framework for implementing additional game rules, AI interactions, and advanced game mechanics.
