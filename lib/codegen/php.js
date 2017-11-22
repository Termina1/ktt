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

function addParentContext (params) {
  return params.concat([`'__parent' => $params`])
}

function ifStatement (node) {
  return `(${node.condition} ? (${node.ifBody.length ? node.ifBody.join('.') : `''`}) : (${node.elseBody.length ? node.elseBody.join('.') : `''`}))`
}

function unlessStatement (node) {
  return ifStatement({
    ifBody: node.unlessBody,
    type: 'handlebars',
    subType: 'IF',
    elseBody: node.elseBody,
    condition: '!' + node.condition
  });
}

function eachStatement (node) {
  const eachExpr = `implode('', array_map(function($params) {
    return ${node.eachBody};
  }, ${node.iterator}))`

  if (node.elseBody.length > 0) {
    return ifStatement({
      ifBody: [eachExpr],
      type: 'handlebars',
      subType: 'IF',
      elseBody: node.elseBody,
      condition: node.condition
    })
  }
  return eachExpr;
}

function evaluationStatement(node) {
  if ((+node.value).toString() === node.value) {
    return node.value
  }

  if (node.value === 'true' || node.value === 'false') {
    return node.value;
  }

  return `$params['${node.value}']`;
}

function lookupStatement (node) {
  return '$params' + node.value.map(call => {
    if (call == 'this' || call == '.') {
      return ''
    }
    return `['${call}']`
  }).join('')
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
      return ifStatement(node);
    },
    EACH: (node) => {
      return eachStatement(node);
    },
    UNLESS: (node) => {
      return unlessStatement(node);
    },

    SAFEEVALUATION: (node) => {
      return `hbarsEscape(${evaluationStatement(node)})`;
    },
    SINGLEEVALUATION: (node) => {
      return evaluationStatement(node);
    },

    LOOKUPSINGLE: (node) => {
      return lookupStatement(node);
    },

    UNSAFEEVALUATION: (node) => {
      return evaluationStatement(node);
    },

    NAMEDPARAMETER: (node) => {
      const value = node.value
        .map(val => PhpAdapter.handlebars[val.subType](val))
        .join(' ')
      return `'${node.key}' => ${value}`
    },

    PARTIAL: (node) => {
      const params = addParentContext(node.parameters)
      if (node.children.length > 0) {
        params.push(`'@page-block' => ${node.children.join(' . ')}`)
      }

      return `handlebarsTemplate_${node.value}(array(${params.join(', \n')}))`
    },

    SINGLEPARTIALS: (node) => {
      if (node.value === '@page-block') {
        return `$params['@page-block']`
      }
      const params = addParentContext(node.parameters)
      return `handlebarsTemplate_${node.value}(array(${params.join(', \n')}))`
    },
    SIMPLEVALUE: (value) => {
      return value.value
    },
    ATTRIF: (node) => {
      return ifStatement(node);
    },
    ATTREACH: (node) => {
      return eachStatement(node);
    },
    ATTRUNLESS: (node) => {
      return unlessStatement(node);
    },
    ATTRSINGLECOMMENTS: (node) => {
      return '';
    },
    SINGLECOMMENTS: (node) => {
      return '';
    },
    ATTRLOOKUPSINGLE: (node) => {
      return lookupStatement(node);
    },
    ATTRSINGLEEVALUATION: (node) => {
      return evaluationStatement(node);
    },
    ATTRUNSAFESINGLEEVALUATION: (node) => {
      return `hbarsEscape(${evaluationStatement(node)})`;
    },

    // GENERICBLOCK: noop,
    // GENERICSINGLE: noop,
    // UNSAFEGENERICSINGLE: noop,
    // SAFEREFERENCEEVALUATION: noop,
    // UNSAFEREFERENCEEVALUATION: noop,
    // ATTRGENERICBLOCK: noop,
    // ATTRGENERICSINGLE: noop,
    // REFERENCEEVALUATION: NodeProcessor,
    // ATTRUNSAFEGENERICSINGLE: noop,
    // ATTRREFERENCEEVALUATION: noop,
    // ATTRUNSAFEREFERENCEEVALUATION: noop,
  },
  keyValue: (attr: KeyValue) => {
    const value = attr.value
      .filter(value => !value.subType || value.subType !== 'extraSpaces')
      .map(value => value.value)
      .join(' ')
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
