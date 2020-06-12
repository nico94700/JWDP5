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

//  récupération de l'id produit dans l'url//
/********************************************* */

  let params = new URLSearchParams(document.location.search);
  let id = params.get("id");
  console.log(id);

  let _id = id;
  let camera;
  let paniers;


//  obtention d'un seul produit à afficher dans la page produit//
/*****************************************************************/
let article = () => {
  let request = new XMLHttpRequest();
   request.onreadystatechange = function () {
     if (this.readyState == 4 && this.status == 200) {
         camera = JSON.parse(this.responseText);
         affichageProduit();
     }
  };
  request.open("GET", "http://localhost:3000/api/cameras/" + _id);
  request.send();

};
  // on affiche l'article demandé à l'ouverture de la page produit//
  /*****************************************************************/
window.addEventListener('load', article);

let panier = localStorage.getItem('panier');
panier = JSON.parse(panier);
localStorage.setItem('panier', JSON.stringify(panier));

 // Affichage du produit sous forme de petit container//
 /********************************************************/
function affichageProduit() {
    
    var article = document.createElement('article');
        var image = document.createElement('img');
        image.src =  camera.imageUrl;
        id =  camera._id;
    var div = document.createElement('div');
        var nom = document.createElement('h3');
        nom.textContent = camera.name;
        nom.id = "camera";
    
        var prix = document.createElement('h4');
        prix.textContent = 'Prix :';
        var price = document.createElement('p');
        price.textContent = camera.price + ' €';
    
        var desc = document.createElement('h4');
        desc.textContent = 'Description :';
        var description = document.createElement('p');
        description.textContent = camera.description;

// Bouton retour à la liste de produit (index.html)//
/*******************************************************/
        var liste = document.createElement('button');
        liste.id = "list";
        liste.textContent = "Retour";
        liste.addEventListener('click', function() {
            window.location.href ="index.html";
        });

// bouton voir le panier //
/*****************************/
        var voirPanier = document.createElement('button');
        voirPanier.id = "voirPanier";
        voirPanier.textContent = "Voir mon panier";
        voirPanier.addEventListener('click', function(e) {
            window.location.href = "panier.html";
        });

// choix de la lentilles//
/*****************************/
        var label = document.createElement('label');
        label.textContent = "Lentilles : ";
        var lens = document.createElement('select');
        lens.id = 'choix';
        var choix = camera.lenses;
        choix.id = "lentilles";

// Création d'une boucle For pour afficher la liste déroulante des lentilles de la caméra//
/********************************************************************************************/
        for (var i = 0; i < choix.length; i++) {
        var option = document.createElement('option');
        option.textContent = choix[i];
        option.id = "lentilles";
        lens.appendChild(option);
        };

// je vais indiquer le bouton ajout au panier//
/*************************************************/
        ajoutPanier = document.createElement ('button');
        ajoutPanier.id ="stockage";
        ajoutPanier.textContent = "Ajouter au panier";

        ajoutPanier.addEventListener('click', function() {
            alert('Vous avez ajouté ' +camera.name + ' à votre panier')
            ajoutLocalStorage()
            nombreProduit()
            prixTotal()
            //Mise à jour du nombre de produit//
/*****************************************************************/
function nombreProduit(){
    let nombreProduit = localStorage.getItem('qté');
    nombreProduit = parseInt(nombreProduit);

    if (nombreProduit){
        localStorage.setItem("qté", nombreProduit + 1);
        document.querySelector ('.totalQté').textContent = nombreProduit + 1;
    } else{
        localStorage.setItem("qté", 1);
        document.querySelector ('.totalQté').textContent = 1;
    }
}
// Mise à jour du nombre de produit dans l'objet "qté"//
/***********************************************************/
function ajoutLocalStorage(){
    let panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    camera.qté = 0;

    if(panier != null){

       if(panier[camera.name] === undefined) {
           panier = {...panier, [camera.name] : camera}
       }
          panier[camera.name].qté += 1;
    }else {
          panier = {[camera.name] : camera}
          panier[camera.name].qté += 1;
    }
    localStorage.setItem("panier", JSON.stringify(panier));
};
function prixTotal(){
   let price = parseInt(camera.price);
   let prixDuPanier = JSON.parse(localStorage.getItem('prixTotal'));

   if(prixDuPanier != null){
       localStorage.setItem("prixTotal", prixDuPanier + price);
    } else {
        localStorage.setItem("prixTotal", price);
    };
}

});

// Mise en place des éléments dans le DOM//
/********************************************/

    produit.appendChild(article);
    article.appendChild(nom);
    article.appendChild(image);
    article.appendChild(div);
    div.appendChild(prix);
    div.appendChild(price);
    div.appendChild(desc);
    div.appendChild(description);
    div.appendChild(label);
    div.appendChild(lens);
    div.appendChild(ajoutPanier);
    div.appendChild(liste);
    div.appendChild(voirPanier);

};
