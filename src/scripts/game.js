import { init, Sprite, SpriteSheet, Scene, GameLoop, initKeys, keyPressed, Text, collides } from "./kontra.js";
import { ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, CHARACTER_SPRITE} from "../util/constants.js";

let { canvas, context } = init();


let characterSprite = new Image();
characterSprite.src = CHARACTER_SPRITE;

let reiko = Sprite({
  x: canvas.width / 2,        
  y: canvas.height / 2, 
  anchor: {
    x: 0.5,
    y: 0.5
  },
  image: characterSprite
});

function movement(sprite){

  if (keyPressed(ARROW_LEFT)) {
    sprite.x -= 1;
  }

  if (keyPressed(ARROW_RIGHT)) {
    sprite.x += 1;
  }

  if (keyPressed(ARROW_UP)) {
    sprite.y -= 1;  
  }

  if (keyPressed(ARROW_DOWN)) {
    sprite.y += 1;  
  }
}

let loop = GameLoop({ 

  render: function() { 
    reiko.render();
  },
  
  update: function() {
    movement(reiko)

    reiko.update(); 
  }
  
});

initKeys(); 

loop.start(); 