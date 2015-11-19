Gdz.Checkboxes = {

	checkboxFilter: function() {

		'use strict';

		// $('.results > li').hide();

		var filters = $( '.filters' ).find( 'input' );
		// console.log('filters length: ' + filters.length);
		var items = $( '.sites' ).find( 'input' );

		filters.on( 'change', function () {

			// get checked filters
			var checkedFilters = $( '.filters' ).find( 'input:checked' );
			console.log('checkedFilters length: ' + checkedFilters.length);

			// checkedFilters.each(function () {

				var $this = $(this);
				var rel = $this.attr( 'rel' );
				var name = $this.attr( 'name' );

				console.log('this: ' + $this);
				// console.log('rel: ' + rel);
				// console.log('name: ' + name);

				// items.attr( 'checked', false );
				var $match = $( '.sites .checks__input[data-' + name + '="' + rel + '"]');
				// console.log(match);

				if ( $this.is(':checked') ) {

					console.log( 'this is checked' );
					$match.addClass( 'selected' ).prop( 'checked', true );

				} else {

					console.log( 'this is not checked' );
					$match.removeClass( 'selected' ).prop( 'checked', false );

				};

				// $match.addClass( 'selected' );
				// $( '.sites' ).find( '.selected' ).attr( 'checked', true );
			// });

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

	}

};