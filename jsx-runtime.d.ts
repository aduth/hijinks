import { Attributes, Fragment, Component } from './hijinks';

export function jsx(tag: typeof Fragment, props: Attributes): DocumentFragment;
export function jsx(type: string | Component, props: Attributes): Node;

export { jsx as jsxs, jsx as jsxDEV, Fragment };
