Gdz.Panel = {

	init: function() {

		'use strict';

		var $document = $(document),
			$panel = $('.off-canvas'),
			isPanelActive = false;

			console.log($panel);

		// Add / remove 'off-canvas-active' class to trigger slide-in navigation
		$document.on('click', '#js-info, #js-close-nav', function(e) {

			e.preventDefault();

			if (isPanelActive === false) {
				$panel.addClass('off-canvas-active');
				isPanelActive = true;
				// console.log(isPanelActive);
			} else{
				$panel.removeClass('off-canvas-active');
				isPanelActive = false;
				// console.log(isPanelActive);
			}

		});

		// Trigger panel close on click of element outside of nav
		// $document.on('click', function(event) {
		// 	if (!$(event.target).closest('#js-off-canvas-trigger, .off-canvas').length) {
		// 		if (isPanelActive === true) {
		// 			$panel.removeClass('off-canvas-active');
		// 		}
		// 	}
		// });

	}

};