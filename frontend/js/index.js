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
// Connexion à l'API et récupérer les données du serveur//
/*********************************************************/
var camera = function (url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
 
     xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
         if (xhr.status === 200) {
           resolve(xhr.responseText); // si ok //
         } else {
           reject(xhr);
           // alerte si le serveur ne répond pas//
           /****************************************/
           alert("Nous sommes désolé, le serveur ne répond pas ! ")
         };
       };
     };
     xhr.open('GET','http://localhost:3000/api/cameras/', true);
     xhr.send();
   });
 };
 
// affiche une erreur si la requete AJAX ne fonctionne pas//
/**********************************************************/
var catchError = function(e){
 console.error('Erreur AJAX', e);
};


// Recupére les données du serveur grace à la requete précedente //

var products = function () {
  return camera('http://localhost:3000/api/cameras/').then(function (response) {
    var products = JSON.parse(response);
    return products;
   });
 };

let cam = document.getElementById('cam'); 

// affiche la liste des articles dynamiquement //
/************************************************/

   products().then(function(products){
   console.log(products);


// afficher chaque produits sous forme d'une liste //
/*****************************************************/
products.forEach( camera=> {

   var article = document.createElement('article');
   article.id= "articleListe";

   var image = document.createElement('img');
   image.src = camera.imageUrl;

   var div = document.createElement('div');
    var nom = document.createElement('h3');
    nom.textContent = camera.name;
    nom.id ="camera";

  var prix = document.createElement('h4');
   prix.textContent = 'Prix :';
    var price = document.createElement('p');
    price.textContent = camera.price + '€';

   var id = camera._id;

   let link = document.createElement('a');
   link.id = "lien";
   link.href = 'produits.html?id=' + camera._id;
   link.textContent = "Voir l'appareil Photo";

// mettre les éléments du dom //
/********************************/

   cam.appendChild(article);
   article.appendChild(nom);
   article.appendChild(image);
   article.appendChild(div);
   div.appendChild(prix);
   div.appendChild(price);
   div.appendChild(link)
  });
});