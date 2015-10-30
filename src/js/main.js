$(document).ready(function () {
	'use strict';

	Gdz.Global.slideToggle();
	Gdz.Global.checkboxFilter();
	Gdz.Global.checkAll();
	Gdz.Global.init();
	Gdz.Panel.init();
	Gdz.Tabs.init();

	$( '#js-run' ).on( 'click', function(){
		Gdz.Global.run();
	});

});

