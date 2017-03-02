# FruitLoonie

### Background
FruitLoonie is an interactive slashing game inspired by Fruit Ninja with one simple objective, slashing as many fruits as possible without having slip pass or slashing a bomb.

1) All fruits on screen must be slashed or a strike will be given,
2) All bomb slashes will cause a strike to be given,
3) 3 Strikes will be game over.

This game will only utilize ES6, babel.js, Easel.js, and canvas.

### Functionality & MVP  

With FruitLoonie, users will be able to:

- [ ] Start, pause, and reset the game board after 3 strikes
- [ ] Random fruit objects appearing bottom border
- [ ] Choose difficulty level to change how fast fruits appear and how slow fruits fly
- [ ] Slash fruits by moving cursor across fruits
- [ ] Score to keep track of current score

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

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


### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 4 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element
- Refresh Canvas skills

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Fruit` object to connect to the `Board` object.  Then, use `board.js` to create and render at least 4 types of fruits.  Build in the ability to toggle the game difficulty to decide speed and physics. Goals for the day:

- Complete the `fruit.js` module (constructor, update functions)
- Find out physics formula for projectiles and apply to `generate.js`
- Make each fruit on the board slash-able, toggling the state of the square on slash

**Day 3**: Create the generate logic backend.  Build out modular functions for handling the different difficulty. Incorporate the `generate.js` logic into the `Board.js` rendering.  Goals for the day:

- Export an `Generate` object with correct type and handling logic
- Have a functional board on the `Canvas` frontend that correctly handles iterations from one generation of the game to the next


**Day 4**: Implement slashing to correctly connect the backend.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game difficulty, pause, start
- Have a styled `Canvas`, nice looking controls and title
- If time: include fruit animations splatters


### Bonus features

Additional Features could include:

- [ ] Adding combos to slashing multiple fruits together
- [ ] Add animations for bomb explosion
- [ ] Implement scoreboard to keep track of highest and previous score


[wireframes]: ./assets/wireframe.png
