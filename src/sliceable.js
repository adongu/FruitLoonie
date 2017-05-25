export default class Sliceable {
  constructor (loader) {
    this.circles = {};
    this.radius = 45;
    this.loader = loader
    this.generateSliceables = this.generateSliceables.bind(this);
    //"bomb"
    this.types = ["peach", "apple", "strawberry", "watermelon"];
    this.splats = ["yellow_splat", "green_splat", "red_splat", "red_splat"];
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
      this.determineSliceable(i);
      // for checking times out of border length, 1 for creating, 2 to unstage
      this.circles[i].model = new createjs.Bitmap(this.loader.getResult(`${this.circles[i].type}`));
      this.circles[i].splatter = new createjs.Bitmap(this.loader.getResult(`${this.circles[i].splat}`));
      // this.initializeProperties(i);

      this.circles[i].snapToPixel = true;
      this.circles[i].model.snapToPixel = true;
      this.circles[i].cache(0, 0, radius * 2, radius * 2)
    }
    createjs.Ticker.setFPS(60);
    return this.circles;
  }

  initializeProperties(i, width){
    let x
    if (Math.random() <= 0.5) {
      x = -5 + Math.random() * 150;
    } else {
      x = +495 + Math.random() * 150;
    }
    //  * 400;
    let y = 400;
    let angle = 45 + Math.random() * 10;
    this.circles[i].outOfBounds = false;

    this.circles[i].x = x;
    this.circles[i].y = y;
    this.circles[i].begin = x;
    // this.circles[i].end = end;
    this.circles[i].angle = angle;

    this.circles[i].model.x = x;
    this.circles[i].model.y = y + 5;
    this.circles[i].model.begin = x;
    // this.circles[i].model.end = end;
    this.circles[i].model.angle = angle;

    this.circles[i].splatter.x = x;
    this.circles[i].splatter.y = y + 5;
    this.circles[i].splatter.begin = x;
    // this.circles[i].splatter.end = end;
    this.circles[i].splatter.angle = angle;
  }

  determineSliceable (id) {
    let type = (Math.round(Math.random() * 3))
    // order for splat and type is same
    this.circles[id].type = this.types[type];
    this.circles[id].splat = this.splats[type];
  }

}
