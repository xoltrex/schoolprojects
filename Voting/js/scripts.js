window.addEventListener('DOMContentLoaded', event => {
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) { return; }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible.classList.add('navbar-shrink')
    }
  };
  navbarShrink();

  document.addEventListener('scroll', navbarShrink);
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  };

  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {navbarToggler.click();}
      });
  });
});

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

var isAdmin = false;
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

function isLogged() {
  const Token = localStorage.getItem('token')
  if (!Token) return false; else console.log("lol")
  return true
}

async function checkAdmin() {
  if(isLogged()) {
    isAdmin = true;
    if(isAdmin==true){
      document.getElementById('test').style.display = "block";
      document.getElementById('ko').style.display = "block";
      document.getElementById('ok').style.display = "none";
    } return true;
  } else return false;
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
