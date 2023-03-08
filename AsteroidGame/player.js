class Player extends Character {
  constructor(startingPosition, startingVelocity, size, startHealth) {
    super(startingPosition, startingVelocity, size);
    this.health = startHealth;
    this.score = 0;
  }

  teleport() {
    this.position.x = random(width);
    this.position.y = random(height);
  }

  display() {
    stroke(255);
    strokeWeight(1);
    fill(0);
    translate(this.position.x, this.position.y);
    rotate(this.charRotation);
    triangle(0, 0, -this.size.x / 2, this.size.y, this.size.x / 2, this.size.y);
  }
}
