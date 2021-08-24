var score1 = 0;
var score2 = 0;
var round = 0;
var turn = "One"


function rollDice(){
  var result = 0;
  var history = document.getElementById("his");
  var content = document.createTextNode("Turn: " + turn + " Round: "+ round + " Points: " + result);
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
      addScore(diceTotal *2)
      result=result + diceTotal*2;
      round=round +1;
      content = document.createTextNode("Turn: " + turn + " Round: "+ round + " Points: " + result);
      history.appendChild(content);
      history.appendChild(lol);
  } else if (d1==d2 && diceTotal==2){
    document.getElementById("status").innerHTML = "Double ones! You get 25 points!";
      addScore(25)
      result=result +25;
      round=round +1;
      content = document.createTextNode("Turn: " + turn + " Round: "+ round + " Points: " + result);
      history.appendChild(content);
      history.appendChild(lol);
  } else if (d1==1 || d2==1){
    document.getElementById("status").innerHTML = "You got a single 1. No points for you.";
      addScore(0)
      result=result +0;
      round=round +1;
      content = document.createTextNode("Turn: " + turn + " Round: "+ round + " Points: " + result);
      history.appendChild(content);
      history.appendChild(lol);
  } else {
    document.getElementById("status").innerHTML = "You rolled "+diceTotal+".";
      addScore(diceTotal)
      result=result +diceTotal;
      round=round +1;
      content = document.createTextNode("Turn: " + turn + " Round: "+ round + " Points: " + result);
      history.appendChild(content);
      history.appendChild(lol);
  }
}

function addScore(amount) {
  function Counter(){
    if (round % 2 == 0) {
      score1 = score1 + amount;
      turn = "One"
    } else {
    score2 = score2 + amount;
    turn = "Two"
  }}
  Counter();
  document.getElementById("score1").innerHTML = score1;
  document.getElementById("score2").innerHTML = score2;
}
