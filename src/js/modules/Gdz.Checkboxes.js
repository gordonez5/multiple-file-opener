/* global console */
Gdz.Checkboxes = {

	checkboxFilter: function() {

		'use strict';

		// $('.results > li').hide();

		var filters = $( '.filters' ).find( 'input' );
		// console.log('filters length: ' + filters.length);
		var items = $( '.sites' ).find( 'input' );

		filters.on( 'change', function () {

			// console.log('clicked');

			// get checked filters
			var checkedFilters = $( '.filters' ).find( 'input:checked' );

			console.log('checkedFilters length: ' + checkedFilters.length);

			checkedFilters.each(function () {

				console.log('checkedFilters');

				var $this = $(this);
				var rel = $this.attr( 'rel' );

				console.log('rel: ' + rel);

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