Gdz.Global = {

	consoleCheck: function(){

		'use strict';

		if (typeof console == 'undefined') {
			window.console = {
				log: function () {}
			};
		}
	},

	// Slideable content function.
	slideToggle: function() {

		'use strict';

		// Unbind the slide toggle click
		$( '.header' ).unbind('click');

		// Each expandable class, initially set vars for header and content objects.
		$( '.expandable' ).each(function () {
			var $this = $( this ),
				$header = $this.find( '.header' ),
				$content = $this.find( '.content' );

			// When the header is clicked toggle the content and change the active class
			$header.on( 'click', function ( e ) {
				e.preventDefault();
				$content.slideToggle( 400 );
				$this.toggleClass( 'active' );
			});
		});

	},

	checkboxFilter: function() {

		'use strict';

		// $('.results > li').hide();

		var filters = $( '.filters' ).find( 'input' );
		// console.log('filters length: ' + filters.length);
		var items = $( '.sites' ).find( 'input' );

		filters.on( 'change', function () {
			// console.log('clicked');
			var checkedFilters = $( '.filters' ).find( 'input:checked' );
			// console.log('checkedFilters length: ' + checkedFilters.length);
			checkedFilters.each(function () {
				var $this = $(this);
				var rel = $this.attr( 'rel' );
				// console.log('rel: ' + rel);
				// var match = $('.sites input.' + rel);
				items.attr( 'checked', false );
				// console.log(match);
				$( '.sites .' + rel).addClass( 'selected' );
				$( '.sites' ).find( '.selected' ).attr( 'checked', true );
			});
		});
	},

	checkAll: function() {

		'use strict';

		var $btn = $( '#js-checkall' ),
			$chks = $( '.container--checks' ).find( 'input:checkbox' ),
			allChecked = false;

		$( '#js-checkall' ).on( 'click', function(){

			var checked = !$(this).data('checked');
			$chks.prop('checked', checked);
			$btn.val(checked ? 'uncheck all' : 'check all' );
			$btn.data('checked', checked);

			// if ( allChecked ) {

			// 	$btn.val( 'uncheck all' );

			// } else {

			// 	$btn.val( 'check all' );
			// 	allChecked = true;

			// }

		});


		console.log($chks.length);



		// 	$( 'input:checkbox' ).attr( 'checked', 'checked' );
		// 	$(this).val( 'uncheck all' );
		// },function(){
		// 	$( 'input:checkbox' ).removeAttr( 'checked' ).removeClass( 'selected' );
		// 	$(this).val( 'check all' );
		// });

	},

	// Creates a string from the options and selected items.
	// Outputs command to textarea and pre-selects it for copying.
	createCommand: function( gitpath, folder, type, subl ) {

		'use strict';

		// var gitfolder = 'alpine-git';
		var cd = 'cd /usr/local/alpine/' + gitpath + '/alpine-static/content/';
		var open = '';

		if (subl === true) {
			open += ' && subl ';
		} else {
			open += ' && open -a "Sublime Text" ';
		}

		if (type == 'css') {
			open += 'cms.css && ';
		} else	{
			open += 'index.html && ';
		}


		// This is an alias which goes to my main code directory
		var end = 'alpine-git';
		var command = '';

		// checkbox functionality
		var checks = $( '.container--checks' ).find( '.sites' ).find( 'input:checked' );
		var sitearr = [];

		for (var i = 0; i < checks.length; i ++) {
			sitearr.push( checks[i].value.toString() );
		}

		// var sites = ['agent/52/', 'agent/70/', 'agent/71/', 'agent/78/', 'agent/81/', 'direct/52/', 'direct/70/', 'direct/71/', 'direct/78/', 'direct/79/', 'direct/81/'];

		for (var x = 0; x <= sitearr.length - 1; x++) {
			command += cd + sitearr[x] + folder + open;
		}
		command += end;

		$( '#code' ).val( command ).select();
	},

	isHtml: function() {

		'use strict';

		var fileType = $( '.container--radios' ).find( 'input[name=filetype]:checked' ).val();
		if ( fileType !== 'html' ) {
			return false;
		}
		return true;
	},

	hasSubl: function() {

		'use strict';

		var editor = $( '.container--radios' ).find( 'input[name=editor]:checked' ).val();
		if ( editor !== 'yes' ) {
			return false;
		}
		return true;
	},

	// Reads cookie - if it exists - and sets options. Falls back to defaults.
	getOptions: function() {

		'use strict';

		var hasConfig = Gdz.Cookies.checkCookie( 'mfo-config' ),
			gitpath,
			type,
			typeHtml = $( '#html' ),
			typeCss = $( '#css' ),
			subl,
			sublYes = $( '#subl-yes' ),
			sublNo = $( '#subl-no' );

		// Check if cookie already exists
		if ( hasConfig ) {

			var cookieVal = Gdz.Cookies.getCookieValue( 'mfo-config' ),
				cookieSplit = cookieVal.split( '|' );

			gitpath = cookieSplit[0];
			type = cookieSplit[1];
			subl = cookieSplit[2];

			// set gitpath to cookie's value
			$( '#gitpath' ).val( gitpath );


			if ( type == 'html' ) {
				typeHtml.attr( 'checked', 'checked' );
			} else if ( type == 'css' ) {
				typeCss.attr( 'checked', 'checked' );
			}


			if ( subl == 'true' ) {
				sublYes.attr( 'checked', 'checked' );
			} else {
				sublNo.attr( 'checked', 'checked' );
			}

		// No cookie set
		} else {
			typeHtml.attr( 'checked', 'checked' );
			sublYes.attr( 'checked', 'checked' );
		}

	},

	// Sets current options to a cookie
	setOptions: function( gitpath, type, subl ) {

		'use strict';

		Gdz.Cookies.setCookie( 'mfo-config', gitpath + '|' + type + '|' + subl, 90 );

	},

	// Runs the setOptions and createCommand methods
	run: function() {

		'use strict';

		var gitpath = $( '#gitpath' ).val(),
			folder = $( '#folder' ).val(),
			type,
			subl;

		if ( this.hasSubl() ) {
			subl = true;
		} else {
			subl = false;
		}

		if ( this.isHtml() ) {
			type = 'html';
		} else {
			type = 'css';
		}

		this.setOptions( gitpath, type, subl );
		this.createCommand( gitpath, folder, type, subl );

	},

	// Runs on page load
	init: function() {

		'use strict';

		this.getOptions();
		this.consoleCheck();
		Gdz.Cookies.noCookieMessage( '.footer__main' );

	}

};