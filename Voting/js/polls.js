var polls = new Array();
let selectedPoll = 0;
let num = 0;
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
    getPerc();
} 

function getPerc() {
  let answers = document.querySelectorAll(".poll .answers .answer");
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
  let ok2 = document.createElement('img');
  num++;

  ok.className = 'col-lg-6';
  ok.setAttribute("onclick", "document.getElementById(`voteModal`).style.display='block';clickCheck(this.id);")
  ok.id ="vote-"+num;
  ok2.className = 'img-fluid';
  ok2.src = "assets/img/demo-image-01.jpg";
  
  lol.appendChild(ok)
  ok.appendChild(ok2)
  polls.push(document.getElementById('vote-'+num).id);
  updateList();
  poll.question = xQuestion;
  poll.answers = xAnswers;
  saveData(num)
  xQuestion="";
  xAnswers=[];
  document.getElementById("pollMaker").reset();
  if(poll.question === "") {
    console.log("[- createPoll - EMPTY")
  } else console.log("[- createPoll - CLEAR")
}

function deletePoll(input) {
  xNum = input+=1;
  document.getElementById('vote-'+xNum).remove();
  localStorage.removeItem('pollData-'+input);
  var ok = polls.splice(input,1);
  updateList();
}

function updateList() {
  var str='';
  str = 'Votes: ' + polls.length + '<br>';
  for (i=0;i<polls.length;i++) { 
    str += i + ' : '+polls[i] + " <a href=# onClick='deletePoll("+polls.indexOf(polls[i])+")'> Delete</a> " + "<br >";
  }
  document.getElementById('xPoll').innerHTML=str;
}

function clickCheck(clicked) {
  clicked=clicked.replace(/[^\d]/g, '');
  clicked=parseInt(clicked,10);
  selectedPoll = clicked

  if(selectedPoll==0) {
    var arr = JSON.parse(localStorage.getItem('pollData-1'))
  } else {
    var arr = JSON.parse(localStorage.getItem('pollData-'+selectedPoll))
  }
  xData=arr[0].results;
  yData=arr[0].perc;
  poll.question=arr[0].question;
  poll.answers=arr[0].answers;
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
  getPerc();
  loop();
  if(poll.question === "") {
    console.log("[- clickCheck - EMPTY")
  } else console.log("[- clickCheck - CLEAR")
}

function loop() {
  let i=1;
  setTimeout(function() {
    console.log('visible');
      if($(voteModal).is(':hidden')){i++; 
        saveData(selectedPoll);
      } if(i<2) {loop()}
  }, 1000)
}

function saveData(input) { 
  if($(voteModal).is(':hidden')){
    pToken.push({
      question: poll.question,
      answers: poll.answers,
      id: input,
      results: xData,
      perc: yData
    })
    if (!(localStorage.getItem('pollData-'+input) === null)){
      localStorage.removeItem('pollData-'+input);
      console.log('[- token cleared')
      localStorage.setItem('pollData-'+input, JSON.stringify(pToken))
      console.log('[- data saved-2')
    } else {
      localStorage.setItem('pollData-'+input, JSON.stringify(pToken))
      console.log('[- data saved-1')
    }
      setTimeout(function() 
      {nukeArrays();}, (250));
  } else return "[- not hidden";
  if(poll.question === "") {
    console.log("[- saveData - EMPTY")
  } else console.log("[- saveData - CLEAR")
}

function nukeArrays() {
  for(let i=0;i<xData.length;i++){
    xData[i].results = 0;
    yData[i].perc = 0;
  }
    pToken=[];
    console.log('[- arrays nuked')
    if(poll.question === "") {
      console.log("[- nukeArrays - EMPTY")
    } else console.log("[- nukeArrays - CLEAR")
}

function loader() {
  var elementExists = document.getElementById("vote-1");
  if (!(elementExists)) {
    for (var i = 0; i < localStorage.length; i++) {
      const thisKey = localStorage.key(i);
      if (thisKey.includes("pollData-")) {
        var pData = JSON.parse(localStorage.getItem('pollData-'+i))
        num++;
        let lol = document.getElementById("test123");
        let ok = document.createElement('div');
        let ok2 = document.createElement('img');
  
        ok.className = 'col-lg-6';
        ok.setAttribute("onclick", "document.getElementById(`voteModal`).style.display='block';clickCheck(this.id);")
        ok.id ="vote-"+pData[0].id;
        ok2.className = 'img-fluid';
        ok2.src = "assets/img/demo-image-01.jpg";
  
        lol.appendChild(ok)
        ok.appendChild(ok2)
        poll.question = xQuestion;
        poll.answers = xAnswers;
        console.log("poll loaded -"+num)
        polls.push(document.getElementById('vote-'+num).id);
        updateList();
      }
    } 
  }
  if(poll.question === "") {
    console.log("[- Loader - EMPTY")
  } else console.log("[- loader - CLEAR")
}
window.onload = loader()
