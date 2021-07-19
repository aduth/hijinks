function append(node, children) {
	node.append.apply(
		node,
		children.filter(function (child) {
			return child != null;
		})
	);
}

export function Fragment(attributes) {
	var fragment = document.createDocumentFragment();
	append(fragment, attributes.children);
	return fragment;
}

export function createElement(tag, attributes, children) {
	var isComponent = 'string' != typeof tag,
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

	children = Array.isArray(children) ? children : [children];
	children.push.apply(children, [].slice.call(arguments, 3));

	if (isComponent) {
		elementOrProps.children = children;
		return tag(elementOrProps);
	}

	append(elementOrProps, children);

	return elementOrProps;
}

export var h = createElement;
