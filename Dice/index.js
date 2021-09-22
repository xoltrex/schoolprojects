var score1 = 0;
var score2 = 0;
var tempScore = 0;
var round = 0;
var turn = "One"
var doubles = false;
var doubles1 = 0;
var doubles2 = 0;

function rollDice(){
  var result = 0;
  var history = document.getElementById("his");
  var content = document.createTextNode("Round: " + round + " Turn: "+ turn + " Points: " + result);
  var lol = document.createElement('br');
  var die1 = document.getElementById("die1");
  var die2 = document.getElementById("die2");
  var d1 = Math.floor(Math.random() * 6) + 1;
  var d2 = Math.floor(Math.random() * 6) + 1;
  var diceTotal = d1 + d2;
  die1.innerHTML = d1;
  die2.innerHTML = d2;

  if(d1 == d2 && diceTotal !=2){
    document.getElementById("status").innerHTML = "DOUBLES! You get double points!";
      result=result + diceTotal*2;
      tempScore+result;
      round=round +1;
      doubles=true;
      addScore(result)
      doubleCounter()
      content = document.createTextNode("Round: " + round + " Turn: "+ turn + " Points: " + result);
      history.prepend(content);
      history.prepend(lol);
  } else if (d1==d2 && diceTotal==2){
    document.getElementById("status").innerHTML = "Double ones! You get 25 points!";
      result=result +25;
      tempScore+result;
      round=round +1;
      doubles=false;
      addScore(result)
      content = document.createTextNode("Round: " + round + " Turn: "+ turn + " Points: " + result);
      history.prepend(content);
      history.prepend(lol);
  } else if (d1==1 || d2==1){
    document.getElementById("status").innerHTML = "You got a single 1. No points for you.";
      result=result +0;
      tempScore=0;
      round=round +1;
      doubles=false;
      addScore(result)
      content = document.createTextNode("Round: " + round + " Turn: "+ turn + " Points: " + result);
      endRound();
      history.prepend(content);
      history.prepend(lol);
  } else {
    document.getElementById("status").innerHTML = "You rolled "+diceTotal+".";
      result=result +diceTotal;
      tempScore+result;
      round=round +1;
      doubles=false;
      addScore(result)
      content = document.createTextNode("Round: " + round + " Turn: "+ turn + " Points: " + result);
      history.prepend(content);
      history.prepend(lol);
  }
}

function addScore(amount) {
  function Counter(){
    tempScore=tempScore + amount;
    if (doubles===true) {
      if (turn == "One") { 
        doubles1 = doubles1 +1;
      } else { doubles2 = doubles2 +1;}
    } else if (turn == "One") { 
      doubles1 = 0;
    } else { doubles2 = 0;}
  }
  Counter();
  document.getElementById("doubles1").innerHTML = doubles1;
  document.getElementById("doubles2").innerHTML = doubles2;
  document.getElementById("tempScore").innerHTML = tempScore;
}

function endRound() {
  if (turn == "One") { turn="Two"; score1 = score1 + tempScore; doubles1=0;
  } else { turn="One"; score2 = score2 + tempScore; doubles2=0;}
  tempScore=0;
  document.getElementById("score1").innerHTML = score1;
  document.getElementById("score2").innerHTML = score2;
  document.getElementById("tempScore").innerHTML = tempScore;

  if (score1 >= 100) {
    if(alert('Player 1 wins!')){}
    else window.location.reload();
  } else if (score2 >= 100){
    if(alert('Player 2 wins!')){}
    else window.location.reload();
  }
}

function doubleCounter() {
  if (doubles1 == 3) {
    document.getElementById("status").innerHTML = "Player 1 reached 3 doubles! Points forfeited!";
    tempScore = 0;
    doubles1 = 0;
  } else if (doubles2 == 3) {
    document.getElementById("status").innerHTML = "Player 2 reached 3 doubles! Points forfeited!";
    tempScore = 0;
    doubles2 = 0;
  }
}

