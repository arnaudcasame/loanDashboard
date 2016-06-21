// JavaScript Document

/* Cette fonction permet d'arrondir les 
resultats à afficher */
function arrondi(t, n){
	var dec = Math.pow(10,n);
	var result = Math.round(dec*t)/dec;
	
	return result;
}

//Cet objet est le prêt objet
function Pret(principal, taux, duree, frequence, devise){
	this.principal = principal;
	this.taux = taux;
	this.duree = duree;
	this.devise = devise;
	this.frequence = frequence;
	this.paiement = null;
	this.calculPaiement = function(){
		this.paiement = (this.principal*((this.taux/100)/this.frequence))/(1 - Math.pow(1 + ((this.taux/100)/this.frequence), - (this.duree*this.frequence)));
		//console.log(this.paiement);
		if (isNaN(this.paiement) || this.paiement === Infinity){
			return 'Calculating...'
		}else{
			return arrondi(this.paiement, 2);
		}
	}
}

function Emprunteur(nom, prenom, age, nif, adresse, salaire){
	this.nom = nom;
	this.prenom= prenom;
	this.age = age;
	this.nif = nif;
	this.adresse = adresse;
	this.salaire = salaire;
}