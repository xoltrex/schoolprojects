let xQuestion = "";
let xAnswers = [];
let pToken = [];

let poll = {
  question:"",
  answers:[],
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


function markAnswer(i){
  poll.selectedAnswer = +i;
  try {
    document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
  } catch(msg){}
  document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
  showResult();
}

let xData = [
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
let yData = [
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

let num = 0;
function createPoll() {
  let lol = document.getElementById("test123");
  let ok = document.createElement('div');
  let ok2 = document.createElement('div');
  let ok3 = document.createElement('img');
  num++;
  
  ok.className = 'row gx-0 justify-content-center';
  ok2.className = 'col-lg-6';
  ok2.setAttribute("onclick", "document.getElementById(`voteModal`).style.display='block';clickCheck(this.id);")
  ok2.id ="vote-"+num;
  ok3.className = 'img-fluid';
  ok3.src = "assets/img/demo-image-01.jpg";
  
  lol.appendChild(ok)
  ok.appendChild(ok2);
  ok2.appendChild(ok3)
  poll.question = xQuestion;
  poll.answers = xAnswers;
  saveData(num)
  xQuestion="";
  xAnswers=[];
  document.getElementById("pollMaker").reset(); 
}

let selectedPoll = 0;
let test0 = 0;
function clickCheck(clicked) {
  selectedPoll = clicked.replace(/[^\d]/g, '');

  if(selectedPoll==0) {
    var arr = JSON.parse(localStorage.getItem('pollData-1'))
  } else {
    var arr = JSON.parse(localStorage.getItem('pollData-'+selectedPoll))
  }
  
  pollDOM.question.innerText = arr[0].question;
  pollDOM.answers.innerHTML = arr[0].answers.map(function(answer,i){
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

    /*while ($(voteModal).is(':hidden')) {
      console.log("test")
      break;
    }*/
}


function saveData(input) { 
  if($(voteModal).is(':hidden')){
    pToken.push({
      question: poll.question,
      answers: poll.answers,
      id: selectedPoll,
      results: xData,
      perc: yData
    })
    localStorage.setItem('pollData-'+input, JSON.stringify(pToken))
    nukeArrays();
    test0=1;
  } else return "not hidden";
}

function nukeArrays() {
  for(let i=0;i<xData.length;i++){
    xData[i].results = 0;
    yData[i].perc = 0;
  }
    poll.question="";
    poll.answers=[];
    pToken[0].id=0;
    pToken[0].question="";
    pToken[0].answer=[];
}

function loader() {
  var elementExists = document.getElementById("vote-1");
  if (!(elementExists)) {
    if (!(localStorage.getItem("pollData-1") === null)) {
      let lol = document.getElementById("test123");
      let ok = document.createElement('div');
      let ok2 = document.createElement('div');
      let ok3 = document.createElement('img');
      let ok4 = JSON.parse(localStorage.getItem('pollData-1'))
  
      ok.className = 'row gx-0 justify-content-center';
      ok2.className = 'col-lg-6';
      ok2.setAttribute("onclick", "document.getElementById(`voteModal`).style.display='block';clickCheck(this.id);")
      ok2.id ="vote-"+ok4[0].id;
      ok3.className = 'img-fluid';
      ok3.src = "assets/img/demo-image-01.jpg";
  
      lol.appendChild(ok)
      ok.appendChild(ok2);
      ok2.appendChild(ok3)
      poll.question = xQuestion;
      poll.answers = xAnswers;
    } else {console.log("just make a poll already")}
  }
}
window.onload = loader()
