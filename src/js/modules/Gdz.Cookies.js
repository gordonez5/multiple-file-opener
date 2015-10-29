Gdz.Cookies = {

	//	Checks if browser supports cookies. True if browser supports cookies, false if not.
	//	From: https://www.ailis.de/~k/
	supportsCookies: function() {
		'use strict';

		var cookieEnabled = navigator.cookieEnabled;

		// When cookieEnabled flag is present and false then cookies are disabled.
		// Thanks to IE we can't trust the value "true".
		if ( cookieEnabled === false ) {
			return false;
		}

		// Internet Explorer is lying to us. So we have to set a test cookie
		// in this browser (We also do it for strange browsers not supporting
		// the cookieEnabled flag). But we only do this when no cookies are
		// already set (because that would mean cookies are enabled)
		if ( !document.cookie && ( cookieEnabled === null || /*@cc_on!@*/false ) ) {

			// Try to set a test cookie. If not set then cookies are disabled
			document.cookie = 'testcookie=1';
			if ( !document.cookie ) {
				return false;
			}

			// Remove test cookie
			document.cookie = 'testcookie=; expires=' + new Date(0).toUTCString();
		}

		// Well, at least we couldn't find out if cookies are disabled, so we
		// assume they are enabled
		return true;
	},

	noCookieMessage: function( el ){
		'use strict';

		var supportsCookies = this.supportsCookies(),
			message = '<div class="news-messages error"><div class="content">';

		message += '<p>Your browser seems to have cookies disabled. Make sure cookies are enabled or try opening a new browser window.</p>';
		message += '<a class="external" target="_blank" href="/our-policies/privacy-policy/">Find out more information about cookies.</a>';
		message += '</div></div>';

		if (supportsCookies === true) {
			$( 'body' ).addClass( 'cookies' );
		} else {
			$( 'body' ).addClass( 'no-cookies' );
			$( el ).prepend( message );
		}
	},

	// Returns the value of a named cookie.
	getCookieValue: function( cname ) {
		'use strict';

		if ( document.cookie.length > 0 ) {
			var name = cname + '=',
				ca = document.cookie.split( ';' );

			for ( var i=0; i<ca.length; i++ ) {
				var c = ca[i];
				while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1 );
				if ( c.indexOf( name ) === 0 ) {
					return c.substring( name.length,c.length );
				}
			}
		}
		return '';
	},

	// Enter cookie name (as string) to test if it exists.
	checkCookie: function( cname ) {
		'use strict';

		var cookieName = this.getCookieValue(cname);

		if ( cookieName !== '' ) {
			return true;
		} else {
			return false;
		}
	},

	// Set (or reset) a cookie
	setCookie: function( cname, cvalue, exdays ) {
		'use strict';

		var supportsCookies = this.supportsCookies();
		if ( supportsCookies === true ) {
			if ( exdays !== undefined ) {
				var d = new Date();
				d.setTime( d.getTime() + ( exdays*24*60*60*1000 ) );
				var expires = 'expires='+d.toUTCString();
				document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
				return true;
			} else {
				document.cookie = cname + '=' + cvalue + '; path=/';
				return true;
			}
		}
	},

	// Breaks down the page URI into it's constituent parts
	parseURI: function() {
		'use strict';

		var pageURI = window.location,
			href = pageURI.href || null,
			protocol = pageURI.protocol || null,
			hostname = pageURI.hostname || null,
			port = pageURI.port || null,
			pathname = pageURI.pathname || null,
			search = pageURI.search || null,
			hash = pageURI.hash || null,
			finalHash = null,
			finalSearch = null;

		// Check for hash
		if ( hash !== null ) {

			// ok, we have a hash but we need to sanitise it in case a query string was appended to the end
			var hashParts = hash.split( '?' );
			if ( hashParts.length > 1 ) {

				// Let's assume (for now) that the hash comprises the real hash plus a query string.
				// So now we split out the hash into it's parts
				finalHash = hashParts[0].substring( 1 );
				finalSearch = hashParts[1];
			} else {

				// Only one part to the hash, so we'll save this after stripping off the hash mark.
				finalHash = hash.substring( 1 );
				finalSearch = search;
			}

		// hash is null
		} else {

			// Remove question mark if query string is set
			if ( search !== null ) {
				finalSearch = search.substring( 1 );
			} else{
				finalSearch = search;
			}
		}

		var uriObj = {
			href: href,
			protocol: protocol,
			hostname: hostname,
			port: port,
			pathname: pathname,
			search: finalSearch,
			hash: finalHash
		};
		return uriObj;

	},

	// simply checks for query string and returns boolean
	hasQueryString: function() {
		'use strict';

		var url = this.parseURI();

		if ( url.search !== null ) {
			return true;
		} else {
			return false;
		}
	},

	// Listens for affiliate queries and sets a session cookie
	checkAffiliates: function( querystring, cookiename, cookievalue ) {
		'use strict';

		var url = this.parseURI(),
			query = url.search;

		// We have a query string
		if ( query !== null ) {

			// search string for value passed in first argument
			var n = query.search( querystring );

			// if a match is found, set session cookie
			if ( n !== -1 ) {
				this.setCookie( cookiename, cookievalue );
			} else {
				return false;
			}

		// no query string, bug out.
		} else {
			return false;
		}
	}

};