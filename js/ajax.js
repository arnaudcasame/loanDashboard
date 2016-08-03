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
	setInterval(repeat, 10000);
	repeat();
}

function treatCurrency(data){
	gourde.innerText = arrondi(data.quotes.USDHTG, 2)+' HTG';
	euro.innerHTML = arrondi(data.quotes.USDEUR, 2)+ " <span><i class='fa fa-euro'></i></span>";
	canada.innerText = arrondi(data.quotes.USDCAD, 2)+' CAD';
	gourde.textContent = arrondi(data.quotes.USDHTG, 2)+' HTG';
	//euro.textContent = arrondi(data.quotes.USDEUR, 2);
	canada.textContent = arrondi(data.quotes.USDCAD, 2)+' CAD';
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
				terme.innerText = expression[n].innerHTML;
				terme.textContent = expression[n].innerHTML;
				definition.innerText = data[0][expression[n].innerHTML];
				definition.textContent = data[0][expression[n].innerHTML];
				search.value = '';
				searchResult.innerHTML = '';
			};
		}
	};

	

}