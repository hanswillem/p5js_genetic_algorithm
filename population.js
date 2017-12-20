class Population {
  constructor(n) {
    this.n = n;
    this.rockets = [];
    this.addRockets(this.n);
    this.maxFitness = 0;
  }


  addRockets(n) {
    for (let i = 0; i < n; i++) {
      this.rockets.push(new Rocket());
    }
  }


  update() {
    for (let i of this.rockets) {
      i.show();
      i.update();
    }
  }


  evaluate() {
    // get max fitness score
    this.maxFitness = 0;
    for (let i of this.rockets) {
      if (i.fitness > this.maxFitness) {
        this.maxFitness = i.fitness;
      }
    }
    // loop through rockets to create new generation
    let newGenRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parent1 = this.acceptReject();
      let parent2 = this.acceptReject();
      let child = new Rocket();
      child.dna.genes = this.crossover(parent1, parent2);
      newGenRockets.push(child);
    }
    this.rockets = newGenRockets;
    gencount ++;
  }


  crossover(p1, p2) {
    let newGenes = [];
    let mid = floor(random(lifespan));
    for (let i = 0; i < lifespan; i++) {
      if (i <= mid) {
        newGenes.push(p1.dna.genes[i]);
      } else {
        newGenes.push(p2.dna.genes[i]);
      }
    }
    //mutate
    for (let i = 0; i < lifespan; i++) {
      if (random() < mutationrate) {
        newGenes[i] = p5.Vector.random2D();
      }
    }
    return newGenes;
  }


  acceptReject() {
    while (true) {
      let pick = random(this.rockets);
      let r = random(this.maxFitness);
      if (r < pick.fitness) {
        return pick
      }
    }
  }


  hitTest() {
    // obstacles
    for (let obs of obstcls) {
      for (let i of this.rockets) {
        if (i.pos.x > obs.x && i.pos.x < obs.x + obs.w && i.pos.y > obs.y && i.pos.y < obs.y + obs.h) {
          i.hit = true;
        }
      }
    }
    // target
    for (let i of this.rockets) {
      if ( dist(i.pos.x, i.pos.y, tar.x, tar.y) < 50 ) {
        if (lifetime < lifespan) {
          lifespan = lifetime;
        }
      }
    }
  }

  edges() {
    for (let i of this.rockets) {
      if (i.pos.x < 0 || i.pos.x > width || i.pos.y < 0 || i.pos.y > height) {
        i.hit = true;
      }
    }
  }

}
