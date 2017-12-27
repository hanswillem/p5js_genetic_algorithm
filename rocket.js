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
    this.path = [];

    this.c = 0;
  }


  show() {
    noStroke();
    fill(this.c, 100);
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
      this.path.push(createVector(this.pos.x, this.pos.y));
      // if not hit
      this.applyForce(this.dna.genes[lifetime]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      if (this.getFitness() > this.fitness) {
        this.fitness = this.getFitness();
      }
    }
  }


  applyForce(f) {
    this.acc.add(f);
  }


  getFitness() {
    let d = dist(this.pos.x, this.pos.y, tar.x, tar.y);
    return 1 / d;
  }


}
