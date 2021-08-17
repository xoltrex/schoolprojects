document.getElementById('lol').ondragstart = function() { return false; };
var score = 0;
var cursors = 0;
var cPrice = 15;
var grandmas = 0;
var gPrice = 100;
var ovens = 0;
var oPrice = 1000;
var lol = "Cost: "
var upgrader = 1;
var upgrades = 0;
var uPrice = 250;


function buyCursor() {
  if(score >= cPrice) {
    score = score - cPrice;
    cursors = cursors +1;
    cPrice = Math.round(cPrice *1.15);
    document.getElementById("score").innerHTML = score;
    document.getElementById("cPrice").innerHTML = lol + cPrice;
    document.getElementById("cursors").innerHTML = cursors;
    updateScorePS();
  }
}

function buyGrandma() {
  if(score >= gPrice) {
    score = score - gPrice;
    grandmas = grandmas +1;
    gPrice = Math.round(gPrice *1.15);
    document.getElementById("score").innerHTML = score;
    document.getElementById("gPrice").innerHTML = lol + gPrice;
    document.getElementById("grandmas").innerHTML = grandmas;
    updateScorePS();
  }
}

function buyOven() {
  if(score >= oPrice) {
    score = score - oPrice;
    ovens = ovens +1;
    oPrice = Math.round(oPrice *1.15);
    document.getElementById("score").innerHTML = score;
    document.getElementById("oPrice").innerHTML = lol + oPrice;
    document.getElementById("ovens").innerHTML = ovens;
    updateScorePS();
  }
}

function addScore(amount) {
  score = score + amount;
  document.getElementById("score").innerHTML = score;
}

function upgradeShit() {
  if(score >= uPrice) {
    score = score - uPrice;
    upgrader = upgrader +1;
    uPrice = Math.round(uPrice *1.75);
    document.getElementById("score").innerHTML = score;
    document.getElementById("uPrice").innerHTML = lol + uPrice;
    document.getElementById("upgrader").innerHTML = upgrader -1;
  }
}

function updateScorePS() {
  scorePS = cursors + grandmas *5 + ovens *50;
  document.getElementById("scorePS").innerHTML = scorePS;
}

setInterval(function() {
  score = score + cursors;
  score = score + grandmas *5;
  score = score + ovens *50;
  document.getElementById("score").innerHTML = score;
  document.title = score + " clicks";
}, 1000);