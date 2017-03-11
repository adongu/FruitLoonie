export default class Sliceable {
  constructor (loader) {
    this.circles = {};
    this.radius = 45;
    this.loader = loader
    this.generateSliceables = this.generateSliceables.bind(this);
    //"bomb"
    this.types = ["peach", "apple", "strawberry", "watermelon"];
    this.determineSliceable = this.determineSliceable.bind(this);
    this.initializeProperties = this.initializeProperties.bind(this);
  }

  generateSliceables (width, difficulty){
    let radius = this.radius;
    this.circles = {};
    for (let i = 0; i < difficulty; i++) {
      this.circles[i] = new createjs.Shape();

      this.circles[i].graphics.beginFill("black").drawCircle(radius, radius,radius);
      this.circles[i].alpha = 0;
      this.circles[i].type = this.determineSliceable();
      // for checking times out of border length, 1 for creating, 2 to unstage
      this.circles[i].outOfBoundsTimes = 0;
      this.circles[i].model = new createjs.Bitmap(this.loader.getResult(`${this.circles[i].type}`));

      this.initializeProperties(i);

      this.circles[i].snapToPixel = true;
      this.circles[i].model.snapToPixel = true;
      this.circles[i].cache(0, 0, radius * 2, radius * 2)
    }
    createjs.Ticker.setFPS(60);
    return this.circles;
  }

  initializeProperties(i, width){
    let x = 0 + Math.random() * 100;
    let y = 400;
    let angle = 45 + Math.random() * 10;
    let end = 580 + Math.random() + 50;

    this.circles[i].x = x;
    this.circles[i].y = y;
    this.circles[i].begin = x;
    this.circles[i].end = end;
    this.circles[i].angle = angle;

    this.circles[i].model.x = x;
    this.circles[i].model.y = y + 5;
    this.circles[i].model.begin = x;
    this.circles[i].model.end = end;
    this.circles[i].model.angle = angle;
  }

  determineSliceable () {
    let type = (Math.round(Math.random() * 4))
    return this.types[type];
  }

}
