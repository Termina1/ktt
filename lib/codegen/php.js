// @flow
import type {
  HtmlBlockNode,
  HtmlSingleNode,
  SimpleNode,
  KeyValue,
  SingleKey,
  SingleValue,
  TopLevel
} from '../types'

const HANDLEBARS_PREFIX = 'handlebarsTemplate_';

const noop = function (node) {
  return ''
}

const PhpAdapter = {
  htmlBlockNode: (node: HtmlBlockNode<string, string>): string => {
    const attributes = node.attributes.length > 0 ? `' . '${node.attributes.join("' . '")}' . '` : ''
    if (node.children.length > 0) {
      return `'<${node.openTag} ${attributes}>'
  . ${node.children.join('.\n')} .
'</${node.closeTag}>'`
    } else {
      return `'<${node.openTag} ${attributes}/>'`
    }
  },
  htmlSingleNode: (node: HtmlSingleNode<string>) => {
    return `'<${node.tag} ' . '${node.attributes.join("' . '")} />'`
  },
  htmlComment: (node: SimpleNode) => {
    return ''
  },
  text: (node: SimpleNode) => {
    return `'${node.value}'`
  },
  handlebars: {
    IF: (node) => {
      return `(${node.condition} ? (${node.ifBody.length ? node.ifBody.join('.') : `''`}) : (${node.elseBody.length ? node.elseBody.join('.') : `''`}))`
    },
    EACH: (node) => {
      const eachExpr = `implode('', array_map(${node.iterator}, function($params) {
        return ${node.eachBody};
      })`

      if (node.elseBody.length > 0) {
        return PhpAdapter.handlebars.IF({
          ifBody: [eachExpr],
          type: 'handlebars',
          subType: 'IF',
          elseBody: node.elseBody,
          condition: node.condition
        })
      }
      return eachExpr
    },
    UNLESS: (node) => {
      return PhpAdapter.handlebars.IF({
        ifBody: node.unlessBody,
        type: 'handlebars',
        subType: 'IF',
        elseBody: node.elseBody,
        condition: '!' + node.condition
      })
    },
    // GENERICBLOCK: noop,
    // SAFEREFERENCEEVALUATION: noop,
    SAFEEVALUATION: (node) => {
      return `hbarsEscape($params['${node.value}'])`
    },
    SINGLEEVALUATION: (node) => {
      if ((+node.value).toString() === node.value) {
        return node.value
      }

      if (node.value === 'true' || node.value === 'false') {
        return node.value;
      }

      return `$params['${node.value}']`
    },
    // UNSAFEREFERENCEEVALUATION: noop,
    UNSAFEEVALUATION: (node) => {
      return `$params['${node.value}']`
    },

    NAMEDPARAMETER: (node) => {
      const value = node.value
        .map(val => PhpAdapter.handlebars[val.subType](val))
        .join(' ')
      return `'${node.key}' => ${value}`
    },

    PARTIAL: (node) => {
      const params = node.parameters
      if (node.children.length > 0) {
        params.push(`'@page-block' => ${node.children.join(' . ')}`)
      }

      return `handlebarsTemplate_${node.value}(array(${params.join(', \n')}))`
    },

    SINGLEPARTIALS: (node) => {
      if (node.value === '@page-block') {
        return `$params['@page-block']`
      }
      const params = node.parameters

      return `handlebarsTemplate_${node.value}(array(${params.join(', \n')}))`
    },
    // LOOKUPSINGLE: noop,
    // SINGLECOMMENTS: noop,
    // GENERICSINGLE: noop,
    // UNSAFEGENERICSINGLE: noop,
    SIMPLEVALUE: (value) => {
      return value.value
    },
    // ATTRIF: noop,
    // ATTREACH: noop,
    // ATTRUNLESS: noop,
    // ATTRGENERICBLOCK: noop,
    // ATTRGENERICSINGLE: noop,
    // ATTRUNSAFEGENERICSINGLE: noop,
    // ATTRSINGLECOMMENTS: noop
    // SINGLEEVALUATION: NodeProcessor,
    // REFERENCEEVALUATION: NodeProcessor,
    // LOOKUPSINGLE: NodeProcessor
  },
  keyValue: (attr: KeyValue) => {
    const value = attr.value.map(value => value.value).join(' ')
    return `${attr.key}="${value}"`
  },
  singleKey: (attr: SingleKey) => {
    return `${attr.value}`
  },
  singleValue: (node: SingleValue) => '',
  topLevel: (node: TopLevel) => {
    return `
function ${HANDLEBARS_PREFIX + node.name}($params) {
  return ${node.statements.join('.')};
}`
  }
}

module.exports = PhpAdapter
