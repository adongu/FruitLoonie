import Sliceable from './sliceable';

export default class Board {
  constructor (stage) {

    createjs.MotionGuidePlugin.install();
    this.stage = stage;
    // stage.addChild(new createjs.Shape());
    this.width = this.stage.canvas.width;
    this.height = this.stage.canvas.height;
    // create number of circles
    this.createCircles(width, height, 10);
    // create background and circles
  }

  createBackground() {
    let backgroundSrc = new Image();
    backgroundSrc.src = "./assets/background.jpg";

    backgroundSrc.onload = () => {
      let background = new createjs.Bitmap(backgroundSrc);
    };
  }

  tick(event) {
      circles.forEach((circle) =>{
        circle.alpha = 0.2;
        var pt = circle.globalToLocal(stage.mouseX, stage.mouseY);

        if (circle.x > stage.canvas.width || circle.y > stage.canvas.height) { circle.x = 0;
          stage.removeChild(circle)
        }
        if (stage.mouseInBounds && circle.hitTest(pt.x, pt.y)) {
          circle.alpha = 1;
          setTimeout( () => stage.removeChild(circle), 250);
          // setTimeout(stage.removeChild(circle), 3000);
        }
      })
      stage.update(event);
  }
}
