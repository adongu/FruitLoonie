import Sliceables from "./sliceables";
import Board from "./board"

export default class Game {

  constructor(stage, manifest, sliceables) {
    this.stage = stage;
    this.manifest = manifest;
    this.sliceables = sliceables;
    this.points = 0;
    this.strikes = 0;
    this.pause = false;
    this.difficulty = 1;
    // this.stage = new createjs.Stage("boardCanvas");
    this.loader = new createjs.LoadQueue(false);
    this.handleComplete = this.handleComplete.bind(this)
  };

  start () {
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "./assets/game/")
    this.loader.loadManifest(this.sliceables, true, "./assets/sliceables/")
  }

  handleComplete () {
    let background = new createjs.Bitmap(this.loader.getResult("background"));
    this.stage.addChild(background)
    this.stage.update();
  }

};

  // does logic of checking being sliced, point system and points, as well as difficulty
