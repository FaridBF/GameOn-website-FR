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
const submitFormInput = document.querySelectorAll(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));
//sélection du bouton envoyer le formulaire
submitFormInput.forEach((btn) => btn.addEventListener("click", getFormData));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  //méthode qui permet de supprimer un style dans le dom
  modalbg.removeAttribute("style");
}

// fonction qui récupère les données du form et demande la vérificaiton
function getFormData(e) {
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
    isAcceptConditions: document.querySelector("#checkbox1").checked,
    isAcceptNotifications: document.querySelector("#checkbox2").checked,
  };

  console.log("récupération de notre objet avec les valeurs", objectForm);

  // Enregistrer dans le localstorage
  localStorage.setItem("firstName", objectForm.firstName);
  localStorage.setItem("lastName", objectForm.lastName);
  localStorage.setItem("email", objectForm.email);
  localStorage.setItem("birthdate", objectForm.birthdate);
  localStorage.setItem("quantity", objectForm.quantity);
  localStorage.setItem("location", objectForm.location);
  localStorage.setItem("isAcceptConditions", objectForm.isAcceptConditions);
  localStorage.setItem(
    "isAcceptNotifications",
    objectForm.isAcceptNotifications
  );

  validateForm(objectForm);
  // let isValid = validateForm(objectForm);
  // if (isValid) {
  //   console.log("valide");
  // } else {
  //   console.log("non valide");
  // }
}

// Add error on element of DOM
function displayError(inputIdName, errorText) {
  // Ajout de l'attribut 'data-error-visible' pour afficher bordure rouge
  let formDataItem = document.getElementById(inputIdName).parentElement;
  let errorAttribute = document.createAttribute("data-error-visible");
  errorAttribute.value = "true";
  formDataItem.setAttributeNode(errorAttribute);

  // Ajout de l'attribut 'data-error' pour afficher message d'erreur
  let errorMessageAttribute = document.createAttribute("data-error");
  errorMessageAttribute.value = errorText;
  formDataItem.setAttributeNode(errorMessageAttribute);
}

// Add error on element of DOM
// function removeError() {
//   // transforme les formDatas (HTMLCollection) en tableau
//   let formDatas = Array.from(document.getElementsByClassName("formData"));

//   // Boucle sur le tableau et supprime les attributs erreurs s'il y en a
//   formDatas.forEach((formData) => {
//     if (formData.hasAttribute("data-error")) {
//       formData.removeAttribute("data-error");
//     }
//     if (formData.hasAttribute("data-error-visible")) {
//       formData.removeAttribute("data-error-visible");
//     }
//   });
// }

// fonction de vérification des champs du formulaire
const validateForm = (objectForm) => {
  console.log("objectForm =>", objectForm);
  if (objectForm.firstName.length < 2) {
    displayError(
      "firstName",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );

    return false;
  }
  if (objectForm.lastName.length < 2) {
    displayError(
      "lastName",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );

    return false;
  }
  if (
    !objectForm.email.includes("@") ||
    !objectForm.email.includes(".") ||
    objectForm.email.length < 5
  ) {
    displayError(
      "email",
      "Veuillez respecter le format email (exemple: gameon@mail.com)"
    );

    return false;
  }
  if (objectForm.birthdate.length < 1) {
    displayError("birthdate", "Vous devez entrer votre date de naissance.");

    return false;
  }
  if (objectForm.quantity.length < 1) {
    displayError(
      "quantity",
      "Veuillez renseigner le champs 'quantité de tournois'"
    );

    return false;
  }
  if (objectForm.location === null) {
    displayError("location1", "Vous devez choisir une option.");

    return false;
  }
  if (objectForm.isAcceptConditions === false) {
    displayError(
      "checkbox1",
      "Veuillez accepter les conditions d'utilisation."
    );

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
