export default class Sliceables {

  constructor (stage, difficulty) {
    this.circles = {};
    createjs.MotionGuidePlugin.install();
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
    this.reset = this.reset.bind(this);
  }

  generateSliceables() {
    let self = this;
    if (Object.keys(this.circles).length <= this.frequency) {
      this.createSliceables(this.width, this.difficulty)
    }
    // add amount by frequency, start from previous end frequency
    Object.keys(this.circles).slice(this.beingCounter, this.frequency).forEach( (id, index) => {
      // set time interval for each Sliceables
      self.stage.addChild(self.circles[id])
      let time = index * 500
      setTimeout(() => {
        self.handleSliceables(self.circles[id], time)
        self.stage.update();
      }, 3000);
    });

    this.beginCounter += this.frequency;
    //
    // let time = i * 500;
    // setTimeout( () => this.stage.addChild(this.circles[i]), 500);
    //
    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", this.tick);
  }

  handleSliceables(circle, time) {
    let x = circle.x;
    let y = circle.y;
    createjs.Tween.get(circle)
    .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowIn(Math.random()*2));
    // circle.graphics.moveTo(0,0).curveTo(0,200,200,200)

    console.log("handleSliceables", circle.y)
    // createjs.Ticker.init();
    createjs.Ticker.setFPS(60);

    createjs.Ticker.addEventListener("tick", this.tick);
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
  }

  tick(event) {
    let self = this;
    Object.keys(this.circles).forEach((id) =>{
      // debugger
      self.circles[id].alpha = 0.2;
      var pt = self.circles[id].globalToLocal(self.stage.mouseX, self.stage.mouseY);

      if (self.circles[id].x+30 > self.width || self.circles[id].y > self.height) { self.circles[id].x = 0;
        self.stage.removeChild(self.circles[id]);
        // self.circles[id].removeAllEventListeners();
        delete self.circles[id];
        // self.stage.circle.graphics.clear();
        self.stage.update();
      }
      if (self.circles[id] && self.stage.mouseInBounds && self.circles[id].hitTest(pt.x, pt.y)) {
        self.circles[id].alpha = 1;
        console.log("hit", self.circles[id].id)
        setTimeout( () => {
          self.stage.removeChild(self.circles[id]);
          // self.stage.self.circles[id].removeAllEventListeners();
          delete self.circles[id];
          // self.stage.circle.graphics.clear();
          self.stage.update();
        }, 250);
        // setTimeout(this.stage.removeChild(circle), 3000);
      }
      // this.stage.update(event);
      // console.log(this.circles.length+ "circles");
    })
  }

  reset() {

  }

  bezierEasing (k) {
    console.log("hit")

    let t = (k*100);
    let d = 100;
    let ts=(t/d)*t;
    let tc=ts*t;
    return (0.699999999999999*tc*ts + -1.75*ts*ts + 3.9*tc + -4.1*ts + 2.25*t);
  }
}
