## v2.0.0 (Unreleased)

### Breaking Changes

- The attributes positional argument must always be provided, even if null or undefined.
- Drop support for Node v10.
- There is no longer a default export. The `createElement` function is now a named argument, aliased as `h`.

### Enhancements

- Support for fragments via the `Fragment` export.
- For alignment with similar libraries, children can be passed either as an attribute or as a third argument, or as variadic argument after attributes.
- Include TypeScript type definitions.

### Optimization

- Shrink bundle size by around 17%
- Simplify append behavior

## v1.1.0 (2017-06-04)

### New Features

- Compose reusable components are now suppported. When passed a function as the first argument, render behavior is deferred to this function; passed attributes including children, the function is expected to return an HTMLElement.

## v1.0.2 (2017-02-24)

### Optimization

- Further optimize children normalization logic, saving 13kb minified / 2kb gzipped

## v1.0.1 (2017-02-24)

### Miscellaneous

- Add repository details to npm package

## v1.0.0 (2017-02-24)

- Initial release
