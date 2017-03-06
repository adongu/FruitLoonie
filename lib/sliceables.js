import Sliceable from './sliceable';

export default class Sliceables {

  constructor (stage, difficulty, loader, scoreField, strikesField, gameOver) {
    this.circles = {};
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    this.radius = 50;
    this.beginCounter = 0;
    this.scoreField = scoreField;
    this.strikesField = strikesField;
    this.score = 0
    this.strikes = 0;
    // amount of objects per cycle;
    this.frequency = 10;
    this.difficulty = difficulty;
    this.generateSliceables = this.generateSliceables.bind(this);
    // this.bezierEasing = this.bezierEasing.bind(this);
    this.tick = this.tick.bind(this);
    this.createSliceables = this.createSliceables.bind(this);
    this.handleSliceables = this.handleSliceables.bind(this);
    this.checkOutOfBounds = this.checkOutOfBounds.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.reset = this.reset.bind(this);
    this.sliceable = new Sliceable(loader);
    this.playSound = this.playSound.bind(this);
  }

  generateSliceables() {
    let self = this;

    if (Object.keys(this.circles).length <= this.frequency) {
      console.log("reset", Object.keys(this.circles).length, this.frequency );
      this.circles = this.sliceable.createSliceables(this.width, this.difficulty);
    }
    createjs.Ticker.addEventListener("tick", this.tick);
    // add amount by frequency, start from previous end frequency
    Object.keys(this.circles).slice(this.beginCounter, this.frequency).forEach( (id, index) => {
      // console.log("beginCounter:", self.beginCounter, "Frequency", this.frequency);
      // set time interval for each Sliceables
      self.stage.addChild(self.circles[id]);
      self.stage.addChild(self.circles[id].shape);

      let time = index * 500
    setTimeout(() => {
      self.stage.update();
      self.handleSliceables(self.circles[id], time)
    }, 1000);
      // }
    });
    this.beginCounter += this.frequency;
    console.log(this.beginCounter);
  }



  handleSliceables(circle, time) {
    // if (circle) {
      let randomPow = Math.round(Math.random() * 3)
      createjs.Tween.get(circle)
      .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowOut(randomPow));

      createjs.Tween.get(circle.shape)
      .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowOut(randomPow));

      createjs.Sound.play("throw_sound", {volume: 0.025});
    // }
  }

  createSliceables (width, difficulty){
    this.circles = {};
    let radius = this.radius;

    for (let i = 0; i < difficulty; i++) {
      this.circles[i] = new createjs.Shape();
      this.circles[i].graphics.beginFill("red").drawCircle(0,0,radius);
      this.circles[i].x = Math.random() * width;
      this.circles[i].y = 480

      this.circles[i].snapToPixel = true;
      this.circles[i].cache(-radius, -radius, radius * 2, radius * 2)
    }
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  tick(event) {
    let self = this;
    Object.keys(this.circles).forEach((id) =>{
      let pt = self.circles[id].globalToLocal(self.stage.mouseX, self.stage.mouseY);

      self.circles[id].alpha = 0.2;

      this.checkOutOfBounds(id)
      this.checkCollision(pt, id)
    })
    self.stage.update();
  }

  checkOutOfBounds(id) {
    if (this.circles[id].x+30 > this.width+50 || this.circles[id].y > this.height + 50) {
      this.strikes += 1;
      this.strikesField.text = `Strikes: ${this.strikes}`;
      console.log(this.strikes);
      this.circles[id].mouseEnabled = false;
      this.stage.removeChild(this.circles[id].shape);
      this.stage.removeChild(this.circles[id]);
      delete this.circles[id];
      this.stage.update();
    }
  }

  checkCollision (pt, id) {
    if (this.circles[id] && this.stage.mouseInBounds && this.circles[id].hitTest(pt.x, pt.y)) {
      this.score += 1;
      this.scoreField.text = `Score: ${this.score}`;
      this.circles[id].alpha = 1;
      console.log(this.scoreField.text);
      this.circles[id].mouseEnabled = false;
      console.log("touched");
      this.stage.removeChild(this.circles[id].shape);
      this.stage.removeChild(this.circles[id]);

      delete this.circles[id];
      this.playSound("splatter")
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

  reset() {
  }
}
