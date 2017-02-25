function hijinks( tag, attributes, children ) {
	var element, key, i, child;

	if ( null == children ) {
		children = [];
	}

	if ( children.constructor !== Array ) {
		children = [ children ];
	}

	children = children.concat( [].slice.call( arguments, 3 ) );

	if ( ! attributes ) {
		attributes = {};
	}

	if ( attributes.constructor !== Object ) {
		children = [].concat( attributes ).concat( children );
		attributes = {};
	}

	element = document.createElement( tag );

	for ( key in attributes ) {
		if ( key in element ) {
			element[ key ] = attributes[ key ];
		} else {
			element.setAttribute( key, attributes[ key ] );
		}
	}

	for ( i = 0; i < children.length; i++ ) {
		child = children[ i ];
		if ( null == child ) {
			continue;
		}

		if ( 1 !== child.nodeType ) {
			child = document.createTextNode( String( child ) );
		}

		element.appendChild( child );
	}

	return element;
}
