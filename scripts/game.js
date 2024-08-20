import { init, Sprite, SpriteSheet, Scene, GameLoop, initKeys, keyPressed, Text, collides } from "./kontra.js";
import { ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, CHARACTER_SPRITE} from "../util/constants.js";

let { canvas, context } = init();

let frames = 0;

context.imageSmoothingEnabled = false;
let offscreenCanvas = document.createElement('canvas');

let characterSprite = new Image();
characterSprite.src = CHARACTER_SPRITE;

let time = 0;

// custom function to draw pixel art text
function drawPixelText(context, text, x, y, font, threshold, scalingFactor, wiggle) {
  const canvasWidth = 250;
  const canvasHeight = 32;
  offscreenCanvas.width = canvasWidth;
  offscreenCanvas.height = canvasHeight;
  let d = offscreenCanvas.getContext('2d');
  time +=0.01

  d.font = font;
  d.textBaseline = "middle";
  d.fillText(text, 0, 16);

  let I = d.getImageData(0, 0, canvasWidth, canvasHeight);

  // set fill style
  context.fillStyle = '#001023';
  context.lineWidth = 1;

  let offsetY = 0; // initialize the offsetY variable outside the loop

  for (let i = 0; i < canvasWidth; i++) {
    for (let j = 0; j < canvasHeight; j++) {
      if (
        I.data[(j * canvasWidth + i) * 4 + 1] > threshold ||
        I.data[(j * canvasWidth + i) * 4 + 2] > threshold ||
        I.data[(j * canvasWidth + i) * 4 + 3] > threshold
      ) {
        if (wiggle) {
          // only calculate offsetY if wiggle is true
          offsetY = Math.sin(time + i * 0.06) * 5;
        }
        // draw the pixel with potentially modified offsetY
        context.fillRect(x + i * scalingFactor, y + j * scalingFactor + offsetY, scalingFactor, scalingFactor);
        
      }
    }
  }
}

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
    drawPixelText(context, `${Math.floor(frames / 60)}`, 15, -16, '12px Calibri', 13, 3, true);
  },
  
  update: function() {
    frames ++;

    if (frames % 60 == 0) {
      zzfx(...[.8,0,-100,,.02,.008,1,,9,2,249,.01,.01,,,,,.55,.02,,392]);
    }

    console.log(frames/60)

    movement(reiko)

    reiko.update();   
  }
  
});

initKeys(); 

loop.start(); 