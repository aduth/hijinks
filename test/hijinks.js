import jsdomGlobal from 'jsdom-global';
import { expect } from 'chai';
import { h, Fragment } from '../hijinks.js';

before(function () {
	this.jsdomCleanup = jsdomGlobal();
});

after(function () {
	this.jsdomCleanup();
});

describe('h', () => {
	function Component({ className, children }) {
		return h('div', { className: className }, children);
	}

	const vary = {
		attributes: {
			object: [
				{ className: 'example', 'data-ok': 1 },
				(element) => {
					expect(element.className).to.equal('example');
					expect(element.getAttribute('data-ok')).to.equal('1');
				},
			],
			undefined: [undefined, () => {}],
		},
		childrenAs: {
			attribute: (attributes, children) => [
				{ ...attributes, children: children.flat() },
			],
			argument: (attributes, children) => [attributes, ...children],
		},
		children: {
			'no children': [
				() => [],
				(element) => {
					expect(element.childNodes).to.be.empty;
				},
			],
			'single child': [
				(createChild) => [createChild()],
				(element) => {
					expect(element.childNodes).to.have.lengthOf(1);
				},
			],
			'array of children': [
				(createChild) => [[createChild(), createChild()]],
				(element) => {
					expect(element.childNodes).to.have.lengthOf(2);
				},
			],
			'variadic arguments children': [
				(createChild) => [createChild(), createChild()],
				(element) => {
					expect(element.childNodes).to.have.lengthOf(2);
				},
			],
		},
		child: {
			'null child': [
				() => null,
				(element) => {
					expect(element.childNodes).to.be.empty;
				},
				false,
			],
			'undefined child': [
				() => undefined,
				(element) => {
					expect(element.childNodes).to.be.empty;
				},
				false,
			],
			'zero child': [
				() => 0,
				(element) => {
					element.childNodes.forEach((childNode) => {
						expect(Node.TEXT_NODE === childNode.nodeType);
						expect('0' === childNode.nodeValue);
					});
				},
				true,
			],
			'empty string child': [
				() => '',
				(element) => {
					element.childNodes.forEach((childNode) => {
						expect(Node.TEXT_NODE === childNode.nodeType);
						expect('' === childNode.nodeValue);
					});
				},
				true,
			],
			'string child': [
				() => 'foo',
				(element) => {
					element.childNodes.forEach((childNode) => {
						expect(Node.TEXT_NODE === childNode.nodeType);
						expect('foo' === childNode.nodeValue);
					});
				},
				true,
			],
			'element child': [
				() => h('span'),
				(element) => {
					element.childNodes.forEach((childNode) => {
						expect(Node.ELEMENT_NODE === childNode.nodeType);
						expect('SPAN' === childNode.nodeName);
					});
				},
				true,
			],
			'component child': [
				() => h(Component, { className: 'example' }, 'Hello World'),
				(element) => {
					element.childNodes.forEach((childNode) => {
						expect(childNode.nodeName).to.equal('DIV');
						expect(childNode.className).to.equal('example');
						expect(childNode.textContent).to.equal('Hello World');
					});
				},
				true,
			],
		},
	};

	for (const varyAttributes in vary.attributes) {
		for (const varyChildren in vary.children) {
			for (const varyChild in vary.child) {
				for (const varyChildrenAs in vary.childrenAs) {
					const assertion = [
						varyAttributes,
						varyChildrenAs,
						varyChildren,
						varyChild,
					].join(', ');

					it(assertion, () => {
						const [args, assertArgs] = vary.attributes[varyAttributes];
						const [createChildren, assertChildren] =
							vary.children[varyChildren];
						const [createChild, assertChild, countChild] =
							vary.child[varyChild];
						const createArguments = vary.childrenAs[varyChildrenAs];
						const element = h(
							'div',
							...createArguments({ ...args }, createChildren(createChild))
						);

						expect(element).to.be.an.instanceOf(HTMLElement);
						expect(element.nodeName).to.equal('DIV');

						assertArgs(element);
						assertChild(element);

						if (countChild) {
							assertChildren(element);
						} else {
							expect(element.childNodes).to.be.empty;
						}
					});
				}
			}
		}
	}

	it('does not mutate arguments', () => {
		const args = { className: 'example' };
		const originalArgs = { ...args };

		h('div', args, ['1', 0]);

		expect(args).to.deep.equal(originalArgs);
	});

	it('preserves original children in component handling', () => {
		function ChildrenLength({ children }) {
			return h(Fragment, null, children.length);
		}

		const children = ['a', null, undefined, 0, document.createElement('a')];
		const element = h(ChildrenLength, null, children);

		expect(element.textContent).to.equal('5');
	});
});

describe('Fragment', () => {
	it('returns a DocumentFragment', () => {
		const result = h(Fragment, null, 1, 2);

		expect(result).to.be.instanceOf(DocumentFragment);
		expect(result.textContent).to.equal('12');
	});

	it('can be a child of another element', () => {
		const result = h('div', null, h(Fragment, null, 1, 2));

		expect(result.childNodes).to.have.lengthOf(2);
		expect(result.textContent).to.equal('12');
	});
});
