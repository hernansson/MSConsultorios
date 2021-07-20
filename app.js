let medicArray = []
let modalBack = $('#loginModal-backdrop')
let modalLogin = $('#loginModal');
let modalRegister = $('#register');
$('#formUser').submit(validateUser)
$('#userRegister').submit(registerUser)
$("#btnListMedic").click(showNewMedics)
$('#btnIngresar').click(Openform)

let btnRegister = $('#btnRegistrarse');
btnRegister.click(OpenRegister)
var counter = 1;


function validateUser() {


  $.getJSON("../userData.JSON").done(function (dataJSON) {
    let i = 0;
    let userInfo;
    let idForm = $('#formUser')
    let myForm = idForm[0]
    let user = myForm[0].value;
    let pass = myForm[1].value;
    let indexUser = validUser(user, pass, dataJSON);

    if (indexUser !== -1) {
      userInfo = dataJSON[indexUser];

      modalLogin[0].classList.toggle("hidden");
      showData(userInfo);
      toggleShaddow();
    } else {
      //$('#loginModal')[0].reset();
      let htmlData = $('#pwRedLabel');
      htmlData[0].innerHTML = `Contraseña incorrecta. Intente de nuevo`
      $('#password')[0].style.borderColor = 'red';
      $('#password')[0].value = '';
      $('#username')[0].value = '';

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


    let p1 = document.createElement("p")
    p1.textContent = ` Te has logueado correctamente ${data.user.toUpperCase()} !`
    let p2 = document.createElement("p")
    p2.textContent = ` Su trabajo es: ${data.profesion.toUpperCase()}!`
    let p3 = document.createElement("p")
    p2.textContent = ` Su DNI es: ${data.DNI}!`

    let div1 = document.createElement("div")
    div1.appendChild(p1)
    div1.appendChild(p2)
    div1.appendChild(p3)

    let htmlData = $("#entregable");
    htmlData[0].prepend(div1)


  } else {
    $("#userData")[0].append("BANEADO");
  }

}

function OpenRegister() {

  modalRegister[0].classList.toggle("hidden");
  toggleShaddow()
  hideAll();
}

function registerUser() {

  //ESTO ME DA GRACIA Y CANCER OCULAR, PERO NO SABIA SI CREAR UNAS VARIABLES, PARA QUE SEA MAS DECLARATIVO, O MANDARLE ASI DE FEO.
  let idForm = $('#userRegister')
  let myForm = idForm[0]
  const newMedic = new Medico(myForm[0].value, myForm[1].value, myForm[2].value, myForm[3].value, myForm[4].value, myForm[5].value, myForm[6].value, myForm[7].value, myForm[8].value)
  let innerData = '';

  medicArray.push(newMedic)
  console.log(medicArray)
  // Se hace a pedido de la materia, pero no necesitaria usarlo debido a trabajaria cn BD

  localStorage.setItem('medicos', JSON.stringify(medicArray));

  modalRegister[0].classList.toggle('hidden')
  toggleShaddow()
  btnRegister[0].style.display = "none"



}

function showNewMedics() {

  let parent = $("#academic")

  parent[0].innerData = ""
  var retrievedObject = localStorage.getItem('medicos');

  let medicos = JSON.parse(retrievedObject)

  console.log(medicos)

  for (let medico of medicos) {

    let newDiv = document.createElement('ul')
    parent[0].appendChild(newDiv)

    for (const property in medico) {
      let li = document.createElement('li')
      newDiv.appendChild(li)
      li.innerHTML = `${property}: ${medico[property]}`
    }

  }



}


function Openform() {

  modalLogin[0].classList.toggle("hidden");
  toggleShaddow();
  //modal.style.display = 'block';
  hideAll();

}

function hideAll() {
  const navToggle = $(".toggle");
  for (let i = 0; i < navToggle[0].length; i++) {
    navToggle.item(i).classList.toggle("hidden");
  }
}

function toggleShaddow() {
  modalBack[0].classList.toggle("hidden");
}
document.getElementById("hamburger").onclick = function toggleMenu() {
  const navToggle = document.getElementsByClassName("toggle");
  for (let i = 0; i < navToggle.length; i++) {
    navToggle.item(i).classList.toggle("hidden");
  }

};


setInterval(function () {
  let carousel = $('#carousel-' + counter)
  carousel[0].checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }

}, 3000);


// ESTO ESTA PARA EL ORTO PERO FUNCIONA.. 

window.onclick = function (event) {

  if (event.target == modalBack[0]) {
    modalBack[0].classList.toggle("hidden");
    if (!modalLogin[0].classList.contains('hidden')) {
      modalLogin[0].classList.toggle("hidden");
    }
    if (!modalRegister[0].classList.contains('hidden')) {
      modalRegister[0].classList.toggle("hidden");
    }


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
