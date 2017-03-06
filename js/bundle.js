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
    this.strikes = 0;
    this.pause = true;
    this.difficulty = 10;
    this.points = 0;
    this.width = stage.x;
    this.height = stage.y;
    this.sliceables = new _sliceables2.default(this.stage, this.difficulty);
    this.loader = new createjs.LoadQueue(false);
    this.handleComplete = this.handleComplete.bind(this);
    this.handlePause = this.handlePause.bind(this);
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
      var background = new createjs.Bitmap(this.loader.getResult("background"));
      this.stage.addChild(background);
      this.stage.update();
      loader.addEventListener("togglePaused()", this.handlePause);
      this.handlePlay();
    }
  }, {
    key: "handlePlay",
    value: function handlePlay() {
      var _this = this;

      if (!this.pause) {
        while (this.strikes < 3) {
          setTimeout(function () {
            _this.sliceables.generateSliceables(_this.difficulty);
          }, 2000);
        }
      }
    }
  }, {
    key: "handlePause",
    value: function handlePause(e) {
      if (e.keyCode === 32) {
        Ticker.setPaused(this.pause === true ? false : true);
      }
    }
  }, {
    key: "restart",
    value: function restart() {
      this.strikes = 0;
      this.stage.removeAllChildren();
      // createjs.Ticker.reset();
      // this.stage.addChild(scoreBoard);
    }
  }]);

  return Game;
}();

exports.default = Game;
;

// does logic of checking being sliced, point system and points, as well as difficulty

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sliceables = function () {
  function Sliceables(stage, difficulty, sliceables) {
    _classCallCheck(this, Sliceables);

    createjs.MotionGuidePlugin.install();
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    // debugger
    this.circles = [];
    this.generateSliceables = this.generateSliceables.bind(this);
    // this.bezierEasing = this.bezierEasing.bind(this);
    this.tick = this.tick.bind(this);
    this.createCircles = this.createCircles.bind(this);
    this.handleSliceables = this.handleSliceables.bind(this);
  }

  _createClass(Sliceables, [{
    key: "generateSliceables",
    value: function generateSliceables(difficulty) {
      var _this = this;

      this.createCircles(this.width, difficulty);
      this.circles.forEach(function (circle, index) {
        // set time interval for each Sliceables
        var time = index * 100;
        _this.handleSliceables(circle, time);
      });
      this.stage.update();
      // console.log(this.circles)
      //
      // let time = i * 500;
      // setTimeout( () => this.stage.addChild(this.circles[i]), 500);
      //
      // createjs.Ticker.setFPS(60);
      // createjs.Ticker.addEventListener("tick", this.tick);
    }
  }, {
    key: "handleSliceables",
    value: function handleSliceables(circle, time) {
      var _this2 = this;

      setTimeout(function () {
        return _this2.stage.addChild(circle);
      }, time);
      var x = circle.x;
      var y = circle.y;
      createjs.Tween.get(circle)
      // .to({x: 100, y: 400}, 1000)
      // .to({x: 200, y: 300}, 1000)
      // .to({x: 300, y: 250}, 1000)
      // .to({x: 400, y: 200}, 1000)
      // .to({x: 500, y: 240}, 1000)
      // .to({x: 600, y: 310}, 1000)
      // .to({x: 700, y: 480}, 1000)

      .to({ guide: { path: [120, 480, 220, 160, 340, 160, 500, 320, 580, 550] } }, 5000, createjs.Ease.getPowIn(Math.random() * 2));
      // circle.graphics.moveTo(0,0).curveTo(0,200,200,200)

      console.log("handleSliceables", circle.y);
      // createjs.Ticker.init();
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener("tick", this.tick);
    }
  }, {
    key: "createCircles",
    value: function createCircles(width, difficulty) {
      for (var i = 0; i < difficulty + 0; i++) {
        this.circles.push(new createjs.Shape());
        this.circles[i].graphics.beginFill("red").drawCircle(0, 0, 50);
        this.circles[i].x = Math.random() * width;
        this.circles[i].y = 480;
        console.log(this.circles[i].x);
        console.log(this.circles[i].y);
      }
    }
  }, {
    key: "tick",
    value: function tick(event) {
      var _this3 = this;

      this.circles.forEach(function (circle) {
        circle.alpha = 0.2;
        var pt = circle.globalToLocal(_this3.stage.mouseX, _this3.stage.mouseY);

        if (circle.x > _this3.width || circle.y > _this3.height) {
          circle.x = 0;
          _this3.stage.removeChild(circle);
        }
        if (_this3.stage.mouseInBounds && circle.hitTest(pt.x, pt.y)) {
          circle.alpha = 1;
          console.log("hit", circle.id);
          setTimeout(function () {
            return _this3.stage.removeChild(circle);
          }, 250);
          // setTimeout(this.stage.removeChild(circle), 3000);
        }
        _this3.stage.update(event);
      });
    }
  }, {
    key: "bezierEasing",
    value: function bezierEasing(k) {
      console.log("hit");
      // function(t:Number, b:Number, c:Number, d:Number):Number {
      //   var ts:Number=(t/=d)*t;
      //   var tc:Number=ts*t;
      //   return b+c*(0.699999999999999*tc*ts + -1.75*ts*ts + 3.9*tc + -4.1*ts + 2.25*t);
      // }
      var t = k * 100;
      var d = 100;
      var ts = t / d * t;
      var tc = ts * t;
      return 0.699999999999999 * tc * ts + -1.75 * ts * ts + 3.9 * tc + -4.1 * ts + 2.25 * t;
    }
  }]);

  return Sliceables;
}();

exports.default = Sliceables;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var manifest = [{ src: "game_over.png", id: "game_over" }, { src: "new-game.png", id: "new-game" }, { src: "pineapple.png", id: "pineapple" }, { src: "splash.png", id: "splash" }, { src: "watermelon.png", id: "watermelon" }, { src: "x.png", id: "x" }, { src: "xf.png", id: "xf" }, { src: "xx.png", id: "xx" }, { src: "xxf.png", id: "xxf" }, { src: "xxx.png", id: "xxx" }, { src: "xxxf.png", id: "xxxf" }, { src: "background.jpg", id: "background" }];

  var sliceables = [{ src: "apple-1.png", id: "apple_1" }, { src: "apple-2.png", id: "apple_2" }, { src: "apple.png", id: "apple" }, { src: "banana-1.png", id: "banana_1" }, { src: "banana-2.png", id: "banana_2" }, { src: "banana.png", id: "banana" }, { src: "peach-1.png", id: "peach_1" }, { src: "peach-2.png", id: "peach_2" }, { src: "peach.png", id: "peach" }, { src: "strawberry-1.png", id: "strawberry_1" }, { src: "strawberry-2.png", id: "strawberry_2" }, { src: "strawberry.png", id: "strawberry" }, { src: "watermelon-1.png", id: "watermelon_1" }, { src: "watermelon-2.png", id: "watermelon_2" }, { src: "watermelon.png", id: "watermelon" }, { src: "bomb.png", id: "bomb" }];

  var stage = new createjs.Stage("boardCanvas");
  var game = new _game2.default(stage, manifest, sliceables);
  game.start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map