function append(node, children) {
	node.append.apply(
		node,
		children.filter(function (child) {
			return child != null;
		})
	);
	return node;
}

export function Fragment(attributes) {
	return append(document.createDocumentFragment(), attributes.children);
}

export function createElement(tag, attributes, children) {
	var isComponent = tag.call,
		elementOrProps,
		i;

	elementOrProps = isComponent ? {} : document.createElement(tag);

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
