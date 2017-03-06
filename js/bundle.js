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


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var manifest = [{ src: "bomb-explode.ogg", id: "boom_sound" }, { src: "splatter.ogg", id: "splatter_sound" }, { src: "throw-fruit.ogg", id: "throw_sound" }, { src: "game_over.png", id: "game_over" }, { src: "new-game.png", id: "new-game" }, { src: "pineapple.png", id: "pineapple" }, { src: "splash.png", id: "splash" }, { src: "watermelon.png", id: "watermelon" }, { src: "x.png", id: "x" }, { src: "xf.png", id: "xf" }, { src: "xx.png", id: "xx" }, { src: "xxf.png", id: "xxf" }, { src: "xxx.png", id: "xxx" }, { src: "xxxf.png", id: "xxxf" }, { src: "background.jpg", id: "background" }];

  var sliceables = [{ src: "apple-1.png", id: "apple_1" }, { src: "apple-2.png", id: "apple_2" }, { src: "apple.png", id: "apple" }, { src: "banana-1.png", id: "banana_1" }, { src: "banana-2.png", id: "banana_2" }, { src: "banana.png", id: "banana" }, { src: "peach-1.png", id: "peach_1" }, { src: "peach-2.png", id: "peach_2" }, { src: "peach.png", id: "peach" }, { src: "strawberry-1.png", id: "strawberry_1" }, { src: "strawberry-2.png", id: "strawberry_2" }, { src: "strawberry.png", id: "strawberry" }, { src: "watermelon-1.png", id: "watermelon_1" }, { src: "watermelon-2.png", id: "watermelon_2" }, { src: "watermelon.png", id: "watermelon" }, { src: "bomb.png", id: "bomb" }];
  var mute = false;
  var muteBtn = document.getElementById("mute-btn");
  muteBtn.addEventListener('click', toggleMute);

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
    console.log("here is sliceables in game", _sliceables2.default.strike);
    this.sliceables = new _sliceables2.default(this.stage, this.difficulty, this.loader, this.scoreField, this.strikesField);
    this.createFields = this.createFields.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.restart = this.restart.bind(this);
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
      this.stage.update();
      document.onkeydown = function () {
        console.log("hit");
        _this.handleKeys(event);
      };
      this.createFields("scoreField", "strikesField");
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
      var _this2 = this;

      if (!this.pause && !this.gameOver) {
        this.sliceables.generateSliceables();
        this.sliceables.strikes;
        setInterval(function () {
          _this2.handlePlay();
        }, 2000);
      }
      // else if (!this.gameOver) {
      //   this.checkGameOver();
      //   // this.handlePlay();
      // }
      // console.log(!this.gameOver);
    }

    // checkGameOver() {
    //   if (this.strikesField.text.split(": ").slice(1)*1 >=3 ) {
    //     this.gameOver = true;
    //     this.restart();
    //   }
    // }

  }, {
    key: "handleKeys",
    value: function handleKeys(e) {
      console.log("Clicked");
      this.strikes = this.strikesField.text.split(": ").slice(1) * 1;
      // game pause
      if (e.keyCode === 32 && this.started) {
        createjs.Ticker.setPaused(!this.pause);
        this.pause = !this.pause;
        this.stage.mouseEnabled = !this.pause;
      } else if (e.keyCode === 13 && !this.started) {
        this.handlePlay();
        this.started = true;
      } else if (e.keyCode === 13 && this.strikes >= 3) {
        this.restart();
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
      this.started = false;
      createjs.Ticker.reset();
      // this.stage.addChild(scoreBoard);
      this.handleComplete();
      debugger;
    }
  }]);

  return Game;
}();

exports.default = Game;
;

// does logic of checking being sliced, point system and points, as well as difficulty

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
    this.createSliceables = this.createSliceables.bind(this);
    //"bomb"
    this.types = ["peach", "apple", "strawberry", "watermelon"];
    this.determineSliceable = this.determineSliceable.bind(this);
  }

  _createClass(Sliceable, [{
    key: "mapSliceableImg",
    value: function mapSliceableImg(width, height, number) {
      for (var i = 0; i < number; i++) {
        circles.push(new createjs.Shape());
        circles[i].graphics.beginFill("red").drawCircle(0, 0, 50);
        // circles[i].alpha = 0;
        circles[i].x = Math.random() * width;
        circles[i].y = 550;
      }
    }
  }, {
    key: "createSliceables",
    value: function createSliceables(width, difficulty) {
      var radius = this.radius;
      this.circles = {};
      for (var i = 0; i < difficulty; i++) {
        this.circles[i] = new createjs.Shape();
        // console.log(this.circles[i].x);
        // console.log(this.circles[i].y);
        this.circles[i].graphics.beginFill("red").drawCircle(radius, radius, radius);
        this.circles[i].alpha = 0;
        this.circles[i].type = this.determineSliceable();
        this.circles[i].shape = new createjs.Bitmap(this.loader.getResult("" + this.circles[i].type));

        this.circles[i].x = Math.random() * width;
        this.circles[i].y = 400;

        this.circles[i].snapToPixel = true;
        // this.circles[i].shape.snapToPixel = true;
        this.circles[i].cache(0, 0, radius * 2, radius * 2);
      }
      createjs.Ticker.setFPS(60);
      // createjs.Ticker.addEventListener("tick", this.tick);
      return this.circles;
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
  function Sliceables(stage, difficulty, loader, scoreField, strikesField, gameOver) {
    _classCallCheck(this, Sliceables);

    this.circles = {};
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    this.radius = 50;
    this.beginCounter = 0;
    this.scoreField = scoreField;
    this.strikesField = strikesField;
    this.score = 0;
    this.strikes = 0;
    this.loader = loader;
    // amount of objects per cycle;
    this.frequency = 10;
    this.difficulty = difficulty;
    this.generateSliceables = this.generateSliceables.bind(this);
    // this.bezierEasing = this.bezierEasing.bind(this);
    this.tick = this.tick.bind(this);
    this.createSliceables = this.createSliceables.bind(this);
    this.handleSliceables = this.handleSliceables.bind(this);
    this.checkOutOfBounds = this.checkOutOfBounds.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.reset = this.reset.bind(this);
    this.sliceable = new _sliceable2.default(loader);
    this.playSound = this.playSound.bind(this);
    console.log('this.strikes in sliceables', this.strikes);
  }

  _createClass(Sliceables, [{
    key: 'generateSliceables',
    value: function generateSliceables() {
      var _this = this;

      var self = this;

      if (Object.keys(this.circles).length <= this.frequency) {
        this.circles = this.sliceable.createSliceables(this.width, this.difficulty);
      }
      createjs.Ticker.addEventListener("tick", this.tick);
      // add amount by frequency, start from previous end frequency
      Object.keys(this.circles).slice(this.beginCounter, this.frequency).forEach(function (id, index) {
        console.log("counter", _this.beginCounter);
        console.log("id", id);

        // console.log("beginCounter:", self.beginCounter, "Frequency", this.frequency);
        // set time interval for each Sliceables
        self.stage.addChild(self.circles[id]);
        self.stage.addChild(self.circles[id].shape);

        var time = index * 500;
        setTimeout(function () {
          self.handleSliceables(self.circles[id], time);
          self.stage.update();
        }, 1000);
        // }
      });
      this.beginCounter += this.frequency;
    }
  }, {
    key: 'handleSliceables',
    value: function handleSliceables(circle, time) {
      if (circle) {
        var randomPow = Math.round(Math.random() * 3);
        createjs.Tween.get(circle).to({ guide: { path: [120, 480, 220, 160, 340, 160, 500, 320, 580, 550] } }, 5000, createjs.Ease.getPowOut(randomPow));

        createjs.Tween.get(circle.shape).to({ guide: { path: [120, 480, 220, 160, 340, 160, 500, 320, 580, 550] } }, 5000, createjs.Ease.getPowOut(randomPow));

        this.stage.update();
        createjs.Sound.play("throw_sound", { volume: 0.025 });
      }
    }
  }, {
    key: 'createSliceables',
    value: function createSliceables(width, difficulty) {
      this.circles = {};
      var radius = this.radius;

      for (var i = 0; i < difficulty; i++) {
        this.circles[i] = new createjs.Shape();
        this.circles[i].graphics.beginFill("red").drawCircle(0, 0, radius);
        this.circles[i].x = Math.random() * width;
        this.circles[i].y = 480;

        this.circles[i].snapToPixel = true;
        this.circles[i].cache(-radius, -radius, radius * 2, radius * 2);
      }
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener("tick", this.tick);
    }
  }, {
    key: 'tick',
    value: function tick(event) {
      var _this2 = this;

      var self = this;
      Object.keys(this.circles).forEach(function (id) {
        var pt = self.circles[id].globalToLocal(self.stage.mouseX, self.stage.mouseY);

        self.circles[id].alpha = 0.2;

        _this2.checkOutOfBounds(id);
        _this2.checkCollision(pt, id);
      });
      self.stage.update();
    }
  }, {
    key: 'checkOutOfBounds',
    value: function checkOutOfBounds(id) {
      if (this.circles[id].x + 30 > this.width + 50 || this.circles[id].y > this.height + 50) {
        this.strikes += 1;
        this.strikesField.text = 'Strikes: ' + this.strikes;
        if (this.strikes >= 3) {
          var gameOverImg = new createjs.Bitmap(this.loader.getResult("game_over"));
          this.stage.addChild(gameOverImg);
          this.stage.update();
        }
        this.circles[id].mouseEnabled = false;
        this.stage.removeChild(this.circles[id].shape);
        this.stage.removeChild(this.circles[id]);
        delete this.circles[id];
        this.stage.update();
      }
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision(pt, id) {
      if (this.circles[id] && this.stage.mouseInBounds && this.circles[id].hitTest(pt.x, pt.y)) {
        this.score += 1;
        this.scoreField.text = 'Score: ' + this.score;
        // this.circles[id].alpha = 1;
        this.circles[id].mouseEnabled = false;
        this.stage.removeChild(this.circles[id].shape);
        this.stage.removeChild(this.circles[id]);
        delete this.circles[id];
        this.playSound("splatter");
        this.stage.update();
      }
    }
  }, {
    key: 'playSound',
    value: function playSound(type) {
      if ("splatter") {
        createjs.Sound.play("splatter_sound", { volume: 0.025 });
      } else if ("throw") {
        createjs.Sound.play("throw_sound", { volume: 0.025 });
      }
    }
  }, {
    key: 'reset',
    value: function reset() {}
  }]);

  return Sliceables;
}();

exports.default = Sliceables;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
(function webpackMissingModule() { throw new Error("Cannot find module \"server\""); }());
(function webpackMissingModule() { throw new Error("Cannot find module \"start\""); }());


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
