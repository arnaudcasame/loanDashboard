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
		tablo = document.getElementById('tablo'),
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
			if(dataP.length !== 0){
				renderTab.tabVer(echelon, 'section2');
			}
		};

		tablo.onclick = function(){
			if(dataP.length !== 0){
				renderTab.tabVer(echelon, 'section2');
			}
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
			var len = frequence*duree;
			for(var i=0; i < len; i++){

				var No = i+1, bDep = (No===1) ? principal : bFin, 
				intP = bDep * ((taux/100)/frequence), 
				prinP = paiement - intP, 
				bFin = bDep - prinP, 
				intCum = (No===1) ? intP : (intP + intCum);

				var mois = {
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
				echelon.push(mois);
			}
			dataP.push(etiqs, intsPaye, prinsPaye);
		}

		function renderPlot(donnees){
			var canholder = document.getElementById('canvas-holder');

			var ctx = nono.create('canvas');
			ctx.id = 'myChart';
			ctx.style.width = 250 + 'px';
			ctx.style.height = 125 + 'px';

			if(canholder.hasChildNodes()){
				canholder.removeChild(document.getElementById('myChart'));
			}
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
				"Principal" : montant.value * 1,
				"Taux" : taux.value+' %',
				"Durée" : duree.value+' ans',
				"Paiement" : paiement,
				"frequence": frequence,
				"Interêts Totaux": calc_int,
				"Dette Totale": calc_dette
			};

			if(_temp["Principal"] !== '' 
				&& _temp["Taux"] !== '' 
				&& _temp["Durée"] !== '' 
				&& _temp["Paiement"] !== '' 
				&& _temp["Dette Totale"] !== 0 
				&& _temp["Interêts Totaux"] !== 0){

				if(listPret.length < 2){
					listPret.push(_temp);
				}else{
					listPret.shift();
					listPret.push(_temp);
				}

				renderTab.tabHor(listPret, 'comparaison');
			}
		}
		renderPlot([[], [], []]);
})();