class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Piece extends Point {
  constructor(x, y, marker = undefined) {
    super(x, y);
    this.marker = marker;
  }
}

const PHASE = {
  PLACING: { value: 0, name: "Placing pieces" },
  MOVING: { value: 1, name: "Moving pieces" },
  FLYING: { value: 2, name: "Flying" },
};

class Player {
  constructor(type, username, marker) {
    this.type = type;
    this.stockPieces = 12;
    this.username = username;
    this.marker = marker;
    this.phase = PHASE.PLACING;
  }
}
