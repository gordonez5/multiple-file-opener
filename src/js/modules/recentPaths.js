// This module deals with the rendering of the list and reordering of items
var recentPaths = (function( $ ){

	'use strict';

	//cache DOM
	var template = $( '#recentPaths-template' ).html();
	var $recentPathsList = $( '#recentPathsList' );
	var $goButton = $( '#js-run' );
	var $folderInput = document.getElementById( 'folder' );

	// To auto-populate the array
	// var recentPathsArray = ['contact-us', 'about-us'];
	var recentPathsArray = [];

	// bind events
	$recentPathsList.on( 'click', '[data-action="delete"]', deleteRecentPath );
	$goButton.on( 'click', addPathToArray );

	getSavedArray();


	function recentPathInput() {

		$( '.recent-paths' ).on('click', '.recent-path__data-row', function() {

			var $this = $(this),
				path = $this.find( '.recent-path__text' ).attr('data-path');

			$folderInput.value = path;

		});

	}

	recentPathInput();


	// Function to delete a path from the 'criteria' array and render in the UI list
	function deleteRecentPath( event ) {

		var i;

		if ( typeof event === "number" ) {

			i = event;

		} else {

			var $remove = $( event.target ).closest( '.recent-path__row' );
			i = $recentPathsList.find( '.recent-path__row' ).index( $remove );

		}

		// Remove deleted item from recentPathsArray
		recentPathsArray.splice(i, 1);

		// render the UI list
		_recentPathRender();

	}

	// Repopulate criteria list from localstorage - if available
	function getSavedArray() {

		var storageCount = localStorage.length;

		if ( storageCount && localStorage.getItem( 'recentPathsArray' ) !== null ) {

			var str = localStorage.getItem( 'recentPathsArray' );
			recentPathsArray = str.split( ',' );

			_recentPathRender();

		}

	}


	function addPathToArray() {

		var path = $folderInput.value;
		console.log( 'Path to be added to array: ', path );

		if ( recentPathsArray.indexOf( path ) > -1 ) {
			console.log( 'this item already exists in recentPathsArray' );
		} else {
			recentPathsArray.unshift( path );
			saveArray();
			_recentPathRender();
		}

	}


	function _recreateArray() {

		var $items = $list.find( '.sub-criterion__text' );

		// Clone the old criteria array
		var oldCriteriaArray = criteriaArray;
		var txt;
		var $el;
		var number = $( '#acceptanceCriteriaHeading' ).find( '.criterion__number' ).html();

		// empty the criteriaArray array
		criteriaArray = [];

		// console.log( 'oldCriteriaArray: ', oldCriteriaArray );
		$items.each( function( index ) {

			var i = index + 1;

			var $this = $(this);
			txt = $this.html();
			$el = $this.prev( '.sub-criterion__number' );
			$el.html( number + '.' + i );

			criteriaArray.push( txt );

		});

		// panelObj.criteriaArray = criteriaArray;
		// console.log( 'criteriaArray: ', criteriaArray );

	}


	// Save the array to localStorage
	function saveArray() {

		localStorage.setItem( 'recentPathsArray', recentPathsArray );

	}




	// Render list of recent paths from localStorage
	// Uses Mustache template
	function _recentPathRender() {

		$recentPathsList.html(Mustache.render(template, {recentPaths: recentPathsArray}));

	}



	return {
		recentPathRender: _recentPathRender,
		recentPathInput: recentPathInput
	};



})( jQuery );