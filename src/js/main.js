$(document).ready(function () {

	'use strict';

	Gdz.Global.slideToggle();
	Gdz.Checkboxes.checkboxFilter();
	Gdz.Checkboxes.checkAll();
	Gdz.Global.init();
	Gdz.Panel.init();
	Gdz.Tabs.init();

	$( '#js-run' ).on( 'click', function() {
		Gdz.Global.run();
	});

	$( '#js-next' ).on( 'click', function() {
		$( '[data-tab="tab-code"]' ).click();
		$( '#folder' ).focus();
	});

});

