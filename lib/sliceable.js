export default class Sliceable {

  createCircles(width, height, number){
    for (var i = 0; i < number; i++) {
      circles.push(new createjs.Shape())
        circles[i].graphics.beginFill("red").drawCircle(0,0,50);
        circles[i].x = Math.random() * width;
        circles[i].y = 480;
    }
  }

}
