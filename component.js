var fs = require('fs')
var path = require('path')

const tableheader = `
  <thead>
    <tr>
      <td>prop</th>
      <td>type</td>
      <td>required</td>
      <td>description</td>
    </tr>
  </thead>`

function propTableHtml(component) {
  const rows = Object.entries(component.props).map(([name, data])=> {
    return `
  <tr>
    <th scope="row">${name}</th>
    <td>${data.type.name}</td>
    <td>${data.required ? 'yes' : 'no'}</td>
    <td>${data.description}</td>
  </tr>
    `
  }).join();
  return `<table>${tableheader}${rows}<caption>${component.displayName}</caption>
    </table>`;
}

import('react-docgen', function() {

exports.handlers = {
  newDoclet: function({ doclet }) {
    var filePath = path.join(doclet.meta.path, doclet.meta.filename)
    const componentTag = (doclet.tags || []).find(tag => tag.title === 'component')
    if (componentTag) {
      doclet.component = parseReact(filePath, doclet)
      doclet.comment += "\n\n<bold>aaaa yoooo</bold>"
      // doclet.kind = 'class'
    } 
    //else {
    //  if (path.extname(filePath) === '.jsx') {
    //    if (doclet.kind !== 'function' && doclet.kind !== 'event') {
    //      doclet.undocumented = true
    //    }
    //  }
    //}
  }
}

var parseReact = function (filePath, doclet) {
  var src = fs.readFileSync(filePath, 'UTF-8')
  var docGen
  try {
    docGen = reactDocs.parse(src)
  } catch (error) {
    if (error.message === 'No suitable component definition found.') {
      return {
        props: [],
        filePath: filePath,
        displayName: doclet.name,
      }
    } else {
      throw error
    }
  }
  
  return {
    props: Object.entries(docGen.props || {}).map(([key, prop]) => ({
      name: key,
      description: prop.description,
      type: prop.type ? prop.type.name : prop.flowType.name,
      required: typeof prop.required === 'boolean' && prop.required,
      defaultValue: prop.defaultValue
        ? (prop.defaultValue.computed ? 'function()' : prop.defaultValue.value)
        : undefined
    })),
    displayName: docGen.displayName,
    filePath: filePath,
  }
}

exports.parseReact = parseReact
})
