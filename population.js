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
    if (this.maxFitness === 0) {
      return false;
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
    // loop through all obstacles
    for (let obs of obstcls) {
      for (let i of this.rockets) {
        let crn_x = obs.x;
        let crn_w = obs.x + obs.w;
        let crn_y = obs.y;
        let crn_h = obs.y + obs.h;
        // if the obstacle is created by dragging from right to left,
        // or from bottom to top, the corner variables need to be switched
        // before hittesting
        if (crn_x > crn_w) {
          [crn_x, crn_w] = [crn_w, crn_x];
        }
        if (crn_y > crn_h) {
          [crn_y, crn_h] = [crn_h, crn_y];
        }
        // hit test obstacles
        if (i.pos.x > crn_x && i.pos.x < crn_w && i.pos.y > crn_y && i.pos.y < crn_h) {
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


  edges(die = false) {
    if (die) {
      // hit the wall = death
      for (let i of this.rockets) {
        if (i.pos.x < 0 || i.pos.x > width || i.pos.y < 0 || i.pos.y > height) {
          i.hit = true;
        }
      }
    } else {
      // hit the wall = bounce
      for (let i of this.rockets) {
        if (i.pos.x < 0) {
          i.pos.x = 0;
          i.vel.x *= -.1;
        }
        if (i.pos.x > width) {
          i.pos.x = width;
          i.vel.x *= -.1;
        }
        if (i.pos.y < 0) {
          i.pos.y = 0;
          i.vel.y *= -.1;
        }
        if (i.pos.y > height) {
          i.pos.y = height;
          i.vel.y *= -.1;
        }
      }
    }
  }

}
