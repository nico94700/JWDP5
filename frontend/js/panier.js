//MAJ nombre de pdts dans l'onglet panier//
/*******************************************/
function chargementPanier(){
  let nombreProduit = localStorage.getItem('qté');

  if(nombreProduit){
  document.querySelector ('.totalQté').textContent = nombreProduit;
  }else{
     document.querySelector ('.totalQté').textContent = 0 ;

  }
}

chargementPanier();

// afficher des articles qui sont mis dans le panier 
/****************************************************/
function affichagePanier(){

  let data = JSON.parse(localStorage.getItem('panier'));

 // il faut enregistrer les valeurs du prix total dans une variable //
 /********************************************************************/
    var total = localStorage.getItem('prixTotal');
    var prixPanier = document.getElementById('total');


// affichage du prix total au panier si le panier contien quelque chose  Sinon on affiche "Votre panier est vide"
/****************************************************************************************************************/
    if (total != null) {
      prixPanier.textContent = 'Le montant de votre  est de ' + total +'€';
      prixPanier.id = 'prixTotal';
    } else {
      prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
    }
// affichage des produits au panier sous forme de petites fiches articles//
/***************************************************************************/
   let productContainer = document.getElementById("basket");

    if(data == null || total == 0 ) {
     var div = document.createElement('div');
     div.textContent = " Votre panier est vide ";
     basket.appendChild(div);
    } else {
      productContainer.innerHTML = '';
// on récupère les valeurs dans le localStorage pour les afficher sous forme de petit container dans le panier //
/*****************************************************************************************************************/
      Object.values(data).map( (camera) => {


            var article = document.createElement('article');
            article.id = "articlePanier";

            var nom = document.createElement('h2');
            nom.textContent = camera.name;

            var image = document.createElement('img');
            image.src = camera.imageUrl;

            var div = document.createElement('div');
            div.id = "produit";

            var quantite = document.createElement('h3');
            quantite.textContent = 'Quantité: ';

            var qté = document.createElement('p');
            qté.textContent = camera.qté;

            var prix = document.createElement('h3');
            prix.textContent = 'Prix: ';

            var price = document.createElement('p');
            price.textContent = camera.price;
            price.id = "price";

            var supprime = document.createElement('button');
            supprime.textContent = "Supprimer l'article";
            supprime.id = "supprime";

            // mise en place des éléments dans le DOM//
            /*******************************************/

            basket.appendChild(article);
            article.appendChild(nom);
            article.appendChild(image);
            article.appendChild(div);
            div.appendChild(quantite);
            div.appendChild(qté);
            div.appendChild(prix);
            div.appendChild(price);
            div.appendChild(supprime);
        });
      };
// on appelle la fonction "supprimer le pdt" dans le container de l'article au panier //
/****************************************************************************************/
deleteButtons();
};
// on appelle la fontion "affichage du panier" pour afficher les pdt au panier//
/*******************************************************************************/
affichagePanier();

// suppression d'un l'article //
/*********************************/
function deleteButtons() {
  let deleteButtons = document.querySelectorAll('#supprime');
  let nomProduit ; 
  let nombreTotalDeProduit = localStorage.getItem('qté');
  nombreTotalDeProduit = parseInt(nombreTotalDeProduit);
  let coutDuPanier = localStorage.getItem("prixTotal");
  coutDuPanier = parseInt(coutDuPanier);
  let data = JSON.parse(localStorage.getItem('panier'));

    // faire une boucle pour que j'affiche les boutons " supp pdts" autant de fois qu'il y a un article au panier//
    /****************************************************************************************************************/

 for(let i=0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click' , () => {
    // récuperer le nom de camera pour après//
    /*******************************************/
    nomProduit = deleteButtons[i].parentElement.parentElement.firstChild.innerText.trim();
    console.log(nomProduit);
    // récupere la qte de camera pour le calculs de la suppression //
    /*****************************************************************/
    qté= deleteButtons[i].parentElement.children[1].textContent;
    // convertir du string en number//
    /************************************************************/
    qté = parseInt(qté);
    //récuperer le prix de la caméra pour le calculs de la suppréssion de l'article //
    /**********************************************************************************/
    let price = deleteButtons[i].parentElement.children[3].textContent;
    // convertir du string en number //
    /***********************************/
    price = parseInt(price);
    // calcul de la qté dans le panier après suppréssion de l'article//
    /******************************************************************/
    calculQte = nombreTotalDeProduit - qté;
    localStorage.setItem('qté', calculQte);
    // calcul de la qté après la supp de l'article//
    /************************************************/
    calculPrice = coutDuPanier - qté * price;
    localStorage.setItem('prixTotal', calculPrice);
    // on supp la ligne caméra correspondant au bouton supprimer //
    /*************************************************************/
    delete data[nomProduit];

    // alerte pour dire que l'article à été supprimé //
    /*******************************************/

    alert('Vous avez supprimé'+ nomProduit + ' de votre panier  ')
    // actualiser le localstorage et recharche la page pour une MAJ //
    /******************************************************************/
    localStorage.setItem('panier', JSON.stringify(data));
    window.location.reload();

    affichagePanier();
    chargementPanier();
    });
    };
};

// requete finale de commande contenant les information de contact et les ID pdt//
/*********************************************************************************/
function achat() {

    // integrer une alerte si le panier est vide //
    /***********************************************/
    let panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    var total = localStorage.getItem('prixTotal');
if (panier == null || total == 0) {
   alert("Votre panier est vide, impossible de passer une commande ! ")
    }
// déclarer un tableau de pdt pour la requete POST après //
/************************************************************/
    let products = [];

    // créer une fonction pour récupérer les ID des pdt au panier , pour l'afficher dans la requete POST//
    /****************************************************************************************************/
    function productId(products) {
     let panier = JSON.parse(localStorage.getItem('panier'));

     products = Object.values(panier).map( (data) => {
       let qté = parseInt(data.qté);
       console.log(typeof qté);
       console.log(qté);

       for (let i = 0; i< qté ; i ++){
            products.push(data._id);
          }
           console.log(products);
           return products;
          });

       };
       productId(products);

    // récuperer les valeurs des champs du client//
    /***********************************************/

       let firstName = document.getElementById('firstname').value;
       let lastName = document.getElementById('name').value;
       let email = document.getElementById('email').value;
       let address = document.getElementById('address').value;
       let city = document.getElementById('city').value;

    // mettre les valeurs dans un objet pour la requete POST //
    /***********************************************************/

       let contact = {
           "firstName": firstName,
           "lastName": lastName,
            "email": email,
            "address": address,
            "city": city,
    };

    // création de l'objet pour la requete au serveur//
    /***************************************************/
        let objt = {
          contact,
          products
    };

    let achatjson = JSON.stringify(objt);
    // console.log (achat);
    // console.log (products);
    /*******************************************/

    // alerte si il manque un renseignement et enregistrer les données dans le localstorage //
    /*******************************************************************************************/
    var prenom = document.getElementById('firstname');
    var oublisPrenom = document.getElementById('oublisPrenom');
    var prenomValid = /^[a-zA-Z ,.'-]+$/;

    var nom = document.getElementById('name');
    var oublisNom = document.getElementById('oublisNom');
    var nomValid = /^[a-zA-Z ,.'-]+$/;

    var mail = document.getElementById('email');
    var oublisEmail = document.getElementById('oublisEmail');
    var mailValid = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
    
    var adresse= document.getElementById('address');
    var oublisAdress = document.getElementById('oublisAdress');
    var adresseValid = /[0-9a-zA-Z]{1,3}[a-z ,.'-]+$/;

    var ville = document.getElementById('city');
    var oublisVille = document.getElementById('oublisVille');
    var villeValid = /^^[a-zA-Z ,.'-]+$/;

    if (prenomValid.test(prenom.value) == false){
      oublisPrenom.textContent = "Format de votre prénom incorrect";
      oublisPrenom.style.color = 'red';
      return event.preventDefault();

  } else if  (nomValid.test(nom.value) == false){
    oublisNom.textContent = "Format de votre nom incorrect";
    oublisNom.style.color = 'red';
    return event.preventDefault();

  } else if (mailValid.test(mail.value) == false){
    oublisEmail.textContent = "Format de votre mail incorrect";
    oublisEmail.style.color = 'red';
    return event.preventDefault();

  } else if (adresseValid.test(adresse.value) == false){
    oublisAdress.textContent = "Format de votre adresse incorrect";
    oublisAdress.style.color = 'red';
    return event.preventDefault();


  } else if (villeValid.test(ville.value) == false){
    oublisVille.textContent = "Format de votre ville incorrect";
    oublisVille.style.color = 'red';
    return event.preventDefault();
  

  } else if (panier == null || total == 0){
    return event.preventDefault();

  
  }else {
    // envoi la commande au serveur avec les coordonnées du client//
    /***************************************************************/
  let request = new XMLHttpRequest();
       request.onreadystatechange = function () {
         if (this.readyState == XMLHttpRequest.DONE) {
            let confirmation = JSON.parse(this.responseText);
            sessionStorage.setItem('order', JSON.stringify(confirmation));
            let prix = JSON.parse(localStorage.getItem('prixTotal'));
            sessionStorage.setItem('prix', JSON.stringify(prix));
           console.log(typeof prix);
           console.log(prix);
            // des que la requete est envoyé basculer sur la page de confirmation avec toutes les infos //
            /*********************************************************************************************/
             window.location.href = "commande.html";
          }
        };
    request.open("POST","http://localhost:3000/api/cameras/order" );
    request.setRequestHeader("Content-type", "application/json");
    request.send(achatjson);
}
}