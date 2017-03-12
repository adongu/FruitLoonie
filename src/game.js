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
    this.gameOver = false;
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
    this.sliceables = new Sliceables(this.stage, this.difficulty, this.loader);
    this.tick = this.tick.bind(this);
    // this.createFields = this.createFields.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    // this.handleKeys = this.handleKeys.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.updateStrikes = this.updateStrikes.bind(this);
    this.updateScore = this.updateScore.bind(this);
    // this.restart = this.restart.bind(this);
  };

  start () {
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "./assets/game/")
    this.loader.loadManifest(this.sliceableImgs, true, "./assets/sliceables/")
  }

  handleComplete () {
    let background = new createjs.Bitmap(this.loader.getResult("background"));
    this.stage.addChild(background);
    this.sliceables.createSliceables(this.width);
    this.createFields("scoreField", "strikesField");
    this.stage.update();
    document.onkeydown = () => {
      this.handleKeys(event);
    }
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
      this.sliceables.stageSliceables();
    }
    // setInterval(this.handlePlay(), 4000);
  }

  tick(event) {
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

  handleKeys (e) {
    this.strikes = this.strikesField.text.split(": ").slice(1)*1
    // game pause
    if (e.keyCode === 32 && this.started) {
      createjs.Ticker.setPaused(!this.pause)
      this.pause = !this.pause;
      this.stage.mouseEnabled = (!this.pause);
      // createjs.Ticker.setPaused = true;
    } else if ( e.keyCode === 13 && !this.started){
      createjs.Ticker.addEventListener("tick", this.tick);
      this.handlePlay();
      setInterval(this.handlePlay, 1700);
      this.started = true
    } else if ( e.keyCode === 13 && this.strikes >= 3) {
      this.restart();
    }
  }

  updateStrikes() {
    this.strikes += this.sliceables.checkOutOfBounds();
    this.strikesField.text = `Strikes: ${this.strikes}`;
    // this.checkGameOver();
  }

  updateScore() {
    this.score += this.sliceables.checkCollisions();
    this.scoreField.text = `Strikes: ${this.score}`;
  }

  checkGameOver() {
    if (this.strikes >=3) {
      this.gameOver = true;
      let gameOverImg = new createjs.Bitmap(this.loader.getResult("game_over"));
      this.gameOverImg.maxWidth = 1000;
      this.gameOverImg.x = 120;
      this.gameOverImg.y = 20;
      this.stage.addChild(gameOverImg);
      this.stage.update();
    }
  }

  restart () {
    this.stage.removeAllChildren();
    this.started = false;
    this.strikes = 0;
    this.score = 0;
    this.gameOver = false;
    // this.stage.addChild(scoreBoard);
    this.handleComplete();
  }

};
