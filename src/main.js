'use strict'

import Game from './game';
import Animation from './Animation'


let mute;
let muteBtn;
document.addEventListener('DOMContentLoaded', () => {
  let manifest = [
    { src: "bomb-explode.ogg", id: "boom_sound" },
    { src: "splatter.ogg", id: "splatter_sound" },
    { src: "throw-fruit.ogg", id: "throw_sound" },
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
    { src: "s-green.png", id: "green_splat" },
    { src: "s-yellow.png", id: "yellow_splat" },
    { src: "s-red.png", id: "red_splat" },
    { src: "bomb.png", id: "bomb" }
  ]

  mute = false;
  muteBtn = document.getElementById("mute-btn");


  muteBtn.addEventListener('click', toggleMute);
  muteBtn.addEventListener('keydown', toggleMute);
  // window.addEventListener("mousemove", PointerMove);
  const stage = new createjs.Stage("boardCanvas");
  //
  let game = new Game(stage, manifest, sliceables);
  game.start();
})

const toggleMute = (e) => {
  e.preventDefault();
  if (e.keyCode >= 0) {
    return;
  }
  if (mute) {
    mute = false;
    createjs.Sound.muted = false;
    muteBtn.className = "";
    muteBtn.textContent = "Mute"
    // document.getElementById("mute-btn").text="Mute";
  } else {
    mute = true;
    createjs.Sound.muted = true;
    muteBtn.className = "unmute";
    muteBtn.textContent = "UnMute"
    // document.getElementById("mute-btn").text="Unmute";
  }
}
