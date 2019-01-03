console.log("It is working");
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  static random(minX, maxX, minY, maxY) {
    return new Vector(
      Vector.randomNumBetween(minX, maxX),
      Vector.randomNumBetween(minY, maxY)
    );
  }
  static randomNumBetween(min, max) {
    return min + Math.random() * (max - min);
  }
}

// Attempt to get mouse click coordinates (and failing to use them)

function mousePos() {
  var mouseX = event.pageX;
  var mouseY = event.pageY;

  console.log(mouseX, mouseY);
}
window.addEventListener("click", mousePos);

class Snowflake {
  constructor(width, height) {
    this.boundaryX = width;
    this.boundaryY = height;
    this.pos = Vector.random(0, width, 0, height);

    // this.pos = new Vector(window.addEventListener("click", mousePos));

    this.vel = Vector.random(-0.3, 0.3, 0.3, 1);
    this.radius = Vector.randomNumBetween(1, 3.5);
    this.mass = this.radius * 0.1; // the bigger the snowflake radius, the heavier
    this.acc = new Vector(this.mass * 0, this.mass * 0);
    //some fun with random acceleration
    // this.acc = new Vector(
    //   Vector.randomNumBetween(0, 0),
    //   Vector.randomNumBetween(0, 0)
    // );

    this.alpha = Vector.randomNumBetween(0.1, 0.9);
  }
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);

    // check for wrapround
    if (this.pos.x > this.boundaryX) {
      this.pos.x = 0;
    } else if (this.pos.y > this.boundaryY) {
      this.pos.y = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = this.boundaryX;
    }
  }
}
class Christmas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    this.canvas.width = 800;
    this.canvas.height = 800;
    this.setup();
    requestAnimationFrame(() => this.update());
  }
  setup() {
    const NUMFLAKES = 500;
    this.snowflakes = [];

    for (let i = 0; i < NUMFLAKES; i++) {
      this.snowflakes.push(
        new Snowflake(this.canvas.width, this.canvas.height)
      );
    }
  }
  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let flake of this.snowflakes) {
      flake.update();
      this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(flake.pos.x, flake.pos.y, flake.radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
    requestAnimationFrame(() => this.update());
  }
}

new Christmas();
