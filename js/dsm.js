var nono = (function(){

	var tags = /\b(div|aside|section|article|span|a|ul|li|ol|header|footer|h1|h2|h3|h4|h5|h6|img|p|button|input|select|label|table|theader|tbody|td|tr)\b/;
	var attributes = /\b(color|background-color|font-size)\b/;
	var recup = null;

	function selection(arg){
		if(typeof arg === 'string'){
			if(arg[0] === '.'){
				arg = arg.substr(1);
				recup = document.getElementsByClassName(arg);
				return this;
			}else if(arg[0] === '#'){
				arg = arg.substr(1);
				recup = document.getElementById(arg);
				return this;
			}else if(tags.test(arg)){
				recup = document.getElementsByTagName(arg);
				return this; 
			}else{
				return undefined;
			}
		}
	}

	function style(attr, prop){
		if(attributes.test(attr)){
			if(attr === 'color'){
				recup.style.color = prop;
				return this;
			}else if(attr === 'background-color'){
				recup.style.backgroundColor = prop;
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

	function createjs(tag){
		if(typeof tag === 'string'){
			if(tags.test(tag)){
				recup = document.createElement(tag);
				return recup;
			}else{
				return undefined;
			}
		}
	}

	return{
		select : selection,
		css : style,
		createjs : createjs
	};
})();