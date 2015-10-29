Gdz.Panel = {

	init: function() {
		'use strict';

		var $document = $(document),
			$subNav = $('.sub-nav'),
			isSubNavActive = false;

		// Add / remove 'sub-nav-active' class to trigger slide-in navigation
		$document.on('click', '#js-sub-nav-trigger, #js-close-nav', function(e) {

			e.preventDefault();

			if (isSubNavActive === false) {
				$subNav.addClass('sub-nav-active');
				isSubNavActive = true;
			} else{
				$subNav.removeClass('sub-nav-active');
				isSubNavActive = false;
			}

		});

		// Trigger nav close on click of element outside of nav
		$document.on('click', function(event) {
			if (!$(event.target).closest('#js-sub-nav-trigger, .sub-nav').length) {
				if (isSubNavActive === true) {
					$subNav.removeClass('sub-nav-active');
				}
			}
		});

	}

};