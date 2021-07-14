

document.querySelector('#formUser').addEventListener('submit', validateUser)
document.querySelector('#userRegister').addEventListener('submit', registerUser)
let medicArray = [];

function validateUser() {


  $.getJSON("../userData.JSON").done(function (dataJSON) {
    let i = 0;
    let userInfo;
    let myForm = document.querySelector('#formUser')
    let user = myForm[0].value;
    let pass = myForm[1].value;
    let indexUser = validUser(user, pass, dataJSON);

    if (indexUser !== -1) {
      userInfo = dataJSON[indexUser];
      let modal = document.getElementById('loginModal');
      modal.classList.toggle("hidden");
      showData(userInfo);
      toggleShaddow();
    } else {
      //$('#loginModal')[0].reset();
      let htmlData = document.querySelector('#pwRedLabel');
      htmlData.innerHTML = `Contraseña incorrecta. Intente de nuevo`
      document.querySelector('#password').style.borderColor = 'red';
      document.querySelector('#password').value = '';
      document.querySelector('#username').value = '';

    }
  })

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
  // POR LAS DUDAS DE QUE VEAN ESTE PRIMERO, EN ShowDataMedics() esta con create y append.
  //Este esta para testear ambas maneras
  if (data !== undefined) {
    let htmlData = document.getElementById("entregable");
    htmlData.innerHTML = `
      <p> Te has logueado correctamente ${data.user.toUpperCase()} !</p>
    <p>Su trabajo es: ${data.profesion.toUpperCase()}!</p>
    <p>Su DNI es: ${data.DNI}!</p>
    `

  } else {
    document.getElementById("userData").innerHTML = "BANEADO";
  }

}

function OpenRegister() {
  let modal = document.getElementById('register');
  modal.classList.toggle("hidden");
  document.getElementById('loginModal-backdrop').classList.toggle("hidden");
  //modal.style.display = 'block';
  hideAll();
}

function registerUser() {

  //ESTO ME DA GRACIA Y CANCER OCULAR, PERO NO SABIA SI CREAR UNAS VARIABLES, PARA QUE SEA MAS DECLARATIVO, O MANDARLE ASI DE FEO.
  let myForm = document.querySelector('#userRegister')
  const newMedic = new Medico(myForm[0].value, myForm[1].value, myForm[2].value, myForm[3].value, myForm[4].value, myForm[5].value, myForm[6].value, myForm[7].value, myForm[8].value)
  let innerData = '';

  medicArray.push(newMedic)
  console.log(medicArray)
  // Se hace a pedido de la materia, pero no necesitaria usarlo debido a trabajaria cn BD

  localStorage.setItem('medicos', JSON.stringify(medicArray));



}

function showNewMedics() {

  let parent = document.querySelector("#academic")
  parent.innerHTML = "";
  var retrievedObject = localStorage.getItem('medicos');

  let medicos = JSON.parse(retrievedObject)

  console.log(medicos)

  for (let medico of medicos) {

    let newDiv = document.createElement('ul')
    parent.appendChild(newDiv)

    for (const property in medico) {
      let li = document.createElement('li')
      newDiv.appendChild(li)
      li.innerHTML = `${property}: ${medico[property]}`
    }

  }



}

//let parent = document.querySelector('#academic')
let btnMedic = document.querySelector("#btnListMedic")
btnMedic.addEventListener('click', showNewMedics);

function Openform() {
  let modal = document.getElementById('loginModal');
  modal.classList.toggle("hidden");
  toggleShaddow();
  //modal.style.display = 'block';
  hideAll();

}

function hideAll() {
  const navToggle = document.getElementsByClassName("toggle");
  for (let i = 0; i < navToggle.length; i++) {
    navToggle.item(i).classList.toggle("hidden");
  }
}

function toggleShaddow() {
  document.getElementById('loginModal-backdrop').classList.toggle("hidden");
}
document.getElementById("hamburger").onclick = function toggleMenu() {
  const navToggle = document.getElementsByClassName("toggle");
  for (let i = 0; i < navToggle.length; i++) {
    navToggle.item(i).classList.toggle("hidden");
  }

};

let btnLogin = document.querySelector('#btnIngresar');
btnLogin.addEventListener('click', Openform);
let btnRegister = document.querySelector('#btnRegistrarse');
btnRegister.addEventListener('click', OpenRegister)
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
let modalLogin = document.getElementById('loginModal');
let modalRegister = document.getElementById('register');
window.onclick = function (event) {
  if (event.target == modalBack) {
    document.getElementById('loginModal-backdrop').classList.toggle("hidden");
    if (!modalLogin.classList.contains('hidden')) {
      modalLogin.classList.toggle("hidden");
    }
    if (!modalRegister.classList.contains('hidden')) {
      modalRegister.classList.toggle("hidden");
    }

    //modalRegister.classList.toggle("hidden");
  }
}


class Medico {
  constructor(user, password, name, surname, profession, specialty, provincia, ciudad, cp) {
    this.user = user;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.profession = profession;
    this.specialty = specialty;
    this.provincia = provincia;
    this.ciudad = ciudad;
    this.postalCode = cp;

  }




}
