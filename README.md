# Iranian Dooz with AI
[![Wiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/MH-Alikhani/Iranian-Dooz-with-AI)

## Overview

Welcome to the Iranian Dooz game with AI, an engaging and strategic board game designed for two players. This project implements a modern, browser-based version of the traditional Iranian Dooz game, enhanced with an intelligent AI opponent. The game is built using JavaScript, AngularJS, and HTML5 Canvas, providing a seamless user experience across all major browsers.

---

## Features

### Game Mechanics

- **Phases**: The game consists of three distinct phases:
  - **Placing**: Players place their pieces on the board.
  - **Moving**: Players move their pieces along connected lines.
  - **Flying**: Players move their pieces freely across the board when they have fewer than three pieces remaining.
  
- **Victory Conditions**: 
  - **Capture**: Remove all your opponent's pieces.
  - **Stalemate**: The game ends in a draw if neither player can make a valid move.

- **AI Opponent**: An advanced AI opponent that uses sophisticated algorithms to challenge human players, including:
  - Strategic placement and movement.
  - Defensive tactics to protect its pieces.
  - Offensive strategies to capture the opponent's pieces.
  - Adapting to different game states and phases.

### Technical Implementation

- **JavaScript**: The core logic of the game is implemented in JavaScript, leveraging ES6+ features for modern and efficient code.
- **AngularJS**: The game controller is managed using AngularJS, ensuring smooth interactions and updates.
- **HTML5 Canvas**: The game board and pieces are rendered using HTML5 Canvas for high-performance graphics and animations.
- **Responsive Design**: The game adapts seamlessly to various screen sizes, ensuring an optimal experience on both desktop and mobile devices.

### User Interface

- **Interactive Board**: Click on the board to place or move pieces.
- **Dynamic Graphics**: Real-time rendering of pieces and board state changes.
- **User Feedback**: Immediate feedback on valid and invalid moves, and notifications for capturing pieces.
- **New Game Button**: Restart the game at any time.

---

## Directory Structure

```plaintext
mh-alikhani-iranian-dooz-with-ai/
├── index.html
├── js/
│   ├── classes.js          # Core game classes (Point, Piece, Player, etc.)
│   ├── colors.js           # Color definitions for the game
│   ├── morabaraba.js       # Main game logic and flow
│   ├── ui.js               # User interface management
│   ├── helpers/
│   │   └── simpleClass.js  # Helper class for inheritance
│   └── players/
│       ├── ai.js           # AI player implementation
│       └── human.js        # Human player implementation
└── README.md               # This file
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (for running the game locally)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mh-alikhani-iranian-dooz-with-ai.git
   cd mh-alikhani-iranian-dooz-with-ai
   ```

2. Open `index.html` in your preferred web browser.

### Running Locally

If you want to run the game locally for development purposes, follow these steps:

1. Install Node.js and npm.
2. Navigate to the project directory.
3. Run the following command to start a local server:
   ```bash
   npx http-server
   ```
4. Open your browser and navigate to `http://localhost:8080`.

---

## Contributing

We welcome contributions to enhance the game! Here’s how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they are thoroughly tested.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
