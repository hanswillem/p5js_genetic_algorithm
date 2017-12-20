class Rocket {
  constructor(x = width / 2, y = height - 30) {
    this.x = x;
    this.y = y;
    this.pos = createVector(this.x, this.y);
    this.vel = createVector();
    this.acc = createVector();
    this.dna = new DNA();
    this.fitness = 0;
    this.hit = false;
  }

  show() {
    noStroke();
    fill(0, 100);
    rectMode(CENTER);

    push();
      translate(this.pos.x, this.pos.y)
      let angle = this.vel.heading();
      angle += HALF_PI;
      rotate(angle);
      rect(0, 0, 10, 25);
    pop();

  }

  update() {
    if (this.hit === false) {
      this.applyForce(this.dna.genes[lifetime]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.setFitness();
    } else {
      this.fitness = -1;
    }
  }

  applyForce(f) {
    this.acc.add(f);
  }

  setFitness() {
    let d = dist(this.pos.x, this.pos.y, tar.x, tar.y);
    this.fitness = 1 / d;
  }
}
