

async function logUser(myForm) {
  var userData;

  await $.getJSON("../userData.JSON", function getData(data, status) {

    userData = validateUser(myForm, data)

  });
  showData(userData);
  return userData;
}

function validateUser(myForm, arrayData) {
  let i = 0;
  let userInfo;

  let user = myForm[0].value;
  let pass = myForm[1].value;

  let indexUser = validUser(user, pass, arrayData);

  if (indexUser !== -1) {
    userInfo = arrayData[indexUser];
  } else {
    //$('#loginModal')[0].reset();
    let htmlData = document.querySelector('#pwRedLabel');
    htmlData.innerHTML = `Contraseña incorrecta. Intente de nuevo`
    document.querySelector('#password').style.borderColor = 'red';
    document.querySelector('#password').value = '';
    document.querySelector('#username').value = '';

  }

  return userInfo;
}
function validUser(user, pass, list) {

  let index = list.findIndex(elem => elem.user.toLowerCase() === user);
  if (index !== -1 && list[index].password == pass) {
    return index;
  } else {
    return -1;
  }

}

function showData(data) {

  if (data !== undefined) {
    let htmlData = document.getElementById("userData");
    htmlData.innerHTML = `
      <p> Te has logueado correctamente ${data.user.toUpperCase()} !</p>
    <p>Su trabajo es: ${data.profesion.toUpperCase()}!</p>
    <p>Su DNI es: ${data.DNI}!</p>
    `

  } else {
    document.getElementById("userData").innerHTML = "BANEADO";
  }

}


function Openform() {
  let modal = document.getElementById('loginModal');
  modal.classList.toggle("hidden");
  document.getElementById('loginModal-backdrop').classList.toggle("hidden");
  //modal.style.display = 'block';
  hideAll();

}

function hideAll() {
  const navToggle = document.getElementsByClassName("toggle");
  for (let i = 0; i < navToggle.length; i++) {
    navToggle.item(i).classList.toggle("hidden");
  }
}
document.getElementById("hamburger").onclick = function toggleMenu() {
  const navToggle = document.getElementsByClassName("toggle");
  for (let i = 0; i < navToggle.length; i++) {
    navToggle.item(i).classList.toggle("hidden");
  }

};

var counter = 1;
setInterval(function () {
  document.getElementById('carousel-' + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }

}, 3000);


// ESTO ESTA PARA EL ORTO PERO FUNCIONA.. 
let modalBack = document.getElementById('loginModal-backdrop')
let modal = document.getElementById('loginModal');
window.onclick = function (event) {
  if (event.target == modalBack) {
    modal.classList.toggle("hidden");
    document.getElementById('loginModal-backdrop').classList.toggle("hidden");
  }
}
