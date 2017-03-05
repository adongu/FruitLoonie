export default class Sliceables {

  constructor (stage, difficulty) {
    createjs.MotionGuidePlugin.install();
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    // debugger
    this.difficulty = difficulty;
    this.circles = this.createSliceables(this.width, difficulty);
    this.generateSliceables = this.generateSliceables.bind(this);
    // this.bezierEasing = this.bezierEasing.bind(this);
    this.tick = this.tick.bind(this);
    this.createSliceables = this.createSliceables.bind(this);
    this.handleSliceables = this.handleSliceables.bind(this);
  }

  generateSliceables() {
    if (!this.circles) {
      this.createSliceables(this.width, this.difficulty)
    }

    this.circles.slice(0,10).forEach( (circle, index) => {
      // set time interval for each Sliceables
      let time = index * 100
      this.handleSliceables(circle, time)
    });
    this.stage.update();
    // console.log(this.circles)
    //
    // let time = i * 500;
    // setTimeout( () => this.stage.addChild(this.circles[i]), 500);
    //
    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", this.tick);
  }

  handleSliceables(circle, time) {
    setTimeout( () => this.stage.addChild(circle), time);
    let x = circle.x;
    let y = circle.y;
    createjs.Tween.get(circle)
      // .to({x: 100, y: 400}, 1000)
      // .to({x: 200, y: 300}, 1000)
      // .to({x: 300, y: 250}, 1000)
      // .to({x: 400, y: 200}, 1000)
      // .to({x: 500, y: 240}, 1000)
      // .to({x: 600, y: 310}, 1000)
      // .to({x: 700, y: 480}, 1000)

      .to({guide:{ path:[120, 480, 220, 160, 340, 160, 500, 320, 580, 550] }}, 5000, createjs.Ease.getPowIn(Math.random()*2));
    // circle.graphics.moveTo(0,0).curveTo(0,200,200,200)

    console.log("handleSliceables", circle.y)
    // createjs.Ticker.init();
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  createSliceables (width, difficulty){
    let circles = []
    this.circles = this.circles || circles;

    for (var i = 0; i < difficulty+100; i++) {
      this.circles.push(new createjs.Shape())
      this.circles[i].graphics.beginFill("red").drawCircle(0,0,50);
      this.circles[i].x = Math.random() * width;
      this.circles[i].y = 480
      // console.log(this.circles[i].x);
      // console.log(this.circles[i].y);

    }
  }

  tick(event) {
    this.circles.forEach((circle) =>{
      circle.alpha = 0.2;
      var pt = circle.globalToLocal(this.stage.mouseX, this.stage.mouseY);

      if (circle.x > this.width || circle.y > this.height) { circle.x = 0;
        this.stage.removeChild(circle);
        this.stage.circle.removeAllEventListeners();
        this.stage.circle.graphics.clear();
        this.stage.update();
      }
      if (this.stage.mouseInBounds && circle.hitTest(pt.x, pt.y)) {
        circle.alpha = 1;
        console.log("hit", circle.id)
        setTimeout( () => {
          this.stage.removeChild(circle);
          circle.removeAllEventListeners();
          this.stage.circle.graphics.clear();
          this.stage.update();
        }, 250);
        // setTimeout(this.stage.removeChild(circle), 3000);
      }
      // this.stage.update(event);
      // console.log(this.circles.length+ "circles");
    })
  }

  bezierEasing (k) {
    console.log("hit")
    // function(t:Number, b:Number, c:Number, d:Number):Number {
    //   var ts:Number=(t/=d)*t;
    //   var tc:Number=ts*t;
    //   return b+c*(0.699999999999999*tc*ts + -1.75*ts*ts + 3.9*tc + -4.1*ts + 2.25*t);
    // }
    let t = (k*100);
    let d = 100;
    let ts=(t/d)*t;
    let tc=ts*t;
    return (0.699999999999999*tc*ts + -1.75*ts*ts + 3.9*tc + -4.1*ts + 2.25*t);
  }
}
