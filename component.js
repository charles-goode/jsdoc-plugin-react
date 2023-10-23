var fs = require('fs');
var path = require('path');
var logger = require('jsdoc/util/logger');
var rdgModule = require('react-docgen');

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

exports.handlers = {
  beforeParse: function(file) {
    let components;
    try {
      components = rdgModule.parse(file.source);
    } catch (err) {
      logger.warn("ayo check this out");
      logger.warn(file.source);
      logger.warn(err);
    }
    if (components && components.length > 0) {
      // Need to add content and remove content
      components.forEach((comp) => {
        propshtml = propTableHtml(comp)
        file.source += `
/**
* @namespace ${component.displayName}
* ${propshtml}
*/`
      });
    }
  }
}

