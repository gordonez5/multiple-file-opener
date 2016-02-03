Gdz.Checkboxes = {

	checkboxFilter: function() {

		'use strict';

		var filters = $( '.filters' ).find( 'input' );
		var items = $( '.sites' ).find( 'input' );

		filters.on( 'change', function () {

			// get checked filters
			var checkedFilters = $( '.filters' ).find( 'input:checked' );

			// console.log('checkedFilters length: ' + checkedFilters.length);

			var $this = $(this);
			var val = $this.attr( 'value' );
			var rel = $this.attr( 'rel' );
			var name = $this.attr( 'name' );

			// console.log('val: ' + val);
			// console.log('rel: ' + rel);
			// console.log('name: ' + name);

			var $match = $( '.sites .checks__input[data-' + name + '="' + rel + '"]');

			if ( $this.is(':checked') ) {

				// console.log( 'this is checked' );
				$match.addClass( 'selected' ).prop( 'checked', true );

			} else {

				// console.log( 'this is not checked' );
				$match.removeClass( 'selected' ).prop( 'checked', false );

			}

		});
	},

	checkAll: function() {

		'use strict';

		var $btn = $( '#js-checkall' ),
			$chks = $( '.container--checks' ).find( 'input:checkbox' ),
			allChecked = false;

		$( '#js-checkall' ).on( 'click', function(){

			var checked = !$btn.data('checked');
			$chks.prop('checked', checked);
			$btn.text(checked ? 'uncheck all' : 'check all' );
			$btn.data('checked', checked);

		});


		// console.log($chks.length);

	}

};