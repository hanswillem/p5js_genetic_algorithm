class DNA {
  constructor() {
    this.genes = [];
    this.initialize();
  }


  initialize() {
    for (let i = 0; i < lifespan; i++) {
      this.genes.push(p5.Vector.random2D());
    }
  }

}
