var quotesJsonFileUrl = 'js/quotes.json';
var authorPlace = document.getElementById('author');
var quotePlace = document.getElementById('quote');
var quoteContain = document.getElementById('quotes');
var currlayer = 'http://apilayer.net/api/live?access_key=a3bc71915116d84f1765f34ac76a82b7';
var currlayer2 = 'js/currencylayer.json';
var gourde = document.getElementById('gourde');
var euro = document.getElementById('euro');
var canada = document.getElementById('canada');


function request(fileUrl){
		var xhr, data;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.open("GET", fileUrl);
		xhr.onreadystatechange = function(){
				//console.log(xhr.status);
			if((xhr.readyState == 4) && (xhr.status == 200)){
				data = JSON.parse(xhr.responseText);
				//console.log(typeof data);
				if(Array.isArray(data)){
					if(data[0].hasOwnProperty('author')){
						treatQuotes(data);
					}
				}else if(typeof data === 'object'){
					//console.log(data);
					treatCurrency(data);
				}
			}else if(xhr.readyState < 4){}
		};
		xhr.send(null);
}


request(quotesJsonFileUrl);
request(currlayer2);

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
			quotePlace.innerText = '"'+data[tirage]['quote']+'"';
			quotePlace.textContent = '"'+data[tirage]['quote']+'"';
		}

		quoteContain.onmouseout = function(){
			quotePlace.innerText = '"'+text+'"';
			quotePlace.textContent = '"'+text+'"';
		}
	}
	setInterval(repeat, 10000);
	repeat();
}

function treatCurrency(data){
	gourde.innerText = arrondi(data.quotes.USDHTG, 2)+' HTG';
	euro.innerText = arrondi(data.quotes.USDEUR, 2);
	canada.innerText = arrondi(data.quotes.USDCAD, 2)+' CAD';
	gourde.textContent = arrondi(data.quotes.USDHTG, 2)+' HTG';
	euro.textContent = arrondi(data.quotes.USDEUR, 2);
	canada.textContent = arrondi(data.quotes.USDCAD, 2)+' CAD';
	var jourdhui = new Date(data.timestamp * 1000);
	console.log(jourdhui.toString());
}