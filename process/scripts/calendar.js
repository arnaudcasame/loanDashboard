var kronos = (function(){

	//defining and assigning variables
	var today = new Date(),
	jour = today.getDate(),
	mois = today.getMonth() + 1,
	annee = today.getFullYear();

	// Caching the DOM
	var cellules = document.querySelectorAll('.calendar-cell');
	var afficheMois = document.querySelector('#mois');
	var afficheAnnee = document.querySelector('#annee');

	// Defining functions
	function isBissextile(year){
		if(((year % 4) === 0 && (year % 100) !== 0) || (year % 400) === 0 ){
			return true;
		}
		return false;
	}

	function get1stDay(date){
		var jrSem = today.getDay();
		for (var i = date-1; i > 0; i--) {
			if(jrSem === -1){
				jrSem = 6;
			}
			jrSem--;
		}
		return jrSem;
	}

	function calendarData(){
		var current = false;
		var arr = [];
		var longMois = infoMonth(mois);
		var moisPrec = infoMonth(mois-1);
		var ref = get1stDay(jour);
		var len = cellules.length;
		var _temp = moisPrec.nbreJr - ref + 1;
		for (var i = 0; i < len; i++) {
			if(_temp > moisPrec.nbreJr && !current){
				_temp = 1;
				current = true;
			}else if(_temp > longMois.nbreJr && current){
				_temp = 1;
				current = false;
			}
			arr.push([_temp, current]);
			_temp++;
		};
		return arr;
	}

	function render(tableau){
		afficheMois.innerText = infoMonth(mois).fr;
		afficheMois.textContent = infoMonth(mois).fr;
		afficheAnnee.innerText = annee;
		afficheAnnee.textContent = annee;
		var len = tableau.length;
		for (var i = 0; i < len; i++) {
			cellules[i].innerText = tableau[i][0];
			cellules[i].textContent = tableau[i][0];
			!tableau[i][1] ? cellules[i].className = 'faded' : '';
			((jour == tableau[i][0]) && tableau[i][1]) ? cellules[i].className = 'today' : '';
		}
	}

	function infoDay(dayNum){
		switch (dayNum) {
	        case 1:
	            return {fr: "lundi", en:"monday", abren: "mon", abrfr: "lun"};
	            break;
	        case 2:
	            return {fr: "mardi", en:"tuesday", abren: "tue", abrfr: "mar"};
	            break;
	        case 3:
	            return {fr: "mercredi", en:"wednesday", abren: "wed", abrfr: "mer"};
	            break;
	        case 4:
	            return {fr: "jeudi", en:"thursday", abren: "thu", abrfr: "jeu"};
	            break;
	        case 5:
	            return {fr: "vendredi", en:"friday", abren: "fri", abrfr: "ven"};
	            break;
	        case 6:
	            return {fr: "samedi", en:"saturday", abren: "sat", abrfr: "sam"};
	            break;
	        default:
	            return {fr: "dimanche", en:"sunday", abren: "sun", abrfr: "dim"};
	    }
	}

	function infoMonth(monthNum){
		 switch (monthNum) {
	        case 1:
	            return {fr: "janvier", nbreJr : 31, en:"january", abren: "jan.", abrfr: "janv."};
	            break;
	        case 2:
	            return {fr: "février", nbreJr: isBissextile(annee) ? 29 : 28, en:"february", abren: "feb.", abrfr: "févr."};
	            break;
	        case 3:
	            return {fr: "mars", nbreJr : 31, en:"march", abren: "mar.", abrfr: "mars"};
	            break;
	        case 4:
	            return {fr: "avril", nbreJr : 30, en:"april", abren: "apr.", abrfr: "avr."};
	            break;
	        case 5:
	            return {fr: "mai", nbreJr : 31, en:"may", abren: "may", abrfr: "mai"};
	            break;
	        case 6:
	            return {fr: "juin", nbreJr : 30, en:"june", abren: "jun.", abrfr: "juin"};
	            break;
	        case 7:
	            return {fr: "juillet", nbreJr : 31, en:"july", abren: "jul.", abrfr: "juil."};
	            break;
	        case 8:
	            return {fr: "août", nbreJr : 31, en:"august", abren: "aug.", abrfr: "août"};
	            break;
	        case 9:
	            return {fr: "septembre", nbreJr : 30, en:"september", abren: "sept.", abrfr: "sept."};
	            break;
	        case 10:
	            return {fr: "octobre", nbreJr : 31, en:"october", abren: "oct.", abrfr: "oct."};
	            break;
	        case 11:
	            return {fr: "novembre", nbreJr : 30, en:"november", abren: "nov.", abrfr: "nov."};
	            break;
	        default:
	            return {fr: "décembre", nbreJr : 31, en:"december", abren: "dec.", abrfr: "déc."};
	    }
	}

	// rendering the calendar
	render(calendarData());

	return {
		infoMonth : infoMonth,
		infoDay : infoDay
	}

})();