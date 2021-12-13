let poll = {
  question:"What's your favorite programming language?",
  answers:[
    "C", "Java", "PHP", "JavaScript"
  ],
  selectedAnswer:-1
};

let pollDOM = {
  question:document.querySelector(".poll .question"),
  answers:document.querySelector(".poll .answers")
};

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

const data = [
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
const data2 = [
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
  calcPerc();
  let answers = document.querySelectorAll(".poll .answers .answer");
  for(let i=0;i<answers.length;i++){
    if(i == poll.selectedAnswer){
      data[i].results+=1;
    } else {
      data[i].results=data[i].results
    }
    answers[i].querySelector(".percentage-value").innerText = data[i].results;
    answers[i].querySelector(".percentage-bar").style.width = data2[i].perc + "%";
  }
} 

let total = 0;
function calcPerc() {
  test()
  for(i=0;i<data.length;i++) {
    var top = data[i].results
    var btm = total
    var prc = (top/btm)*100
    data2[i].perc = prc
  }
}
function test() {
  data.forEach(function(num) {
    total+=num.results;
  })
}