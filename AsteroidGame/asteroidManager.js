class AsteroidManager {
  constructor(numOfAsteroids) {
    this.asteroids = [numOfAsteroids];

    for (let i = 0; i < numOfAsteroids; i++) {
      let size = random(15, 30);
      this.asteroids[i] = new Asteroid(size);
    }
  }

  update() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
  }

  display() {
    for (let i = 0; i < this.asteroids.length; i++) {
      push();

      stroke(255);
      noFill();

      translate(this.asteroids[i].position.x, this.asteroids[i].position.y);

      this.asteroids[i].display();

      pop();
    }
  }
}
