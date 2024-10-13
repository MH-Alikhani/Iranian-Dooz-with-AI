# index.html

This web-based version of the traditional **Iranian "Dooz" game** features an AI opponent and is built using **AngularJS**, **HTML5 Canvas**, and **JavaScript**. The front-end interface is enhanced with **Bootstrap** and **CSS**, while the game's logic, player interactions, and AI decision-making are handled by custom JavaScript files. The game allows a human player to compete against an AI opponent in an interactive and responsive environment.

---

## Key Components

### 1. **HTML Structure**

The core of the game is structured using **AngularJS**, a front-end framework for dynamic and interactive content:

```html
<html ng-app="ngMorabaraba" ng-controller="ngMorabarabaCtrl" ng-cloak></html>
```

- **`ng-app="ngMorabaraba"`**: Initializes an AngularJS application named `ngMorabaraba`.
- **`ng-controller="ngMorabarabaCtrl"`**: Binds the AngularJS controller `ngMorabarabaCtrl` to handle the game's logic and UI updates.
- **`ng-cloak`**: Ensures that the content remains hidden until AngularJS has fully loaded to prevent a flash of unstyled content (FOUC).

### 2. **Meta Tags**

Meta tags ensure the page is optimized for search engines (SEO) and mobile responsiveness:

```html
<title>Iranian Dooz game with AI | Mohammad Hossein Alikhani</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="author" content="Mohammad Hossein Alikhani" />
```

- **Title**: Sets the page title to "Iranian Dooz game with AI".
- **Viewport**: Ensures responsive layout for mobile and desktop devices.
- **Author**: Credits the developer, Mohammad Hossein Alikhani.

### 3. **Styles and External Resources**

The game’s layout and style are enhanced using **Bootstrap** and **Google Fonts**:

```html
<link
  href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css?family=Open+Sans"
  rel="stylesheet"
  type="text/css"
/>
```

- **Bootstrap**: Provides prebuilt components and a responsive grid system for the layout.
- **Google Fonts (Open Sans)**: Adds a clean, modern font style to the game interface.

### 4. **Custom Styling**

CSS defines the layout and appearance of the game interface:

```css
html,
body {
  height: 100%;
  background: #effffd;
}

#wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-left: 12px;
}
```

- **Flexbox Layout**: Ensures that the game content is centered both vertically and horizontally.
- **Canvas Styling**: The game board and pieces are rendered on two `<canvas>` elements that are styled for positioning and responsiveness.

### 5. **AngularJS Directives and Game UI**

The UI is dynamically controlled using **AngularJS directives**:

```html
<p class="lead">{{GAME.currentPlayer.username}} against the AI algorithm</p>
```

- **Data Binding**: AngularJS expressions like `{{GAME.currentPlayer.username}}` dynamically update the player's name based on the game state.

Visibility of elements is controlled by `ng-show` and `ng-hide` directives based on game conditions:

```html
<div ng-hide="GAME.newGameButton">
  <div class="game-info game-info-left">{{GAME.currentPlayer.username}} is</div>
  <div class="game-info game-info-right">{{GAME.currentPlayer.phase.name}}</div>
</div>
```

- **`ng-hide`**: Hides elements, such as game information, when the `newGameButton` is not displayed.
- **Game Phases**: Displays the player's current phase (e.g., placing or moving pieces) during gameplay.

### 6. **Canvas for Game Board and Pieces**

Two `<canvas>` elements are used to render the game board and pieces, facilitating dynamic drawing of the game:

```html
<canvas id="board"></canvas> <canvas id="pieces"></canvas>
```

- The game board and pieces are drawn programmatically using **JavaScript** functions defined in the external scripts.

### 7. **JavaScript Dependencies**

Several JavaScript libraries and custom scripts are included:

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"></script>
<script src="javascripts/helpers/simpleClass.js"></script>
<script src="javascripts/classes.js"></script>
<script src="javascripts/colors.js"></script>
<script src="javascripts/players/human.js"></script>
<script src="javascripts/players/ai.js"></script>
<script src="javascripts/ui.js"></script>
<script src="javascripts/morabaraba.js"></script>
```

- **AngularJS**: Manages the UI and user interactions with two-way data binding and directive-based logic.
- **Underscore.js**: Provides utility functions like array manipulation to simplify coding.
- **Custom JavaScript Files**: Include game logic, player interaction, AI behavior (`ai.js`), and UI rendering logic (`ui.js`).

---

## Game Functionality

### 1. **Game Logic**

- **Turn Management**: The game’s logic is controlled by AngularJS, which captures the player's moves and updates the state in real-time. The human player interacts with the game via the UI, while the AI opponent processes its move through algorithms.
- **Phase Control**: The game progresses through different phases, such as placing pieces or moving them, which are controlled by AngularJS using the `PHASE` object defined in the JavaScript logic.

### 2. **AI Player**

- **AI Logic**: The AI opponent, defined in `players/ai.js`, uses a decision-making algorithm (likely **minimax** or a heuristic-based approach) to compete against the human player.
- **Gameplay Interaction**: The AI evaluates the current game state after the human player’s move and calculates the optimal counter-move based on game rules and strategies.

### 3. **Canvas Rendering**

- **HTML5 Canvas API**: The board and pieces are dynamically drawn and updated using the canvas elements. JavaScript drawing functions manage the appearance of the board and the placement or movement of pieces based on the game state.

---

This implementation of the **Iranian "Dooz" game** leverages **AngularJS** for dynamic UI updates, **HTML5 canvas** for rendering the game board and pieces, and custom **JavaScript** for managing game logic, AI functionality, and player interactions. By combining these technologies, the game provides an interactive and responsive experience where a human player can compete against an AI opponent in a web-based environment.
