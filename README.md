# Hijinks

Hijinks is a tiny DOM builder utility inspired by [HyperScript](https://github.com/hyperhype/hyperscript). Relentlessly simple, it weighs in at less than 0.3kb gzipped. Despite its small size, you'll find it to be quite flexible and familiar if you've ever used React or similar libraries. None of this comes at the expense of compatibility, as it still supports legacy browsers like Internet Explorer.

## Installation

Install via NPM:

```
npm install hijinks
```

## Usage

```html
<div id="target"></div>
<script type="module">
	import { h } from 'https://unpkg.com/hijinks';
	const target = document.getElementById('target');
	const element = h('span', { className: 'greeting' }, 'Hello World!');
	target.appendChild(element);
</script>
```

You can even create elements with JSX syntax if you so desire. Assuming you're using [the Babel JSX transform plugin](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx), define Hijinks as the import source for the automatic runtime.

_.babelrc_:

```json
{
	"plugins": [
		[
			"@babel/plugin-transform-react-jsx",
			{
				"runtime": "automatic",
				"importSource": "hijinks"
			}
		]
	]
}
```

_app.js_:

```jsx
import { h } from 'hijinks';

const target = document.getElementById('target');
const element = <span className="greeting">Hello World!</span>;
target.appendChild(element);
```

## API

### `createElement` (`h`)

The hijinks module exports `createElement` (aliased as `h`) as a named export:

```ts
export function createElement(
	tag: string | Component,
	attributes?: Attributes | null,
	...children: Node | string | Array<Node | string> | HTMLCollection
): Node;
```

#### `tag`

The tag name of the element to create, or a function ("component") which receives attributes including `children` and is expected to return an HTMLElement.

#### `attributes`

An optional object of attributes and `HTMLElement` properties to assign to the created element. Any properties not known to the `HTMLElement` interface are assigned as attributes.

#### `children`

The remainder of arguments can consist of one (or array of) `HTMLElement` or strings to be appended as children to the created DOM node. Of course, since the Hijinks itself returns an `HTMLElement`, it's expected that you can easily compose together trees of elements.

### `Fragment`

`Fragment` is also available and behaves similarly to [React fragments](https://reactjs.org/docs/fragments.html), returning a [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment).

```js
import { h, Fragment } from 'hijinks';
const fragment = <>Example</>;
// Or: const fragment = h(Fragment, null, 'Example');
```

## License

Copyright (c) 2017-2021 Andrew Duthie

Released under the [MIT License](./LICENSE.md).
