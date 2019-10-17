const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

// Ball Position
let ballX = 75;
let ballY = 75;
// Ball Speed
let ballSpeedX = 2;
let ballSpeedY = 2;
// Paddles Horizontal Position
let paddle1Y = 250;
const PADDLEHEIGHT = 100;

// Edge of Screen Constants
const [edge0, edgeX, edgeY] = [0, canvas.width, canvas.height]

window.onload = () => {
  setInterval(moveAll, 1000 / 60);
  // Calculates mouse position and updates the vert position of the paddle.
  canvas.addEventListener('mousemove', e => {
    let mousePos = calcMousePos(e);
    paddle1Y = mousePos.y - (PADDLEHEIGHT / 2);
  })
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
  drawRectangle('white', 0, paddle1Y, 10, PADDLEHEIGHT)  
}

const moveEverything = () => {
  // Detects when the ball hits an edge and makes it bounce.  
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


// Calculating mouse position in relation to the site scroll and play area
const calcMousePos = e => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

const moveAll = () => {
  drawEverything();
  moveEverything();
}