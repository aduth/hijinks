function hijinks( tag, attributes, children ) {
	var element = document.createElement( tag ),
		key, i, child;

	if ( ! ( children instanceof Array ) ) {
		children = [ children ];
	}

	children = children.concat( [].slice.call( arguments, 3 ) );

	if ( attributes ) {
		if ( attributes.constructor === Object ) {
			for ( key in attributes ) {
				if ( key in element ) {
					element[ key ] = attributes[ key ];
				} else {
					element.setAttribute( key, attributes[ key ] );
				}
			}
		} else {
			children = [].concat.call( attributes, children );
		}
	}

	for ( i = 0; i < children.length; i++ ) {
		child = children[ i ];
		if ( null == child ) {
			continue;
		}

		if ( 1 !== child.nodeType ) {
			child = document.createTextNode( '' + child );
		}

		element.appendChild( child );
	}

	return element;
}
