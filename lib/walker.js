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
      default:
        return ''
    }
  })
}

function walkChildren (children: t.Node[], adapter: t.Codegen): string[] {
  return children.map(node => walkAstNode(node, adapter))
}

function walkHandlebars (node: t.Node, adapter: t.Codegen): string {
  switch (node.subType) {
    case 'IF':
      node.ifBody = walk(node.ifBody, adapter)
      node.elseBody = walk(node.elseBody, adapter)
      node.condition = walkHandlebars(node.condition, adapter)
      return adapter.handlebars.IF(node)

    case 'SAFEEVALUATION':
      return adapter.handlebars.SAFEEVALUATION(node)
    default:
      if (adapter[node.type]) {
        return adapter.handlebars[node.subType](node)
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
      return walkHandlebars(node, adapter)
    default:
      return ''
  }
}

function walk (ast: t.Node[], adapter: t.Codegen): string[] {
  return ast.map(node => walkAstNode(node, adapter))
}

function walkTop (ast: t.Node[], adapter: t.Codegen): string {
  const statements = walk(ast, adapter)
  return adapter.topLevel({ type: 'topLevel', statements: statements })
}

module.exports = walkTop
