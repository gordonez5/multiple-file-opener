Gdz.Panel = {

	init: function() {

		'use strict';

		var $document = $(document),
			$panel = $('.off-canvas'),
			isPanelActive = false;

		// Add / remove 'off-canvas-active' class to trigger slide-in navigation
		$document.on('click', '#js-config, #js-close-config', function(e) {

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

	}

};