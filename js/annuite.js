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
				interet: 'Interêts Totaux',
				freq: 'frequence'
			}];
		var echelon = [];
		var dataP = [];
		var montant = 0;
		var taux = 0;
		var duree = 0;
		var devise = 'HTG';
		var monnaie = null;
		var frequence = 12;
		var paiement = '';
		var calculated = false;
		var paiement_in_num = 0;


		// Caching the DOM
		montant = document.getElementById('montant');
		taux = document.getElementById('taux');
		duree = document.getElementById('duree');
		var freq = document.getElementsByClassName('freq');
		monnaie = document.getElementsByClassName('devise');
		var resultat = document.getElementById('resultat');	
		var cours = document.getElementById('monnaie');
		var bouton_save = document.getElementById('save');
		var  bouton_echeancier = document.getElementById('eche'),
		exit = document.getElementById('exit-graph'),
		graph = document.getElementById('graph');
		
	

		//binding Events
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

		graph.onclick = function(){
			if(paiement !== ''){
				renderPlot(dataP);
			}
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
			var etiqs = [], intsPaye = [], prinsPaye = []; 
			dataP = [];
			for(var i=0; i < frequence*duree; i++){

				var No = i+1, bDep = (No===1) ? principal : bFin, 
				intP = bDep * ((taux/100)/frequence), 
				prinP = paiement - intP, 
				bFin = bDep - prinP, 
				intCum = (No===1) ? intP : (intP + intCum);

				var obj = {
					'No': No,
					'Balance Départ':  arrondi(bDep, 2),
					'Intéret Payé': arrondi(intP, 2),
					'Principal Payé': arrondi(prinP, 2),
					'Balance Fin': arrondi(bFin, 2),
					'Intérêt Cumulé': arrondi(intCum, 2)
				};
				
				etiqs.push('paiement '+No);
				intsPaye.push(arrondi(intP, 2));
				prinsPaye.push(arrondi(prinP, 2));
				echelon.push(obj);
			}
			dataP.push(etiqs, intsPaye, prinsPaye);
		}

		function renderPlot(donnees){
			var canholder = document.getElementById('canvas-holder');
			var capholder = nono.create('div');
			capholder.id = 'capholder';
			var caption = nono.create('caption');
			var exit = nono.create('span');
			exit.id = 'exit-graph';
			var icon = nono.create('i');
			icon.className = 'fa fa-times';
			nono.stickTo(exit, icon);
			nono.display(caption, 'Graphe de comparaison des paiements').stickTo(capholder, caption);

			exit.onclick = function(){
				document.getElementById('canvas-holder').removeChild(document.getElementById('capholder'));
				document.getElementById('canvas-holder').removeChild(document.getElementById('myChart'));
			};



			var ctx = nono.create('canvas');
			ctx.id = 'myChart';
			ctx.style.width = 250 + 'px';
			ctx.style.height = 125 + 'px';

			if(canholder.hasChildNodes() && document.getElementById('capholder')){
				canholder.removeChild(document.getElementById('capholder'));
				canholder.removeChild(document.getElementById('myChart'));
			}
			nono.stickTo(caption, exit);
			nono.stickTo(canholder, capholder);
			nono.stickTo(canholder, ctx);



			var context = ctx.getContext('2d');

			var data = {
				labels: donnees[0],
				datasets: [
					{
						label: "Interêts payés",
						fill: true,
						lineTension: 0.1,
						backgroundColor: "rgba(75,192,192,0.4)",
						borderColor: "rgba(75,192,192,1)",
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: "rgba(75,192,192,1)",
						pointBackgroundColor: "#fff",
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: "rgba(75,192,192,1)",
						pointHoverBorderColor: "rgba(220,220,220,1)",
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: donnees[1],
						spanGaps: false,
					},
					{
						label: "Principaux payés",
						fill: true,
						lineTension: 0.1,
						backgroundColor: "rgba(255, 127, 80, 0.4)",
						borderColor: "rgba(255, 127, 80, 1)",
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: "coral",
						pointBackgroundColor: "#fff",
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: "rgba(255, 127, 80, 1)",
						pointHoverBorderColor: "rgba(220,220,220,1)",
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: donnees[2],
						spanGaps: false,
					}
				]
			};

			var myLineChart = Chart.Line(context, {
				data: data
			});
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
				if(document.getElementsByTagName('table')[0] !== undefined){
					document.getElementById('analyse').replaceChild(tableau, document.getElementsByTagName('table')[0]);
				}else{
					document.getElementById('analyse').appendChild(tableau);
				}
				
			}
		}

		function calculPaiement(){
			paiement = (montant.value*((taux.value/100)/frequence))/(1 - Math.pow(1 + ((taux.value/100)/frequence), - (duree.value*frequence)));
			
			if(montant.value === '' && taux.value === '' && duree.value === ''){
				paiement = '';
				renderPlot([[], [], []]);
				devise = '';
			}else if(isNaN(paiement) || paiement === Infinity){
				paiement = (montant !== '') ? 'Calculating...' : '';
				renderPlot([[], [], []]);
				devise = '';
			}else{
				calculated = true;
				echelonner(montant.value, taux.value, duree.value, frequence, paiement);
				paiement = arrondi(paiement, 2);
				paiement_in_num = paiement;
				paiement = conversion_nombre(paiement, ' ');
				renderPlot(dataP);
				for(var i=0; i<3; i++){
					if(monnaie[i].checked === true){
						devise = monnaie[i].value;
					}
				}
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
				interet: calc_int,
				freq: frequence
			};

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
		renderPlot([[], [], []]);
})();


function render_comparison(arg){

	if(typeof arg === 'object' && arg.length === 2){
		var conteneur = document.createElement('aside');
		conteneur.className = 'container';
		conteneur.id = 'there';
		var captions = nono.create('p');
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

	for(var i=0; i<liste.length; i++) {
		listes.appendChild(liste[i]);
	};

	if(document.getElementById('comparaison').hasChildNodes()){
		document.getElementById('comparaison').replaceChild(container, document.getElementById('comparaison').firstChild);
	}
	document.getElementById('comparaison').appendChild(container).appendChild(sous_conteneur).appendChild(listes);	
}