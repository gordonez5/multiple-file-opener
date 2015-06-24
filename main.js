function checkboxFilter() {
	// $('.results > li').hide();

	var filters = $('.filters').find('input');
	var checkedFilters = $('.filters').find('input:checked');
	// console.log(checkedFilters.length);
	var items = $('.sites').find('input');

	filters.on('change', function () {
		console.log('clicked');
		// items.attr( 'checked', false ).removeClass('selected');
		checkedFilters.each(function () {
			var $this = $(this);
			var rel = $this.attr('rel');
			console.log('rel: ' + rel);
			// match = $('.sites input.' + rel);
			// console.log(match);
			// $('.sites .' + rel).addClass('selected');
		});
	});
}

function createCommand(path) {
	'use strict';

	var gitfolder = 'alpine-git';
	var cd = 'cd /usr/local/alpine/' + gitfolder + '/alpine-static/content/';
	var open = ' && subl index.html && ';

	// This is an alias which goes to my main code directory
	var end = 'alpine-git';

	// checkbox functionality
	var checks = $( '.container--checks' ).find('.sites').find( 'input:checked' );
	var sitearr = [];

	for (var i = 0; i < checks.length; i ++) {
		sitearr.push(checks[i].value.toString());
	}

	// var sites = ['agent/52/', 'agent/70/', 'agent/71/', 'agent/78/', 'agent/81/', 'direct/52/', 'direct/70/', 'direct/71/', 'direct/78/', 'direct/79/', 'direct/81/'];

	var command = '';
	for (var x = 0; x <= sitearr.length - 1; x++) {
		command += cd + sitearr[x] + path + open;
	}
	command += end;

	$('#code').val(command);
}


$(document).ready(function () {

	checkboxFilter();

	$( '#button' ).on('click', function(){
		'use strict';

		var folder = $( '#folder' ).val();
		createCommand(folder);
	});

});

