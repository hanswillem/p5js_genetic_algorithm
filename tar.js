class Tar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.x, this.y, 100);
  }

}
