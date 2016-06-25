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


// Fonction de calcul de la mensualité
function calcul_mensualite(x, y, z){
	if(isNaN(x)||isNaN(y)||isNaN(z)){
		//popUp.style.display = 'inline';
	}else{
		//popUp.style.display = 'none';
		var monthly = (x*(y/1200))/(1 - Math.pow(1 + (y/1200), -z));
		return monthly;
	}
}


function echeancier(){

			var tableau = document.createElement('table');
			var entete = document.createElement('thead');
			var corps = document.createElement('tbody');

		var caption = document.createElement('caption');
		// if(document.getElementsByTagName('thead')[0].hasChildNodes()){
	
		// }else{
			var container0 = document.createElement('tr');
			var terme0 = document.createElement('th');
			var balanceD0 = document.createElement('th');
			var interet0 = document.createElement('th');
			var principal0 = document.createElement('th');
			var balanceF0 = document.createElement('th');
			var interetC0 = document.createElement('th');

			caption.innerHTML = 'Echéancier';
			terme0.innerHTML = 'No';
			balanceD0.innerHTML = 'Balance Départ';
			interet0.innerHTML = 'Intérêt Payé';
			principal0.innerHTML = 'Principal Payé';
			balanceF0.innerHTML = 'Balance Fin';
			interetC0.innerHTML = 'Intérêt Cumulé';

			tableau.appendChild(caption);
			container0.appendChild(terme0);
			container0.appendChild(balanceD0);
			container0.appendChild(interet0);
			container0.appendChild(principal0);
			container0.appendChild(balanceF0);
			container0.appendChild(interetC0);

			entete.appendChild(container0);
		//}

		var monthly = calcul_mensualite(document.getElementById('montant').value, document.getElementById('taux').value, document.getElementById('duree').value);
		var i = document.getElementById('duree').value, 
		No = i - (i-1),
		balanceDepart = document.getElementById('montant').value,
		interetPaye = balanceDepart * (document.getElementById('taux').value/1200),
		principalPaye = monthly - interetPaye,
		balanceFin = balanceDepart - principalPaye;
		var interetCumule = interetPaye;

		//if(document.getElementsByTagName('tbody')[0].hasChildNodes()){
			//eraseNodes();

			var container = document.createElement('tr');
			var terme = document.createElement('td');
			var balanceD = document.createElement('td');
			var interet = document.createElement('td');
			var principal = document.createElement('td');
			var balanceF = document.createElement('td');
			var interetC = document.createElement('td');

			container.className = 'rows';
			terme.className = 'termeTd';
			balanceD.className = 'BalanceDTd';
			interet.className = 'interetTd';
			principal.className = 'principalTd';
			balanceF.className = 'balanceFtd';
			interetC.className = 'interetCtd';

			terme.innerHTML = No,
			balanceD.innerHTML = conversion_nombre(arrondi(balanceDepart, 2)),
			interet.innerHTML = conversion_nombre(arrondi(interetPaye, 2)),
			principal.innerHTML = conversion_nombre(arrondi(principalPaye, 2)),
			balanceF.innerHTML = conversion_nombre(arrondi(balanceFin, 2)),
			interetC.innerHTML = conversion_nombre(arrondi(interetCumule, 2));

			container.appendChild(terme)
			container.appendChild(balanceD)
			container.appendChild(interet)
			container.appendChild(principal)
			container.appendChild(balanceF)
			container.appendChild(interetC);
			
			corps.appendChild(container);

			for(i; i>=2; i--){
				No += 1,
				balanceDepart = balanceFin,
				interetPaye = balanceDepart * (tx.value/1200),
				principalPaye = monthly - interetPaye,
				balanceFin = balanceDepart - principalPaye,
				interetCumule = interetCumule + interetPaye;
				
				var container = document.createElement('tr');
				var terme = document.createElement('td');
				var balanceD = document.createElement('td');
				var interet = document.createElement('td');
				var principal = document.createElement('td');
				var balanceF = document.createElement('td');
				var interetC = document.createElement('td');
				
				container.className = 'rows';
				terme.className = 'termeTd';
				balanceD.className = 'BalanceDTd';
				interet.className = 'interetTd';
				principal.className = 'principalTd';
				balanceF.className = 'balanceFtd';
				interetC.className = 'interetCtd';

				terme.innerHTML = No,
				balanceD.innerHTML = conversion_nombre(myRound(balanceDepart, 2)),
				interet.innerHTML = conversion_nombre(myRound(interetPaye, 2)),
				principal.innerHTML = conversion_nombre(myRound(principalPaye, 2)),
				balanceF.innerHTML = conversion_nombre(myRound(balanceFin, 2)),
				interetC.innerHTML = conversion_nombre(myRound(interetCumule, 2));
				
				container.appendChild(terme)
				container.appendChild(balanceD)
				container.appendChild(interet)
				container.appendChild(principal)
				container.appendChild(balanceF)
				container.appendChild(interetC);
				document.getElementsByTagName('tbody')[0].appendChild(container);
			}
		//}else{
			var container = document.createElement('tr');
			var terme = document.createElement('td');
			var balanceD = document.createElement('td');
			var interet = document.createElement('td');
			var principal = document.createElement('td');
			var balanceF = document.createElement('td');
			var interetC = document.createElement('td');

			container.className = 'rows';
			terme.className = 'termeTd';
			balanceD.className = 'BalanceDTd';
			interet.className = 'interetTd';
			principal.className = 'principalTd';
			balanceF.className = 'balanceFtd';
			interetC.className = 'interetCtd';

			terme.innerHTML = No,
			balanceD.innerHTML = conversion_nombre(arrondi(balanceDepart, 2)),
			interet.innerHTML = conversion_nombre(arrondi(interetPaye, 2)),
			principal.innerHTML = conversion_nombre(arrondi(principalPaye, 2)),
			balanceF.innerHTML = conversion_nombre(arrondi(balanceFin, 2)),
			interetC.innerHTML = conversion_nombre(arrondi(interetCumule, 2));

			container.appendChild(terme)
			container.appendChild(balanceD)
			container.appendChild(interet)
			container.appendChild(principal)
			container.appendChild(balanceF)
			container.appendChild(interetC);
			
			corps.appendChild(container);

			for(i; i>=2; i--){
				No += 1,
				balanceDepart = balanceFin,
				interetPaye = balanceDepart * (tx.value/1200),
				principalPaye = monthly - interetPaye,
				balanceFin = balanceDepart - principalPaye,
				interetCumule = interetCumule + interetPaye;
				
				var container = document.createElement('tr');
				var terme = document.createElement('td');
				var balanceD = document.createElement('td');
				var interet = document.createElement('td');
				var principal = document.createElement('td');
				var balanceF = document.createElement('td');
				var interetC = document.createElement('td');
				
				container.className = 'rows';
				terme.className = 'termeTd';
				balanceD.className = 'BalanceDTd';
				interet.className = 'interetTd';
				principal.className = 'principalTd';
				balanceF.className = 'balanceFtd';
				interetC.className = 'interetCtd';

				terme.innerHTML = No,
				balanceD.innerHTML = conversion_nombre(arrondi(balanceDepart, 2)),
				interet.innerHTML = conversion_nombre(arrondi(interetPaye, 2)),
				principal.innerHTML = conversion_nombre(arrondi(principalPaye, 2)),
				balanceF.innerHTML = conversion_nombre(arrondi(balanceFin, 2)),
				interetC.innerHTML = conversion_nombre(arrondi(interetCumule, 2));
				
				container.appendChild(terme)
				container.appendChild(balanceD)
				container.appendChild(interet)
				container.appendChild(principal)
				container.appendChild(balanceF)
				container.appendChild(interetC);
				corps.appendChild(container);
			}
		//}
		tableau.appendChild(entete);
		tableau.appendChild(corps);
		document.body.appendChild(tableau);
}


echeancier();