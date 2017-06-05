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

const CONCAT = '.'

// const noop = function() {
//   return '';
// }

const PhpAdapter = {
  htmlBlockNode: (node: HtmlBlockNode<string, string>): string => {
    return `
    '<${node.openTag} ' . '${node.attributes.join("' . '")}' . '>'
      . ${node.children.join('.\n')} .
    '</${node.closeTag}>'
    `
  },
  htmlSingleNode: (node: HtmlSingleNode<string>) => {
    return `'<${node.tag} ' . '${node.attributes.join("' . '")} />'`
  },
  htmlComment: (node: SimpleNode) => {
    return ''
  },
  text: (node: SimpleNode) => {
    return node.value
  },
  handlebars: {
    IF: (node) => {
      return `(${node.condition} ? (${node.ifBody.length ? node.ifBody.join('.') : `''`}) : (${node.elseBody.length ? node.elseBody.join('.') : `''`}))
      `
    },
  //   EACH: noop,
  //   UNLESS: noop,
  //   GENERICBLOCK: noop,
  //   SAFEREFERENCEEVALUATION: noop,
    SAFEEVALUATION: (node) => {
      return `hbarsEscape($params['${node.value}'])`
    },
    SINGLEEVALUATION: (node) => {
      return `$params['${node.value}']`
    }
  //   UNSAFEREFERENCEEVALUATION: noop,
  //   UNSAFEEVALUATION: noop,
  //   LOOKUPSINGLE: noop,
  //   SINGLECOMMENTS: noop,
  //   GENERICSINGLE: noop,
  //   UNSAFEGENERICSINGLE: noop,
  //   SIMPLEVALUE: noop,
  //   ATTRIF: noop,
  //   ATTREACH: noop,
  //   ATTRUNLESS: noop,
  //   ATTRGENERICBLOCK: noop,
  //   ATTRGENERICSINGLE: noop,
  //   ATTRUNSAFEGENERICSINGLE: noop,
  //   ATTRSINGLECOMMENTS: noop
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
function test($params) {
  return ${node.statements.join('.')};
}`
  }
}

module.exports = PhpAdapter
