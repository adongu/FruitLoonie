export default class Sliceables {

  constructor (stage, difficulty) {
    createjs.MotionGuidePlugin.install();
    this.stage = stage;
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    // debugger
    this.circles = [];
    this.generateSliceables = this.generateSliceables.bind(this);
    // this.bezierEasing = this.bezierEasing.bind(this);
    this.tick = this.tick.bind(this);
    this.createCircles = this.createCircles.bind(this);
    this.handleSliceables = this.handleSliceables.bind(this);
  }

  generateSliceables(difficulty){

    this.createCircles(this.width, difficulty)
    this.circles.forEach( (circle, index) => {
      // set time interval for each Sliceables
      let time = index * 100
      setTimeout(() => this.handleSliceables(circle), time)
    });
    this.stage.update();
    //
    // let time = i * 500;
    // setTimeout( () => this.stage.addChild(this.circles[i]), 500);
    //
    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", this.tick);
  }

  handleSliceables(circle) {
    this.stage.addChild(circle);
    createjs.Tween.get(circle)
      .to({guide:{ path:[120, 500, 220, 160, 340, 160, 500, 320, 580, 550] }}, 1000, createjs.Ease.BezierEasing);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  createCircles (width, difficulty){
    for (var i = 0; i < difficulty+10; i++) {
      this.circles.push(new createjs.Shape())
      this.circles[i].graphics.beginFill("red").drawCircle(0,0,50);
      this.circles[i].x = Math.random() * width;
      this.circles[i].y = 480;
    }
  }

  tick(event) {
    this.circles.forEach((circle) =>{
      circle.alpha = 0.2;
      var pt = circle.globalToLocal(this.stage.mouseX, this.stage.mouseY);

      if (circle.x > this.width || circle.y > this.height) { circle.x = 0;
        this.stage.removeChild(circle)
      }
      if (this.stage.mouseInBounds && circle.hitTest(pt.x, pt.y)) {
        circle.alpha = 1;
        // setTimeout( () => this.stage.removeChild(circle), 250);
        // setTimeout(this.stage.removeChild(circle), 3000);
      }
    })
    this.stage.update(event);
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
