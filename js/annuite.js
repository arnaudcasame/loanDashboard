// JavaScript Document

// function Emprunteur(nom, prenom, age, nif, adresse, salaire){
// 	this.nom = nom;
// 	this.prenom= prenom;
// 	this.age = age;
// 	this.nif = nif;
// 	this.adresse = adresse;
// 	this.salaire = salaire;
// }

var Pret = (function(){
		
		// Initialization
		var listPret = [];
		var principal = 0;
		var taux = 0;
		var duree = 0;
		var devise = 'HTG';
		var monnaie = null;
		var frequence = 12;
		var paiement = '';
		var formul = null;
		var calculated = false;

		// Caching the DOM
		principal = document.getElementById('montant');
		taux = document.getElementById('taux');
		duree = document.getElementById('duree');
		var freq = document.getElementsByClassName('freq');
		monnaie = document.getElementsByClassName('devise');
		formul = document.getElementById('formul');
		var resultat = document.getElementById('resultat');	
		var cours = document.getElementById('monnaie');
		var save = document.getElementById('save');
	

		//binding Events
		formul.onchange = function(){
			calculPaiement();
		};

		principal.onkeyup = function(){
			calculPaiement();
		};

		taux.onkeyup = function(){
			calculPaiement();
		};

		duree.onkeyup = function(){
			calculPaiement();
		}; 

		freq[0].onclick = function(){
			frequence = this.value;
			calculPaiement();
		};

		freq[1].onclick = function(){
			frequence = this.value;
			calculPaiement();
		};

		freq[2].onclick = function(){
			frequence = this.value;
			calculPaiement();
		};

		monnaie[0].onclick = function(e){
			choixMonnaie(e.target);
		};

		monnaie[1].onclick = function(e){
			choixMonnaie(e.target);
		};

		monnaie[2].onclick = function(e){
			choixMonnaie(e.target);
		};

		save.onclick = function(){
			savePret();
		};

		//defining functions
		function render(){
			resultat.textContent = paiement;


			if(devise === "USD" && calculated){
				cours.textContent =  '';
				cours.className = "fa fa-dollar";
			}else if(devise === "EUR" && calculated){
				cours.textContent =  '';
				cours.className = "fa fa-euro";
			}else if(calculated){
				cours.className = '';
				cours.textContent = devise;
			}
		}

		function calculPaiement(){
			paiement = (principal.value*((taux.value/100)/frequence))/(1 - Math.pow(1 + ((taux.value/100)/frequence), - (duree.value*frequence)));
			if (isNaN(paiement) || paiement === Infinity){
				paiement = (principal !== '') ? 'Calculating...' : '';
			}else{
				calculated = true;
				paiement = arrondi(paiement, 2);
				paiement = conversion_nombre(paiement, ' ');
			}
			render();
		}

		function choixMonnaie(theOne){
			devise = theOne.value;
			render();
		}

		function savePret(){
			var _temp = {
				amount : principal.value,
				tx : taux.value,
				period : duree.value,
				payment : paiement+' '+devise
			}
			listPret.push(_temp);
			console.log(listPret);
		}

		return {
			savePret: savePret
		};
})()