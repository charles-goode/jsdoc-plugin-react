var fs = require('fs');
var path = require('path');

import('./node_modules/react-docgen/dist/babelParser.js').then((esm) => {
  const buildParse = esm.default.default;
  const parser = buildParse();
  fs.readFile('../jsdoc-react/examples/ClassComp.jsx', { encoding: "utf-8" }, function(err, data) {
    console.log(data)
    const res = parser.parse(data)
    console.log(res);
  })
});
