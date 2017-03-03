import Generate from "./sliceable";
import Board from "./board"

export default class Game {

  constructor(stage) {
    this.points = 0;
    this.strikes = 0;


    // this.stage = new createjs.Stage("boardCanvas");
    this.loader = new createjs.LoadQueue(false);
  };

  start () {
    this.loader.addEventListener("complete", this.handleComplete);

  }

  handleComplete () {

  }


};

  // does logic of checking being sliced, point system and points, as well as difficulty


// export Game;
