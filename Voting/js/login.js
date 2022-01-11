
var modal = document.getElementById('id01');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const data = [
  {
    username: 'ADMIN',
    password: '1234'
  }
]

const response = [
  {
    username: document.getElementById('uid').value,
    password: document.getElementById('psw').value
  }
]

var un = document.getElementById("uid");
var pw = document.getElementById("psw");
un.addEventListener("input", function() {response[0].username = document.getElementById('uid').value})
pw.addEventListener("input", function() {response[0].password = document.getElementById('psw').value})
async function logIn() {
  if(response[0].username == data[0].username
  && response[0].password == data[0].password) {
    const token = [response[0].username, response[0].password]
    localStorage.setItem('token', token)
    console.log("success")
    isLogged()
  } else alert("no")
}

function logOut() {
  document.getElementById('test').style.display = "none";
  document.getElementById('ko').style.display = "none";
  document.getElementById('ok').style.display = "block";
  localStorage.removeItem('token')
  isAdmin=false
  window.location.reload();
}
window.onload = checkAdmin();
