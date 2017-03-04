import Sliceables from "./sliceables";
// import Player from ""

export default class Game {

  constructor(stage, manifest, sliceableImgs) {
    this.stage = stage;
    this.manifest = manifest;
    this.sliceableImgs = sliceableImgs;
    this.strikes = 0;
    this.canvas = document.getElementById("boardCanvas");
    this.pause = false;
    this.started = false;
    this.difficulty = 10;
    this.points = 0;
    this.width = stage.x;
    this.height = stage.y;
    this.sliceables = new Sliceables(this.stage, this.difficulty);
    this.loader = new createjs.LoadQueue(false);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
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
  }

  handlePlay () {
    console.log("loop");
    if (!this.pause && this.strikes < 3) {
      this.sliceables.generateSliceables(this.difficulty);
    }

    setTimeout( () => {
      this.handlePlay()
    }, 2000);
  }

  handleKeys (e) {
    console.log("Clicked");
    if (e.keyCode === 32 && this.started) {
      createjs.Ticker.setPaused(!this.pause)
      this.pause = !this.pause;
      if (this.pause) {
        // stop mouse events if paused
        this.stage.mouseEnabled(!this.pause);
        console.log("can't detect");
      } else {
        this.stage.mouseEnabled(!this.pause);
        console.log("can detect YES" );
      }

    } else if ( e.keyCode === 13 && !this.started){
      this.handlePlay();
      this.started = true
    }
  }

  restart () {
    this.strikes = 0
    this.stage.removeAllChildren();
    // createjs.Ticker.reset();
    // this.stage.addChild(scoreBoard);

    this.update();
  }

};

  // does logic of checking being sliced, point system and points, as well as difficulty
