$(document).ready(function() {

	var block = $('#barber-preloader div');

	function addDiv() {
		for (var i = 0; i < 20; i++) {
			$('#barber-preloader').append("<div></div>");	
		}
		$('#barber-preloader div').animate({
 			'top': "-=150%"
 		}, 8000, 'linear');
	}

	addDiv();

 	setInterval(function() {
 		for (var i = 0; i < 20; i++) {
 			$('#barber-preloader div').first().remove();
 		}
		addDiv()
	}, 7400);
});
