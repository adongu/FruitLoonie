import Sliceables from "./sliceables";
// import Player from ""

export default class Game {

  constructor(stage, manifest, sliceableImgs) {
    this.stage = stage;
    this.manifest = manifest;
    this.sliceableImgs = sliceableImgs;
    this.canvas = document.getElementById("boardCanvas");
    this.pause = false;
    this.started = false;
    this.difficulty = 20;
    this.score = 0;
    this.strikes = 0;
    this.scoreField = new createjs.Text(`Score: ${this.score}`, "bold 18px Arial", "#f70");
    this.strikesField = new createjs.Text(`Strikes: ${this.strikes}`, "bold 18px Arial", "#f00");
    this.width = stage.x;
    this.height = stage.y;
    this.loader = new createjs.LoadQueue(false);
    this.loader.installPlugin(createjs.Sound);
    createjs.MotionGuidePlugin.install();
    this.gameOver = false;
    this.sliceables = new Sliceables(this.stage, this.difficulty, this.loader, this.scoreField, this.strikesField);
    this.createFields = this.createFields.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.restart = this.restart.bind(this);
  };

  start () {
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "./assets/game/")
    this.loader.loadManifest(this.sliceableImgs, true, "./assets/sliceables/")
  }

  handleComplete () {
    let background = new createjs.Bitmap(this.loader.getResult("background"));
    this.stage.addChild(background);
    this.stage.update();
    document.onkeydown = () => {
      console.log("hit")
      this.handleKeys(event);
    }
    this.createFields("scoreField", "strikesField");
  }

  createFields() {
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

  handlePlay () {
    if (!this.pause && !this.gameOver) {
      this.sliceables.generateSliceables();
      this.sliceables.strikes
      setTimeout( () => {
        this.handlePlay();
      }, 2000);
    }
    this.checkGameOver();
  }

  checkGameOver() {
    if (this.strikesField.text.split(": ").slice(1)*1 >=3 ) {

      // let background = new createjs.Bitmap(this.loader.getResult("background"));
      // this.stage.addChild(background);
      // this.stage.update();

      let gameOverImg = new createjs.Bitmap(this.loader.getResult("game_over"));
      // new Image();
      // gameOver = this.loader.getResult("game_over");
      this.stage.addChild(gameOverImg);
      stage.update();
      this.gameOver = true;
      this.restart();
    }
  }

  handleKeys (e) {
    console.log("Clicked");
    // game pause
    if (e.keyCode === 32 && this.started) {
      createjs.Ticker.setPaused(!this.pause)
      this.pause = !this.pause;
      this.stage.mouseEnabled = (!this.pause);
    } else if ( e.keyCode === 13 && !this.started){
      this.handlePlay();
      this.started = true
    } else if ( e.keyCode === 13 && this.strikes >= 3) {
      this.restart();
    }
  }

  restart () {
    debugger
    this.strikes = 0;
    this.score = 0;
    this.gameOver = false;
    this.started = false;
    this.stage.removeAllChildren();
    createjs.Ticker.reset();
    createjs.Ticker.init();
    // this.stage.addChild(scoreBoard);
    this.handleComplete();
  }

};

  // does logic of checking being sliced, point system and points, as well as difficulty
