// JavaScript Document

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
		devise: 'HTG',
		monnaie: null,
		frequence: 12,
		paiement: '',
		formul: null,
		calculated: false,
		

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
			this.monnaie = document.getElementsByClassName('devise');
			this.formul = document.getElementById('formul');
			this.resultat = document.getElementById('resultat');	
			this.cours = document.getElementById('monnaie');
		},

		bindEvents: function(){
			var that = this;
			this.formul.onchange = function(){
				that.calculPaiement();
			};

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
				that.frequence = this.value;
				that.calculPaiement();
			};

			this.freq[1].onclick = function(){
				that.frequence = this.value;
				that.calculPaiement();
			};

			this.freq[2].onclick = function(){
				that.frequence = this.value;
				that.calculPaiement();
			};

			this.monnaie[0].onclick = function(e){
				that.choixMonnaie(e.target);
			};

			this.monnaie[1].onclick = function(e){
				that.choixMonnaie(e.target);
			};

			this.monnaie[2].onclick = function(e){
				that.choixMonnaie(e.target);
			};
		},

		render: function(){
			this.resultat.textContent = this.paiement;


			if(this.devise === "USD" && this.calculated){
				this.cours.textContent =  '';
				this.cours.className = "fa fa-dollar";
			}else if(this.devise === "EUR" && this.calculated){
				this.cours.textContent =  '';
				this.cours.className = "fa fa-euro";
			}else if(this.calculated){
				this.cours.className = '';
				this.cours.textContent = this.devise;
			}
		},

		calculPaiement: function(){
			this.paiement = (this.principal.value*((this.taux.value/100)/this.frequence))/(1 - Math.pow(1 + ((this.taux.value/100)/this.frequence), - (this.duree.value*this.frequence)));
			if (isNaN(this.paiement) || this.paiement === Infinity){
				this.paiement = (this.principal.value !== '') ? 'Calculating...' : '';
			}else{
				this.calculated = true;
				this.paiement = arrondi(this.paiement, 2);
				this.paiement = conversion_nombre(this.paiement, '  ');
			}
			this.render();
		},

		choixMonnaie: function(theOne){
			this.devise = theOne.value;
			this.render();
		}
	}

	Pret.init();
})()