class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    noStroke();
    fill(0, 50);
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h);
    stroke(0, 75);
    noFill();
    line(this.x, this.y, this.x + this.w, this.y + this.h);
    line(this.x, this.y + this.h, this.x + this.w, this.y);
  }
}
