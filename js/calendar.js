(function(){

	//defining and assigning variables
	var today = new Date(),
	jour = today.getDate(),
	mois = today.getMonth() + 1,
	jrSem = today.getDay(),
	annee = today.getFullYear(),
	moislong = 0;

	// Caching the DOM
	var cellules = document.querySelectorAll('.calendar-cell');
	var afficheMois = document.querySelector('#mois');

	// Defining functions
	function getLongMois(){
		if(mois === 2){
			moislong = 28;
		}else if(mois === 1 || mois === 3 || mois === 5 || mois === 7 || mois === 8 || mois === 10 || mois === 12){
			moislong = 31;
		}else{
			moislong = 30;
		}
	}

	function get1stDay(){
		for (var i = jour-1; i > 0; i--) {
			if(jrSem === -1){
				jrSem = 6;
			}
			
			jrSem--;
		}
		return jrSem;
	}

	function assDateToDays(){
		var _temp = 1;
		var ref = get1stDay();
		var len = cellules.length;
		for (var i = 0; i < len; i++) {
			if(i >= ref && i < moislong + ref){
				cellules[i].innerText = _temp;
				cellules[i].textContent = _temp;
				jour === _temp ? cellules[i].className = 'today' : '';
				_temp++;
			}else{
				cellules[i].innerText = '';
				cellules[i].textContent = '';
			}
		}
	}

	function convMonth(monthNum){
		 switch (monthNum) {
	        case 1:
	            return "Janvier";
	            break;
	        case 2:
	            return "Fevrier";
	            break;
	        case 3:
	            return "Mars";
	            break;
	        case 4:
	            return "Avril";
	            break;
	        case 5:
	            return "Mai";
	            break;
	        case 6:
	            return "Juin";
	            break;
	        case 7:
	            return "Juillet";
	            break;
	        case 8:
	            return "Aout";
	            break;
	        case 9:
	            return "Septembre";
	            break;
	        case 10:
	            return "Octobre";
	            break;
	        case 11:
	            return "Novembre";
	            break;
	        default:
	            return "Decembre";
	    }
	}

	function init(){
		afficheMois.innerText = convMonth(mois);
		afficheMois.textContent = convMonth(mois);

		getLongMois();
		assDateToDays();
	}

	// initializing and displaying the calendar
	init();

})();