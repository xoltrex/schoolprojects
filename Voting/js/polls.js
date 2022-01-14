var xQuestion = "";
var xAnswers = [];

var poll = {
  question:xQuestion,
  answers:xAnswers,
  selectedAnswer:-1
};

let pollDOM = {
  question:document.querySelector(".poll .question"),
  answers:document.querySelector(".poll .answers")
};

 qn.addEventListener("input", function() {xQuestion = document.getElementById('qn').value})
an1.addEventListener("input", function() {xAnswers[0] = document.getElementById('an1').value})
an2.addEventListener("input", function() {xAnswers[1] = document.getElementById('an2').value})
an3.addEventListener("input", function() {xAnswers[2] = document.getElementById('an3').value})
an4.addEventListener("input", function() {xAnswers[3] = document.getElementById('an4').value})

pollDOM.question.innerText = poll.question;
pollDOM.answers.innerHTML = poll.answers.map(function(answer,i){
  return (
    `
      <div class="answer" onclick="markAnswer('${i}')">
        ${answer} 
        <span class="percentage-bar"></span>
        <span class="percentage-value"></span>
      </div>
    `
  );
}).join("");

function markAnswer(i){
  poll.selectedAnswer = +i;
  try {
    document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
  } catch(msg){}
  document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
  showResult();
}

const xData = [
  {
    results: 0,
  },
  {
    results: 0,
  },
  {
    results: 0,
  },
  {
    results: 0,
  }
]
const yData = [
  {
    perc: 0,
  },
  {
    perc: 0,
  },
  {
    perc: 0,
  },
  {
    perc: 0,
  }
]

function showResult(){
  let answers = document.querySelectorAll(".poll .answers .answer");
  for(let i=0;i<answers.length;i++){
    if(i == poll.selectedAnswer){
      xData[i].results+=1;
    }    
  } calcPerc();
  for(let i=0;i<xData.length;i++){
    answers[i].querySelector(".percentage-value").innerText = xData[i].results;
    answers[i].querySelector(".percentage-bar").style.width = yData[i].perc + "%";
  }
} 

let total = 0; 
function calcPerc() {
  test(xData)
  for(i=0;i<xData.length;i++) {
    var top = xData[i].results
    var btm = total
    var prc = Math.round((top/btm)*100)
    //console.log("value: ", top)
    //console.log(prc, "%")
    yData[i].perc = prc
  } total = 0;
  //console.log("---------------------")
}
function test(input) {
  for(i=0; i<input.length;i++) {
    total += input[i].results
  }
}

function createPoll() {
  let lol = document.getElementById("test123");
  let ok = document.createElement('div');
  let ok2 = document.createElement('div');
  let ok3 = document.createElement('img');

  
  ok.className = 'row gx-0 justify-content-center';
  ok2.className = 'col-lg-6';
  ok2.setAttribute("onclick", "document.getElementById(`voteModal`).style.display='block'")
  ok3.className = 'img-fluid';
  ok3.src = "assets/img/demo-image-01.jpg";
  
  lol.appendChild(ok)
  ok.appendChild(ok2);
  ok2.appendChild(ok3)
  xQuestion="";
  xAnswers=[];
//document.getElementById("pollMaker").reset(); 
}
