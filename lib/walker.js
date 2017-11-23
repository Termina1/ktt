// @flow

import t from './walker'

function walkAttributes (attrs: t.Attribute[], adapter: t.Codegen): string[] {
  return attrs.map(attr => {
    switch (attr.type) {
      case 'keyValue':
        return adapter.keyValue(attr)
      case 'singleKey':
        return adapter.singleKey(attr)
      case 'singleValue':
        return adapter.singleValue(attr)
      case 'handlebars':
        return walkHandlebars(attr, adapter, true)
      default:
        return ''
    }
  })
}

function walkChildren (children: t.Node[], adapter: t.Codegen): string[] {
  return children.map(node => walkAstNode(node, adapter))
}

function walkFunction (nodes, adapter, subType) {
  if (subType.substr(0, 4) === 'ATTR') {
    return walkAttributes(nodes, adapter)
  } else {
    return walk(nodes, adapter)
  }
}

function walkHandlebars (node: t.Node, adapter: t.Codegen, nowrap: boolean): string {
  switch (node.subType) {
    case 'IF':
    case 'ATTRIF':
      node.ifBody = walkFunction(node.ifBody, adapter, node.subType)
      node.elseBody = walkFunction(node.elseBody, adapter, node.subType)
      node.condition = walkHandlebars(node.condition, adapter, false)
      return adapter.handlebars.IF(node)

    case 'EACH':
    case 'ATTREACH':
      node.eachBody = walkFunction(node.eachBody, adapter, node.subType)
      node.elseBody = walkFunction(node.elseBody, adapter, node.subType)
      node.iterator = walkHandlebars(node.iterator, adapter, false)
      return adapter.handlebars.EACH(node)

    case 'UNLESS':
    case 'ATTRUNLESS':
      node.unlessBody = walkFunction(node.unlessBody, adapter, node.subType)
      node.elseBody = walkFunction(node.elseBody, adapter, node.subType)
      node.condition = walkHandlebars(node.condition, adapter, false)
      return adapter.handlebars.UNLESS(node)

    case 'SAFEEVALUATION':
      return adapter.handlebars.SAFEEVALUATION(node)

    case 'SINGLEPARTIALS':
      node.parameters = node.parameters.map(param => walkHandlebars(param, adapter, true))
      return adapter.handlebars.SINGLEPARTIALS(node)

    case 'PARTIAL':
      node.children = walk(node.children, adapter)
      node.parameters = node.parameters.map(param => walkHandlebars(param, adapter, true))
      return adapter.handlebars.PARTIAL(node)

    default:
      if (adapter.handlebars[node.subType]) {
        return adapter.handlebars[node.subType](node, nowrap)
      }
      return ''
  }
}

function walkAstNode (node: t.Node, adapter: t.Codegen): string {
  switch (node.type) {
    case 'htmlBlockNode':
      const nodeBlock = ((node: any): t.HtmlBlockNode<t.Node, t.Attribute>)
      return adapter.htmlBlockNode({
        ...nodeBlock,
        attributes: walkAttributes(nodeBlock.attributes, adapter),
        children: walkChildren(nodeBlock.children, adapter)
      })
    case 'htmlSingleNode':
      const nodeSingle = ((node: any): t.HtmlSingleNode<t.Attribute>)
      return adapter.htmlSingleNode({
        ...nodeSingle,
        attributes: walkAttributes(nodeSingle.attributes, adapter)
      })
    case 'htmlComment':
    case 'text':
      const nodeSimple = ((node: any): t.SimpleNode)
      return adapter[nodeSimple.type](nodeSimple)
    case 'handlebars':
      return walkHandlebars(node, adapter, true)
    default:
      return ''
  }
}

function walk (ast: t.Node[], adapter: t.Codegen): string[] {
  return ast.map(node => walkAstNode(node, adapter))
}

function walkTop (name: string, ast: t.Node[], adapter: t.Codegen): string {
  const statements = walk(ast, adapter)
  return adapter.topLevel({ name: name, type: 'topLevel', statements: statements })
}

module.exports = walkTop
