// JavaScript Document

/* Cette fonction permet d'arrondir les 
resultats à afficher */
function arrondi(t, n){
	var dec = Math.pow(10,n);
	var result = Math.round(dec*t)/dec;
	
	return result;
}

//Cet objet est le prêt objet
// function Pret(principal, taux, duree, frequence, devise){
// 	this.principal = principal;
// 	this.taux = taux;
// 	this.duree = duree;
// 	this.devise = devise;
// 	this.frequence = frequence;
// 	this.paiement = null;
// 	this.calculPaiement = function(){
// 		this.paiement = (this.principal*((this.taux/100)/this.frequence))/(1 - Math.pow(1 + ((this.taux/100)/this.frequence), - (this.duree*this.frequence)));
// 		//console.log(this.paiement);
// 		if (isNaN(this.paiement) || this.paiement === Infinity){
// 			return 'Calculating...'
// 		}else{
// 			return arrondi(this.paiement, 2);
// 		}
// 	}
// }

// function Emprunteur(nom, prenom, age, nif, adresse, salaire){
// 	this.nom = nom;
// 	this.prenom= prenom;
// 	this.age = age;
// 	this.nif = nif;
// 	this.adresse = adresse;
// 	this.salaire = salaire;
// }

(function(){

		var Pret = {
			
			principal: 0,
			taux: 0,
			duree: 0,
			devise: ['USD', 'HTG', 'EUR'],
			frequence: 12,
			freq: 0,
			paiement: 0,
			

			init: function(){
				this.cacheDom();
				this.bindEvents();
				this.render();
			},

			cacheDom: function(){
				this.principal = document.getElementById('montant');
				this.taux = document.getElementById('taux');
				this.duree = document.getElementById('duree');
				this.freq = document.getElementsByClassName('freq');
				var resultat = document.getElementById('resultat');	
			},

			bindEvents: function(){
				var that = this;
				this.principal.onkeyup = function(){
					that.calculPaiement();
				};

				this.taux.onkeyup = function(){
					that.calculPaiement();
				};

				this.duree.onkeyup = function(){
					that.calculPaiement();
				}; 

				this.freq[0].onclick = function(){
					that.calculPaiement();
				};

				this.freq[1].onclick = function(){
					that.calculPaiement();
				};

				this.freq[2].onclick = function(){
					that.calculPaiement();
				};
			},

			render: function(){
				resultat.innerHTML = this.paiement;
				// this.principal = document.getElementById('montant').value;
				// this.taux = document.getElementById('taux').value;
				// this.duree = document.getElementById('duree').value;
				// this.principal = document.getElementById('montant').value;
				// this.frequence = document.getElementsByClassName('fred');
			},

			calculPaiement: function(){
				this.paiement = (this.principal.value*((this.taux.value/100)/this.frequence))/(1 - Math.pow(1 + ((this.taux.value/100)/this.frequence), - (this.duree.value*this.frequence)));
				console.log(this.paiement);
				if (isNaN(this.paiement) || this.paiement === Infinity){
					this.paiement = 'Calculating...';
				}else{
					this.paiement = arrondi(this.paiement, 2);
				}
				this.render();
			}
		}

		Pret.init();

})();