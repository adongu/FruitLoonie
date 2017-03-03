// import Board from "./board";

// export default class Game {
  let circle;
  let stage;
  let Sliceables = [];
  let width,height;
  let circles = [];
  // canvas
  // let canvas = document.getElementById('boardCanvas')
  // let ctx = canvas.getContext('2d');
  function init() {
    stage = new createjs.Stage("boardCanvas");
    createjs.MotionGuidePlugin.install();

  // stage.addChild(new createjs.Shape());
    width = stage.canvas.width;
    height = stage.canvas.height;

    let backgroundSrc = new Image();
    backgroundSrc.src = "./assets/background.jpg";
    // create number of circles
    createCircles(width, height, 10);
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

  function generateSliceable(circle) {
    c = stage.addChild(circle);
    prevPoint = new createjs.Point(circle.x, circle.y);
    createjs.Tween.get(circle)
      .to({guide:{ path:[120, 500, 220, 160, 340, 160, 500, 320, 580, 550] }}, 1000, createjs.Ease.BezierEasing)
      // .to({guide:{ path:[0,480, 220, 300, 390, 160, 500, 320, 640, 480] }}, 1000, createjs.Ease.BezierEasing)
      // .to({ guide:{ path:[300 ,400, 150, 100, 480, 0] }},1000, createjs.Ease.QuinIn)

    // .call( () => createjs.Tween.get(circle).to({ guide:{ path:[300 ,400, 150, 100, 480, 0] }},1000, createjs.Ease.QuinIn));

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

  function BezierEasing (k) {
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

// }

  // does logic of checking being sliced, point system and points, as well as difficulty


// export Game;
