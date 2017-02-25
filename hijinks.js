function hijinks( tag, attributes ) {
	var element = document.createElement( tag ),
		i = 1,
		key, child;

	if ( null != attributes ) {
		if ( attributes.constructor == Object ) {
			for ( key in attributes ) {
				if ( key in element ) {
					element[ key ] = attributes[ key ];
				} else {
					element.setAttribute( key, attributes[ key ] );
				}
			}
		} else {
			i--;
		}
	}

	while ( i++ < arguments.length ) {
		child = arguments[ i ];
		if ( null == child || child instanceof Array ) {
			[].push.apply( arguments, child );
			continue;
		}

		if ( 1 != child.nodeType ) {
			child = document.createTextNode( '' + child );
		}

		element.appendChild( child );
	}

	return element;
}
