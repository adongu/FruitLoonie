export default class Sliceable {
  constructor (loader) {
    this.circles = {};
    this.radius = 45;
    this.loader = loader
    this.createSliceables = this.createSliceables.bind(this);
    //"bomb"
    this.types = ["peach", "apple", "strawberry", "watermelon"];
    this.determineSliceable = this.determineSliceable.bind(this);
  }

  mapSliceableImg(width, height, number){
    for (var i = 0; i < number; i++) {
      circles.push(new createjs.Shape())
        circles[i].graphics.beginFill("red").drawCircle(0,0,50);
        // circles[i].alpha = 0;
        circles[i].x = Math.random() * width;
        circles[i].y = 550;
    }

  }

  createSliceables (width, difficulty){
    let radius = this.radius;
    this.circles = {};
    for (let i = 0; i < difficulty; i++) {
      this.circles[i] = new createjs.Shape();
      // console.log(this.circles[i].x);
      // console.log(this.circles[i].y);
      this.circles[i].graphics.beginFill("red").drawCircle(radius, radius,radius);
      this.circles[i].alpha = 0;
      this.circles[i].type = this.determineSliceable();
      this.circles[i].shape = new createjs.Bitmap(this.loader.getResult(`${this.circles[i].type}`));

      this.circles[i].x = Math.random() * width;
      this.circles[i].y = 400;

      this.circles[i].snapToPixel = true;
      // this.circles[i].shape.snapToPixel = true;
      this.circles[i].cache(0, 0, radius * 2, radius * 2)
    }
    createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", this.tick);
    return this.circles;
  }

  determineSliceable () {
    let type = (Math.round(Math.random() * 4))
    return this.types[type];
  }

}
