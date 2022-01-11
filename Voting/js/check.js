var isAdmin = false;
function checkAdmin() {
  if(isLogged()) {
    isAdmin = true;
    if(isAdmin==true){
      var ele1 = document.getElementById('test');
      var ele2 = document.getElementById('ko');
      var ele3 = document.getElementById('ok');
      if (ele1!=null){document.getElementById('test').style.display = "block";}
      if (ele2!=null){document.getElementById('ko').style.display = "block";}
      if (ele3!=null){document.getElementById('ok').style.display = "none";}
    } return true;
  } else return false;
}

function isLogged() {
  const Token = localStorage.getItem('token')
  if (!Token) return false; else console.log("lol")
    return true
}