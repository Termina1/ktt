/* eslint-env node, jasmine */
const { wrapTopLevel, compile, wrap } = require('../tool')

describe('Handlebars nodes', () => {
  describe('blocks statements', () => {
    describe('if block', () => {
      it('Should recognize a simple Handlebars if block', () => {
        // const result = compile('{{#if condition}} <div></div><div></div> {{else}} <input/> {{/if}}')
        // const expected = wrapTopLevel(['<div ', '($params[\'condition\'] ? (\' \') : (\'\'))', '/>'])
        // expect(result).toEqual(expected)
      })
    })

    describe('each block', () => {
      // it('Should recognize a simple Handlebars each block with body', () => {
      //   const result = compile('{{#each iterator}} <address></address><div></div> {{/each}}')
      //   const expected = wrapTopLevel(['<div ', '($params[\'condition\'] ? (\' \') : (\'\'))', '/>'])
      //   expect(result).toEqual(expected)
      // })
    })
  })
})
