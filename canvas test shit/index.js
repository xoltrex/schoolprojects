var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRad = 10;
var pHeight = 10;
var pWidth = 75;
var score = 0;
var paddleX = (canvas.width-pWidth) / 2;

var RPress = false;
var LPress = false;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "d") {
    RPress = true;
  } else if(e.key == "Left" || e.key == "a") {
    LPress = true;
  }
}
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "d") {
    RPress = false;
  } else if(e.key == "Left" || e.key == "a") {
    LPress = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - pWidth/2;
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}




function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRad, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-pHeight, pWidth, pHeight);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();

if(x + dx > canvas.width-ballRad || x + dx < ballRad) { dx = -dx; }
if(y + dy < ballRad) { dy = -dy; } 
  else if(y + dy > canvas.height-ballRad) {
    if(x > paddleX && x < paddleX + pWidth) { dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }

  if(RPress && paddleX < canvas.width-pWidth) { paddleX += 7; }
  else if(LPress && paddleX > 0) { paddleX -= 7; }
  x += dx;
  y += dy;

}
var interval = setInterval(draw, 10);


