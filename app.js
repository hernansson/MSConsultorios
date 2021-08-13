/* */

/* DECLARACION DE VARIABLES: Array, Class uso de jQuery*/
let medicos = []
let modalBack = $('#loginModal-backdrop')
let modalLogin = $('#loginModal');
let modalRegister = $('#register');
let btnIngresar = $('#btnIngresar');
let btnRegister = $('#btnRegistrarse');
btnIngresar.click(Openform)
btnRegister.click(OpenRegister)
var counter = 1;
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

/* Uso de Jquery con ANIMACION*/
$('#formUser').submit(validateUser)
$('#userRegister').submit(registerUser)
$("#btnListMedic").click(function () {
  showNewMedics()
  $("#academic").slideToggle("slow")
})


/* Funciones de validacion de usuario - se hace una llamada a un archivo JSON y se valida si es un usuario */

function validateUser(e) {
  e.preventDefault()

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
      btnIngresar.toggle("hidden")
      btnRegister.toggle("hidden")
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


/*Registro de usuarios medicos, aca usamos el localStorage a fines de la materia*/



function OpenRegister() {

  modalRegister[0].classList.toggle("hidden");
  toggleShaddow()
  hideAll();
}

function registerUser(e) {

  e.preventDefault()
  let idForm = $('#userRegister')
  let myForm = idForm[0]
  const newMedic = new Medico(myForm[0].value, myForm[1].value, myForm[2].value, myForm[3].value, myForm[4].value, myForm[5].value, myForm[6].value, myForm[7].value, myForm[8].value)

  var retrievedObject = localStorage.getItem('medicos');

  if (retrievedObject == null) {
    console.log("SE CREA POR PRIMERA VEZ")
    medicos.push(newMedic)
    console.log(medicos)
    // Se hace a pedido de la materia, pero no necesitaria usarlo debido a trabajaria cn BD
    localStorage.setItem('medicos', JSON.stringify(medicos));
  }
  else {
    medicos = JSON.parse(retrievedObject)
    medicos.push(newMedic)
    localStorage.setItem('medicos', JSON.stringify(medicos));

  }




  modalRegister[0].classList.toggle('hidden')
  toggleShaddow()




}


/* Funciones para mostrar datos tanto con innerHTML como con jQuery para mejores practicas y mostrar ambas formas*/

function showNewMedics() {

  let parent = $(".listaMedicos")

  parent[0].innerHTML = ""
  var retrievedObject = localStorage.getItem('medicos');

  let medicos = JSON.parse(retrievedObject)



  for (let medico of medicos) {

    let newUl = document.createElement('ul')

    parent[0].appendChild(newUl)


    let liName = document.createElement('li')
    liName.textContent = `Nombre: ${medico.name} ${medico.surname}`
    newUl.appendChild(liName)

    let liProf = document.createElement('li')
    liProf.textContent = `Profesion: ${medico.profesion}`
    newUl.appendChild(liProf)

    let liSp = document.createElement('li')
    liSp.textContent = `Especialidad: ${medico.specialty}`
    newUl.appendChild(liSp)

    let liCity = document.createElement('li')
    liCity.textContent = `Ciudad: ${medico.ciudad}`
    newUl.appendChild(liCity)



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


/* Manejo de modals para que resalten mientras otros se ocultan*/

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


/* RESPONSIVE NAVBAR*/
document.getElementById("hamburger").onclick = function toggleMenu() {
  const navToggle = document.getElementsByClassName("toggle");
  for (let i = 0; i < navToggle.length; i++) {
    navToggle.item(i).classList.toggle("hidden");
  }

};


/*  Carrousel pasa de imagen cada 3 seg */

setInterval(function () {
  let carousel = $('#carousel-' + counter)
  carousel[0].checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }

}, 3000);



/* Manejo del background y su opacidad cuando aparecen los modals. */

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


