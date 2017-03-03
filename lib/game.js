// import Board from "./board";

// class Game {
let circle, stage;
let Sliceables = [];
let w,h;
let circles = [];
// canvas
// let canvas = document.getElementById('boardCanvas')
// let ctx = canvas.getContext('2d');
function init() {
  stage = new createjs.Stage("boardCanvas");
// stage.addChild(new createjs.Shape());
  w = stage.canvas.width;
  h = stage.canvas.height;

  let backgroundSrc = new Image();
  backgroundSrc.src = "./assets/background.jpg";
  // create number of circles
  createCircles(w, h, 10);
  // create background and circles
  backgroundSrc.onload = () => {
    let background = new createjs.Bitmap(backgroundSrc);
    stage.addChild(background)
    circles.forEach( (circle, index) => {
      // set time interval for each Sliceables
      time = index*500
      setTimeout(() => generateSliceable(circle), time)
    });
    stage.update();
  };
  // createjs.Ticker.on("tick", tick);

};

function tick(event) {
    circles.forEach((circle) =>{
      circle.alpha = 0.2;
      var pt = circle.globalToLocal(stage.mouseX, stage.mouseY);

      // circle.x = circle.x;
      // circle.y = circle.y + (event.delta-16)/10
      // console.log(circle.x, circle.y)

      // not time based:
      circle.x = circle.x + 5; // 100 / 20 = 5
      // if (tickCircle.x > stage.canvas.width) { tickCircle.x = 0; }

      if (circle.x > stage.canvas.width || circle.y > stage.canvas.height) { circle.x = 0;
        stage.removeChild(circle)
      }
      if (stage.mouseInBounds && circle.hitTest(pt.x, pt.y)) {
        circle.alpha = 1;
        setTimeout( () => stage.removeChild(circle), 500);
        // setTimeout(stage.removeChild(circle), 3000);
      }
    })
		stage.update(event);
}

function generateSliceable(circle) {
  c = stage.addChild(circle);
  prevPoint = new createjs.Point(circle.x, circle.y);
  createjs.Tween.get(circle, { loop: false })
    .to({x: 0}, 400, createjs.Ease.getPowIn(5))
    .to({x: 5}, 400, createjs.Ease.getPowIn(5))
    .to({x: 5, y: 100}, 400, createjs.Ease.getPowIn(5))
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", tick);
}

function createCircles(width, height, number){
  for (var i = 0; i < number; i++) {
    circles.push(new createjs.Shape())
  		circles[i].graphics.beginFill("red").drawCircle(0,0,50);
  		circles[i].x = Math.random() * width;
  		circles[i].y = 480;
  }
}

function run () {

}



  // does logic of checking being sliced, point system and points, as well as difficulty


// export Game;
