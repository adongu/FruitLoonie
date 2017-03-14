# FruitLoonie

### Background
FruitLoonie is an interactive slashing game inspired by Fruit Ninja with one simple objective, slashing as many fruits as possible without having slip pass or slashing a bomb.

1) All fruits on screen must be slashed or a strike will be given,
2) All bomb slashes will cause a strike to be given,
3) 3 Strikes will be game over.

This game will only utilize ES6, babel.js, Create.Js, and canvas.

### Functionality & MVP  


### Wireframes

This app will consist of a single screen with game interface, difficulty controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start and pause.  On the right, three clickable shapes will be used to toggle between the difficulty of the game.

![wireframes][wireframes]

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`sliceable.js`: this script will handle the logic of the object generated.  An fruit object will import by (Fruit and Bomb classes)


`generate.js`: this script will house the constructor and update functions for the `fruit objects`.

`game.js`: this script will handle the logic of slashing a correct fruit object vs slashing the bomb object. Strike system will also be monitored by it.



### Bonus features

Additional Features could include:

- [ ] Adding combos to slashing multiple fruits together
- [ ] Add animations for bomb explosion
- [ ] Implement scoreboard to keep track of highest and previous score


[wireframes]: ./assets/wireframe.png
