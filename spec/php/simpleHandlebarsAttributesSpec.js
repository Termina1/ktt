/* eslint-env node, jasmine */
const { wrapTopLevel, compile, unlessWrap, eachWrap, ifWrap, unWrap } = require('../tool')

describe('Simple Handlebars Attributes', () => {
  describe('blocks statements', () => {
    describe('if block', () => {
      it('Should recognize a simple Handlebars if block', () => {
        const result = compile('<div {{#if condition}} {{/if}}> </div>')
        const expected = wrapTopLevel(['<div ', ifWrap([' '], []), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body', () => {
        const result = compile('<div {{#if condition}} checked {{/if}}> </div>')
        const expected = wrapTopLevel(['<div ', ifWrap([' ', 'checked', ' '], []), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body and else', () => {
        const result = compile('<div {{#if condition}} checked {{else}} {{/if}} ></div>')
        const expected = wrapTopLevel(['<div ', ifWrap([' ', 'checked', ' '], [' ']), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with only else', () => {
        const result = compile('<span {{#if condition}} {{else}} \'selected\' {{/if}}></span>')
        const expected = wrapTopLevel(['<span ', ifWrap([' '], [' ', 'selected', ' ']), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body and else body', () => {
        const result = compile('<article {{#if condition}} data="red" {{else}} blue {{/if}}> </article>')
        const expected = wrapTopLevel(['<article ', ifWrap([' ', 'data="red"', ' '], [' ', 'blue', ' ']), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body and else body (key values both)', () => {
        const result = compile('<article {{#if condition}} class="highlight" {{else}} name="Mictian" {{/if}}> </article>')
        const expected = wrapTopLevel(['<article ', ifWrap([' ', 'class="highlight"', ' '], [' ', 'name="Mictian"', ' ']), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body and else body (two elements)', () => {
        const result = compile('<input {{#if condition}} selected {{else}} class="red" name="block" {{/if}} />')
        const expected = wrapTopLevel(['<input ', ifWrap([' ', 'selected', ' '], [' ', 'class="red"', ' ', 'name="block"', ' ']), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body (two elements) and else body (one node)', () => {
        const result = compile('<div {{#if condition}} class="red" name="block" {{else}} unchecked {{/if}}> </div>')
        const expected = wrapTopLevel(['<div ', ifWrap([' ', 'class="red"', ' ', 'name="block"', ' '], [' ', 'unchecked', ' ']), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body (with two elements)', () => {
        const result = compile('<input {{#if condition}} type="text" class="brown" {{/if}} >')
        const expected = wrapTopLevel(['<input ', ifWrap([' ', 'type="text"', ' ', 'class="brown"', ' '], []), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body (with two elements)', () => {
        const result = compile('<input {{#if condition}} type="text" class="brown" {{/if}} >')
        const expected = wrapTopLevel(['<input ', ifWrap([' ', 'type="text"', ' ', 'class="brown"', ' '], []), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars if block with body (with two elements)', () => {
        const result = compile('<input {{#if condition}} type="text" class="brown" {{/if}} >')
        const expected = wrapTopLevel(['<input ', ifWrap([' ', 'type="text"', ' ', 'class="brown"', ' '], []), '/>'])
        expect(result).toEqual(expected)
      })
    })

    describe('each block', () => {
      it('Should recognize a simple Handlebars each block', () => {
        const result = compile('<div {{#each iterator}} {{/each}}> </div>')
        const expected = wrapTopLevel(['<div ', eachWrap([' ']), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body', () => {
        const result = compile('<div {{#each iterator}} checked {{/each}}> </div>')
        const expected = wrapTopLevel(['<div ', eachWrap([' ', 'checked', ' ']), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body and else', () => {
        const result = compile('<div {{#each iterator}} checked {{else}} {{/each}} ></div>')
        const expected = wrapTopLevel(['<div ', ifWrap([eachWrap([' ', 'checked', ' '])], [' '], 'iterator'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with only else', () => {
        const result = compile('<span {{#each iterator}} {{else}} \'selected\' {{/each}}></span>')
        const expected = wrapTopLevel(['<span ', ifWrap([eachWrap([' '])], [' ', 'selected', ' '], 'iterator'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body and else body', () => {
        const result = compile('<article {{#each iteration}} data="red" {{else}} blue {{/each}}> </article>')
        const expected = wrapTopLevel(['<article ', ifWrap([eachWrap([' ', 'data="red"', ' '], 'iteration')], [' ', 'blue', ' '], 'iteration'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body and else body (key values both)', () => {
        const result = compile('<article {{#each iterator}} class="highlight" {{else}} name="Mictian" {{/each}}> </article>')
        const expected = wrapTopLevel(['<article ', ifWrap([eachWrap([' ', 'class="highlight"', ' '])], [' ', 'name="Mictian"', ' '], 'iterator'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body and else body (two elements)', () => {
        const result = compile('<input {{#each array}} selected {{else}} class="red" name="block" {{/each}} />')
        const expected = wrapTopLevel(['<input ', ifWrap([eachWrap([' ', 'selected', ' '], 'array')], [' ', 'class="red"', ' ', 'name="block"', ' '], 'array'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body (two elements) and else body (one node)', () => {
        const result = compile('<div {{#each people}} class="red" name="block" {{else}} unchecked {{/each}}> </div>')
        const expected = wrapTopLevel(['<div ', ifWrap([eachWrap([' ', 'class="red"', ' ', 'name="block"', ' '], 'people')], [' ', 'unchecked', ' '], 'people'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars each block with body (with two elements)', () => {
        const result = compile('<input {{#each condition}} type="text" class="brown" {{/each}} >')
        const expected = wrapTopLevel(['<input ', eachWrap([' ', 'type="text"', ' ', 'class="brown"', ' '], 'condition'), '/>'])
        expect(result).toEqual(expected)
      })
    })

    describe('unless block', () => {
      it('Should recognize a simple Handlebars unless block', () => {
        const result = compile('<div {{#unless iterator}} {{/unless}}> </div>')
        const expected = wrapTopLevel(['<div ', unlessWrap([' '], [], 'iterator'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body', () => {
        const result = compile('<div {{#unless iterator}} checked {{/unless}}> </div>')
        const expected = wrapTopLevel(['<div ', unlessWrap([' ', 'checked', ' '], [], 'iterator'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body and else', () => {
        const result = compile('<div {{#unless iterator}} checked {{else}} {{/unless}} ></div>')
        const expected = wrapTopLevel(['<div ', unlessWrap([' ', 'checked', ' '], [' '], 'iterator'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with only else', () => {
        const result = compile('<span {{#unless iterator}} {{else}} \'selected\' {{/unless}}></span>')
        const expected = wrapTopLevel(['<span ', unlessWrap([' '], [' ', 'selected', ' '], 'iterator'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body and else body', () => {
        const result = compile('<article {{#unless iteration}} data="red" {{else}} blue {{/unless}}> </article>')
        const expected = wrapTopLevel(['<article ', unlessWrap([' ', 'data="red"', ' '], [' ', 'blue', ' '], 'iteration'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body and else body (key values both)', () => {
        const result = compile('<article {{#unless iterator}} class="highlight" {{else}} name="Mictian" {{/unless}}> </article>')
        const expected = wrapTopLevel(['<article ', unlessWrap([' ', 'class="highlight"', ' '], [' ', 'name="Mictian"', ' '], 'iterator'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body and else body (two elements)', () => {
        const result = compile('<input {{#unless array}} selected {{else}} class="red" name="block" {{/unless}} />')
        const expected = wrapTopLevel(['<input ', unlessWrap([' ', 'selected', ' '], [' ', 'class="red"', ' ', 'name="block"', ' '], 'array'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body (two elements) and else body (one node)', () => {
        const result = compile('<div {{#unless people}} class="red" name="block" {{else}} unchecked {{/unless}}> </div>')
        const expected = wrapTopLevel(['<div ', unlessWrap([' ', 'class="red"', ' ', 'name="block"', ' '], [' ', 'unchecked', ' '], 'people'), '/>'])
        expect(result).toEqual(expected)
      })

      it('Should recognize a simple Handlebars unless block with body (with two elements)', () => {
        const result = compile('<input {{#unless condition}} type="text" class="brown" {{/unless}} >')
        const expected = wrapTopLevel(['<input ', unlessWrap([' ', 'type="text"', ' ', 'class="brown"', ' '], [], 'condition'), '/>'])
        expect(result).toEqual(expected)
      })
    })

    describe('single statements', () => {
      describe('Safe evaluation', () => {
        // it('Should recognize a simple safe evaluation', () => {
        //   const result = compile('<div {{evaluateMe}}> </div>')
        //   const expected = wrapTopLevel(['<div ', unWrap(`hbarsEscape($params['evaluateMe'])`), '/>'])
        //   expect(result).toEqual(expected)
        // })
        //
        // it('Should recognize a simple safe evaluation with spaces', () => {
        //   const result = compile('<article {{ evaluateMe  }}></article>')
        //   const expected = wrapTopLevel(['<article ', unWrap(`hbarsEscape($params['evaluateMe'])`), '/>'])
        //   expect(result).toEqual(expected)
        // })
        //
        // it('Should recognize a simple safe evaluation with dots', () => {
        //   const result = compile('<input {{evaluate.Me.again}} />')
        //   const expected = wrapTopLevel(['<input ', unWrap(`hbarsEscape($params['evaluate']['Me']['again'])`), '/>'])
        //   expect(result).toEqual(expected)
        // })
      })

      describe('Unsafe evaluation', () => {
        it('Should recognize a simple safe evaluation', () => {
          const result = compile('<div {{{evaluateMe}}}> </div>')
          const expected = wrapTopLevel(['<div ', unWrap(`$params['evaluateMe']`), '/>'])
          expect(result).toEqual(expected)
        })

        it('Should recognize a simple unsafe evaluation with spaces', () => {
          const result = compile('<input {{{ evaluateMe  }}} >')
          const expected = wrapTopLevel(['<input ', unWrap(`$params['evaluateMe']`), '/>'])
          expect(result).toEqual(expected)
        })

        it('Should recognize a simple unsafe evaluation with dots', () => {
          const result = compile('<input {{{evaluate.Me.again}}}/>')
          const expected = wrapTopLevel(['<input ', unWrap(`$params['evaluate']['Me']['again']`), '/>'])
          expect(result).toEqual(expected)
        })
      })

      describe('Look expression', () => {
        it('Should recognize a simple look up expression', () => {
          const result = compile('<article{{../parent}} ></article>')
          const expected = wrapTopLevel(['<article ', unWrap(`$params['..']['parent']`), '/>'])
          expect(result).toEqual(expected)
        })

        it('Should recognize a simple look up expression with spaces', () => {
          const result = compile('<span {{ ../parent  }}></span>')
          const expected = wrapTopLevel(['<span ', unWrap(`$params['..']['parent']`), '/>'])
          expect(result).toEqual(expected)
        })

        it('Should recognize a look up expression of many levels', () => {
          const result = compile('<span {{../../../parent}}></span>')
          const expected = wrapTopLevel(['<span ', unWrap(`$params['..']['..']['..']['parent']`), '/>'])
          expect(result).toEqual(expected)
        })

        it('Should recognize a look up expression of many levels with spaces', () => {
          const result = compile('<div {{  ../../../parent  }}></div>')
          const expected = wrapTopLevel(['<div ', unWrap(`$params['..']['..']['..']['parent']`), '/>'])
          expect(result).toEqual(expected)
        })
      })

      describe('Comments', () => {
        it('Should recognize a simple handlebars comment', () => {
          const result = compile('<div {{!-- Simple Comments 01 --}} ></div>')
          const expected = wrapTopLevel(['<div ', '', '/>'])
          expect(result).toEqual(expected)
        })

        it('Should recognize a handlebars comment with enters and spaces', () => {
          const result = compile('<input {{!-- Simple \n \t Comments    --}}>')
          const expected = wrapTopLevel(['<input ', '', '/>'])
          expect(result).toEqual(expected)
        })
      })
    })
    //
    // describe('generic block', () => {
    //   it('Should recognize a simple generic Handlebars block', () => {
    //     const result = compile('<div {{#generic}} {{/generic}}></div>')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body', () => {
    //     const result = compile('<input {{#generic }} type="date" {{/generic}} />')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body and (two elements)', () => {
    //     const result = compile('<input {{#generic }} class="error" type="blue" {{/generic}} >')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body and a simple parameter', () => {
    //     const result = compile('<article {{#generic param1}} disabled {{/generic}}></article>')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body and simple parameters', () => {
    //     const result = compile('<span {{#generic param1 param2}} enable {{/generic}}></span>')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body and a string parameter', () => {
    //     const result = compile('<div {{#generic}} {{/generic}}></div>')
    //   })
    //
    //   it('<div {{#generic "param1" }} type=\'HTML\' {{/generic}}></div>', () => {
    //     const result = compile('<div {{#generic}} {{/generic}}></div>')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body and a number parameter', () => {
    //     const result = compile('<div {{#generic 1 }} type="blueHTML"  {{/generic}}></div>')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body and a reference parameter', () => {
    //     const result = compile('<div {{#generic @index }} data-type="tranformer" {{/generic}}></div>')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body and a lookup parameter', () => {
    //     const result = compile('<code {{#generic ../../grandParent }} style=""  {{/generic}}></code>')
    //   })
    //
    //   it('Should recognize a simple generic Handlebars block with body and multi parameters', () => {
    //     const result = compile('<div {{#generic ../../grandParent 123 "string" simpleEval }} works  {{/generic}}></div>')
    //   })
    // })
  })
})
