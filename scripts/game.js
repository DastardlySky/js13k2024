import { init, Sprite, SpriteSheet, Scene, GameLoop, initKeys, initPointer, getPointer, keyPressed, Text, collides, loadImage, TileEngine} from "./kontra.js";
import { ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, BIG_SHEET} from "../util/constants.js";

let { canvas, context } = init();

let frames = 0;
let time = 0;

context.imageSmoothingEnabled = false;
let offscreenCanvas = document.createElement('canvas');

let bigSheetImage = new Image();
bigSheetImage.src = BIG_SHEET;


bigSheetImage.onload = function() {

  function calculateAngle(reikoX, reikoY){

    const deltaX = getPointer().x - reikoX + tileEngine.sx;
    const deltaY = getPointer().y - reikoY + tileEngine.sy;
    
    const angleInRadians = Math.atan2(deltaY, deltaX);
    
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    
    return angleInDegrees
    }

  initPointer();

  let fireSpriteSheet = SpriteSheet({
    image: bigSheetImage,
    frameWidth: 8,
    frameHeight: 8,
    animations: {
      flaming: {
        frames: '550..553',
        frameRate: 8
      },
    }
  });
  
  let fire = Sprite({
    x: 100,
    y: 100,
    anchor: {x: 0.5, y: 0.5},
  
    // required for an image sprite
    animations: fireSpriteSheet.animations,
  });
  fire.playAnimation("flaming");

  let tileEngine = TileEngine({
    // tile size
    tilewidth: 16,
    tileheight: 16,

    // map size in tiles
    width: 32,
    height: 32,

    // tileset object
    tilesets: [{
      firstgid: 1,
      image: bigSheetImage
    }],

    // layer object
    layers: [{
      name: 'ground',
      data:[2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2,
            2, 2, 1, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2,
            1, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1,
            2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2,
            1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1,
            1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2,
            1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2,
            1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 2,
            1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1,
            1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1,
            1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 2,
            1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1,
            1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 13, 14, 14, 15, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2,
            2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 1, 25, 26, 26, 27, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 37, 26, 26, 39, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 1,
            2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 25, 27, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1,
            1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 25, 27, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 2, 1,
            1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2,
            2, 1, 1, 1, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1,
            1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 2,
            1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1,
            1, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2,
            2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2,
            1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 1,
            2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1,
            1, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1,
            1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2,
            1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    }]
  });

  let reikoSpriteSheet = SpriteSheet({
    image: bigSheetImage,
    frameWidth: 16,
    frameHeight: 32,
    animations: {
      test: {
        frames: 72,
        frameRate: 16
      },
    }
  });

  let reiko = Sprite({
    width: 16,
    height: 32,
    anchor: {x:0.5, y:0.5},
    x: canvas.width / 2,        
    y: canvas.height / 2,
    dx: 0,
    dy: 0,
    animations: reikoSpriteSheet.animations,
    update(){
      if (keyPressed(ARROW_LEFT)) {
        this.dx = -2;
        this.scaleX = -1;
        
      } else if (keyPressed(ARROW_RIGHT)) {
        this.dx = +2;
        this.scaleX = 1;
      }
  
      else{
        this.dx = 0
      }
    
      if (keyPressed(ARROW_UP)) {
        this.dy = -2;  
      }
    
      else if (keyPressed(ARROW_DOWN)) {
        this.dy = +2;  
      }
  
      else {
        this.dy = 0
      }

      tileEngine.sx = this.x - canvas.width / 2,
      tileEngine.sy = this.y - canvas.height / 2,

      this.advance();
    }
  });
  reiko.playAnimation("test");
  
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

  tileEngine.add(fire);
  tileEngine.add(reiko);
  
  let loop = GameLoop({ 
  
    render: function() {
      tileEngine.render();
      drawPixelText(context, `${Math.floor(frames / 60)}`, 15, -16, '12px Calibri', 13, 3, true);
    },
    
    update: function() {
      reiko.update();
      fire.update();
      
      fire.x = reiko.x + 20;
      fire.y = reiko.y;

      console.log(calculateAngle(reiko.x, reiko.y))

      // console.log(reiko.x)
      frames ++;
  
      // if (frames % 60 == 0) {
      //   zzfx(...[.8,0,-100,,.02,.008,1,,9,2,249,.01,.01,,,,,.55,.02,,392]);
      // }
  
      // console.log(frames/60)
    }
  
  });
  
  initKeys(); 
  loop.start(); 
  
}