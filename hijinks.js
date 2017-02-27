function hijinks( tag, attributes ) {
	var element = document.createElement( tag ),
		args = arguments,
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

	while ( i++ < args.length ) {
		child = args[ i ];
		if ( null == child || child instanceof Array ) {
			[].push.apply( args, child );
			continue;
		}

		if ( ! child.nodeType ) {
			child = document.createTextNode( '' + child );
		}

		element.appendChild( child );
	}

	return element;
}
