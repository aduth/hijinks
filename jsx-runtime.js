import { h, Fragment } from './hijinks.js';

function jsx(type, props) {
	return h(type, props);
}

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
