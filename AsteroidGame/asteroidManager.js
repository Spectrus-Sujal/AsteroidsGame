class AsteroidManager {
  constructor(numOfAsteroids) {
    this.asteroids = [numOfAsteroids];

    for (let i = 0; i < numOfAsteroids; i++) {
      let size = random(15, 30);
      let startingPosition = createVector(
        random(0, width - size),
        random(0, height - size)
      );

      this.asteroids[i] = new Asteroid(startingPosition, size, 3);
    }
  }

  update() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
  }

  checkCollisions(target) {
    for (let asteroid = 0; asteroid < this.asteroids.length; asteroid++) {
      if (this.asteroids[asteroid].checkCollision(target)) {
        let temp = this.asteroids[asteroid];
        this.asteroids.splice(asteroid, 1);
        this.splitApart(temp);
        switch (temp.asteroidSize) {
          case 1:
            return 100;

          case 2:
            return 50;

          default:
            return 20;
        }
      }
    }

    return 0;
  }

  splitApart(asteroid) {
    if (asteroid.asteroidSize <= 0) {
      return;
    }

    this.asteroids.push(
      new Asteroid(
        asteroid.position.copy(),
        asteroid.r / 2,
        asteroid.asteroidSize - 1
      )
    );

    this.asteroids.push(
      new Asteroid(
        asteroid.position.copy(),
        asteroid.r / 2,
        asteroid.asteroidSize - 1
      )
    );
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
