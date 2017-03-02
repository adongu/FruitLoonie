// import Board from "./board";

// class Game {
let circle, stage;
let Sliceables = [];
let w,h;
let circles = [];
function init() {
  stage = new createjs.Stage("boardCanvas");
// stage.addChild(new createjs.Shape());
  w = stage.canvas.width;
  h = stage.canvas.height;

  let backgroundSrc = new Image();
  backgroundSrc.src = "./assets/background.jpg";

  createCircles(w, h, 10);
  backgroundSrc.onload = () => {
    let background = new createjs.Bitmap(backgroundSrc);
    stage.addChild(background, ...circles);
    stage.update();
  };
  createjs.Ticker.on("tick", tick);

}

function tick(event) {
    circles.forEach((circle) =>{
      circle.alpha = 0.2;
      var pt = circle.globalToLocal(stage.mouseX, stage.mouseY);
      if (stage.mouseInBounds && circle.hitTest(pt.x, pt.y)) {
        circle.alpha = 1;
        setTimeout( () => stage.removeChild(circle), 500);
        // setTimeout(stage.removeChild(circle), 3000);
      }
    })
		stage.update(event);
}

function generateSliceable(type) {
  var Ease= createjs.Ease;
  arcType = [
    {type: Ease.quartIn, label: "quartIn"},
    {type: Ease.quartOut, label: "quartOut"}
  ]
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
