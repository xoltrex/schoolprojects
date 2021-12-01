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
var isAdmin = false;
function logIn() {
var uname = 'ADMIN';
var psw = '1234';         //whats opsec
var username = document.getElementById('uname').value;
var password = document.getElementById('psw').value;
  localStorage.setItem('name', username)
  localStorage.setItem('password', password)
  if(uname === username || psw === password) {
  }
}
function checkAdmin() {
  if(!isAdmin) {
    document.getElementById('note').style.display = "block";
  } else {
    alert("youre no admin")
  }
}
