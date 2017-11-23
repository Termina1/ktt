/* eslint-env node, jasmine */
const { wrapTopLevel, compile, unlessWrap, eachWrap, ifWrap, unWrap } = require('../tool')

describe('Handlebars nodes', () => {
  describe('blocks nodes', () => {
    describe('if block', () => {
      it('Should recognize a simple Handlebars if block', () => {
        const result = compile('{{#if condition}} <div></div><div></div> {{else}} <input/> {{/if}}')
        const expected = wrapTopLevel([ifWrap(['<div/>', '<div/>'], ['<input/>'])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body', () => {
        const result = compile('{{#if condition}} <div></div> {{/if}}')
        const expected = wrapTopLevel([ifWrap(['<div/>'], [])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body and else', () => {
        const result = compile('{{#if condition}} <div></div> {{else}} {{/if}}')
        const expected = wrapTopLevel([ifWrap(['<div/>'], [])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with only else', () => {
        const result = compile('{{#if condition}}  {{else}} <address></address> {{/if}}')
        const expected = wrapTopLevel([ifWrap([''], ['<address/>'])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body and else body', () => {
        const result = compile('{{#if condition}} <div></div> {{else}} <div></div> {{/if}}')
        const expected = wrapTopLevel([ifWrap(['<div/>'], ['<div/>'])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body and else body (single node)', () => {
        const result = compile('{{#if condition}} <div></div> {{else}} <input/> {{/if}}')
        const expected = wrapTopLevel([ifWrap(['<div/>'], ['<input/>'])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body and else body (two elements)', () => {
        const result = compile('{{#if condition}} <div></div> {{else}} <input/><div></div> {{/if}}')
        const expected = wrapTopLevel([ifWrap(['<div/>'], ['<input/>', '<div/>'])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body (two elements) and else body (single node)', () => {
        const result = compile('{{#if condition}} <div></div><hr/> {{else}} <input/> {{/if}}')
        const expected = wrapTopLevel([ifWrap(['<div/>', '<hr/>'], ['<input/>'])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body (with two elements)', () => {
        const result = compile('{{#if iterator}} <address   > </address> <span></span>	 {{/if}}')
        const expected = wrapTopLevel([ifWrap(['<address/>', '<span/>'], [], 'iterator')])
        expect(result).toEqual(expected)
      })
    })

    describe('each block', () => {
      it('Should recognize a simple Handlebars each block', () => {
        const result = compile('{{#each iterator}} {{/each}}')
        const expected = wrapTopLevel([eachWrap([''])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body', () => {
        const result = compile('{{#each iterator}} <address></address> {{/each}}')
        const expected = wrapTopLevel([eachWrap(['<address/>'])])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body and else', () => {
        const result = compile('{{#each iterator}} <address></address> {{else}} {{/each}}')
        const expected = wrapTopLevel([eachWrap(['<address/>'])], [], 'iterator')
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with only else', () => {
        const result = compile('{{#each condition}}  {{else}} <address></address> {{/each}}')
        const expected = wrapTopLevel([ifWrap([eachWrap([''], 'condition')], ['<address/>'], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body and else body', () => {
        const result = compile('{{#each iterator}} <address></address> {{else}} <div></div> {{/each}}')
        const expected = wrapTopLevel([ifWrap([eachWrap(['<address/>'], 'iterator')], ['<div/>'], 'iterator')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body and else body (single node)', () => {
        const result = compile('{{#each iterator}} <address></address> {{else}} <hr/> {{/each}}')
        const expected = wrapTopLevel([ifWrap([eachWrap(['<address/>'], 'iterator')], ['<hr/>'], 'iterator')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body and else body (two node)', () => {
        const result = compile('{{#each iterator}} <address></address> {{else}} <hr/><span></span> {{/each}}')
        const expected = wrapTopLevel([ifWrap([eachWrap(['<address/>'], 'iterator')], ['<hr/>', '<span/>'], 'iterator')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body (two elements) and else body (single node)', () => {
        const result = compile('{{#each iterator}} <address></address><div></div> {{else}} <hr/> {{/each}}')
        const expected = wrapTopLevel([ifWrap([eachWrap(['<address/>', '<div/>'], 'iterator')], ['<hr/>'], 'iterator')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body (with two elements)', () => {
        const result = compile('{{#each iterator}} <address   > </address> <span></span>	 {{/each}}')
        const expected = wrapTopLevel([eachWrap(['<address/>', '<span/>'], 'iterator')])
        expect(result).toEqual(expected)
      })
    })

    describe('unless block', () => {
      it('Should recognize a simple Handlebars unless block', () => {
        const result = compile('{{#unless condition}} {{/unless}}')
        const expected = wrapTopLevel([unlessWrap([''], [], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body', () => {
        const result = compile('{{#unless condition}} <address></address> {{/unless}}')
        const expected = wrapTopLevel([unlessWrap(['<address/>'], [], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body and else', () => {
        const result = compile('{{#unless condition}} <address></address> {{else}} {{/unless}}')
        const expected = wrapTopLevel([unlessWrap(['<address/>'], [], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with only else', () => {
        const result = compile('{{#unless condition}}  {{else}} <address></address> {{/unless}}')
        const expected = wrapTopLevel([unlessWrap([], ['<address/>'], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body and else body', () => {
        const result = compile('{{#unless condition}} <address></address> {{else}} <div></div> {{/unless}}')
        const expected = wrapTopLevel([unlessWrap(['<address/>'], ['<div/>'], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body and else body (single node)', () => {
        const result = compile('{{#unless condition}} <address></address> {{else}} <hr/> {{/unless}}')
        const expected = wrapTopLevel([unlessWrap(['<address/>'], ['<hr/>'], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body and else body (two node)', () => {
        const result = compile('{{#unless condition}} <address></address> {{else}} <hr/><span></span> {{/unless}}')
        const expected = wrapTopLevel([unlessWrap(['<address/>'], ['<hr/>', '<span/>'], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body (two elements) and else body (single node)', () => {
        const result = compile('{{#unless condition}} <address></address><div></div> {{else}} <hr/> {{/unless}}')
        const expected = wrapTopLevel([unlessWrap(['<address/>', '<div/>'], ['<hr/>'], 'condition')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body (with two elements)', () => {
        const result = compile('{{#unless condition}} <address   > </address> <span></span>	 {{/unless}}')
        const expected = wrapTopLevel([unlessWrap(['<address/>', '<span/>'], [], 'condition')])
        expect(result).toEqual(expected)
      })
    })
  })

  describe('single statements', () => {
    describe('Safe evaluation', () => {
      it('Should recognize a simple safe evaluation', () => {
        const result = compile('{{evaluateMe}}')
        const expected = wrapTopLevel([unWrap('hbarsEscape($params[\'evaluateMe\'])')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple safe evaluation with spaces', () => {
        const result = compile('{{ evaluateMe  }}')
        const expected = wrapTopLevel([unWrap('hbarsEscape($params[\'evaluateMe\'])')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple safe evaluation with dots', () => {
        const result = compile('{{evaluate.Me.again}}')
        const expected = wrapTopLevel([unWrap('hbarsEscape($params[\'evaluate\'][\'Me\'][\'again\'])')])
        expect(result).toEqual(expected)
      })
    })

    describe('Unsafe evaluation', () => {
      it('Should recognize a simple safe evaluation', () => {
        const result = compile('{{{evaluateMe}}}')
        const expected = wrapTopLevel([unWrap('$params[\'evaluateMe\']')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple safe evaluation with spaces', () => {
        const result = compile('{{{ evaluateMe  }}}')
        const expected = wrapTopLevel([unWrap('$params[\'evaluateMe\']')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple safe evaluation with dots', () => {
        const result = compile('{{{evaluate.Me.again}}}')
        const expected = wrapTopLevel([unWrap('$params[\'evaluate\'][\'Me\'][\'again\']')])
        expect(result).toEqual(expected)
      })
    })

    describe('Look expression', () => {
      it('Should recognize a simple look up expression', () => {
        const result = compile('{{../parent}}')
        const expected = wrapTopLevel([unWrap('$params[\'..\'][\'parent\']')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple look up expression with spaces', () => {
        const result = compile('{{ ../parent  }}')
        const expected = wrapTopLevel([unWrap('$params[\'..\'][\'parent\']')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a look up expression of many levels', () => {
        const result = compile('{{../../../parent}}')
        const expected = wrapTopLevel([unWrap('$params[\'..\'][\'..\'][\'..\'][\'parent\']')])
        expect(result).toEqual(expected)
      })

      it('Should recognize a look up expression of many levels', () => {
        const result = compile('{{  ../../../parent  }}')
        const expected = wrapTopLevel([unWrap('$params[\'..\'][\'..\'][\'..\'][\'parent\']')])
        expect(result).toEqual(expected)
      })
    })

    describe('Look expression', () => {
      it('Should recognize a simple handlebars comment', () => {
        const result = compile('{{!-- Simple Comments 01 --}}')
        const expected = wrapTopLevel([''])
        expect(result).toEqual(expected)
      })

      it('Should recognize a handlebars comment with enters and spaces', () => {
        const result = compile('{{!-- Simple \n \t Comments    --}}')
        const expected = wrapTopLevel([''])
        expect(result).toEqual(expected)
      })
    })
  })
})
