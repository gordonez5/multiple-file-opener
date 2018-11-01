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


	// Add sortable functionality to the list
	function _addSortable() {

		var list = document.getElementById( 'recentPathsList' );
		var sortable = Sortable.create( list, {
			handle: '.recent-path__handle',
			animation: 150,
			onSort: function ( evt ) {
				_recreateArray();
			}
		});

	}



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

		if ( typeof event === 'number' ) {

			i = event;

		} else {

			var $remove = $( event.target ).closest( '.recent-path__row' );
			i = $recentPathsList.find( '.recent-path__row' ).index( $remove );

		}

		// Remove deleted item from recentPathsArray
		recentPathsArray.splice(i, 1);

		_saveArray();

		// render the UI list
		recentPathRender();

	}

	// Repopulate criteria list from localstorage - if available
	function getSavedArray() {

		var storageCount = localStorage.length;

		if ( storageCount && localStorage.getItem( 'recentPathsArray' ) !== null ) {

			var str = localStorage.getItem( 'recentPathsArray' );
			recentPathsArray = str.split( ',' );

			recentPathRender();

		}

	}


	function addPathToArray() {

		var path = $folderInput.value;
		console.log( 'Path to be added to array: ', path );

		if ( recentPathsArray.indexOf( path ) > -1 ) {
			console.log( 'this item already exists in recentPathsArray' );
		} else {
			recentPathsArray.unshift( path );
			_saveArray();
			recentPathRender();
		}

	}


	// Save the array to localStorage
	function _saveArray() {

		localStorage.setItem( 'recentPathsArray', recentPathsArray );

	}


	function _recreateArray() {

		var txt;
		// var $el;
		var $items = $recentPathsList.find( '.recent-path__text' );

		// Clone the old criteria array
		var newArray = recentPathsArray;
		// var number = criterionPanelObject.header.acNumber;

		// empty the subCriteriaArray array
		recentPathsArray = [];

		// Loop through existing list items
		$items.each( function( index ) {

			var i = index + 1;

			var $this = $(this);
			txt = $this.html();
			// $el = $this.prev( '.sub-criterion__number' );
			// $el.html( number + '.' + i );

			recentPathsArray.push( txt );

		});

		_saveArray();

	}


	// Render list of recent paths from localStorage
	// Uses Mustache template
	function recentPathRender() {

		$recentPathsList.html(Mustache.render(template, {recentPaths: recentPathsArray}));
		_addSortable();

	}



	return {
		recentPathRender: recentPathRender,
		recentPathInput: recentPathInput
	};



})( jQuery );