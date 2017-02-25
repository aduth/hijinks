const jsdom = require( 'mocha-jsdom' );
const expect = require( 'chai' ).expect;
const h = require( '../' );

describe( 'hijinks()', () => {
	jsdom();

	before( () => {
		global.HTMLElement = window.HTMLElement;
		global.Node = window.Node;
	} );

	it( 'should create element with tag name', () => {
		const element = h( 'div' );

		expect( element ).to.be.an.instanceOf( HTMLElement );
		expect( element.nodeName ).to.equal( 'DIV' );
		expect( element.childNodes ).to.be.empty;
	} );

	it( 'should create element with attributes', () => {
		const element = h( 'div', { className: 'example', 'data-ok': 1 } );

		expect( element.className ).to.equal( 'example' );
		expect( element.getAttribute( 'data-ok' ) ).to.equal( '1' );
	} );

	it( 'should create element with attributes, without null child', () => {
		const element = h( 'div', { className: 'example', 'data-ok': 1 }, null );

		expect( element.childNodes ).to.be.empty;
	} );

	it( 'should create element with attributes and falsey child', () => {
		const element = h( 'div', { className: 'example', 'data-ok': 1 }, 0 );

		expect( element.childNodes ).to.have.lengthOf( 1 );
		expect( element.childNodes[ 0 ].nodeType ).to.equal( Node.TEXT_NODE );
		expect( element.childNodes[ 0 ].nodeValue ).to.equal( '0' );
	} );

	it( 'should create element with attributes and string child', () => {
		const element = h( 'div', { className: 'example', 'data-ok': 1 }, 'Hello World' );

		expect( element.childNodes ).to.have.lengthOf( 1 );
		expect( element.childNodes[ 0 ].nodeType ).to.equal( Node.TEXT_NODE );
		expect( element.childNodes[ 0 ].nodeValue ).to.equal( 'Hello World' );
	} );

	it( 'should create element with attributes and Element child', () => {
		const element = h( 'div', { className: 'example', 'data-ok': 1 },
			h( 'span', 'Hello World' )
		);

		expect( element.childNodes ).to.have.lengthOf( 1 );
		expect( element.childNodes[ 0 ].nodeType ).to.equal( Node.ELEMENT_NODE );
		expect( element.childNodes[ 0 ].nodeName ).to.equal( 'SPAN' );
		expect( element.childNodes[ 0 ].childNodes[ 0 ].nodeType ).to.equal( Node.TEXT_NODE );
		expect( element.childNodes[ 0 ].childNodes[ 0 ].nodeValue ).to.equal( 'Hello World' );
	} );

	it( 'should create element with attributes and array of children', () => {
		const element = h( 'div', { className: 'example', 'data-ok': 1 }, [
			h( 'span', 'Hello World' )
		] );

		expect( element.childNodes ).to.have.lengthOf( 1 );
		expect( element.childNodes[ 0 ].nodeType ).to.equal( Node.ELEMENT_NODE );
		expect( element.childNodes[ 0 ].nodeName ).to.equal( 'SPAN' );
		expect( element.childNodes[ 0 ].childNodes[ 0 ].nodeType ).to.equal( Node.TEXT_NODE );
		expect( element.childNodes[ 0 ].childNodes[ 0 ].nodeValue ).to.equal( 'Hello World' );
	} );

	it( 'should create element with child if no attributes passed', () => {
		const element = h( 'div', 'Hello World' );

		expect( element.childNodes ).to.have.lengthOf( 1 );
		expect( element.childNodes[ 0 ].nodeType ).to.equal( Node.TEXT_NODE );
		expect( element.childNodes[ 0 ].nodeValue ).to.equal( 'Hello World' );
	} );

	it( 'should create element with variadic child arguments', () => {
		const element = h( 'div', 'Hello', 'World' );

		expect( element.childNodes ).to.have.lengthOf( 2 );
		expect( element.childNodes[ 0 ].nodeType ).to.equal( Node.TEXT_NODE );
		expect( element.childNodes[ 0 ].nodeValue ).to.equal( 'Hello' );
		expect( element.childNodes[ 1 ].nodeType ).to.equal( Node.TEXT_NODE );
		expect( element.childNodes[ 1 ].nodeValue ).to.equal( 'World' );
	} );

	it( 'should create element with array of child arguments', () => {
		const element = h( 'div', [ 'Hello ', h( 'span', 'World' ) ] );

		expect( element.childNodes ).to.have.lengthOf( 2 );
		expect( element.textContent ).to.equal( 'Hello World' );
	} );

	it( 'should create element with array of child arguments, without undefined or null', () => {
		const element = h( 'div', [ 'Hello', undefined, null, ' ', h( 'span', 'World' ) ] );

		expect( element.childNodes ).to.have.lengthOf( 3 );
		expect( element.textContent ).to.equal( 'Hello World' );
	} );
} );
