var Gdz = Gdz || {};

$(document).ready(function () {
	'use strict';

	Gdz.Global.slideToggle();
	Gdz.Global.checkboxFilter();
	Gdz.Global.init();

	$( '.checkall' ).find( 'input' ).toggle(function(){
		$( 'input:checkbox' ).attr( 'checked', 'checked' );
		$(this).val( 'uncheck all' );
	},function(){
		$( 'input:checkbox' ).removeAttr( 'checked' ).removeClass( 'selected' );
		$(this).val( 'check all' );
	});

	$( '#button' ).on( 'click', function(){
		Gdz.Global.run();
	});

});

