class AsteroidManager {
  constructor(numOfAsteroids, sprite) {
    this.asteroids = [numOfAsteroids];

    for (let i = 0; i < numOfAsteroids; i++) {
      let startingPosition = createVector(random(0, width), random(0, height));
      let startingVelocity = createVector(random(0, 5), random(0, 5));
      let size = floor(random(2, 5)) * 10;
      this.asteroids[i] = new Actor(
        startingPosition,
        startingVelocity,
        size,
        sprite,
        1
      );
    }
  }

  update() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
  }

  display() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].display();
    }
  }
}
