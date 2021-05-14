//Fonction permettant d'ajouter un ticket
function addElements() {
  var contentMain = document.getElementById("tickets");

  //Récupération des infos renseigné dans les inputs
  var nom = getInputValues("FormControlInput1");
  var prenom = getInputValues("FormControlInput2");
  var demande = getInputForms("FormControlInput4");

  //Générer un nb aléatoire pour pouvoir différencier les tickets (ça fonctionne comme une id)
  var random = Math.floor(Math.random() * (+2000 - +1000)) + +1000;

  //Récupérer la date
  var jour = new Date().toString().split(" ").splice(2, 1).join(" ");
  var mois = new Date().toString().split(" ").splice(1, 1).join(" ");

  var article = document.createElement("article");
  article.setAttribute("class", "card fl-left " + random);
  article.setAttribute("id", "removeArticle");

  var firstSection = document.createElement("section");
  firstSection.setAttribute("class", "date");

  var secondSection = document.createElement("section");
  secondSection.setAttribute("class", "card-cont");

  var time = document.createElement("time");

  var span1 = document.createElement("span");
  span1.innerHTML = jour;
  var span2 = document.createElement("span");
  span2.innerHTML = mois;

  var small = document.createElement("small");
  small.innerHTML = nom + " " + prenom;

  var h3 = document.createElement("h3");
  h3.innerHTML = demande;

  var divInfo = document.createElement("div");
  divInfo.setAttribute("class", "even-info");
  var iInfo = document.createElement("i");
  iInfo.setAttribute("class", "fa fa-map-marker");
  var pInfo = document.createElement("p");
  pInfo.setAttribute("id", random);
  pInfo.innerHTML = "Demande n° " + random;

  divRow = document.createElement("div");
  divRow.setAttribute("class", "d-grid gap-2 d-md-flex justify-content-md-end");
  //Bouton supprimer
  var bouton = document.createElement("BUTTON");
  bouton.innerHTML = "Supprimer";
  bouton.setAttribute("type", "button");
  bouton.setAttribute("class", "btn btn-secondary");
  bouton.setAttribute("id", random);
  bouton.setAttribute("onClick", "deleteElement(this.id)");
  //Bouton modifier
  var boutonModif = document.createElement("BUTTON");
  boutonModif.innerHTML = "Modifier";
  boutonModif.setAttribute("type", "button");
  boutonModif.setAttribute("class", "btn btn-secondary");
  boutonModif.setAttribute("id", random);
  boutonModif.setAttribute("data-bs-toggle", "modal");
  boutonModif.setAttribute("data-bs-target", "#staticBackdrop");
  boutonModif.setAttribute("onClick", "modifyButton(this.id)");
  //Bouton copier
  var boutonCopier = document.createElement("BUTTON");
  boutonCopier.innerHTML = "Copier";
  boutonCopier.setAttribute("type", "button");
  boutonCopier.setAttribute("class", "btn btn-secondary copy");
  boutonCopier.setAttribute("id", random);
  boutonCopier.setAttribute("onClick", "copyElement(this.id)");
  //Img qui apparait à la place du bouton en version mobile pour copier
  var img = document.createElement("IMG");
  img.setAttribute("src", "img/copy.png");
  img.setAttribute("width", "30");
  img.setAttribute("class", "copy_img");
  img.setAttribute("id", random);
  img.setAttribute("onClick", "copyElement(this.id)");

  //appendChild
  divInfo.appendChild(iInfo);
  divInfo.appendChild(pInfo);

  secondSection.appendChild(small);
  secondSection.appendChild(h3);
  secondSection.appendChild(divInfo);
  secondSection.appendChild(divRow);
  divRow.appendChild(bouton);
  divRow.appendChild(boutonModif);
  article.appendChild(boutonCopier);

  time.appendChild(span1);
  time.appendChild(span2);

  firstSection.appendChild(time);

  article.appendChild(img);
  article.appendChild(firstSection);
  article.appendChild(secondSection);

  contentMain.appendChild(article);
  
  //Suppresion du contenu de la modal
  const inputName = document.getElementById("FormControlInput1");
  const inputPrenom = document.getElementById("FormControlInput2");
  const inputEmail = document.getElementById("FormControlInput3"); 
  const inputChoice = document.getElementById("FormControlInput4");
  inputChoice.selectedIndex = 0;
  inputName.value = null;
  inputPrenom.value = null;
  inputEmail.value = null;
  //Retour du random pour pouvoir récupérer le num du ticket avec le local et sessionStorage
  return random;
}

//Suppression d'un ticket
function deleteElement(id) {
  const card = document.getElementsByClassName(`${id}`);
  const main = document.querySelector(".tickets");
  main.removeChild(card[0]);
}

//Envois des modif apportées au ticket
function modifyElement(id) {
  const ticket = document.getElementsByClassName(`${id}`);
  var infoNom = ticket[0].querySelector("small");
  var nom = getInputValues("FormControlInput1");
  var prenom = getInputValues("FormControlInput2");
  var demande = getInputForms("FormControlInput4");
  infoNom.innerText = nom + " " + prenom;
  var infoObj = ticket[0].querySelector("h3");
  infoObj.innerText = demande;
}

//Récupération des info du ticket + modification de la fonction du bouton valider du formulaire dans le cas d'une modification
function modifyButton(id) {
  //Modif du bouton
  const button = document.getElementById("submit");
  button.setAttribute("onClick", "modifyElement(" + id + ")");
  const inputName = document.getElementById("FormControlInput1");
  const inputPrenom = document.getElementById("FormControlInput2"); 
  const inputChoice = document.getElementById("FormControlInput4");
  //Récupération des infos pour pouvoir les afficher dans le formulaire puis les modifier
  const ticket = document.getElementsByClassName(`${id}`);
  var infoNom = ticket[0].querySelector("small").innerText;
  let split = infoNom.split(' ');
  let nom = split[0]; 
  let prenom = split[1];
  var infoDemande = ticket[0].querySelector("h3");
  switch(infoDemande.innerText) {
    case 'REMBOURSEMENT' :     
      inputChoice.selectedIndex = 1;
      break;
    case 'RÉPARATION' :
      inputChoice.selectedIndex = 2;
      break;
    case 'CONSEIL' :
      inputChoice.selectedIndex = 3;
      break;
    case 'COMMANDE' :
      inputChoice.selectedIndex = 4;
      break;
  }
  inputName.value = nom;
  inputPrenom.value = prenom;
}

//Copie des éléments d'un ticket dans le clipboard grace à l'API clipboard
function copyElement(id) {
  console.log(id);
  let ticket = document.getElementsByClassName(`${id}`);
  console.log(ticket);
  var infoNom = ticket[0].querySelector("small").innerText;
  var infoObj = ticket[0].querySelector("h3").innerText;
  var infoNum = ticket[0].querySelector("p").innerText;
  var infoDate = ticket[0].querySelector("time").innerText;

  var squashString =
    "Nom du demandeur : " +
    infoNom +
    " \nDate : " +
    infoDate +
    "\nNuméro de ticket : " +
    infoNum +
    "\nInfo du ticket : " +
    infoObj;
  navigator.clipboard.writeText(squashString);
}
//Récupération des infos passé lors du remplissage du formulaire
function getInputValues(myInput) {
  const inputVal = document.getElementById(myInput).value;
  return inputVal;
}
//Récupération des infos passé dans la liste lors du remplissage du formulaire
function getInputForms(myInput) {
  let e = document.getElementById(myInput);
  let inputVal = e.options[e.selectedIndex].text;
  return inputVal;
}

//Affichage des div pour la caméra et les infos du pc
function showDiv(myClass) {
  if (document.querySelector(myClass).style.visibility == "visible") {
    document.querySelector(myClass).style.visibility = "hidden";
  } else {
    document.querySelector(myClass).style.visibility = "visible";
  }
}

//Récupération de la cam, avec vérif si accès à la cam ou si la cam est dispo déjà
function getUserMedia(constraints) {
  if (navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  //Compatibilité avec d'autre navigateur
  var legacyApi =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  if (legacyApi) {
    return new Promise(function (resolve, reject) {
      legacyApi.bind(navigator)(constraints, resolve, reject);
    });
  }
}

var theStream;

function getStream(type) {
  if (
    !navigator.mediaDevices &&
    !navigator.getUserMedia &&
    !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia &&
    !navigator.msGetUserMedia
  ) {
    alert("L'API n'est pas supporté par votre navigateur.");
    return;
  }

  var constraints = {};
  constraints[type] = true;

  getUserMedia(constraints)
    .then(function (stream) {
      var mediaControl = document.querySelector(type);

      if ("srcObject" in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(
          stream
        );
      }
      mediaControl.play();
      theStream = stream;
    })

    .catch(function (err) {
      alert("Error: " + err);
    });
}
//Capture d'une photo depuis la vidéo
function takePhoto() {
  if (!("ImageCapture" in window)) {
    alert("Erreur! Pas de capture vidéo disponible");
    return;
  }

  if (!theStream) {
    alert("Veuillez démarrer votre capture vidéo!");
    return;
  }

  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

  theImageCapturer
    .takePhoto()
    .then((blob) => {
      var theImageTag = document.getElementById("imageTag");
      theImageTag.src = URL.createObjectURL(blob);
    })
    .catch((err) => alert("Error: " + err));
}
//Affichage de la mémoire du pc
function showMemory() {
  document.getElementById("result").innerHTML =
    navigator.deviceMemory || "Inconnu";
}

//Vérifie si des tickets sont déjà dispo en local ou session storage, sinon affichage d'un message
function verifyTickets() {
  var tickets = document.getElementById("removeArticle");
  if (tickets == null) {
    var contentMain = document.getElementById("tickets");
    var noTickets = document.createElement("h2");
    noTickets.setAttribute("id", "notickets");
    noTickets.innerHTML = "Vous n'avez aucun tickets";
    contentMain.appendChild(noTickets);
  }
  else if (localStorage.getItem('items') != null || sessionStorage.getItem('items') != null) {
    console.log("ticket en session ou localstorage");
  }
  else {
    var deleteMsg = document.querySelectorAll(".notickets");
    document.body.removeChild(deleteMsg);
  }
}
