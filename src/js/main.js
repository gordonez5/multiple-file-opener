$(document).ready(function () {
	'use strict';

	Gdz.Global.slideToggle();
	Gdz.Global.checkboxFilter();
	Gdz.Global.checkAll();
	Gdz.Global.init();

	$( '#button' ).on( 'click', function(){
		Gdz.Global.run();
	});

});

