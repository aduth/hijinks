function hijinks( tag, attributes, children ) {
	var element = document.createElement( tag ),
		i, child;

	if ( ! ( children instanceof Array ) ) {
		children = [ children ].concat( [].slice.call( arguments, 3 ) );
	}

	if ( null != attributes ) {
		if ( attributes.constructor == Object ) {
			for ( i in attributes ) {
				if ( i in element ) {
					element[ i ] = attributes[ i ];
				} else {
					element.setAttribute( i, attributes[ i ] );
				}
			}
		} else {
			children = [].concat.call( attributes, children );
		}
	}

	for ( i = 0; i < children.length; ) {
		child = children[ i++ ];
		if ( null == child ) {
			continue;
		}

		if ( 1 != child.nodeType ) {
			child = document.createTextNode( '' + child );
		}

		element.appendChild( child );
	}

	return element;
}
