// drag with mouse to create obstacle
// if you create an obstacle, always drag from top left to bottom right
// otherwise the obsctacle doesn't work
//
// the sketch crashes when the maxFitness of a generation is 0;
//
// 't' - move the target to the mouse location
// 'u' - undo last obstacle


let p, popMax, lifespan, lifespanMax, lifetime, mutationrate, obstcls, creatingObstcl, tar, gencount;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(0);
  lifespanMax = 250;
  lifespan = lifespanMax;
  lifetime = 0;
  mutationrate = .02;
  popMax = 500;
  p = new Population(popMax);
  obstcls = [];
  creatingObstcl = false;
  tar = new Tar(width / 2, 100);
  gencount = 0;
}


function draw() {
  background(225);

  fill(0);
  text('lifespan: ' + lifespan, 50, 50);
  text('lifetime: ' + lifetime, 50, 70);
  text('max fitness: ' + p.maxFitness, 50, 90);
  text('mutation rate: ' + mutationrate, 50, 110);
  text('generation: ' + gencount, 50, 130);

  tar.show();
  createObstacle();
  drawObstacles();
  handlePopulation();
  lifetime ++;
}


function keyPressed() {
  // print(keyCode);
  // 't'
  if (keyCode === 84) {
    tar.x = mouseX;
    tar.y = mouseY;
    resetall();
  }
  // 'u'
  if (keyCode === 85) {
    undoObstacle();
  }
}

function mousePressed() {
  creatingObstcl = true;
  obstclStart = createVector(mouseX, mouseY);
}


function mouseReleased() {
  creatingObstcl = false;
  obstcls.push(new Obstacle(obstclStart.x, obstclStart.y, mouseX - obstclStart.x, mouseY - obstclStart.y));
  resetall();
}


function createObstacle() {
  noStroke();
  fill(0, 50);
  rectMode(CORNER);
  if (mouseIsPressed && creatingObstcl) {
    rect(obstclStart.x, obstclStart.y, mouseX - obstclStart.x, mouseY - obstclStart.y);
  }
}


function handlePopulation() {
  p.update();
  p.hitTest();
  p.edges();
  if (lifetime > lifespan) {
    p.evaluate();
    lifetime = 0;
  }
}


function drawObstacles() {
  for (let i of obstcls) {
    i.show();
  }
}


function resetall() {
  lifetime = 0;
  lifespan = lifespanMax;
  p = new Population(popMax);
  gencount = 0;
}

function undoObstacle() {
  if (obstcls.length > 0) {
    obstcls.pop();
    resetall();
  }
}
