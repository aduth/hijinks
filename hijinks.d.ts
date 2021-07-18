export default function hijinks(
	tag: string,
	attributes: Record<string, any>,
	...children: Node | string | Array<Node | string> | HTMLCollection
): HTMLElement;
