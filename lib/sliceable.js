export default class Sliceable {
  constructor (loader) {
    this.circles = {};
    this.radius = 50;
    this.loader = loader
    this.createSliceables = this.createSliceables.bind(this);
  }

  mapSliceableImg(width, height, number){
    for (var i = 0; i < number; i++) {
      circles.push(new createjs.Shape())
        circles[i].graphics.beginFill("red").drawCircle(0,0,50);
        circles[i].x = Math.random() * width;
        circles[i].y = 480;
    }

    // createjs.Bitmap(this.loader.getResult("background"));
    debugger
    // this.stage.addChild(background);
  }

  createSliceables (width, difficulty){
    let radius = this.radius;
    this.circles = {};
    for (let i = 0; i < difficulty; i++) {
      this.circles[i] = new createjs.Shape();
      // console.log(this.circles[i].x);
      // console.log(this.circles[i].y);
      this.circles[i].graphics.beginFill("red").drawCircle(0,0,radius);
      this.circles[i].x = Math.random() * width;
      this.circles[i].y = 480;

      this.circles[i].snapToPixel = true;
      this.circles[i].cache(-radius, -radius, radius * 2, radius * 2)
    }
    createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", this.tick);
    return this.circles;
  }

}
