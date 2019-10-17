const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

// Ball Positions.

let ballX = 75;
let ballY = 75;
let ballSpeedX = 2;
let ballSpeedY = 2;
const [edge0, edgeX, edgeY] = [0, canvas.width, canvas.height]

window.onload = () => {
  setInterval(moveAll, 1000 / 60);
}

const drawCircle = (color, x, y, radius) => {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

const drawRectangle = (color, x, y, width, height) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

const drawEverything = () => {
  // Background
  drawRectangle('black', 0, 0, canvas.width, canvas.height);

  // Ball
  drawCircle('white', ballX, ballY, 10);

  // Left Paddle
  drawRectangle('white', 0, 250, 10, 100)
  
}

const moveEverything = () => {
  if (ballX > edgeX) {
    ballSpeedX *= -1;
  }
  if (ballY > edgeY) {
    ballSpeedY *= -1;
  }
  if (ballX < edge0) {
    ballSpeedX *= -1;
  }
  if (ballY < edge0) {
    ballSpeedY *= -1;
  }

  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

const moveAll = () => {
  drawEverything();
  moveEverything();
}