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
    this.direction = new createjs.Text(`Please press 'Enter' to Start\n'Space' to pause the game`, "18px Arial", "#2ecc71");
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
    this.loader.loadManifest(this.manifest, true, "./assets/game/")
    this.loader.loadManifest(this.sliceableImgs, true, "./assets/sliceables/")
    this.loader.addEventListener("complete", this.handleComplete);
  }

  handleComplete () {
    this.backGround = new createjs.Bitmap(this.loader.getResult("background"));
    this.gameOverImg = new createjs.Bitmap(this.loader.getResult("game_over"));
    this.stage.addChild(this.backGround);
    this.createFields();
    if (!this.sliceables.anySliceables()) {
      this.sliceables.createSliceables(this.width);
    }
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

  handlePlay () {
    if (!this.pause && !this.gameOver) {
      this.sliceables.stageSliceables();
      setTimeout(this.handlePlay, 1700);
    }
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
    } else if ( e.keyCode === 13 && (!this.started || this.gameOver)) {
      this.stage.removeChild(this.direction)
      if (this.strikes >= 3) {
        this.restart();
      }
      this.stage.removeChild(this.direction);
      createjs.Ticker.addEventListener("tick", this.tick);
      this.handlePlay();
      // setInterval will stack, timeout won't run after some time
      // setInterval(this.handlePlay, 1700);
      this.started = true;
    }
    // else if ( e.keyCode === 13 && this.strikes >= 3) {
    //   createjs.Ticker.addEventListener("tick", this.tick);
    //   this.handlePlay();
    //   this.stage.removeChild(this.direction)
    // }
  }

  updateStrikes() {
    this.strikes += this.sliceables.checkOutOfBounds();
    this.strikesField.text = `Strikes: ${this.strikes}`;
    this.checkGameOver();
  }

  updateScore() {
    this.score += this.sliceables.checkCollisions();
    this.scoreField.text = `Score: ${this.score}`;
  }

  checkGameOver() {
    if (this.strikes >=3) {
      this.gameOver = true;

      this.stage.addChild(this.gameOverImg);
      this.stage.addChild(this.direction);
      this.stage.update();
    }
  }

  restart () {
    this.stage.removeAllChildren();
    createjs.Ticker.removeEventListener("tick", this.tick);
    this.started = false;
    this.strikes = 0;
    this.score = 0;
    this.gameOver = false;
    // this.stage.addChild(scoreBoard);
    this.handleComplete();
  }

};
