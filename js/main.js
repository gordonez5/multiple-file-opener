var Gdz = Gdz || {};

Gdz.Global = {

	// Slideable content function.
	slideToggle: function() {

		// Unbind the slide toggle click
		$( '.header' ).unbind('click');

		// Each expandable class, initially set vars for header and content objects.
		$( '.expandable' ).each(function () {
			var $this = $( this ),
				$header = $this.find( '.header' ),
				$content = $this.find( '.content' );

			// When the header is clicked toggle the content and change the active class
			$header.on('click', function ( e ) {
				e.preventDefault();
				$content.slideToggle( 'slow' );
				$this.toggleClass( 'active' );
			});
		});

	},

	checkboxFilter: function() {
		'use strict';

		// $('.results > li').hide();

		var filters = $('.filters').find('input');
		// console.log('filters length: ' + filters.length);
		var items = $('.sites').find('input');

		filters.on('change', function () {
			// console.log('clicked');
			var checkedFilters = $('.filters').find('input:checked');
			// console.log('checkedFilters length: ' + checkedFilters.length);
			checkedFilters.each(function () {
				var $this = $(this);
				var rel = $this.attr('rel');
				// console.log('rel: ' + rel);
				var match = $('.sites input.' + rel);
				items.attr( 'checked', false );
				// console.log(match);
				$('.sites .' + rel).addClass('selected');
				$('.sites').find('.selected').attr( 'checked', true );
			});
		});
	},

	createCommand: function(gitpath,folder) {
		'use strict';

		// var gitfolder = 'alpine-git';
		var cd = 'cd /usr/local/alpine/' + gitpath + '/alpine-static/content/';
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
			command += cd + sitearr[x] + folder + open;
		}
		command += end;

		$('#code').val(command).select();
	}

}


$(document).ready(function () {
	'use strict';

	Gdz.Global.slideToggle();
	Gdz.Global.checkboxFilter();

	$('.checkall input').toggle(function(){
		$('input:checkbox').attr('checked','checked');
		$(this).val('uncheck all');
	},function(){
		$('input:checkbox').removeAttr('checked').removeClass('selected');
		$(this).val('check all');
	});

	$( '#button' ).on('click', function(){
		var gitpath = $( '#gitpath' ).val();
		var folder = $( '#folder' ).val();
		Gdz.Global.createCommand( gitpath, folder );
	});

});

