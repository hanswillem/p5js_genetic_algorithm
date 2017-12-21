// click and drag with mouse to move target (green circle)
// click and drag with mouse to create obstacle
// 'u' - undo last obstacle


let p, popMax, lifespan, lifespanMax, lifetime, mutationrate, obstcls, creatingObstcl, tar, dragTar, gencount, winner;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(0);
  lifespanMax = 400;
  lifespan = lifespanMax;
  lifetime = 0;
  mutationrate = .02;
  popMax = 100;
  p = new Population(popMax);
  obstcls = [];
  creatingObstcl = false;
  tar = new Tar(width / 2, 100);
  dragTar = false;
  gencount = 0;
}


function draw() {
  background(225);

  tar.show();
  drawDragTar();
  createObstacle();
  drawObstacles();
  handlePopulation();
  drawWinning();
  lifetime ++;

  drawHud();
}


function keyPressed() {
  // print(keyCode);
  // 'u'
  if (keyCode === 85) {
    undoObstacle();
  }
}


function mousePressed() {
  let d = dist(mouseX, mouseY, tar.x, tar.y);
  if (d < 50) {
    dragTar = true;
  } else {
    creatingObstcl = true;
    obstclStart = createVector(mouseX, mouseY);
  }
}


function mouseReleased() {
  if (creatingObstcl) {
    creatingObstcl = false;
    obstcls.push(new Obstacle(obstclStart.x, obstclStart.y, mouseX - obstclStart.x, mouseY - obstclStart.y));
    resetall();
  }
  if (dragTar) {
    dragTar = false;
    resetall();
  }
}


function createObstacle() {
  noStroke();
  fill(0, 50);
  rectMode(CORNER);
  if (mouseIsPressed && creatingObstcl && !dragTar) {
    rect(obstclStart.x, obstclStart.y, mouseX - obstclStart.x, mouseY - obstclStart.y);
  }
}


function drawDragTar() {
  if (mouseIsPressed && drawDragTar && !creatingObstcl) {
    tar.x = mouseX;
    tar.y = mouseY;
  }
}


function handlePopulation() {
  p.update();
  p.hitTest();
  p.edges(false);
  if (lifetime > lifespan) {
    // evaluate and start new generation
    eval = p.evaluate();
    // reset sketch when the maxFitness of the prev gen was 0
    if (eval === false) {
      resetall();
    }
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
  winner = null;
}


function undoObstacle() {
  if (obstcls.length > 0) {
    obstcls.pop();
    resetall();
  }
}


function drawHud() {
  noStroke();
  fill(0);
  text('lifespan: ' + lifespan, 50, 50);
  text('lifetime: ' + lifetime, 50, 70);
  text('max fitness: ' + p.maxFitness, 50, 90);
  text('mutation rate: ' + mutationrate, 50, 110);
  text('generation: ' + gencount, 50, 130);
}


function drawWinning() {
  if (winner) {
    noFill();
    stroke(255);
    drawPath(winner);
    noStroke();
    fill(0, 0, 255, 100);
    ellipse(winner.closestPos.x, winner.closestPos.y, 25);
  }
}


function drawPath(r) {
  for (let i = 0; i < r.path.length; i++) {
    if (i > 0) {
      line(r.path[i - 1].x, r.path[i - 1].y, r.path[i].x, r.path[i].y);
    }
  }
}
