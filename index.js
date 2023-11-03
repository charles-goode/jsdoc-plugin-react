import * as logger from 'jsdoc/util/logger'
import * as rdgModule from 'react-docgen'
import buildParser from 'react-docgen/dist/babelParser.js'

const parser = buildParser();

function parseDocblock(str) {
  // Does not use \s in the regex as this would match also \n and conflicts
  // with windows line endings.
  return str.replace(/^[ \t]*\*[ \t]?/gm, '').trim();
}

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
  if (!component.props) {
    return `
    <p>No prop-types. Possibly no props</p>
    `;
  }
  const rows = Object.entries(component.props).map(([name, data])=> {
    return `
  <tr>
    <th scope="row">${name}</th>
    <td>${data.type.name}</td>
    <td>${data.required ? 'yes' : 'no'}</td>
    <td>${data.description}</td>
  </tr>
    `
  }).join("");
  return `<table>${tableheader}${rows}</table>`;
}

let firstFile = true;

export const handlers = {
  beforeParse: function(file) {
    // Add a namespace called Components
    // that all of the components can attach to
    // using memberof tag. This way class and function
    // components can be grouped together
    if (firstFile) {
      file.source += `
/**
 * @namespace Components
 */
`;
      firstFile = false;
    }

    // Parse all of the components in a file
    // Chose to document all components not just default exported
    // Maybe this isn't what the people want?
    let components;
    try {
      components = rdgModule.parse(file.source, rdgModule.builtinResolvers.FindAllDefinitionsResolver);
    } catch (err) {
      if (!err.message.includes("No suitable component definition found.")) {
        logger.warn(err);
      }
      return;
    }

    if (!components?.length) {
      return;
    }

    const ast = parser.parse(file.source);
    const reactComments = components.flatMap(c => [c.description, ...Object.values(c.props ?? {})?.map(p => p.description)])
    ast.comments?.reverse().forEach(docblock => {
      const content = parseDocblock(docblock.value);
      if (reactComments.includes(content)) {
        file.source = file.source.substring(0, docblock.start) + file.source.substring(docblock.end + 1);
      }
    });
    components.forEach((comp) => {
      // Now I need to get rid of content parsed by react-docgen
      // becuse it's now redundant or worse misleading
      // Could slap @ignore each component docgen consumed.
      // or manually edit the source to delete those docblocks.

      // Add parsed/generated content
      propshtml = propTableHtml(comp)
      file.source += `
/**
* ${comp.description}
* ${propshtml}
* @memberof Components
* @name ${comp.displayName}
*/`;

    });

  }
}

