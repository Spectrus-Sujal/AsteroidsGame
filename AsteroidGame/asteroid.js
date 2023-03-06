class Asteroid extends Actor {
  constructor(radius) {
    let startingPosition = createVector(
      random(0, width - radius), random(0, height - radius)
    );
    let startingVelocity = createVector(random(-2, 2), random(-2, 2));

    super(startingPosition, startingVelocity, radius);

    this.r = radius;
    this.total = random(5, 15);

    this.offset = [];

    for(let i = 0; i < this.total; i++)
    {
        this.offset[i] = random(-15, 15);
    }
  }

  display() 
  {
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, 360);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
