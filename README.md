# jsdoc-react
jsdoc plugin to add parsed react component information to documentation. Adds a "Components" jsdoc namespace where component prop tables are listed. The comments used to generate the prop and component comments are then ignored for the rest of doc generation to eliminate redundancy.

Uses [react-docgen](https://github.com/reactjs/react-docgen/tree/main) to parse source files for react component and their prop-types.

Adds HTML table containing the prop info for each component parsed. Parses all react components in source files (not just exported ones).

Does not currently implement a jsdoc template. Does not add a new tag.

Inpsired by [better-docs](https://github.com/SoftwareBrothers/better-docs) creating an @component tag for jsdoc, but it had too many additional features.

## Compatability

This branch should work with jsdoc 3 and 4. jsdoc 5+ and react-docgen 6+ use ESM, so the plugin will need to adjust to ESM in another branch. 

This main branch uses CommonJS at the time of writing because jsdoc 5 isn't published on npm, so the normal jsdoc user would need a plugin written as cjs. 


## Limitations
See limitations of [react-docgen 5.x](https://github.com/reactjs/react-docgen/tree/5.x)

After react-docgen finds your components and their comments, the plugin removes any comment blocks that have the same content as comment on the components (and their props). This is so your documentation shows up in just one location (Namespace Components). If you had more than one comment with the same content, then both will be removed during doc generation.

