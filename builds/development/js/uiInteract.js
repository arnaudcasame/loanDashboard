$(document).ready(function(){
	document.getElementById('_1').checked = false;
	document.getElementById('_2').checked = false;
	document.getElementById('_12').checked = true;
	var etiquettes = $('.label-text');
	var fields = $('#montant, #taux, #duree');
	fields.val('');
	
	fields.focus(function(){
		$(this).parent().children('.label-text').addClass('label-text-top');
	});

	fields.focusout(function() {
		if ($.trim($(this).val()).length == 0){
			$(this).parent().children('.label-text').removeClass('label-text-top');
		}
		/*
		$('div#formWrapper').removeClass('darken-bg');
		$('div.logo').removeClass('logo-active');
		*/
	});
	$('.popup').on('click', function(){
		$(this).fadeOut('slow');
	});
	$('.interet').on('mouseover', function(){
		$(this).find('table.popup').fadeIn('slow');
	});
});