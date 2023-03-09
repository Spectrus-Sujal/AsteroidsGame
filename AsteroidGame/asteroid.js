class Asteroid extends Actor {
  constructor(startingPosition, radius, asteroidSize) {
    let startingVelocity = createVector(
      random(-(4 - asteroidSize), 4 - asteroidSize),
      random(-(4 - asteroidSize), 4 - asteroidSize)
    );
    let size = createVector(radius, radius);
    super(startingPosition, startingVelocity, size);

    this.r = radius;
    this.asteroidSize = asteroidSize;
    this.total = random(this.asteroidSize, this.asteroidSize * 3);

    this.offset = [];

    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.asteroidSize * 5, this.asteroidSize * 5);
    }
  }

  display() {
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
