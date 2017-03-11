import Sliceable from './sliceable';

export default class Sliceables {

  constructor (stage, difficulty, loader) {
    this.circles = {};
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    this.radius = 50;
    this.beginCounter = 0;
    this.velocity = 1.5;
    this.minimumSliceables = 2;
    this.gravity = 4;
    this.score = 0
    this.strikes = 0;
    this.loader = loader;
    // amount of objects per cycle;
    this.sliceable = new Sliceable(loader);
    this.stageSliceables = this.stageSliceables.bind(this);
    this.createSliceables = this.createSliceables.bind(this);
    this.moveSliceables = this.moveSliceables.bind(this);
    this.checkOutOfBounds = this.checkOutOfBounds.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stagedCirclesIds = this.stagedCirclesIds.bind(this);
  }

  stageSliceables() {
    // number of circles to add
    let numCircles = 0;
    let stagedCirclesIds = this.stagedCirclesIds();
    let id = 0;
      // check for unstaged circles
      console.log(stagedCirclesIds);
    while( numCircles < this.minimumSliceables ) {
      if ( stagedCirclesIds.indexOf(this.circles[id].id) === -1 ) {
        console.log(id);
        this.stage.addChild(this.circles[id]);
        this.stage.addChild(this.circles[id].model);
        createjs.Sound.play("throw_sound", {volume: 0.025});
        stagedCirclesIds.push(id)
        numCircles += 1;
        this.stage.update();
      }
      id += 1;
    }
    this.stage.update();
  }
  // array of staged circle ids
  stagedCirclesIds() {
    let circles = this.stage.children.filter((child) => {
      // child is circle if it has type property
      return child.type ? true : false;

    });
    return circles.map( circle => { return circle.cacheID - 1 })
  }

  moveSliceables() {
    let self = this;
    let stagedCirclesIds = this.stagedCirclesIds();
    if (stagedCirclesIds.length > 0) {
      stagedCirclesIds.forEach( id => {
        let deltaX = self.projectileMotionX(self.circles[id].x);
        let deltaY = self.projectileMotionY(self.circles[id].x);

        self.circles[id].x += deltaX;
        self.circles[id].model.x += deltaX;
        self.circles[id].y += deltaY;
        self.circles[id].model.y += deltaY;

        // self.handleSliceables(self.circles[id], time)
        self.stage.update();
        // }
      });
      this.stage.update();
    }
  }

  projectileMotionX(x) {
    return 2*this.velocity;
  }

  projectileMotionY(x) {
    if (x <= 320) {
      return -.26333333*Math.pow(x,2)/100000 - 2;
    } else {
      return .2633333*Math.pow(x,2)/100000 + 2;
    }
  }

  createSliceables (width, difficulty){
    this.circles = this.sliceable.generateSliceables(width, difficulty);
  }

  checkOutOfBounds(id) {
    if (this.circles[id].x+30 > this.width+50 || this.circles[id].y > this.height + 50) {
      this.strikes += 1;
      this.strikesField.text = `Strikes: ${this.strikes}`;
      if (this.strikes >=3) {
        let gameOverImg = new createjs.Bitmap(this.loader.getResult("game_over"));
        this.stage.addChild(gameOverImg);
        this.stage.update();
      }
      this.circles[id].mouseEnabled = false;
      // if outOfBoundsTimes > 2, reset to 0, unstage child
      this.stage.removeChild(this.circles[id].model);
      this.stage.removeChild(this.circles[id]);
      delete this.circles[id];
      this.stage.update();
    }
  }

  checkCollision (pt, id) {
    if (this.circles[id] && this.stage.mouseInBounds && this.circles[id].hitTest(pt.x, pt.y)) {
      this.score += 1;
      this.scoreField.text = `Score: ${this.score}`;
      // this.circles[id].alpha = 1;
      this.circles[id].mouseEnabled = false;
      this.stage.removeChild(this.circles[id].model);
      this.stage.removeChild(this.circles[id]);
      delete this.circles[id];
      this.splicesables.playSound("splatter")
      this.stage.update();
    }
  }

  playSound (type) {
    if ("splatter") {
      createjs.Sound.play("splatter_sound", {volume: 0.025});
    } else if ("throw") {
      createjs.Sound.play("throw_sound", { volume: 0.025 });
    }
  }
}
