function hijinks( tag, attributes ) {
	var element = document.createElement( tag ),
		i = 0,
		child;

	if ( null != attributes && attributes.constructor == Object ) {
		for ( i in attributes ) {
			if ( i in element ) {
				element[ i ] = attributes[ i ];
			} else {
				element.setAttribute( i, attributes[ i ] );
			}
		}

		i = 1;
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
