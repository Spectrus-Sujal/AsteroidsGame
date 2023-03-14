let ship;
let shipRotation = 0;
let shipRotator = 0;
let AM;

let shootSound;
let teleportSound;
let rockExplode;

let backgroundMusic;

let gameStarted = false;

let lasers = [];

let enemies = [];

let enemy1;

function preload() {
  shootSound = loadSound("soundEffects/laserShoot.mp3");
  shootSound.setVolume(0.3);
  teleportSound = loadSound("soundEffects/teleport.mp3");
  teleportSound.setVolume(0.3);
  rockExplode = loadSound("soundEffects/rockExplode.mp3");
  rockExplode.setVolume(0.3);
  backgroundMusic = loadSound("soundEffects/gameplayLoop.mp3");
  backgroundMusic.setVolume(0.3);
}

function setup() {
  createCanvas(400, 400);

  backgroundMusic.loop();

  angleMode(RADIANS);
  let startingPosition = createVector(width / 2, height / 2);
  let startingVelocity = createVector(0, 0);
  let size = createVector(10, 20);
  ship = new Player(startingPosition, startingVelocity, size, 3);

  AM = new AsteroidManager(5);
}

function draw() {
  background(0);

  if (!gameStarted) {
    stroke(255);
    text("A s t e r o i d s", width / 2 - 40, height / 2);

    stroke(255);
    fill(100);
    rect(width / 4, height - height / 3, width / 2, height / 4);

    text("P L A Y", width / 2 - 20, height - height / 5);

    if (mouseIsPressed) {
      if (mouseX >= width / 4 && mouseX <= width / 4 + width / 2) {
        if (
          mouseY >= height - height / 3 &&
          mouseY <= height - height / 3 + height / 4
        ) {
          gameStarted = true;
          setup();
        }
      }
    }

    return;
  }

  shipRotation += shipRotator;

  push();
  for (let i = 0; i < enemies.length; i++) {
    push();
    enemies[i].lookAtPlayer(ship.position);
    enemies[i].checkSurroundings(AM.asteroids);
    enemies[i].update();
    enemies[i].display();
    enemies[i].cooldown--;

    if (enemies[i].cooldown <= 0) {
      lasers.push(
        new Laser(
          enemies[i].position,
          enemies[i].angle +
            random(-(0.3 * enemies[i].saucerSize), 0.3 * enemies[i].saucerSize),
          false
        )
      );

      enemies[i].cooldown = 180;
    }
    pop();
  }
  pop();

  push();

  ship.rotateShip(shipRotation);
  ship.update(mouseIsPressed);
  ship.display();

  pop();

  push();

  for (let i = 0; i < lasers.length; i++) {
    let decrease = false;
    lasers[i].update();
    lasers[i].display();

    if (lasers[i].checkCollision(ship.position) && !lasers[i].isPlayerLaser) {
      ship.health--;

      ship.position = createVector(width / 2, height / 2);

      if (ship.health <= 0) {
        gameStarted = false;
      }

      decrease = true;
    }

    for (let j = 0; j < enemies.length; j++) {
      if (
        lasers[i].checkCollision(enemies[j].position) &&
        lasers[i].isPlayerLaser
      ) {
        ship.score += 200;
        if (enemies[j].saucerSize == 1) ship.score += 800;
        enemies.splice(j, 1);
        j--;
        decrease = true;
        break;
      }
    }

    decrease = lasers[i].health <= 0;

    if (decrease) {
      lasers.splice(i, 1);
      i--;
    }
  }

  pop();

  push();

  AM.update();
  AM.display();

  // check lasers and asteroids
  for (let i = 0; i < lasers.length; i++) {
    let tempScore = AM.checkCollisions(lasers[i].position);
    if (tempScore != 0) {
      if (lasers[i].isPlayerLaser) {
        ship.score += tempScore;
        if (ship.score >= 1000 * ship.scoreCounter) {
          ship.health++;
          ship.scoreCounter++;

          if (AM.asteroids.length < 5) {
            let size = random(15, 30);
            let startingPosition = createVector(
              random(0, width - size),
              random(0, height - size)
            );
            AM.asteroids.push(startingPosition, size, 3);
          }

          if (random(10) <= 2) {
            enemies.push(new Enemy(1));
          } else {
            enemies.push(new Enemy(2));
          }
        }
      }
      lasers.splice(i, 1);
      i--;
    }
  }

  //check player collision
  if (AM.checkCollisions(ship.position)) {
    ship.health--;

    ship.position = createVector(width / 2, height / 2);

    if (ship.health <= 0) {
      gameStarted = false;
    }
  }

  //check player collision
  for (let i = 0; i < enemies.length; i++) {
    if (AM.checkCollisions(enemies[i].position)) {
      enemies.splice(i, 1);
      i--;
    }
  }

  pop();
}

function keyPressed() {
  switch (key) {
    case "a":
      shipRotator = -0.1;
      break;

    case "d":
      shipRotator = 0.1;
      break;

    case "t":
      ship.teleport();
      enemies.push(new Enemy(2));
      teleportSound.play();
      break;

    case "f":
      lasers.push(new Laser(ship.position, shipRotation, true));
      shootSound.play();
      break;
  }
}

function keyReleased() {
  shipRotator = 0;
}
