import Game from './game';
document.addEventListener('DOMContentLoaded', () => {
  let manifest = [
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
    { src: "background.jpg", id: "background"}
  ]

  let sliceables = [
    { src: "apple-1.png", id: "apple_1" },
    { src: "apple-2.png", id: "apple_2" },
    { src: "apple.png", id: "apple" },
    { src: "banana-1.png", id: "banana_1" },
    { src: "banana-2.png", id: "banana_2" },
    { src: "banana.png", id: "banana" },
    { src: "peach-1.png", id: "peach_1" },
    { src: "peach-2.png", id: "peach_2" },
    { src: "peach.png", id: "peach" },
    { src: "strawberry-1.png", id: "strawberry_1" },
    { src: "strawberry-2.png", id: "strawberry_2" },
    { src: "strawberry.png", id: "strawberry" },
    { src: "watermelon-1.png", id: "watermelon_1" },
    { src: "watermelon-2.png", id: "watermelon_2" },
    { src: "watermelon.png", id: "watermelon" },
    { src: "bomb.png", id: "bomb" },

  ]
  const stage = new createjs.Stage("boardCanvas");
  let game = new Game(stage, manifest, sliceables);
  game.start();
})
