import { Attributes, Fragment } from './hijinks';

export function jsx(tag: Fragment, props: Attributes): DocumentFragment;
export function jsx(type: string | Component, props: Attributes): Node;

export { jsx as jsxs, jsx as jsxDEV, Fragment };
