renderTab = (function(){

	function tabVer(data, aim){
		var tableau = nono.create('table');
		tableau.id = 'vertical';
		var desc = nono.create('caption');
		nono.stickTo(tableau, desc).display('Echéancier');
		var entete = nono.create('thead');
		var corps = nono.create('tbody');

		for (var i = 0; i < data.length; i++) {
			var range = nono.create('tr');
			if(i === 0){
				var ligne = nono.create('tr');
			}
			
			for(var chiffre in data[i]){
				if(i === 0){
					var celth = nono.create('th');
					nono.stickTo(ligne, celth).display(chiffre);
					nono.stickTo(entete, ligne);
				}
				var celtd = nono.create('td');
				if(chiffre === 'No'){
					nono.stickTo(range, celtd)
				.display(data[i][chiffre]);
				}else{
					nono.stickTo(range, celtd)
				.display(conversion_nombre(data[i][chiffre], ' '));
				}	
			}
			
			nono.stickTo(corps, range);
		}

		nono.stickTo(tableau, entete);
		nono.stickTo(tableau, corps);
		if(document.getElementById('vertical') !== null){
			document.getElementById(aim).replaceChild(tableau, document.getElementById('vertical'));
		}else{
			document.getElementById(aim).appendChild(tableau);
		}
	}

	function tabHor(data, aim){

		var tableau = document.createElement('table'),
		caption = document.createElement('caption')
		tableau.id = 'horizontal';

		caption.textContent = 'Comparaison des Simulations';
		tableau.appendChild(caption);
		var tabLignes = [];
		for(var i=0, len = data.length; i < len; i++){
			var j = 0;
			for(var y in data[i]){
				if(i===0){
					var ligne = document.createElement('tr');

					var libelle = document.createElement('th');
					libelle.textContent = y;

					ligne.appendChild(libelle);

					var cel = document.createElement('td');
					cel.textContent = data[i][y];

					ligne.appendChild(cel);
					tabLignes.push(ligne);
				}else{
					if(j > Object.keys(data[i]).length){
						j=0;
					}
					var cel = document.createElement('td');
					cel.textContent = data[i][y];
					tabLignes[j].appendChild(cel);
				}
				j++;
				tableau.appendChild(ligne);
			}
		}
		
		if(document.getElementById('horizontal') !== null){
			document.getElementById(aim).replaceChild(tableau, document.getElementById('horizontal'));
		}else{
			document.getElementById(aim).appendChild(tableau);
		}
	}

	return{
		tabVer : tabVer,
		tabHor : tabHor
	};

}());

var list = [{
	"Principal":171600,
	"Dette Totale":186264,
	"frequence":12,
	"Interêts Totaux":14664,
	"Paiement":"7 761.00",
	"Durée":"2 ans",
	"Taux":"8 %"
},{
	"Principal":272600,
	"Dette Totale":286264,
	"frequence":22,
	"Interêts Totaux":14664,
	"Paiement":"7 761.00",
	"Durée":"2 ans",
	"Taux":"8 %"
},{
	"Principal":373600,
	"Dette Totale":386264,
	"frequence":32,
	"Interêts Totaux":14664,
	"Paiement":"7 761.00",
	"Durée":"2 ans",
	"Taux":"8 %"
}];

var echec = [{
"Balance Départ": 171600,
"Balance Fin": 164983,
"Intéret Payé": 1144,
"Intérêt Cumulé": 1144,
No: 1,
"Principal Payé": 6617
},{
"Balance Départ": 164983,
"Balance Fin": 158321.88,
"Intéret Payé": 1099.89,
"Intérêt Cumulé": 2243.89,
No: 2,
"Principal Payé": 6661.12
},{
"Balance Départ": 158321.88,
"Balance Fin": 151616.36,
"Intéret Payé": 1055.48,
"Intérêt Cumulé": 3299.37,
No: 3,
"Principal Payé": 6705.52
},{
"Balance Départ": 151616.36,
"Balance Fin": 144866.13,
"Intéret Payé": 1010.78,
"Intérêt Cumulé": 4310.14,
No: 4,
"Principal Payé": 6750.23
},{
"Balance Départ": 144866.13,
"Balance Fin": 138070.9,
"Intéret Payé": 965.77,
"Intérêt Cumulé": 5275.92,
No: 5,
"Principal Payé": 6795.23
},{
"Balance Départ": 138070.9,
"Balance Fin": 131230.37,
"Intéret Payé": 920.47,
"Intérêt Cumulé": 6196.39,
No: 6,
"Principal Payé": 6840.53
},{
"Balance Départ": 131230.37,
"Balance Fin": 124344.24,
"Intéret Payé": 874.87,
"Intérêt Cumulé": 7071.26,
No: 7,
"Principal Payé": 6886.13
},{
"Balance Départ": 124344.24,
"Balance Fin": 117412.19,
"Intéret Payé": 828.96,
"Intérêt Cumulé": 7900.22,
No: 8,
"Principal Payé": 6932.04
},{
"Balance Départ": 117412.19,
"Balance Fin": 110433.94,
"Intéret Payé": 782.75,
"Intérêt Cumulé": 8682.97,
No: 9,
"Principal Payé": 6978.26
},{
"Balance Départ": 110433.94,
"Balance Fin": 103409.16,
"Intéret Payé": 736.23,
"Intérêt Cumulé": 9419.19,
No: 10,
"Principal Payé": 7024.78
},{
"Balance Départ": 103409.16,
"Balance Fin": 96337.55,
"Intéret Payé": 689.39,
"Intérêt Cumulé": 10108.59,
No: 11,
"Principal Payé": 7071.61,
},{
"Balance Départ": 96337.55,
"Balance Fin": 89218.8,
"Intéret Payé": 642.25,
"Intérêt Cumulé": 10750.84,
No: 12,
"Principal Payé": 7118.75
},{"Balance Départ": 89218.8,
"Balance Fin": 82052.59,
"Intéret Payé": 594.79,
"Intérêt Cumulé": 11345.63,
No: 13,
"Principal Payé": 7166.21
},{
"Balance Départ": 82052.59,
"Balance Fin": 74838.6,
"Intéret Payé": 547.02,
"Intérêt Cumulé": 11892.65,
No: 14,
"Principal Payé": 7213.99
},{
"Balance Départ": 74838.6,
"Balance Fin": 67576.52,
"Intéret Payé": 498.92,
"Intérêt Cumulé": 12391.57,
No: 15,
"Principal Payé": 7262.08
},{
"Balance Départ": 67576.52,
"Balance Fin": 60266.03,
"Intéret Payé": 450.51,
"Intérêt Cumulé": 12842.08,
No: 16,
"Principal Payé": 7310.49
},{
"Balance Départ": 60266.03,
"Balance Fin": 52906.8,
"Intéret Payé": 401.77,
"Intérêt Cumulé": 13243.86,
No: 17,
"Principal Payé": 7359.23
},{
"Balance Départ": 52906.8,
"Balance Fin": 45498.51,
"Intéret Payé": 352.71,
"Intérêt Cumulé": 13596.57,
No: 18,
"Principal Payé": 7408.29
},{
"Balance Départ": 45498.51,
"Balance Fin": 38040.83,
"Intéret Payé": 303.32,
"Intérêt Cumulé": 13899.89,
No: 19,
"Principal Payé": 7457.68
},{
"Balance Départ": 38040.83,
"Balance Fin": 30533.43,
"Intéret Payé": 253.61,
"Intérêt Cumulé": 14153.5,
No: 20,
"Principal Payé": 7507.4
},{
"Balance Départ": 30533.43,
"Balance Fin": 22975.98,
"Intéret Payé": 203.56,
"Intérêt Cumulé": 14357.05,
No: 21,
"Principal Payé": 7557.45
},{
"Balance Départ": 22975.98,
"Balance Fin": 15368.15,
"Intéret Payé": 153.17,
"Intérêt Cumulé": 14510.23,
No: 22,
"Principal Payé": 7607.83
},{
"Balance Départ": 15368.15,
"Balance Fin": 7709.61,
"Intéret Payé": 102.45,
"Intérêt Cumulé": 14612.68,
No: 23,
"Principal Payé": 7658.55
},{
"Balance Départ": 7709.61,
"Balance Fin": -0,
"Intéret Payé": 51.4,
"Intérêt Cumulé": 14664.08,
No: 24,
"Principal Payé": 7709.61
}];