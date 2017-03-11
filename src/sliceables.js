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
    this.frequency = 10;
    this.stageSliceables = this.stageSliceables.bind(this);
    // this.tick = this.tick.bind(this);
    // this.createSliceables = this.createSliceables.bind(this);
    this.moveSliceables = this.moveSliceables.bind(this);
    this.checkOutOfBounds = this.checkOutOfBounds.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.sliceable = new Sliceable(loader);
    this.playSound = this.playSound.bind(this);
    this.stagedCirclesIds = this.stagedCirclesIds.bind(this);
  }

  stageSliceables() {
    let self = this;
    // number of circles to add
    let numCircles = 0;
    let stagedCirclesIds = this.stagedCirclesIds();

    Object.keys(this.circles).forEach( (id, index) => {
      // check for unstaged circles
      if ( stagedCirclesIds.indexOf(self.circles[id]) === -1 ) {
        self.stage.addChild(self.circles[id]);
        self.stage.addChild(self.circles[id].model);
        self.stage.update();

        createjs.Sound.play("throw_sound", {volume: 0.025});
      }
    });
  }
  // array of staged circle ids
  stagedCirclesIds() {
    return this.stage.children.filter((child) => {
      if (child.type) {
        return child.id;
      }
    });
  }

  moveSliceables() {
    let stagedCirclesIds = this.stagedCirclesIds();
    // if (circle) {
      // let randomPow = Math.round(Math.random() * 3)
      // createjs.Tween.get(circle)
      // .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowOut(randomPow));
      //
      // createjs.Tween.get(circle.model)
      // .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowOut(randomPow));
      stagedCirclesIds.forEach( id => {
      // set time interval for each Sliceables
      // self.stage.addChild(self.circles[id]);
      // self.stage.addChild(self.circles[id].model);

      let deltaX = this.projectileMotionX(this.circles[id].x);
      let deltaY = this.projectileMotionY(this.circles[id].x);

      this.circles[id].x += deltaX;
      this.circles[id].model.x += deltaX;
      this.circles[id].y += deltaY;
      this.circles[id].model.y += deltaY;

      // this.handleSliceables(this.circles[id], time)
      this.stage.update();
      // }
    });
    this.stage.update();
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
