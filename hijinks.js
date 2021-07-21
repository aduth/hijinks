function append(node, children) {
	for (var i in children) {
		children[i] != null &&
			children[i] !== !!children[i] &&
			node.append(children[i]);
	}

	return node;
}

export function Fragment(attributes) {
	return append(document.createDocumentFragment(), attributes.children);
}

export function createElement(tag, attributes, children) {
	var isComponent = tag.call,
		elementOrProps = isComponent ? {} : document.createElement(tag),
		i;

	for (i in attributes) {
		if (i == 'children') {
			children = attributes[i];
		} else if (isComponent || i in elementOrProps) {
			elementOrProps[i] = attributes[i];
		} else {
			elementOrProps.setAttribute(i, attributes[i]);
		}
	}

	children =
		(children && children.pop && children) || [].slice.call(arguments, 2);

	return isComponent
		? (elementOrProps.children = children) && tag(elementOrProps)
		: append(elementOrProps, children);
}

export var h = createElement;
