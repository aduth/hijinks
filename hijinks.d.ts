export type Attributes = Record<string, any>;

export type Component = (props: Attributes) => Node;

export function Fragment(attributes: Attributes): DocumentFragment;

export function createElement(
	tag: typeof Fragment,
	attributes?: Attributes | null,
	...children: Array<Node | string | Array<Node | string> | HTMLCollection>
): DocumentFragment;

export function createElement(
	tag: string | Component,
	attributes?: Attributes | null,
	...children: Array<Node | string | Array<Node | string> | HTMLCollection>
): Node;

export { createElement as h };
