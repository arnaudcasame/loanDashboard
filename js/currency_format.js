/*************************************************
***Cette fonction permet d'arrondir les nombres **
***décimaux. Il prend en paramètres 1) le nombre**
***à arrondir, 2) le nombre de chiffre après la***
***la virgule. coded by Arnaud Casamé		   ***
*************************************************/
function arrondi(t, n){
	var dec = Math.pow(10,n);
	var result = Math.round(dec*t)/dec;
	
	return result;
}

// Cette function permet de convertir un nombre en un format monétaire quelconque
// en ajoutant une virgule, un point ou un espace à interval de 3 chiffres
function conversion_nombre(numbre, format){
	if(isNaN(numbre)){
		return numbre;
	}else{
		//Conversion du type FLOAT de la variable numbre en  STRING
		var text = numbre.toString();

		// Définition des variables
		var tablo_renv_1;
		var tablo_virgule;
		var tablo_renv_2;
		var chaine_finale = '';
		var tablo;
		

		if(text.indexOf('.') == -1){ // Si le nombre n'est pas de décimal
	
			// Etape 1: Transformation en tableau du nombre
			tablo = text.split('');
			//console.log('Transformation en tableau :' + tablo);
			
			// Etape 2: On renverse l'ordre du tableau
			tablo_renv_1 = tablo.reverse();
			//console.log('renversement du tableau :' + tablo_renv_1);

			// Etape 3: Cette boucle ajoute une virgule à chaque 3 éléments du tableau
			for(var i = 3; i<text.length; i+=3){
				tablo_renv_1[i] += format;
			}
			//console.log('Ajout virgule au tableau :' + tablo_renv_1);

			// Etape 4: On renverse le tableau renversé encore une fois
			tablo_renv_2 = tablo_renv_1.reverse();

			// Etape 5: On transforme le tableau en chaine de caractère
			chaine_finale = tablo_renv_2.join('');

			// Etape 6: On ajoute le .00 au nombre formaté
			chaine_finale = chaine_finale+'.00';
			
			return chaine_finale;
		}else{
			var decim = text.substring(text.indexOf('.'), text.length);
			var text = text.substring(0, text.indexOf('.'));					

			// Etape 1: Transformation en tableau du nombre
			tablo = text.split('');
			//console.log('Transformation en tableau :' + tablo);
			
			// Etape 2: On renverse l'ordre du tableau
			tablo_renv_1 = tablo.reverse();
			//console.log('renversement du tableau :' + tablo_renv_1);

			// Etape 3: Cette boucle ajoute une virgule à chaque 3 éléments du tableau
			for(var i = 3; i<text.length; i+=3){
				tablo_renv_1[i]  += format;
			}
			//console.log('Ajout virgule au tableau :' + tablo_renv_1);

			// Etape 4: On renverse le tableau renversé encore une fois
			tablo_renv_2 = tablo_renv_1.reverse();
			//console.log('Tableau renversé again : ' + tablo_renv_2);

			// Etape 5: On transforme le tableau en chaine de caractère
			chaine_finale = tablo_renv_2.join('');
			//console.log('chaine finale : ' + tablo_renv_1);

			// Etape 6: On ajoute le décimal au nombre formaté
			chaine_finale = chaine_finale+decim;
			
			return chaine_finale;
		}
	}
}