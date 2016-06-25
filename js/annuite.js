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
		var listPret = [{ 
				amount: 'Principal',
				tx : 'Taux',
				period : 'Durée',
				payment : 'Paiement',
				dette: 'Dette Totale',
				interet: 'Interêts Totaux'
			}];
		var principal = 0;
		var taux = 0;
		var duree = 0;
		var devise = 'HTG';
		var monnaie = null;
		var frequence = 12;
		var paiement = '';
		var formul = null;
		var calculated = false;
		var paiement_in_num = 0;

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
				paiement_in_num = paiement;
				paiement = conversion_nombre(paiement, ' ');
			}
			render();
		}

		function choixMonnaie(theOne){
			devise = theOne.value;
			render();
		}

		function savePret(){
			var calc_int = (paiement_in_num * frequence * duree.value) - principal.value;
			var calc_dette = paiement_in_num * frequence * duree.value;
			var _temp = {
				amount : principal.value * 1,
				tx : taux.value+' %',
				period : duree.value+' ans',
				payment : paiement,
				dette: calc_dette,
				interet: calc_int
			}

			if(_temp.amount !== '' && _temp.tx !== '' && _temp.period !== '' && _temp.payment !== '' && _temp.dette !== 0 && _temp.interet !== 0){
				if(listPret.length < 3){
					listPret.push(_temp);
				}else{
					listPret.splice(1, 1);
					listPret.push(_temp);
				}
			}
			
			render_comparison(listPret);
		}

		return {
			savePret: savePret
		};
})()


function render_comparison(arg){

	if(typeof arg === 'object' && arg.length === 2){
		var conteneur = document.createElement('aside');
		conteneur.className = 'container';
		conteneur.id = 'there';
		var captions = document.createElement('p');
		captions.textContent = 'Comparaison des deux Simulations';
		conteneur.appendChild(captions);

		for(var i=0; i<arg.length; i++){
			render_liste(arg[i], i, conteneur);
		}
	}else if(typeof arg === 'object' && arg.length > 2){
		document.body.removeChild(document.getElementById('there'));

		var conteneur = document.createElement('aside');
		conteneur.className = 'container';
		conteneur.id = 'there';
		var captions = document.createElement('p');
		captions.textContent = 'Comparaison des Simulations';
		conteneur.appendChild(captions);

		for(var i=0; i<arg.length; i++){
			render_liste(arg[i], i, conteneur);
		}
	}


}


function render_liste(obj, indx, container){
	var sous_conteneur = document.createElement('div');
	sous_conteneur.className = 'parts-container';
	sous_conteneur.id = (indx === 2) ? 'last' : '';
	var listes = document.createElement('ul');
	var liste = []

	for(var i in obj){
		var ele_liste = document.createElement('li');
		var span = document.createElement('span')
		span.className = (indx === 0) ? '' : 'valeurs';
		if(i === 'payment' || (typeof obj[i] === 'string')){
			span.textContent = obj[i];
		}else{
			span.textContent = conversion_nombre(arrondi(obj[i], 2), ' ');
		}
		
		
		ele_liste.appendChild(span);
		liste.push(ele_liste);
	}

	for (var i = 0; i < liste.length; i++) {
		listes.appendChild(liste[i])
	};
	
	document.body.appendChild(container).appendChild(sous_conteneur).appendChild(listes);	
}

