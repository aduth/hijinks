type Attributes = Record<string, any>;

export function Fragment(attributes: Attributes);

export function createElement(
	tag: string,
	attributes: Attributes,
	...children: Node | string | Array<Node | string> | HTMLCollection
): HTMLElement;

export const h = createElement;
