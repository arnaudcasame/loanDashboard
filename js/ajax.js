/* Quotes */
var quotesJsonFileUrl = './json/quotes.json';
var authorPlace = document.getElementById('author');
var quotePlace = document.getElementById('quote');
var quoteContain = document.getElementById('quotes');

/* Currency layer */
var currlayer = 'http://apilayer.net/api/live?access_key=a3bc71915116d84f1765f34ac76a82b7';
var currlayer2 = './json/currencylayer.json';
var gourde = document.getElementById('gourde');
var euro = document.getElementById('euro');
var canada = document.getElementById('canada');

/* Search section */
var search = document.getElementById('searchin');
var searchResult = document.getElementById('search-result');
var definition = document.getElementById('definition');
var terme = document.getElementById('terme');
var termsUrl = 'json/finance.json';

/* Weather section */

if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(successCallBack, failureCallBack);
}else{
	alert('Votre navigateur web ne supporte pas la Geolocalisation');
}

function successCallBack(position){
	var longitude = position.coords.longitude;
	var latitude = position.coords.latitude;

	request(weatherUrl+'?lat='+latitude+'&lon='+longitude+'&appid=8538a85ec288e688ab0baab550784a50', treatWeather);	
}

function failureCallBack(){
	request(weatherLocalUrl, treatWeather);
	alert('Your browser doesn\'t supported Geolocalisation');
}

var picture = document.getElementById('weatherlogo');
var temperatu = document.getElementById('temperature');
var endroit = document.getElementById('endroit');
var description = document.getElementById('description');
var weatherLocalUrl = 'json/weather.json';
var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';

function request(dataUrl, treats){
		var xhr, data;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.open("GET", dataUrl);
		xhr.onreadystatechange = function(){
			if((xhr.readyState == 4) && (xhr.status == 200)){
				data = JSON.parse(xhr.responseText);
				treats(data);
			}else if(xhr.readyState < 4){}
		};
		xhr.send(null);
}

request(quotesJsonFileUrl, treatQuotes);
request(currlayer2, treatCurrency);
request(termsUrl, treatWords);


function treatQuotes(data){
	var len = data.length;	
	function repeat(){
		var tirage = Math.floor(Math.random() * ((len-1) - 0 + 1) + 0),
		text = data[tirage]['quote'],
		longChar = text.length;
		
		if(longChar > 50){
			text = text.substr(0, 47)+'...';
		}
		
		authorPlace.textContent = '- '+ data[tirage].author;
		authorPlace.innerText = '- '+ data[tirage].author;
		quotePlace.innerText = '"'+text+'"';
		quotePlace.textContent = '"'+text+'"';
		
		quoteContain.onmouseover = function(){
			quotePlace.innerText = '"'+data[tirage]['quote'] + '"';
			quotePlace.textContent = '"'+data[tirage]['quote'] + '"';
		};

		quoteContain.onmouseout = function(){
			quotePlace.innerText = '"'+text+'"';
			quotePlace.textContent = '"'+text+'"';
		};
	}
	setInterval(repeat, 10800000);
	repeat();
}

function treatCurrency(data){
	gourde.innerText = arrondi(data.quotes.USDHTG, 2);
	euro.innerText = arrondi(data.quotes.USDEUR, 2);
	canada.innerText = arrondi(data.quotes.USDCAD, 2);
	gourde.textContent = arrondi(data.quotes.USDHTG, 2);
	euro.textContent = arrondi(data.quotes.USDEUR, 2);
	canada.textContent = arrondi(data.quotes.USDCAD, 2);
	var jourdhui = new Date(data.timestamp * 1000);
	//console.log(jourdhui.toString());
}

function treatWords(data){
	var listMots = Object.keys(data[0]);
	search.onkeyup = function(){
		var list = [];
		for(var word in listMots){
			var cle = listMots[word];
			cle = cle.toLowerCase();
			if(cle.indexOf(this.value.toLowerCase()) !== -1){
				var listItem = "<li><a href='#section3' class='finance-expression'>"+listMots[word]+'</a></li>';
				//console.log(listItem);
				list.push(listItem);
			}
			
		}

		if(this.value === ''){
			list = [];
		}

		searchResult.innerHTML = '';
		for(var def in list){
			searchResult.innerHTML += list[def];
		}
		var expression = document.querySelectorAll('.finance-expression');
		//console.log(list);
		for(var i=0; i<expression.length; i++){
			expression[i].onclick = whichExpression(i, data);
		}

		function whichExpression(n, data){

			return function(){
				terme.innerHTML = expression[n].innerHTML;
				definition.innerHTML = data[0][expression[n].innerHTML];
				search.value = '';
				searchResult.innerHTML = '';
			};
		}
	};
}




function treatWeather(data){

	var weather = {
		"zone": data.name,
		"temp" : Math.floor(data.main.temp-273.15),
		"wind" : data.wind.speed,
		"status": data.weather[0].description,
		"picture": data.weather[0].icon,
		"humidity": data.main.humidity,
		"min_temp": data.main.temp_min,
		"max_temp": data.main.temp_max,
		"sunr" : data.sys.sunrise,
		"heure" : data.dt,
		"suns" : data.sys.sunset
	};

	picture.src ='weather/'+weather.picture+'.png';
	//heure.innerHTML = (new Date(weather.heure * 1000)).toGMTString();
	endroit.innerHTML = 'Commune : '+weather.zone;
	description.innerHTML = 'Description : '+weather.status;
	//vent.innerHTML = weather.wind+' mph';
	//humidite.innerHTML = weather.humidity+' %';
	//liste[4].innerHTML = (new Date(weather.sunr * 1000)).toUTCString();
	//liste[5].innerHTML = (new Date(weather.suns * 1000)).toGMTString();
	temperatu.innerHTML = 'Temperature : '+weather.temp+' degrée celcius';
}