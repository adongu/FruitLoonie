/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sliceables = __webpack_require__(2);

var _sliceables2 = _interopRequireDefault(_sliceables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Player from ""

var Game = function () {
  function Game(stage, manifest, sliceableImgs) {
    _classCallCheck(this, Game);

    this.stage = stage;
    this.manifest = manifest;
    this.sliceableImgs = sliceableImgs;
    this.canvas = document.getElementById("boardCanvas");
    this.pause = false;
    this.started = false;
    this.gameOver = false;
    this.difficulty = 20;
    this.score = 0;
    this.strikes = 0;
    this.scoreField = new createjs.Text("Score: " + this.score, "bold 18px Arial", "#f70");
    this.strikesField = new createjs.Text("Strikes: " + this.strikes, "bold 18px Arial", "#f00");
    this.width = stage.x;
    this.height = stage.y;
    this.loader = new createjs.LoadQueue(false);
    this.loader.installPlugin(createjs.Sound);
    createjs.MotionGuidePlugin.install();
    this.sliceables = new _sliceables2.default(this.stage, this.difficulty, this.loader);
    this.tick = this.tick.bind(this);
    // this.createFields = this.createFields.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    // this.handleKeys = this.handleKeys.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.updateStrikes = this.updateStrikes.bind(this);
    this.updateScore = this.updateScore.bind(this);
    // this.restart = this.restart.bind(this);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.loader.addEventListener("complete", this.handleComplete);
      this.loader.loadManifest(this.manifest, true, "./assets/game/");
      this.loader.loadManifest(this.sliceableImgs, true, "./assets/sliceables/");
    }
  }, {
    key: "handleComplete",
    value: function handleComplete() {
      var _this = this;

      var background = new createjs.Bitmap(this.loader.getResult("background"));
      this.stage.addChild(background);
      this.sliceables.createSliceables(this.width);
      this.createFields("scoreField", "strikesField");
      this.stage.update();
      document.onkeydown = function () {
        _this.handleKeys(event);
      };
    }
  }, {
    key: "createFields",
    value: function createFields() {
      this.scoreField.textAlign = "right";
      this.stage.addChild(this.scoreField);
      this.scoreField.maxWidth = 1000;
      this.scoreField.x = 120;
      this.scoreField.y = 20;

      this.strikesField.textAlign = "right";
      this.stage.addChild(this.strikesField);
      this.strikesField.maxWidth = 1000;
      this.strikesField.x = 600;
      this.strikesField.y = 20;

      this.stage.update();
    }
  }, {
    key: "handlePlay",
    value: function handlePlay() {
      if (!this.pause && !this.gameOver) {
        this.sliceables.stageSliceables();
      }
      // setInterval(this.handlePlay(), 4000);
    }
  }, {
    key: "tick",
    value: function tick(event) {
      // let deltaS = event.delta / 1000;
      //   let self = this;
      //   // Object.keys(this.circles).forEach((id) =>{
      //
      //     // self.circles[id].alpha = 0;
      this.sliceables.moveSliceables();
      this.updateStrikes();
      this.updateScore();
      // this.checkCollision(pt, id)
      //   // })
      this.stage.update();
    }
  }, {
    key: "handleKeys",
    value: function handleKeys(e) {
      this.strikes = this.strikesField.text.split(": ").slice(1) * 1;
      // game pause
      if (e.keyCode === 32 && this.started) {
        createjs.Ticker.setPaused(!this.pause);
        this.pause = !this.pause;
        this.stage.mouseEnabled = !this.pause;
        // createjs.Ticker.setPaused = true;
      } else if (e.keyCode === 13 && !this.started) {
        createjs.Ticker.addEventListener("tick", this.tick);
        this.handlePlay();
        setInterval(this.handlePlay, 1700);
        this.started = true;
      } else if (e.keyCode === 13 && this.strikes >= 3) {
        this.restart();
      }
    }
  }, {
    key: "updateStrikes",
    value: function updateStrikes() {
      this.strikes += this.sliceables.checkOutOfBounds();
      this.strikesField.text = "Strikes: " + this.strikes;
      // this.checkGameOver();
    }
  }, {
    key: "updateScore",
    value: function updateScore() {
      this.score += this.sliceables.checkCollisions();
      this.scoreField.text = "Strikes: " + this.score;
    }
  }, {
    key: "checkGameOver",
    value: function checkGameOver() {
      if (this.strikes >= 3) {
        this.gameOver = true;
        var gameOverImg = new createjs.Bitmap(this.loader.getResult("game_over"));
        this.gameOverImg.maxWidth = 1000;
        this.gameOverImg.x = 120;
        this.gameOverImg.y = 20;
        this.stage.addChild(gameOverImg);
        this.stage.update();
      }
    }
  }, {
    key: "restart",
    value: function restart() {
      this.stage.removeAllChildren();
      this.started = false;
      this.strikes = 0;
      this.score = 0;
      this.gameOver = false;
      // this.stage.addChild(scoreBoard);
      this.handleComplete();
    }
  }]);

  return Game;
}();

exports.default = Game;
;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sliceable = function () {
  function Sliceable(loader) {
    _classCallCheck(this, Sliceable);

    this.circles = {};
    this.radius = 45;
    this.loader = loader;
    this.generateSliceables = this.generateSliceables.bind(this);
    //"bomb"
    this.types = ["peach", "apple", "strawberry", "watermelon"];
    this.determineSliceable = this.determineSliceable.bind(this);
    this.initializeProperties = this.initializeProperties.bind(this);
  }

  _createClass(Sliceable, [{
    key: "generateSliceables",
    value: function generateSliceables(width, difficulty) {
      var radius = this.radius;
      this.circles = {};
      for (var i = 0; i < difficulty; i++) {
        this.circles[i] = new createjs.Shape();

        this.circles[i].graphics.beginFill("black").drawCircle(radius, radius, radius);
        this.circles[i].alpha = 0;
        this.circles[i].type = this.determineSliceable();
        // for checking times out of border length, 1 for creating, 2 to unstage
        this.circles[i].model = new createjs.Bitmap(this.loader.getResult("" + this.circles[i].type));

        // this.initializeProperties(i);

        this.circles[i].snapToPixel = true;
        this.circles[i].model.snapToPixel = true;
        this.circles[i].cache(0, 0, radius * 2, radius * 2);
      }
      createjs.Ticker.setFPS(60);
      return this.circles;
    }
  }, {
    key: "initializeProperties",
    value: function initializeProperties(i, width) {
      var x = 0 + Math.random() * 100;
      var y = 400;
      var angle = 45 + Math.random() * 10;
      var end = 580 + Math.random() + 50;
      this.circles[i].outOfBounds = false;

      this.circles[i].x = x;
      this.circles[i].y = y;
      this.circles[i].begin = x;
      this.circles[i].end = end;
      this.circles[i].angle = angle;

      this.circles[i].model.x = x;
      this.circles[i].model.y = y + 5;
      this.circles[i].model.begin = x;
      this.circles[i].model.end = end;
      this.circles[i].model.angle = angle;
    }
  }, {
    key: "determineSliceable",
    value: function determineSliceable() {
      var type = Math.round(Math.random() * 4);
      return this.types[type];
    }
  }]);

  return Sliceable;
}();

exports.default = Sliceable;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sliceable = __webpack_require__(1);

var _sliceable2 = _interopRequireDefault(_sliceable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sliceables = function () {
  function Sliceables(stage, difficulty, loader) {
    _classCallCheck(this, Sliceables);

    this.circles = {};
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    this.radius = 50;
    this.beginCounter = 0;
    this.velocity = 1.5;
    this.minimumSliceables = 4;
    this.difficulty = difficulty;
    this.gravity = 4;
    this.score = 0;
    this.strikes = 0;
    this.loader = loader;
    // amount of objects per cycle;
    this.sliceable = new _sliceable2.default(loader);
    this.stageSliceables = this.stageSliceables.bind(this);
    this.createSliceables = this.createSliceables.bind(this);
    this.moveSliceables = this.moveSliceables.bind(this);
    this.checkOutOfBounds = this.checkOutOfBounds.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stagedCirclesIds = this.stagedCirclesIds.bind(this);
  }

  _createClass(Sliceables, [{
    key: "stageSliceables",
    value: function stageSliceables() {
      // number of circles to add
      var numCircles = 0;
      var stagedCirclesIds = this.stagedCirclesIds();
      var id = 0;
      // check for unstaged circles, make sure doesn't stage more than created
      if (stagedCirclesIds && stagedCirclesIds.length + this.minimumSliceables <= this.difficulty) {
        while (numCircles < this.minimumSliceables) {
          if (stagedCirclesIds.indexOf(id) === -1) {
            // this.circles[id].outOfBounds = false;
            this.sliceable.initializeProperties(id, this.width);
            this.stage.addChild(this.circles[id]);
            this.stage.addChild(this.circles[id].model);
            createjs.Sound.play("throw_sound", { volume: 0.025 });
            stagedCirclesIds.push(id);
            numCircles += 1;
          }
          this.stage.update();
          id += 1;
        }
        this.stage.update();
      }
    }
    // array of staged circle ids

  }, {
    key: "moveSliceables",
    value: function moveSliceables() {
      var self = this;
      var stagedCirclesIds = this.stagedCirclesIds();
      if (stagedCirclesIds.length > 0) {
        stagedCirclesIds.forEach(function (id) {
          var deltaX = self.projectileMotionX(self.circles[id].x);
          var deltaY = self.projectileMotionY(self.circles[id].x);

          self.circles[id].x += deltaX;
          self.circles[id].model.x += deltaX;
          self.circles[id].y += deltaY;
          self.circles[id].model.y += deltaY;

          // self.handleSliceables(self.circles[id], time)
          self.stage.update();
          // }
        });
      }
      this.stage.update();
    }
  }, {
    key: "projectileMotionX",
    value: function projectileMotionX(x) {
      return 2 * this.velocity;
    }
  }, {
    key: "projectileMotionY",
    value: function projectileMotionY(x) {
      if (x <= 320) {
        return -.26333333 * Math.pow(x, 2) / 100000 - 2;
        // - 3 + Math.random()*1;
      } else {
        return .2633333 * Math.pow(x, 2) / 100000 + 2;
        // + 3 + Math.random()*1;
      }
    }
  }, {
    key: "createSliceables",
    value: function createSliceables(width) {
      this.circles = this.sliceable.generateSliceables(width, this.difficulty);
    }
  }, {
    key: "checkOutOfBounds",
    value: function checkOutOfBounds(id) {
      var self = this;
      var strikes = 0;
      this.stagedCirclesIds().forEach(function (id) {
        // if greater than midpoint of canvas check if greater than width and height of canvas, doesn't check already out of bounds shapes
        if (self.circles[id].outOfBounds === false && self.circles[id].x > self.width / 2 && (self.circles[id].y > self.height || self.circles[id].x > self.width)) {
          self.circles[id].outOfBounds = true;
          strikes += 1;
          self.stage.removeChild(self.circles[id]);
          self.stage.removeChild(self.circles[id].model);
          console.log("outofBounds ", id);
          self.stage.update();
          // this.circles[id].mouseEnabled = false;
        }
        self.stage.update();
      });
      return strikes;
    }
  }, {
    key: "stagedCirclesIds",
    value: function stagedCirclesIds() {
      var circles = this.stage.children.filter(function (child) {
        // child is circle if it has type property
        return child.type ? true : false;
      });
      return circles.map(function (circle) {
        return circle.cacheID - 1;
      });
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var _this = this;

      var pt = void 0;
      var self = this;
      var score = 0;
      this.stagedCirclesIds().forEach(function (id) {
        pt = _this.circles[id].globalToLocal(_this.stage.mouseX, _this.stage.mouseY);
        // this.circles[id] && this.stage.mouseInBounds &&
        if (_this.circles[id].hitTest(pt.x, pt.y) && _this.circles) {
          _this.playSound("splatter");
          score += 1;
          _this.circles[id].mouseEnabled = false;
          _this.stage.removeChild(_this.circles[id].model);
          _this.stage.removeChild(_this.circles[id]);
          _this.stage.update();
        }
      });
      return score;
    }
  }, {
    key: "playSound",
    value: function playSound(type) {
      if ("splatter") {
        createjs.Sound.play("splatter_sound", { volume: 0.020 });
      } else if ("throw") {
        createjs.Sound.play("throw_sound", { volume: 0.025 });
      }
    }
  }]);

  return Sliceables;
}();

exports.default = Sliceables;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var manifest = [{ src: "bomb-explode.ogg", id: "boom_sound" }, { src: "splatter.ogg", id: "splatter_sound" }, { src: "throw-fruit.ogg", id: "throw_sound" }, { src: "game_over.png", id: "game_over" }, { src: "new-game.png", id: "new-game" }, { src: "pineapple.png", id: "pineapple" }, { src: "splash.png", id: "splash" }, { src: "watermelon.png", id: "watermelon" }, { src: "x.png", id: "x" }, { src: "xf.png", id: "xf" }, { src: "xx.png", id: "xx" }, { src: "xxf.png", id: "xxf" }, { src: "xxx.png", id: "xxx" }, { src: "xxxf.png", id: "xxxf" }, { src: "background.jpg", id: "background" }];

  var sliceables = [{ src: "apple-1.png", id: "apple_1" }, { src: "apple-2.png", id: "apple_2" }, { src: "apple.png", id: "apple" }, { src: "banana-1.png", id: "banana_1" }, { src: "banana-2.png", id: "banana_2" }, { src: "banana.png", id: "banana" }, { src: "peach-1.png", id: "peach_1" }, { src: "peach-2.png", id: "peach_2" }, { src: "peach.png", id: "peach" }, { src: "strawberry-1.png", id: "strawberry_1" }, { src: "strawberry-2.png", id: "strawberry_2" }, { src: "strawberry.png", id: "strawberry" }, { src: "watermelon-1.png", id: "watermelon_1" }, { src: "watermelon-2.png", id: "watermelon_2" }, { src: "watermelon.png", id: "watermelon" }, { src: "bomb.png", id: "bomb" }];
  var mute = false;
  var muteBtn = document.getElementById("mute-btn");
  muteBtn.addEventListener('click', toggleMute);
  muteBtn.addEventListener('keydown', toggleMute);

  var toggleMute = function toggleMute(e) {
    e.preventDefault();
    if (e.keyCode >= 0) {
      return;
    }
    if (mute) {
      mute = false;
      createjs.Sound.muted = false;
      muteBtn.className = "";
    } else {
      mute = true;
      createjs.Sound.muted = true;
      muteBtn.className = "unmute";
    }
  };
  var stage = new createjs.Stage("boardCanvas");
  var game = new _game2.default(stage, manifest, sliceables);
  game.start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map