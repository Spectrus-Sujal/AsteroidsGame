class Actor {
  constructor(startingPosition, startingVelocity, size, sprite, health) {
    this.position = startingPosition;
    this.velocity = startingVelocity;
    this.size = createVector(size, size);
    this.sprite = sprite;
    this.health = health;
  }

  update() {
    this.position.add(this.velocity);
    this.checkEdges();
  }

  isDead() {
    return this.health <= 0;
  }

  checkEdges() {
    let collisionRadius = this.size.x / 2;

    if (this.position.x > width + collisionRadius * 2) {
      this.position.x = collisionRadius;
    } else if (this.position.x < -collisionRadius) {
      this.position.x = width - collisionRadius;
    }

    if (this.position.y > height + collisionRadius * 2) {
      this.position.y = collisionRadius;
    } else if (this.position.y < -collisionRadius) {
      this.position.y = height - collisionRadius;
    }
  }

  display() {
    image(
      this.sprite,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }
}
