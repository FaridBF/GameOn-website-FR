function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close");

// document.querySelector(".formData input[type=text]")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  //méthode qui permet de supprimer un style dans le dom
  modalbg.removeAttribute("style");
}

//sélection du bouton envoyer le formulaire
const envoyerFormulaire = document.querySelector("#envoyerFormulaire");

// fonction qui permet de set les valeurs dur formulaire dans le localStorage
envoyerFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  const objectForm = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    birthdate: document.querySelector("#birthdate").value,
    quantity: document.querySelector("#quantity").value,
    location:
      document.querySelector('input[name="location"]:checked') == null
        ? null
        : document.querySelector('input[name="location"]:checked').value,
    checkbox1: document.querySelector("#checkbox1").checked,
    checkbox2: document.querySelector("#checkbox2").checked,
  };

  console.log("récupération de notre objet avec les valeurs", objectForm);

  // Enregistrer dans le localstorage
  localStorage.setItem("firstName", objectForm.firstName);
  localStorage.setItem("lastName", objectForm.lastName);
  localStorage.setItem("email", objectForm.email);
  localStorage.setItem("birthdate", objectForm.birthdate);
  localStorage.setItem("quantity", objectForm.quantity);
  localStorage.setItem("location", objectForm.location);
  localStorage.setItem("checkbox1", objectForm.checkbox1);
  localStorage.setItem("checkbox2", objectForm.checkbox2);

  let isValid = validateForm(objectForm);
  if (isValid) {
    console.log("valide");
  } else {
    console.log("non valide");
  }
});

// fonction de vérification des champs du formulaire
const validateForm = (objectForm) => {
  console.log("objectForm =>", objectForm);
  if (objectForm.firstName.length < 2) {
    document.getElementById("errorFirstName").innerHTML =
      "Veuillez renseigner le champs prénom";
    return false;
  }
  if (objectForm.lastName.length < 2) {
    document.getElementById("errorLastName").innerHTML =
      "Veuillez renseigner le champs nom";
    return false;
  }
  if (
    !objectForm.email.includes("@") ||
    !objectForm.email.includes(".") ||
    objectForm.email.length < 5
  ) {
    document.getElementById("errorEmail").innerHTML =
      "Veuillez respecter le format email (exemple: gameOn@gmail.com)";
    return false;
  }
  if (objectForm.birthdate.length < 1) {
    document.getElementById("errorBirthdate").innerHTML =
      "Veuillez saisir une date de naissance";

    return false;
  }
  if (objectForm.quantity.length < 1) {
    document.getElementById("errorQuantity").innerHTML =
      "Veuillez renseigner le champs quantité";
    return false;
  }
  if (objectForm.location.length < 1) {
    // document.getElementById('errorLocation').innerHTML="Veuillez cocher une ville"
    alert("Veuillez cocher une ville");
    return false;
  }
  if (objectForm.checkbox1 === false) {
    // alert("Veuillez accepter les conditions d'utilisation");
    document.getElementById("errorCheckbox1").innerHTML =
      "Veuillez accepter les conditions d'utilisation";

    return false;
  } else {
    return true;
  }
};

// // Formulaire à envoyer
// const sendForms = {
//   objectForm
// }
// console.log("formulaire envoyé au serveur" , sendForms)
