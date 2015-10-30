// This script is to create a simple, flexible, tabbed content component to replace the one from jQuery UI.
// It supports the ability to open a specific tab on page load by adding a hash to the url:
//		eg. http://www.crystalski.co.uk/#open-tab-resortFinder
//		[The corresponding tab should have the data-tab="tab-resortFinder" attribute]

Gdz.Tabs = {

	// Check if hash links to specific tab
	// Switch to this tab
	checkHash: function() {
		'use strict';

		var hasHash = Tui.Global.hasHash();

		// There is a hash in the url
		if ( hasHash === true ) {

			var url = Tui.Global.parseURI(),
				originalhash = url.hash,

				// altering hash stops page jumping to tabs on load
				hash = originalhash.replace('open-tab', 'tab');

			// activate appropriate tab based on hash value
			$( '[data-tab="' + hash + '"]').trigger('click');

			// Scroll to top of tab container
			// not required with the hash altering above.
			// Tui.Global.scrollToAnchor('#gdz-tabs-container');

		// No hash in the url, let's get out of here.
		} else {

			console.log( 'no hash' );
			return false;

		}

	},

	make: function() {

		'use strict';

		$( '.gdz-tabs__tab' ).on( 'click', function( e ) {

			e.preventDefault();

			var $this = $( this ),
				tab_id = $this.attr('data-tab'),
				$parent = $this.parent().parent();

			$parent.find( '.gdz-tabs__tab' ).removeClass( 'active' );
			$parent.find( '.gdz-tabs__content' ).removeClass( 'active' );

			$( this ).addClass( 'active' );
			$( '#' + tab_id ).addClass( 'active' );
		});

	},

	init: function() {

		'use strict';

		this.make();
		// this.checkHash();

	}

};