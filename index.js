const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

// Ball Position
let ballX = 400;
let ballY = 300;
// Ball Speed
let ballSpeedX = 2;
let ballSpeedY = 2;
// Paddles Horizontal Position
let paddle1Y = 250;
let paddle2Y = 250;
// Padle Constants
const PADDLEHEIGHT = 100;
const PADDLETHICK = 10;
// Scores
let playerScore = 0;
let compScore = 0;

// Edge of Screen Constants
const [edge0, edgeX, edgeY] = [10, canvas.width - 10, canvas.height]

window.onload = () => {
  setInterval(moveAll, 1000 / 80);
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
  // Player Paddle Paddle
  drawRectangle('white', 0, paddle1Y, PADDLETHICK, PADDLEHEIGHT);
  // Computer Paddle
  drawRectangle('white', 790, paddle1Y, PADDLETHICK, PADDLEHEIGHT);
  // Middle Line
  drawRectangle('white', 400, 0, 5, 600)
  // Scores!
  canvasContext.font = "60px Arial"
  canvasContext.fillText(`${playerScore}`, 200, 50);
  canvasContext.fillText(`${compScore}`, 600, 50);
}

const moveEverything = () => {
  // Detects when the ball hits a Paddle and makes it bounce, according
  // to where the ball hits the paddle.
  if (ballX > edgeX) {
    if (ballY > paddle1Y && ballY < paddle1Y + 20) {
      ballSpeedX *= -1;
      //ballSpeedY *= -1;
      ballSpeedY -= 3;
    } else if (ballY > paddle1Y + 20 && ballY < paddle1Y + 40) {
      ballSpeedX *= -1;
      //ballSpeedY *= -1;
      ballSpeedY -= 2;
    } else if (ballY > paddle1Y + 40 && ballY < paddle1Y + 60) {
      ballSpeedX *= -1;
      ballSpeedY = 0;
    } else if (ballY > paddle1Y + 60 && ballY < paddle1Y + 80) {
      ballSpeedX *= -1;
      //ballSpeedY *= -1;
      ballSpeedY += 2;
    }else if (ballY > paddle1Y + 80 && ballY < paddle1Y + PADDLEHEIGHT) {
      ballSpeedX *= -1;
      //ballSpeedY *= -1;
      ballSpeedY += 2;
    }
    else {
      playerScore++;
      resetBall();
    }    
  }
  if (ballY > edgeY) {
    ballSpeedY *= -1;
  }
  // Detects if the ball hit the paddle, or goes over the edge;
  if (ballX < edge0) {
    if (ballY > paddle1Y && ballY < paddle1Y + 20) {
      ballSpeedX *= -1;
      //ballSpeedY *= -1;
      ballSpeedY -= 3;
    } else if (ballY > paddle1Y + 20 && ballY < paddle1Y + 40) {
      ballSpeedX *= -1;
      //ballSpeedY *= -1;
      ballSpeedY -= 2;
    } else if (ballY > paddle1Y + 40 && ballY < paddle1Y + 60) {
      ballSpeedX *= -1;
      ballSpeedY = 0;
    } else if (ballY > paddle1Y + 60 && ballY < paddle1Y + 80) {
      ballSpeedX *= -1;
      //ballSpeedY *= -1;
      ballSpeedY += 2;
    }else if (ballY > paddle1Y + 80 && ballY < paddle1Y + PADDLEHEIGHT) {
      ballSpeedX *= -1;
      //ballSpeedY *= -1;
      ballSpeedY += 2;
    } else {
      compScore++;
      resetBall();
    }    
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

// Reset ball position
const resetBall = () => {
  ballX = 400;
  ballY = 300;
}

// Scores


const moveAll = () => {
  drawEverything();
  moveEverything();  
}