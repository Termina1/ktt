// @flow

export type Node = { type: string }
export type TopLevel = { type: string, statements: string[]}
export type NodeProcessor = (node: Node) => string

export type SingleValue = {
  type: 'singleValue',
  value: string
}

export type KeyValue = {
  type: 'keyValue',
  key: string,
  value: SingleValue[]
}

export type SingleKey = {
  type: 'singleKey',
  key: string
}

export type Attribute = SingleValue | SingleKey | KeyValue

export type HtmlBlockNode<Child, Attr> = {
  type: 'htmlBlockNode',
  openTag: string,
  closeTag: string,
  attributes: Attr[],
  children: Child[]
}

export type HtmlSingleNode<Attr> = {
  type: 'htmlSingleNode',
  tag: string,
  attributes: Attr[]
}

export type SimpleNode = {
  type: string,
  value: 'htmlComment' | 'text'
}

export type HandlebarsBaseConditionNodeAST = {
  type: 'handlebars',
  subType: string,
  value: string | string[]
}

export type IfNode = {
  type: 'handlebars',
  subType: 'IF',
  condition: HandlebarsBaseConditionNodeAST,
  ifBody: Node[],
  elseBody: Node[]
}

export type Codegen = {
  htmlBlockNode: HtmlBlockNode<string, string> => string,
  htmlSingleNode: HtmlSingleNode<string> => string,
  htmlComment: SimpleNode => string,
  text: SimpleNode => string,
  handlebars: {
    IF: NodeProcessor,
    EACH: NodeProcessor,
    UNLESS: NodeProcessor,
    GENERICBLOCK: NodeProcessor,
    SAFEREFERENCEEVALUATION: NodeProcessor,
    SAFEEVALUATION: NodeProcessor,
    UNSAFEREFERENCEEVALUATION: NodeProcessor,
    UNSAFEEVALUATION: NodeProcessor,
    LOOKUPSINGLE: NodeProcessor,
    SINGLECOMMENTS: NodeProcessor,
    GENERICSINGLE: NodeProcessor,
    UNSAFEGENERICSINGLE: NodeProcessor,
    SIMPLEVALUE: NodeProcessor,
    ATTRIF: NodeProcessor,
    ATTREACH: NodeProcessor,
    ATTRUNLESS: NodeProcessor,
    ATTRGENERICBLOCK: NodeProcessor,
    ATTRGENERICSINGLE: NodeProcessor,
    ATTRUNSAFEGENERICSINGLE: NodeProcessor,
    ATTRSINGLECOMMENTS: NodeProcessor,
    SINGLEEVALUATION: NodeProcessor
  },
  keyValue: KeyValue => string,
  singleKey: SingleKey => string,
  singleValue: SingleValue => string,
  topLevel: (node: TopLevel) => string
}
