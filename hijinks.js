function hijinks(tag, attributes) {
	var isComponent = 'string' != typeof tag,
		hasAttributes = null != attributes && attributes.constructor == Object,
		children = [].slice.call(arguments, hasAttributes ? 2 : 1),
		props,
		element,
		i,
		child;

	if (isComponent) {
		props = { children: children };
	} else {
		element = document.createElement(tag);
	}

	if (hasAttributes) {
		for (i in attributes) {
			if (isComponent) {
				props[i] = attributes[i];
			} else if (i in element) {
				element[i] = attributes[i];
			} else {
				element.setAttribute(i, attributes[i]);
			}
		}
	}

	if (isComponent) {
		return tag(props);
	}

	while (children.length) {
		child = children.shift();
		if (null == child || child instanceof Array) {
			[].push.apply(children, child);
			continue;
		}

		if (!child.nodeType) {
			child = document.createTextNode('' + child);
		}

		element.appendChild(child);
	}

	return element;
}
