function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Les éléments du DOM que je récupère
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close");
const submitFormInput = document.querySelectorAll(".btn-submit");
const reserveForm = document.querySelector("form");
const validationMsg = document.querySelector(".validation-message");

// Les écouteurs d'évènements de mes modals
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));
//sélection du bouton envoyer le formulaire
submitFormInput.forEach((btn) => btn.addEventListener("click", getFormData));

// Ouvrir la modal du formulaire
function launchModal() {
  // afficher la modal avec formulaire
  modalbg.style.display = "block";
  reserveForm.style.display = "block";
  // cacher le message de validation
  validationMsg.style.display = "none";
  // récupérer la data du localstorage
  getDataInLocalStorage();
}

// Fermer la modal du formulaire
function closeModal() {
  //méthode qui permet de supprimer un style dans le dom
  modalbg.style.display = "none";
}

// Fonction qui affiche le message de validation et cache le form
const showValidationMessage = () => {
  // cacher le formulaire
  reserveForm.style.display = "none";
  // afficher le message
  validationMsg.style.display = "block";
};

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
    isAcceptNotifications: document.querySelector("#checkbox2").checked
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

  //Fonction pour vérifier si le formulaire est valide avant l'envoi
  validateForm(objectForm);
  let isValid = validateForm(objectForm);
  if (isValid) {
    showValidationMessage();
    console.log("Formulaire valide");
    localStorage.clear();
  } else {
    console.log("Formulaire non valide");
  }
}
// Gestion des erreurs sur les éléments du DOM (fonction permettant l'affichage des erreurs)
function displayError(inputIdName, errorText) {
  //je supprime l'erreur avant d'afficher
  removeError();
  // Ajout de l'attribut 'data-error-visible' pour afficher bordure rouge (voir fichier modal.css)
  let formDataItem = document.getElementById(inputIdName).parentElement;
  let errorAttribute = document.createAttribute("data-error-visible");
  errorAttribute.value = "true";
  formDataItem.setAttributeNode(errorAttribute);

  // Ajout de l'attribut 'data-error' pour afficher message d'erreur (voir fichier modal.css)
  let errorMessageAttribute = document.createAttribute("data-error");
  errorMessageAttribute.value = errorText;
  formDataItem.setAttributeNode(errorMessageAttribute);
}

// Gestion des erreurs sur les éléments du DOM (fonction permettant de remove les erreurs)
function removeError() {
  // transforme les formDatas (HTMLCollection) en tableau
  let formDatas = Array.from(document.getElementsByClassName("formData"));
  // Boucle sur le tableau et supprime les attributs erreurs s'il y en a
  formDatas.forEach((formData) => {
    if (formData.hasAttribute("data-error")) {
      formData.removeAttribute("data-error");
    }
    if (formData.hasAttribute("data-error-visible")) {
      formData.removeAttribute("data-error-visible");
    }
  });
}

// fonction qui vérifie si email valide via les regex (expression régulière)
function isValidEmail(email) {
  let emailReg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  let valid = emailReg.test(email);

  if (!valid) {
    return false;
  } else {
    return true;
  }
}

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
  if (!isValidEmail(objectForm.email)) {
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

//Mettre le contenu du localStorage dans les champs du formulaire
const getDataInLocalStorage = () => {
  //Mettre les values du localStorage dans les champs du formulaire
  if (localStorage.getItem("#firstName").length > 0) {
    document.getElementById("firstName").value =
      localStorage.getItem("firstName");
  }
  if (localStorage.getItem("#lastName").length > 0) {
    document.getElementById("lastName").value =
      localStorage.getItem("lastName");
  }
  if (localStorage.getItem("#email").length > 0) {
    document.getElementById("email").value = localStorage.getItem("email");
  }
  if (localStorage.getItem("#birthdate").length > 0) {
    document.getElementById("birthdate").value =
      localStorage.getItem("birthdate");
  }
  if (localStorage.getItem("#quantity").length > 0) {
    document.getElementById("quantity").value =
      localStorage.getItem("quantity");
  }
  if (localStorage.getItem("location").length > 0) {
    const locationValueInStorage = localStorage.getItem("location");
    // trouver l'input ayant la valeur de "locationValueInStorage" et le checker
    document.querySelector(
      `input[value="${locationValueInStorage}"]`
    ).checked = true;
  }
  if (JSON.parse(localStorage.getItem("isAcceptNotifications")) === true) {
    document.getElementById("checkbox2").checked = true;
  }
};
