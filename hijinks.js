function hijinks(tag, attributes, children) {
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

	elementOrProps.append.apply(
		elementOrProps,
		children.filter(function (child) {
			return child != null;
		})
	);

	return elementOrProps;
}
