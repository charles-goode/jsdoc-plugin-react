# jsdoc-react
jsdoc plugin to add parsed react component information to documentation

Uses [react-docgen](https://github.com/reactjs/react-docgen/tree/main) to parse source files for react component and their prop-types.

Adds HTML table containing the prop info for each component parsed. Parses all react components in source files (not just exported ones).

Does not currently implement a jsdoc template. Does not add a new tag.

Inpsired by [better-docs](https://github.com/SoftwareBrothers/better-docs) creating an @component tag for jsdoc, but it had too many additional features.

