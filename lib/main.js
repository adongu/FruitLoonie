import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  manifest = [
    { src: "game_over.png", id: "game_over" },
    { src: "new-game.png", id: "new-game" },
    { src: "pineapple.png", id: "pineapple" },
    { src: "splash.png", id: "splash" },
    { src: "watermelon.png", id: "watermelon" },
    { src: "x.png", id: "x" },
    { src: "xf.png", id: "xf" },
    { src: "xx.png", id: "xx" },
    { src: "xxf.png", id: "xxf" },
    { src: "xxx.png", id: "xxx" },
    { src: "xxxf.png", id: "xxxf" },
    { src: "background", id: "background"}
  ]

  const stage = new createjs.Stage()
  let game = new Game(stage, manifest);
  game.start();
})
