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
    this.minimumSliceables = 4;
    this.difficulty = difficulty;
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
    this.checkCollisions = this.checkCollisions.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stagedCirclesIds = this.stagedCirclesIds.bind(this);
  }

  stageSliceables() {
    // number of circles to add
    let numCircles = 0;
    let stagedCirclesIds = this.stagedCirclesIds();
    let id = 0;
      // check for unstaged circles, make sure doesn't stage more than created
    if (stagedCirclesIds && stagedCirclesIds.length + this.minimumSliceables <= this.difficulty) {
      while( numCircles < this.minimumSliceables ) {
        if ( stagedCirclesIds.indexOf(id) === -1 ) {
          // this.circles[id].outOfBounds = false;
          this.sliceable.initializeProperties(id, this.width)
          this.stage.addChild(this.circles[id]);
          this.stage.addChild(this.circles[id].model);
          createjs.Sound.play("throw_sound", {volume: 0.025});
          stagedCirclesIds.push(id)
          numCircles += 1;
        }
        this.stage.update();
        id += 1;
      }
      this.stage.update();
    }
  }
  // array of staged circle ids

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
    }
    this.stage.update();
  }

  projectileMotionX(x) {
    return 2*this.velocity;
  }

  projectileMotionY(x) {
    if (x <= 320) {
      return -.26333333*Math.pow(x,2)/100000 - 2;
      // - 3 + Math.random()*1;
    } else {
      return .2633333*Math.pow(x,2)/100000 + 2;
      // + 3 + Math.random()*1;
    }
  }

  createSliceables (width){
    this.circles = this.sliceable.generateSliceables(width, this.difficulty);
  }

  checkOutOfBounds(id) {
    let self = this;
    let strikes = 0;
    this.stagedCirclesIds().forEach( id => {
      // if greater than midpoint of canvas check if greater than width and height of canvas, doesn't check already out of bounds shapes
      if ((self.circles[id].outOfBounds === false) && (self.circles[id].x > self.width / 2) && (self.circles[id].y > self.height || self.circles[id].x > self.width)) {
        self.circles[id].outOfBounds = true;
        strikes += 1;
        self.stage.removeChild(self.circles[id])
        self.stage.removeChild(self.circles[id].model);
        console.log("outofBounds ", id);
        self.stage.update();
        // this.circles[id].mouseEnabled = false;
      }
      self.stage.update();
    })
    return strikes;
  }

  stagedCirclesIds() {
    let circles = this.stage.children.filter((child) => {
      // child is circle if it has type property
      return child.type ? true : false;
    });
    return circles.map( circle => { return circle.cacheID - 1 })
  }

  checkCollisions() {
    let pt;
    let self = this;
    let score = 0;
    this.stagedCirclesIds().forEach( id => {
      pt = this.circles[id].globalToLocal(this.stage.mouseX, this.stage.mouseY);
// this.circles[id] && this.stage.mouseInBounds &&
      if (this.circles[id].hitTest(pt.x, pt.y) && this.circles) {
        this.playSound("splatter")
        score += 1;
        this.circles[id].mouseEnabled = false;
        this.stage.removeChild(this.circles[id].model);
        this.stage.removeChild(this.circles[id]);
        this.stage.update();
      }
    });
    return score
  }

  playSound(type) {
    if ("splatter") {
      createjs.Sound.play("splatter_sound", {volume: 0.020});
    } else if ("throw") {
      createjs.Sound.play("throw_sound", { volume: 0.025 });
    }
  }
}
