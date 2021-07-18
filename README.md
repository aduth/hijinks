[![Build Status](https://travis-ci.org/aduth/hijinks.svg)](https://travis-ci.org/aduth/hijinks)

# Hijinks

Hijinks is a fun and tiny DOM builder utility inspired by [HyperScript](https://github.com/hyperhype/hyperscript). Relentlessly simple, it weighs in at less than 0.3kb gzipped. Despite its small size, you'll find it to be quite flexible and familiar if you've ever used React or similar libraries. None of this comes at the expense of compatibility; browser support has been confirmed as far back as Internet Explorer 6.

## Installation

For use in the browser, simply download and include [`hijinks.min.js`](./hijinks.min.js) as a script on your page.

Hijinks is also available on npm:

```
npm install hijinks
```

## Usage

If included as a script in the browser, the `hijinks` function is available on the global scope:

```html
<script src="/path/to/hijinks.min.js"></script>
<div id="target"></div>
<script>
	var h = window.hijinks;
	var target = document.getElementById('target');
	var element = h('span', { className: 'greeting' }, 'Hello World!');
	target.appendChild(element);
</script>
```

When using the npm package, the Hijinks function is the default export of the module:

```js
var h = require('hijinks');

var target = document.getElementById('target');
var element = h('span', { className: 'greeting' }, 'Hello World!');
target.appendChild(element);
```

You can even create elements with JSX syntax if you so desire. Assuming you're using [the Babel JSX transform plugin](https://www.npmjs.com/package/babel-plugin-transform-react-jsx#options), specify the `pragma` option as the name of the variable you'll assign the imported `hijinks` module.

_.babelrc_:

```json
{
	"plugins": [
		[
			"transform-react-jsx",
			{
				"pragma": "h"
			}
		]
	]
}
```

_app.js_:

```jsx
var h = require('hijinks');

var target = document.getElementById('target');
var element = <span className="greeting">Hello World!</span>;
target.appendChild(element);
```

## API

The hijinks module exports a single default function export:

```
hijinks( tag: string|Function, attributes: ?object, ...children: mixed[] ): HTMLElement
```

**tag**

The tag name of the element to create, or a function ("component") which receives attributes including `children` and is expected to return an HTMLElement.

**attributes**

An optional object of attributes and `HTMLElement` properties to assign to the created element. Any properties not known to the `Element` interface

**children**

The remainder of arguments can consist of one (or array of) `HTMLElement` or strings to be appended as children to the created DOM node. Of course, since the Hijinks itself returns an `HTMLElement`, it's expected that you can easily compose together trees of elements.

## License

Copyright (c) 2017 Andrew Duthie

[The MIT License (MIT)](https://opensource.org/licenses/MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
