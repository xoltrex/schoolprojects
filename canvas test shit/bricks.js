var rowCount = 3;
var colCount = 5;
var Width = 75;
var Height = 20;
var Padding = 10;
var offsetTop = 30;
var offsetLeft = 30;
var brickX = (c*(Width+Padding))+offsetLeft;
var brickY = (r*(Height+Padding))+offsetTop;

var bricks = [];
for(var c=0; c<colCount; c++) {
  bricks[c] = [];
  for(var r=0; r<rowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBricks() {
  for(var c=0; c<colCount; c++) {
    for(var r=0; r<rowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (c*(Width+Padding))+offsetLeft;
        var brickY = (r*(Height+Padding))+offsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, Width, Height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for(var c=0; c<colCount; c++) {
      for(var r=0; r<rowCount; r++) {
          var b = bricks[c][r];
          if(b.status == 1) {
              if(x > b.x && x < b.x+Width && y > b.y && y < b.y+Height) {
                  dy = -dy;
                  b.status = 0;
                  score++;
                  if(score == rowCount*colCount) {
                      alert("YOU WIN, CONGRATULATIONS!");
                      document.location.reload();
                      clearInterval(interval);
                  }
              }
          }
      }
  }
}


