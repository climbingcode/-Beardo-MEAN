$(document).on('ready', function() {
 	block = $('#barber-preloader div');
 	block.addClass("move-down");
 	red = block.first().clone();
 	white = block.last().clone();	
 	$('#barber-preloader').append(red);
});