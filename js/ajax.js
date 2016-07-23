var quotesJsonFileUrl = 'js/quotes.json';
var authorPlace = document.getElementById('author');
var quotePlace = document.getElementById('quote');
var quoteContain = document.getElementById('quotes');


function request(fileUrl){
		var xhr, data;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.open("GET", fileUrl);
		xhr.onreadystatechange = function(){
			if((xhr.readyState == 4) && (xhr.status == 200)){
				data = JSON.parse(xhr.responseText);
				if(data[0].hasOwnProperty('author')){
					treatQuotes(data);
				}
			}else if(xhr.readyState < 4){}
		};
		xhr.send(null);
}


request(quotesJsonFileUrl);

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