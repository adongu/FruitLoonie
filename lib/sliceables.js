import Sliceable from './sliceable';

export default class Sliceables {

  constructor (stage, difficulty, loader) {
    this.circles = {};
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    this.radius = 50;
    this.beginCounter = 0;
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
      // debugger

      let time = index * 500

      // if (self.circles[id]) {
    setTimeout(() => {
      self.stage.update();
      self.handleSliceables(self.circles[id], time)
    }, 1000);
      // }
    });
    this.beginCounter += this.frequency;
  }



  handleSliceables(circle, time) {
    // let x = circle.x;
    // let y = circle.y;
    let randomPow = Math.round(Math.random() * 3)
    createjs.Tween.get(circle)
    .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowOut(randomPow));
    // .to({guide:{ path:[50, 470, 125, 400, 175, 300, 200, 200, 220, 180] }}, 2000, createjs.Ease.getPowIn(randomPow))
    // .to({guide:{ path:[250, 190, 275, 250, 350, 300, 375, 450, 450, 550] }}, 2000, createjs.Ease.getPowOut(randomPow));

    createjs.Tween.get(circle.shape)
    .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowOut(randomPow));
    // .to({guide:{ path:[50, 470, 125, 400, 175, 300, 200, 200, 220, 180] }}, 2000, createjs.Ease.getPowIn(randomPow))
    // .to({guide:{ path:[250, 190, 275, 250, 350, 300, 375, 450, 450, 550] }}, 2000, createjs.Ease.getPowOut(randomPow));
    // circle.graphics.moveTo(0,0).curveTo(0,200,200,200)
    // createjs.Ticker.init();
    createjs.Sound.play("throw_sound", {volume: 0.025});


  }

  createSliceables (width, difficulty){
    this.circles = {};
    let radius = this.radius;

    for (let i = 0; i < difficulty; i++) {
      this.circles[i] = new createjs.Shape();
      // console.log(this.circles[i].x);
      // console.log(this.circles[i].y);
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
    // debugger
    let self = this;
    Object.keys(this.circles).forEach((id) =>{
      // debugger
      let pt = self.circles[id].globalToLocal(self.stage.mouseX, self.stage.mouseY);

      self.circles[id].alpha = 0.2;

      this.checkOutOfBounds(id)
      this.checkCollision(pt, id)

    })
    self.stage.update();
  }

  checkOutOfBounds(id) {
    if (this.circles[id].x+30 > this.width || this.circles[id].y > this.height) {
      // this.circles[id].x = 0;
      this.circles[id].mouseEnabled = false;
      this.stage.removeChild(this.circles[id].shape);
      // this.stage.circles[id].removeAllEventListeners();
      this.stage.removeChild(this.circles[id]);
      delete this.circles[id];
      // this.stage.circle.graphics.clear();
      this.stage.update();
    }
  }

  checkCollision (pt, id) {
    if (this.circles[id] && this.stage.mouseInBounds && this.circles[id].hitTest(pt.x, pt.y)) {
      this.circles[id].alpha = 1;

      // setTimeout( () => {
        // this.circles[id].mouseEnabled = false;
        console.log("touched");
        this.stage.removeChild(this.circles[id].shape);
        this.stage.removeChild(this.circles[id]);
        delete this.circles[id];
        this.playSound("splatter")
        console.log("delete");
      // }, 250);
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
