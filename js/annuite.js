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
		var echelon = [];
		var montant = 0;
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
		montant = document.getElementById('montant');
		taux = document.getElementById('taux');
		duree = document.getElementById('duree');
		var freq = document.getElementsByClassName('freq');
		monnaie = document.getElementsByClassName('devise');
		formul = document.getElementById('formul');
		var resultat = document.getElementById('resultat');	
		var cours = document.getElementById('monnaie');
		var bouton_save = document.getElementById('save');
		var  bouton_echeancier = document.getElementById('eche');
	

		//binding Events
		formul.onchange = function(){
			calculPaiement();
		};

		montant.onkeyup = function(){
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

		bouton_save.onclick = function(){
			savePret();
		};

		bouton_echeancier.onclick = function(){	
			echeancier();
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

		function echelonner(principal, taux, duree, frequence, paiement){
			echelon = [];
			for(var i=0; i < frequence*duree; i++){

				var No = i+1, bDep = (No===1) ? principal : bFin, 
				intP = bDep * ((taux/100)/frequence), 
				prinP = paiement - intP, 
				bFin = bDep - prinP, 
				intCum = (No===1) ? intP : (intP + intCum);

				var obj = {
					'No': arrondi(No, 2),
					'Balance Départ':  arrondi(bDep, 2),
					'Intéret Payé': arrondi(intP, 2),
					'Principal Payé': arrondi(prinP, 2),
					'Balance Fin': arrondi(bFin, 2),
					'Intérêt Cumulé': arrondi(intCum, 2)
				}
				echelon.push(obj);
			}
		}

		function echeancier(){
			if(paiement_in_num !== 0){
				var tableau = nono.create('table');
				var desc = nono.create('caption');
				nono.stickTo(tableau, desc).display('Echéancier');
				var entete = nono.create('thead');
				var corps = nono.create('tbody');

				for (var i = 0; i < echelon.length; i++) {
					var range = nono.create('tr');
					if(i === 0){
						var ligne = nono.create('tr');
					}
					
					for(var chiffre in echelon[i]){
						if(i === 0){
							var celth = nono.create('th');
							nono.stickTo(ligne, celth).display(chiffre);
							nono.stickTo(entete, ligne);
						}
						var celtd = nono.create('td');
						if(chiffre === 'No'){
							nono.stickTo(range, celtd)
						.display(echelon[i][chiffre]);
						}else{
							nono.stickTo(range, celtd)
						.display(conversion_nombre(echelon[i][chiffre], ' '));
						}	
					}
					
					nono.stickTo(corps, range);
				}

				nono.stickTo(tableau, entete);
				nono.stickTo(tableau, corps);
				
				if(document.getElementById('analyse').hasChildNodes()){
					document.getElementById('analyse').replaceChild(tableau, document.getElementById('analyse').firstChild);
				}
				document.getElementById('analyse').appendChild(tableau);
			}
		}

		function calculPaiement(){
			paiement = (montant.value*((taux.value/100)/frequence))/(1 - Math.pow(1 + ((taux.value/100)/frequence), - (duree.value*frequence)));
			if (isNaN(paiement) || paiement === Infinity){
				paiement = (montant !== '') ? 'Calculating...' : '';
			}else{
				calculated = true;
				echelonner(montant.value, taux.value, duree.value, frequence, paiement);
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
			var calc_int = (paiement_in_num * frequence * duree.value) - montant.value;
			var calc_dette = paiement_in_num * frequence * duree.value;

			var _temp = {
				amount : montant.value * 1,
				tx : taux.value+' %',
				period : duree.value+' ans',
				payment : paiement,
				dette: calc_dette,
				interet: calc_int
			}

			if(_temp.amount !== '' 
				&& _temp.tx !== '' 
				&& _temp.period !== '' 
				&& _temp.payment !== '' 
				&& _temp.dette !== 0 
				&& _temp.interet !== 0){
				if(listPret.length < 3){
					listPret.push(_temp);
				}else{
					listPret.splice(1, 1);
					listPret.push(_temp);
				}
			}
			
			render_comparison(listPret);
		}


		// The revealing section
		return {
			//savePret: savePret,
			//echeancier: echeancier
		};
})()


function render_comparison(arg){

	if(typeof arg === 'object' && arg.length === 2){
		var conteneur = document.createElement('aside');
		conteneur.className = 'container';
		conteneur.id = 'there';
		var captions = nono.createjs('p');
		captions.textContent = 'Comparaison des deux Simulations';
		conteneur.appendChild(captions);

		for(var i=0; i<arg.length; i++){
			render_liste(arg[i], i, conteneur);
		}
	}else if(typeof arg === 'object' && arg.length > 2){

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
	if(document.getElementById('analyse').hasChildNodes()){
		document.getElementById('analyse').replaceChild(container, document.getElementById('analyse').firstChild);
	}
	document.getElementById('analyse').appendChild(container).appendChild(sous_conteneur).appendChild(listes);	
}