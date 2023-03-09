let ship;
let shipRotation = 0;
let shipRotator = 0;
let AM;

let shootSound;
let teleportSound;
let rockExplode;

let lasers = [];

function preload() {
  shootSound = loadSound("soundEffects/laserShoot.mp3");
  teleportSound = loadSound("soundEffects/teleport.mp3");
  rockExplode = loadSound("soundEffects/rockExplode.mp3");
}

function setup() {
  createCanvas(400, 400);

  angleMode(RADIANS);
  let startingPosition = createVector(width / 2, height / 2);
  let startingVelocity = createVector(0, 0);
  let size = createVector(10, 20);
  ship = new Player(startingPosition, startingVelocity, size, 3);

  AM = new AsteroidManager(5);
}

function draw() {
  background(0);

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
      // game end
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
