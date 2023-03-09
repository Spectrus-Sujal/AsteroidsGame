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

function preload() {
  shootSound = loadSound("soundEffects/laserShoot.mp3");
  teleportSound = loadSound("soundEffects/teleport.mp3");
  rockExplode = loadSound("soundEffects/rockExplode.mp3");
  backgroundMusic = loadSound("soundEffects/gameplayLoop.mp3");
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
        }
      }
    }
  } else {
    playGame();
  }
}

function playGame() {
  shipRotation += shipRotator;

  push();

  ship.rotateShip(shipRotation);
  ship.update(mouseIsPressed);
  ship.display();

  pop();

  push();

  for (let i = 0; i < lasers.length; i++) {
    lasers[i].update();
    lasers[i].display();
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
        if (ship.score >= 10000 * ship.scoreCounter) {
          ship.health++;
          ship.scoreCounter++;
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
