var nono = (function(){

	var tags = /\b(?:div|aside|section|article|span|a|ul|li|ol|header|footer|h1|h2|h3|h4|h5|h6|img|p|button|input|select|label|table|thead|tbody|th|td|tr|body|caption)\b/;
	var attributes = /\b(?:color|background-color|font-size|text-decoration|border|font-style|width)\b/;
	var embeds = /\b(?:src|id|class|href)\b/;
	var recup = null;

	function selection(arg){
		if(typeof arg === 'string'){
			if(arg[0] === '.'){  // If the selection is by string of a specific class
				arg = arg.substr(1);
				recup = document.getElementsByClassName(arg);
				if(recup.length === 1){ // if there's only one element selected
					recup = recup[0];
				}else if(recup.length > 1){ // if there's multiple elements selected
					return recup;
				}
			}else if(arg[0] === '#'){ // If the selection is by string of an id
				arg = arg.substr(1);
				recup = document.getElementById(arg);
			}else if(tags.test(arg)){  // If the selection is by string of an html tag
				recup = document.getElementsByTagName(arg);
				if(recup.length === 1){  // if there's only one element selected
					recup = recup[0];
				}else if(recup.length > 1){  // if there's multiple elements selected
					return recup;
				}
			}else{
				return undefined;
			}

		}else if(typeof arg === 'object'){ // If the selection is a DOM object
			recup = arg;
		}
		return this;
	}

	function embed(attr, prop){
		if(embeds.test(attr)){
			if(attr === 'src'){
				recup.src = prop;
			}
		}if(embeds.test(attr)){
			if(attr === 'href'){
				recup.href = prop;
			}
		}
		return this;
	}

	function style(attr, prop){
		if(attributes.test(attr)){
			if(attr === 'color'){
				recup.style.color = prop;
				return this;
			}else if(attr === 'background-color'){
				recup.style.backgroundColor = prop;
				return this;
			}else if(attr === 'text-decoration'){
				recup.style.textDecoration = prop;
				return this;
			}else if(attr === 'font-style'){
				recup.style.fontStyle = prop;
				return this;
			}else if(attr === 'border'){
				recup.style.border = prop;
				return this;
			}else if(attr === 'width'){
				recup.style.width = prop;
				return this;
			}else if(attr === 'height'){
				recup.style.height = prop;
				return this;
			}else if(attr === 'font-size'){
				if(typeof prop === 'number'){
					recup.style.fontSize = prop+'px';
				}else if(typeof prop === 'string'){
					recup.style.fontSize = prop;
				}
				return this;
			}
		}
	}

	function create(tag){
		if(typeof tag === 'string'){
			if(tags.test(tag)){
				recup = document.createElement(tag);
				return recup;
			}else{
				return undefined;
			}
		}
	}

	function display(obj, msg){
		if(typeof obj === 'object'){
			obj.innerText = msg;
			obj.textContent = msg;
		}else{
			recup.innerText = arguments[0];
			recup.textContent = arguments[0];
		}
		return this;
	}

	function stick(){
		if(arguments.length === 1){
			document.body.appendChild(arguments[0]);
		}else if(arguments.length === 2){
			arguments[0].appendChild(arguments[1]);
		}
		return this;
	}

	return{
		select  : selection,
		css     : style,
		embed   : embed,
		create  : create,
		display : display,
		stickTo : stick
	};
})();