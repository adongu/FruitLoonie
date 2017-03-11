import Sliceable from './sliceable';

export default class Sliceables {

  constructor (stage, difficulty, loader, scoreField, strikesField, gameOver) {
    this.circles = {};
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    this.radius = 50;
    this.beginCounter = 0;
    this.velocity =
    this.gravity = 4;
    this.score = 0
    this.strikes = 0;
    this.loader = loader;
    // amount of objects per cycle;
    this.frequency = 10;
    this.stageSliceables = this.stageSliceables.bind(this);
    // this.tick = this.tick.bind(this);
    // this.createSliceables = this.createSliceables.bind(this);
    // this.handleSliceables = this.handleSliceables.bind(this);
    this.checkOutOfBounds = this.checkOutOfBounds.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    // this.reset = this.reset.bind(this);
    this.sliceable = new Sliceable(loader);
    this.playSound = this.playSound.bind(this);
  }

  stageSliceables() {
    let self = this;
    // this.circles = this.sliceable.createSliceables(this.width, this.difficulty);
    if (Object.keys(this.circles).length <= this.frequency) {

    }
    // createjs.Ticker.addEventListener("tick", this.tick);
    // add amount by frequency, start from previous end frequency
    Object.keys(this.circles).slice(this.beginCounter, this.frequency).forEach( (id, index) => {

      // set time interval for each Sliceables
      self.stage.addChild(self.circles[id]);
      self.stage.addChild(self.circles[id].model);
      // self.handleSliceables(self.circles[id], time)
      console.log("x", self.circles[id].x);
      console.log("y", self.circles[id].y);
      self.stage.update();
      // }
      createjs.Sound.play("throw_sound", {volume: 0.025});
    });
  }

  moveSliceables(circle, time) {
    // if (circle) {
      // let randomPow = Math.round(Math.random() * 3)
      // createjs.Tween.get(circle)
      // .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowOut(randomPow));
      //
      // createjs.Tween.get(circle.model)
      // .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowOut(randomPow));
    Object.keys(this.circles).slice(this.beginCounter, this.frequency).forEach( (id, index) => {

      // set time interval for each Sliceables
      // self.stage.addChild(self.circles[id]);
      // self.stage.addChild(self.circles[id].model);

      let deltaX = projectileMotionX(self.circles[id].x);
      let deltaY = projectileMotionY(self.circles[id].y);

      self.circles[id].x += deltaX;
      self.circles[id].model.x += deltaX;
      self.circles[id].y += deltaY;
      self.circles[id].model.y += deltaY;

      // self.handleSliceables(self.circles[id], time)
      self.stage.update();
      // }
    });
    // this.stage.update();
    // }
  }

  projectileMotionX(x) {
    return 0.2;
  }
  projectileMotionY(y) {
    if (y <= 320) {
      return -0.13333333;
    } else {
      return 0.13333333;
    }
  }

  createSliceables (width, difficulty){
    this.circles = this.sliceable.generateSliceables(width, difficulty);
    // let radius = this.radius;
    //
    // for (let i = 0; i < difficulty; i++) {
    //   this.circles[i] = new createjs.Shape();
    //   this.circles[i].graphics.beginFill("red").drawCircle(0,0,radius);
    //   circles[i].alpha = 1;
    //   this.circles[i].x = Math.random() * width;
    //   this.circles[i].y = 480
    //
    //   this.circles[i].snapToPixel = true;
    //   this.circles[i].cache(-radius, -radius, radius * 2, radius * 2)
    // }
    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", this.tick);
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
