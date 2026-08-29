let br, bg, bb; //button red, button green, button blue

let b1x, b1y, b2x, b2y; //button 1 x, button 1 y...
let bcx, bcy; //button center x, button center y;

let dc, da, ds; // dots counter, dots addend, dots state

let img = new Array(69);
let imgIndex;
let names = new Array(69);

let shuffling;

let max;

let rotVal;

function setup() {
  // Create a canvas that fills the entire browser window
  // createCanvas(500, 900);

  let canvas = createCanvas(350, 700);
  canvas.parent('sketch-holder');

  br = 0;
  bg = 0;
  bb = 0;

  dc = 0;
  da = 0;

  shuffling = false;

  // b1x = width * 0.88;
  b1x = width * 0.44;
  b1y = height * 0.03;

  // b2x = width * 0.99; 
  b2x = width * 0.56;
  b2y = height * 0.09;

  bcx = (b1x + b2x) / 2;
  bcy = (b1y + b2y) / 2;

  if (b1x > b2x){
    let swap = b2x;
    b2x = b1x;
    b1x = swap;
  }

  if (b1y > b2y){
    let swap = b2y;
    b2y = b1y;
    b1y = swap;
  }

  rotVal = 0;

  imgIndex = floor(random(69));

  let path = '11_arnosSketches/images/';
  // print(path);
    
  for (let i = 0; i < 69; i++){
    img[i] = loadImage(path + (i+43) + '.jpg');
    // print(path + (i+43) + '.jpg');
    names[i] = i+43;
  }

}

function draw() {



// background(255, map(dc, 0, 179, 0, 255));
background(255);

displayImage();

if(shuffling){
    rotVal += 1;
}

// print(rotVal%360);

  print(dc);


drawButton();
checkMousePos();

runAnimation();

shuffleIndex();
// print(shuffling);
dc += da;

}

function drawButton(){

  push();

  fill(br, bg, bb);
  noStroke();

  translate(bcx, bcy)

  angleMode(DEGREES);
  rotate(rotVal);
  rectMode(CENTER);
  rect(0, 0, b2x-b1x, b2y-b1y, 13);

  pop();

}

function checkMousePos(){
  push();

  if (checkBounds()==true){
        bc(1);  
    }

  else{
    bc(0);
  }

  pop();
}

function checkBounds(){

  // b1 must be smaller
    if(((mouseX >= b1x) && (mouseX <= b2x)) && 
    ((mouseY >= b1y) && (mouseY <= b2y))){
      return true;
    }
    else return false;

}

function bc(state){

  if (state == 0){

    br=200;
    bg=200;
    bb=200;

  }
  else{

    br=245;
    bg=245;
    bb=245;

  }

}

function mouseClicked(){

  if (checkBounds()==true){
    dc=0;
    da=1;
    shuffling = 1;
    // max = floor(random(60, 180));
    max = 180;

    // br = 0;
    // bb = 0;
    // bg = 0;

  }
}

function runAnimation(){

  let phases = new Array(6);

  for (let i = 0; i < 6; i++){
    let quotient = round(max/6);
    phases[i] = round(quotient * (i+1));
  }
  


  if(dc >= max) da = 0;

  if(dc>0){
    if(dc <= phases[0]){
      drawDots(1);
    }
    if(dc >= phases[0] && dc < phases[1]){
      drawDots(2);
    }
    if(dc >= phases[1] && dc < phases[2]){
      drawDots(3);
    }
    if(dc >= phases[2] && dc < phases[3]){
      drawDots(4);
    }
    if(dc >= phases[3] && dc < phases[4]){
      drawDots(5);
    }
    if(dc >= phases[4] && dc < phases[5]){
      drawDots(6);
    }
    if (dc==max - 1){
      drawDots(0);
      da=0;
      dc=0;
      shuffling = 0;
    }

  }

  

}

function drawDots(numDots){

  push();


  let dotSize = (b2x-b1x) / 12;
  let gap = (b2x-b1x) / 7;
  noStroke();
  fill(255);



  translate(bcx, bcy);
  rotate(rotVal);
  switch(numDots){
  case 1:
  circle(0, 0, dotSize);
  break;
  
  case 2:
  circle(0, 0 + gap, dotSize);
  circle(0, 0 - gap, dotSize);
  break;

  case 3:
  circle(0, 0 + gap, dotSize);
  circle(0 + gap, 0 - gap, dotSize);
  circle(0- gap, 0 - gap, dotSize);
  break;

  case 4:
  circle(0 + gap, 0 + gap, dotSize);
  circle(0 + gap, 0 - gap, dotSize);
  circle(0 - gap, 0 + gap, dotSize);
  circle(0 - gap, 0 - gap, dotSize);
  break;

  case 5:
  circle(0, 0 + gap, dotSize);
  circle(0 + (gap*1.5), 0 + gap, dotSize);
  circle(0 - (gap*1.5), 0 + gap, dotSize);

  circle(0 - gap, 0 - gap, dotSize);
  circle(0 + gap, 0 - gap, dotSize);

  break;

  case 6:
  circle(0, 0 + gap, dotSize);
  circle(0 + (gap*1.5), 0 + gap, dotSize);
  circle(0 - (gap*1.5), 0 + gap, dotSize);

  circle(0, 0 - gap, dotSize);
  circle(0 + (gap*1.5), 0 - gap, dotSize);
  circle(0 - (gap*1.5), 0 - gap, dotSize);

  break;

  pop();

  }

}

function displayImage(){

  imageMode(CENTER);
  image(img[imgIndex], width*0.5, height*0.5, 730/2.2, 1024/2.2);
  textSize(12);
  textAlign(CENTER);
  textFont('Geneva');
  fill(200);
  text('"' + names[imgIndex] + '"', width*0.5, height*0.96);

}

function shuffleIndex(){
  if (shuffling == 1){
    if(dc%floor(10) == 0) imgIndex = floor(random(69));
  }
}