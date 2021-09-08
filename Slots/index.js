
let pool = ["assets/apple.svg","assets/pear.svg","assets/cherry.svg","assets/watermelon.svg",]
var Rolls;
var xbalance;
var xbet;
var balance = 10;
var bet = 1;
var locked = false;
var playing = false;
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

window.onload = async function() {
  xbalance = document.getElementById("balance")
  xbet = document.getElementById("bet")
  Rolls = document.getElementById("Rolls")
  var amount = 4 - Rolls.children.length

  for (let i = 0; i < amount; i++) {
    var element = document.createElement("div")
    element.id = "Slot"
    element.innerHTML = Rolls.children[0].innerHTML;
    Rolls.appendChild(element)
  }

  for (let i = 0; i < Rolls.children.length; i++) {
    for (let y = 0; y < Rolls.children[i].children[1].children.length; y++) {
      Rolls.children[i].children[1].children[y].src = "assets/mark.svg"}
  }

  for (let i = 1; i < wincombos.length; i++) {
    var ccombo = document.createElement("div")
    ccombo.id = "tier"
    ccombo.innerHTML =
    `<div id="combo">
        <img src="assets/${wincombos[i][0][0]}.svg">
        <img src="assets/${wincombos[i][0][1]}.svg">
        <img src="assets/${wincombos[i][0][2]}.svg">
        <img src="assets/${wincombos[i][0][2]}.svg">
    </div>
    <div id="reward">
        <h1>${wincombos[i][1]}</h1>
    </div>`
    document.getElementById("rewards").appendChild(ccombo)
  } balanceCheck()
}

function addMoney(amount) {
  balance += amount
  balanceCheck()
}
function addBet(amount) {
  playing=true
  bet=0; bet += amount;
  balanceCheck()
}

async function play() {       // balance is reduced after roll is over because i am bad at coding and its the best solution i came up with
  playing = true
  if (balanceCheck()) balance -= bet
  var rolls = Rolls.children
  for (var num = 0; num < rolls.length; num++) {
    var row = rolls[num].children[1].children
    if (!locked==true) {
      rollRow(row)
      await sleep(1250)
    }
  } await sleep(2000)

  var result = new Array()
  for (var num = 0; num < rolls.length; num++) {
    var i = rolls[num].children[1].children
    var fileName = i[2].src.split("/").pop().split(".")[0]
    result.push(fileName.toString().toLowerCase())
  } Result(result)
  balanceCheck()
}

function balanceCheck() {
  xbalance.innerHTML = balance;
  xbet.innerHTML = bet;

  if (balance > 0) {
    if ((balance - bet) >= 0 && bet > 0) {
      locked=false
      return true
    } else {
      locked=true
      return false
    }
  } else {
    locked=true
    return false
  }
}

async function rollRow(x) {
  for (var num = 0; num < 50; num++) {
    for (var s = x.length-1; s > 0; s--) {
      x[s].src = x[s-1].src
        await sleep((0.01 * num / 13) * 0.3)
    } x[0].src = randomFruit(x[2].src)
  }
}                                                           //code partially from stackoverflow and other sites

function randomFruit(x) {
  var random = Math.round(Math.random() * (pool.length -1))
  while (x == pool[random]) random = Math.round(Math.random() * (pool.length -1))
  return pool[random]
}

function Result(result) {
  playing = false;
  for (let i = 0; i < wincombos.length; i++) {
    if (result.equals(wincombos[i][0])) {
      alert(`You won ${wincombos[i][1]} coins + your bet of ` + bet +"€")
      addMoney(wincombos[i][1])
      addMoney(bet)
      break
    } else {}
  }
}

function endGame() {
  if(alert('Game over!')){}
  else window.location.reload();
}

setInterval(function() {
  if(playing==false) {
    balanceCheck()
  if(locked==true) {
    document.getElementById("endButton").style.display = "block";
  }}
}, 1000);

var wincombos = [
  [["apple", "apple", "apple", "apple"], 2],
  [["pear", "pear", "pear", "pear"], 4],
  [["cherry", "cherry", "cherry", "cherry"], 6],
  [["watermelon", "watermelon", "watermelon", "watermelon"], 8],
]

Array.prototype.equals = function (array) {
  if (!array)
    return false;
  if (this.length != array.length)
    return false;
  for (var i = 0, l=this.length; i < l; i++) {                     //i have absolutely no clue what any of this does but apparently it helps 
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;       
      } else if (this[i] != array[i]) { 
        return false;   
      }           
  }       
  return true;
}
Object.defineProperty(Array.prototype, "equals", {enumerable: false});