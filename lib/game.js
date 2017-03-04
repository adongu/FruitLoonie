import Sliceables from "./sliceables";
// import Player from ""

export default class Game {

  constructor(stage, manifest, sliceableImgs) {
    this.stage = stage;
    this.manifest = manifest;
    this.sliceableImgs = sliceableImgs;
    this.strikes = 0;
    this.pause = true;
    this.difficulty = 10;
    this.points = 0;
    this.width = stage.x;
    this.height = stage.y;
    this.sliceables = new Sliceables(this.stage, this.difficulty);
    this.loader = new createjs.LoadQueue(false);
    this.handleComplete = this.handleComplete.bind(this)
  };

  start () {
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "./assets/game/")
    this.loader.loadManifest(this.sliceableImgs, true, "./assets/sliceables/")
  }

  handleComplete () {
    let background = new createjs.Bitmap(this.loader.getResult("background"));
    this.stage.addChild(background)
    this.stage.update();
    this.handlePlay();
  }

  handlePlay () {
    
    if (!this.pause) {
      this.sliceables.generateSliceables(this.difficulty);
    }
  }

};

  // does logic of checking being sliced, point system and points, as well as difficulty
