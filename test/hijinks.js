const jsdom = require( 'mocha-jsdom' );
const expect = require( 'chai' ).expect;
const h = require( '../' );

describe( 'hijinks()', () => {
	jsdom();

	before( () => {
		global.HTMLElement = window.HTMLElement;
		global.Node = window.Node;
	} );

	function Component( { className, children } ) {
		return h( 'div', { className: className }, children );
	}

	const vary = {
		arguments: {
			arguments: [
				[ { className: 'example', 'data-ok': 1 } ],
				( element ) => {
					expect( element.className ).to.equal( 'example' );
					expect( element.getAttribute( 'data-ok' ) ).to.equal( '1' );
				}
			],
			'undefined arguments': [
				[ undefined ],
				() => {}
			],
			'without arguments': [
				[],
				() => {}
			]
		},
		children: {
			'no children': [
				() => [],
				( element ) => {
					expect( element.childNodes ).to.be.empty;
				}
			],
			'single child': [
				( createChild ) => [ createChild() ],
				( element ) => {
					expect( element.childNodes ).to.have.lengthOf( 1 );
				}
			],
			'array of children': [
				( createChild ) => [ [ createChild(), createChild() ] ],
				( element ) => {
					expect( element.childNodes ).to.have.lengthOf( 2 );
				}
			],
			'variadic arguments children': [
				( createChild ) => [ createChild(), createChild() ],
				( element ) => {
					expect( element.childNodes ).to.have.lengthOf( 2 );
				}
			]
		},
		child: {
			'null child': [
				() => null,
				( element ) => {
					expect( element.childNodes ).to.be.empty;
				},
				false
			],
			'undefined child': [
				() => undefined,
				( element ) => {
					expect( element.childNodes ).to.be.empty;
				},
				false
			],
			'zero child': [
				() => 0,
				( element ) => {
					element.childNodes.forEach( ( childNode ) => {
						expect( Node.TEXT_NODE === childNode.nodeType );
						expect( '0' === childNode.nodeValue );
					} );
				},
				true
			],
			'empty string child': [
				() => '',
				( element ) => {
					element.childNodes.forEach( ( childNode ) => {
						expect( Node.TEXT_NODE === childNode.nodeType );
						expect( '' === childNode.nodeValue );
					} );
				},
				true
			],
			'string child': [
				() => 'foo',
				( element ) => {
					element.childNodes.forEach( ( childNode ) => {
						expect( Node.TEXT_NODE === childNode.nodeType );
						expect( 'foo' === childNode.nodeValue );
					} );
				},
				true
			],
			'element child': [
				() => h( 'span' ),
				( element ) => {
					element.childNodes.forEach( ( childNode ) => {
						expect( Node.ELEMENT_NODE === childNode.nodeType );
						expect( 'SPAN' === childNode.nodeName );
					} );
				},
				true
			],
			'component child': [
				() => h( Component, { className: 'example' }, 'Hello World' ),
				( element ) => {
					element.childNodes.forEach( ( childNode ) => {
						expect( childNode.nodeName ).to.equal( 'DIV' );
						expect( childNode.className ).to.equal( 'example' );
						expect( childNode.textContent ).to.equal( 'Hello World' );
					} );
				},
				true
			]
		}
	};

	for ( const varyArguments in vary.arguments ) {
		for ( const varyChildren in vary.children ) {
			for ( const varyChild in vary.child ) {
				it( [ varyArguments, varyChildren, varyChild ].join( ', ' ), () => {
					const [ args, assertArgs ] = vary.arguments[ varyArguments ];
					const [ createChildren, assertChildren ] = vary.children[ varyChildren ];
					const [ createChild, assertChild, countChild ] = vary.child[ varyChild ];
					const element = h( 'div', ...args, ...createChildren( createChild ) );

					expect( element ).to.be.an.instanceOf( HTMLElement );
					expect( element.nodeName ).to.equal( 'DIV' );

					assertArgs( element );
					assertChild( element );

					if ( countChild ) {
						assertChildren( element );
					} else {
						expect( element.childNodes ).to.be.empty;
					}
				} );
			}
		}
	}
} );
