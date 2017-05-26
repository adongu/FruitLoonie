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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animations = function () {
  function Animations(stage) {
    _classCallCheck(this, Animations);

    this.stage = stage;
    this.strokes = [];
  }

  _createClass(Animations, [{
    key: "update",
    value: function update() {
      this.stage.mouseMoveOutside = true;
      this.stage.on("stagemousemoove", MouseMove = function MouseMove() {});
    }
  }]);

  return Animations;
}();

exports.default = Animations;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sliceables = __webpack_require__(3);

var _sliceables2 = _interopRequireDefault(_sliceables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    this.difficulty = 40;
    this.score = 0;
    this.strikes = 0;
    this.scoreField = new createjs.Text("Score: " + this.score, "bold 18px Arial", "#f70");
    this.strikesField = new createjs.Text("Strikes: " + this.strikes, "bold 18px Arial", "#f00");
    this.direction = new createjs.Text("Please press 'Enter' to Start\n'Space' to pause the game", "18px Arial", "#2ecc71");
    this.width = stage.x;
    this.height = stage.y;
    this.loader = new createjs.LoadQueue(false);
    this.loader.installPlugin(createjs.Sound);
    createjs.MotionGuidePlugin.install();
    this.sliceables = new _sliceables2.default(this.stage, this.difficulty, this.loader);
    this.tick = this.tick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.updateStrikes = this.updateStrikes.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.loader.loadManifest(this.manifest, true, "./assets/game/");
      this.loader.loadManifest(this.sliceableImgs, true, "./assets/sliceables/");
      this.loader.addEventListener("complete", this.handleComplete);
    }
  }, {
    key: "handleComplete",
    value: function handleComplete() {
      var _this = this;

      this.backGround = new createjs.Bitmap(this.loader.getResult("background"));
      this.gameOverImg = new createjs.Bitmap(this.loader.getResult("game_over"));
      this.stage.addChild(this.backGround);
      this.createFields();
      if (!this.sliceables.anySliceables()) {
        this.sliceables.createSliceables(this.width);
      }
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

      this.direction.textAlign = "right";
      this.stage.addChild(this.direction);
      this.direction.maxWidth = 1000;
      this.direction.x = 420;
      this.direction.y = 300;

      this.gameOverImg.maxWidth = 1000;
      this.gameOverImg.x = 180;
      this.gameOverImg.y = 220;

      this.stage.update();
    }
  }, {
    key: "handlePlay",
    value: function handlePlay() {
      if (!this.pause && !this.gameOver) {
        this.sliceables.stageSliceables();
        setTimeout(this.handlePlay, 1700);
      }
    }
  }, {
    key: "tick",
    value: function tick(event) {
      // tick only runs when not paused;
      if (!this.pause) {
        this.sliceables.moveSliceables();
        this.updateStrikes();
        this.updateScore();
        this.stage.update();
      }
    }
  }, {
    key: "handleKeys",
    value: function handleKeys(e) {
      this.strikes = this.strikesField.text.split(": ").slice(1) * 1;
      // game pause
      if (e.keyCode === 32 && this.started) {
        this.pause = !this.pause;
        if (this.pause) {
          this.stage.mouseEnabled = this.pause;
        }
      } else if (e.keyCode === 13 && (!this.started || this.gameOver)) {
        this.stage.removeChild(this.direction);
        if (this.strikes >= 3) {
          this.restart();
        }
        this.stage.removeChild(this.direction);
        createjs.Ticker.addEventListener("tick", this.tick);
        this.handlePlay();
        this.started = true;
      }
    }
  }, {
    key: "updateStrikes",
    value: function updateStrikes() {
      this.strikes += this.sliceables.checkOutOfBounds();
      this.strikesField.text = "Strikes: " + this.strikes;
      this.checkGameOver();
    }
  }, {
    key: "updateScore",
    value: function updateScore() {
      this.score += this.sliceables.checkCollisions();
      this.scoreField.text = "Score: " + this.score;
    }
  }, {
    key: "checkGameOver",
    value: function checkGameOver() {
      if (this.strikes >= 3) {
        this.gameOver = true;

        this.stage.addChild(this.gameOverImg);
        this.stage.addChild(this.direction);
        this.stage.update();
      }
    }
  }, {
    key: "restart",
    value: function restart() {
      this.stage.removeAllChildren();
      createjs.Ticker.removeEventListener("tick", this.tick);
      this.started = false;
      this.strikes = 0;
      this.score = 0;
      this.gameOver = false;
      this.handleComplete();
    }
  }]);

  return Game;
}();

exports.default = Game;
;

/***/ }),
/* 2 */
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
    this.splats = ["yellow_splat", "green_splat", "red_splat", "red_splat"];
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
        this.determineSliceable(i);
        // for checking times out of border length, 1 for creating, 2 to unstage
        this.circles[i].model = new createjs.Bitmap(this.loader.getResult("" + this.circles[i].type));
        this.circles[i].splatter = new createjs.Bitmap(this.loader.getResult("" + this.circles[i].splat));
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
      var x = void 0;
      if (Math.random() <= 0.5) {
        x = -5 + Math.random() * 150;
      } else {
        x = +495 + Math.random() * 150;
      }
      //  * 400;
      var y = 400;
      var angle = 45 + Math.random() * 10;
      this.circles[i].outOfBounds = false;

      this.circles[i].x = x;
      this.circles[i].y = y;
      this.circles[i].begin = x;
      // this.circles[i].end = end;
      this.circles[i].angle = angle;

      this.circles[i].model.x = x;
      this.circles[i].model.y = y + 5;
      this.circles[i].model.begin = x;
      // this.circles[i].model.end = end;
      this.circles[i].model.angle = angle;

      this.circles[i].splatter.x = x;
      this.circles[i].splatter.y = y + 5;
      this.circles[i].splatter.begin = x;
      // this.circles[i].splatter.end = end;
      this.circles[i].splatter.angle = angle;
    }
  }, {
    key: "determineSliceable",
    value: function determineSliceable(id) {
      var type = Math.round(Math.random() * 3);
      // order for splat and type is same
      this.circles[id].type = this.types[type];
      this.circles[id].splat = this.splats[type];
    }
  }]);

  return Sliceable;
}();

exports.default = Sliceable;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sliceable = __webpack_require__(2);

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
    // this.playSound = this.playSound.bind(this);
    this.stagedCirclesIds = this.stagedCirclesIds.bind(this);
    this.stagedCirclesIds = this.stagedCirclesIds.bind(this);
    // this.isOutOfBounds = this.isOutOfBounds.bind(this);
  }

  _createClass(Sliceables, [{
    key: "stageSliceables",
    value: function stageSliceables() {
      // number of circles to add
      var numCircles = 0;
      var stagedCirclesIds = this.stagedCirclesIds();
      var id = void 0;
      // check for unstaged circles, make sure doesn't stage more than created
      if (stagedCirclesIds && stagedCirclesIds.length + this.minimumSliceables <= this.difficulty) {
        while (numCircles < this.minimumSliceables) {
          id = Math.floor(Math.random() * (this.difficulty - 1));
          if (stagedCirclesIds.indexOf(id) === -1) {
            // this.circles[id].outOfBounds = false;
            this.sliceable.initializeProperties(id, this.width);
            this.stage.addChild(this.circles[id]);
            this.stage.addChild(this.circles[id].model);
            // bring to front
            // stage.setChildIndex( displayObject, stage.getNumChildren()-1);
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
          var x = self.circles[id].x;
          var begin = self.circles[id].begin;
          var deltaX = self.projectileMotionX(begin, id);
          var deltaY = self.projectileMotionY(x, begin, id);

          self.circles[id].x += deltaX;
          self.circles[id].model.x += deltaX;
          self.circles[id].y += deltaY;
          self.circles[id].model.y += deltaY;
          self.stage.update();
        });
      }
      this.stage.update();
    }
  }, {
    key: "projectileMotionX",
    value: function projectileMotionX(begin, id) {
      var speed = 2 * this.velocity + id % 3;
      if (begin <= 320) {
        return speed;
      } else {
        return -speed;
      }
    }
  }, {
    key: "projectileMotionY",
    value: function projectileMotionY(x, begin, id) {
      if (x <= 320 && begin <= 320 || x >= 320 && begin >= 320) {
        return -.26333333 * Math.pow(x, 2) / 100000 - 2 - id % 2;
      } else {
        return .2633333 * Math.pow(x, 2) / 100000 + 2 + id % 2;
      }
    }
  }, {
    key: "createSliceables",
    value: function createSliceables(width) {
      this.circles = this.sliceable.generateSliceables(width, this.difficulty);
    }
  }, {
    key: "checkOutOfBounds",
    value: function checkOutOfBounds() {
      var self = this;
      var strikes = 0;
      this.stagedCirclesIds().forEach(function (id) {
        // if greater than midpoint of canvas check if greater than width and height of canvas, doesn't check already out of bounds shapes
        var never_been_out_of_bound = self.circles[id].outOfBounds === false;
        var passed_outer_bound = self.circles[id].y > self.height || self.circles[id].x > self.width;
        var passed_its_midpoint = false;
        // Logic for confirm object passed its midpoint
        if (self.circles[id].begin <= 320 && self.circles[id].x > self.width / 2) {
          passed_its_midpoint = true;
        } else if (self.circles[id].begin >= 320 && self.circles[id].x < self.width / 2) {
          passed_its_midpoint = true;
        }

        if (never_been_out_of_bound && passed_its_midpoint && passed_outer_bound) {
          // if (isOutOfBounds(self.circles[id], self.width / 2)) {
          self.circles[id].outOfBounds = true;
          strikes += 1;
          self.stage.removeChild(self.circles[id]);
          self.stage.removeChild(self.circles[id].model);
          self.stage.update();
        }
        self.stage.update();
      });
      return strikes;
    }

    // isOutOfBounds(circle, midpoint) {
    //   let never_been_out_of_bound = circle.outOfBounds === false;
    //   let passed_outer_bound = (circle.y > self.height || circle.x > midpoint * 2);
    //   let passed_its_midpoint = false;
    //
    //   if ((circle.begin <= 320) && (circle.x > midpoint)) {
    //     passed_its_midpoint = true;
    //   } else if ((circle.begin >= 320) && (circle.x < midpoint)) {
    //     passed_its_midpoint = true;
    //   }
    //
    //   if (never_been_out_of_bound && passed_its_midpoint && passed_outer_bound) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

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
      this.stagedCirclesIds().forEach(function (id, idx, idArray) {
        pt = _this.circles[id].globalToLocal(_this.stage.mouseX, _this.stage.mouseY);
        if (_this.circles[id].hitTest(pt.x, pt.y) && _this.circles) {
          _this.playSound("splatter");
          score += 1;
          _this.circles[id].mouseEnabled = false;

          _this.stage.removeChild(_this.circles[id].model);
          _this.stage.removeChild(_this.circles[id]);
          _this.circles[id].splatter.x = _this.circles[id].x;
          _this.circles[id].splatter.y = _this.circles[id].y;
          // splatter
          _this.stage.addChild(_this.circles[id].splatter);
          // set splat behind new fruits
          // this.stage.setChildIndex( this.circles[id].splatter, this.stage.numChildren()-1);
          _this.stage.update();
          setTimeout(function () {
            return _this.removeSplatter(id);
          }, 1000);
        }
      });
      return score;
    }
  }, {
    key: "removeSplatter",
    value: function removeSplatter(id) {
      this.stage.removeChild(this.circles[id].splatter);
      this.stage.update();
    }
  }, {
    key: "anySliceables",
    value: function anySliceables() {
      return Object.keys(this.circles).length > 0;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _Animation = __webpack_require__(0);

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mute = void 0;
var muteBtn = void 0;
document.addEventListener('DOMContentLoaded', function () {
  var manifest = [{ src: "bomb-explode.ogg", id: "boom_sound" }, { src: "splatter.ogg", id: "splatter_sound" }, { src: "throw-fruit.ogg", id: "throw_sound" }, { src: "game_over.png", id: "game_over" }, { src: "new-game.png", id: "new-game" }, { src: "pineapple.png", id: "pineapple" }, { src: "splash.png", id: "splash" }, { src: "watermelon.png", id: "watermelon" }, { src: "x.png", id: "x" }, { src: "xf.png", id: "xf" }, { src: "xx.png", id: "xx" }, { src: "xxf.png", id: "xxf" }, { src: "xxx.png", id: "xxx" }, { src: "xxxf.png", id: "xxxf" }, { src: "background.jpg", id: "background" }];

  var sliceables = [{ src: "apple-1.png", id: "apple_1" }, { src: "apple-2.png", id: "apple_2" }, { src: "apple.png", id: "apple" }, { src: "banana-1.png", id: "banana_1" }, { src: "banana-2.png", id: "banana_2" }, { src: "banana.png", id: "banana" }, { src: "peach-1.png", id: "peach_1" }, { src: "peach-2.png", id: "peach_2" }, { src: "peach.png", id: "peach" }, { src: "strawberry-1.png", id: "strawberry_1" }, { src: "strawberry-2.png", id: "strawberry_2" }, { src: "strawberry.png", id: "strawberry" }, { src: "watermelon-1.png", id: "watermelon_1" }, { src: "watermelon-2.png", id: "watermelon_2" }, { src: "watermelon.png", id: "watermelon" }, { src: "s-green.png", id: "green_splat" }, { src: "s-yellow.png", id: "yellow_splat" }, { src: "s-red.png", id: "red_splat" }, { src: "bomb.png", id: "bomb" }];

  mute = false;
  muteBtn = document.getElementById("mute-btn");

  muteBtn.addEventListener('click', toggleMute);
  muteBtn.addEventListener('keydown', toggleMute);
  // window.addEventListener("mousemove", PointerMove);
  var stage = new createjs.Stage("boardCanvas");
  //
  var game = new _game2.default(stage, manifest, sliceables);
  game.start();
});

var toggleMute = function toggleMute(e) {
  e.preventDefault();
  if (e.keyCode >= 0) {
    return;
  }
  if (mute) {
    mute = false;
    createjs.Sound.muted = false;
    muteBtn.className = "";
    muteBtn.textContent = "Mute";
    // document.getElementById("mute-btn").text="Mute";
  } else {
    mute = true;
    createjs.Sound.muted = true;
    muteBtn.className = "unmute";
    muteBtn.textContent = "UnMute";
    // document.getElementById("mute-btn").text="Unmute";
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map