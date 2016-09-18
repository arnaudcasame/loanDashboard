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
					cel.textContent = (typeof data[i][y] === 'number') ? conversion_nombre(arrondi(data[i][y], 2), ' ') : data[i][y];

					ligne.appendChild(cel);
					tabLignes.push(ligne);
				}else{
					if(j > Object.keys(data[i]).length){
						j=0;
					}
					var cel = document.createElement('td');
					cel.textContent = (typeof data[i][y] === 'number') ? conversion_nombre(arrondi(data[i][y], 2), ' ') : data[i][y];
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