/* eslint-env node, jasmine */
const { wrapTopLevel, compile } = require('../tool')

describe('Simple HTML', () => {
  describe('block nodes', () => {
    it('Should recognize simple block elements (div)', () => {
      const result = compile('<div></div>')
      const expected = wrapTopLevel(['<div/>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize simples block elements (div) together', () => {
      const result = compile('<div></div><div></div>')
      const expected = wrapTopLevel(['<div/>', '<div/>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize simple block elements (span)', () => {
      const result = compile('<span></span>')
      const expected = wrapTopLevel(['<span/>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize simple block elements omitting spaces', () => {
      const result = compile(' <div     >    </div>')
      const expected = wrapTopLevel(['<div/>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize nested simple block elements', () => {
      const result = compile('<div><div></div></div>')
      const expected = wrapTopLevel(['<div>', '<div/>', '</div>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize nested simple block elements, divs and block inputs', () => {
      const result = compile('<div><input></input></div>')
      const expected = wrapTopLevel(['<div>', '<input/>', '</div>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize nested simple block elements omitting spaces', () => {
      const result = compile('<div>   \n  <div>\n</div>    </div>')
      const expected = wrapTopLevel(['<div>', '<div/>', '</div>'])
      expect(result).toEqual(expected)
    })
  })

  describe('single nodes', () => {
    it('Should recognize simple single elements (input)', () => {
      const result = compile('<input/>')
      const expected = wrapTopLevel(['<input/>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize simple single elements (hr)', () => {
      const result = compile('<hr/>')
      const expected = wrapTopLevel(['<hr/>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize a simple single elements (hr) in-line with a block element', () => {
      const result = compile('<hr/><input></input>')
      const expected = wrapTopLevel(['<hr/>', '<input/>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize two simple single elements (hr & area)', () => {
      const result = compile('<hr/><area/>')
      const expected = wrapTopLevel(['<hr/>', '<area/>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize html comments', () => {
      const result = compile('<!-- This is a comment -->')
      const expected = wrapTopLevel(['<!-- This is a comment -->'])
      expect(result).toEqual(expected)
    })

    it('Should recognize two html comments', () => {
      const result = compile('<!-- This is a comment --><!-- This is a comment also -->')
      const expected = wrapTopLevel(['<!-- This is a comment -->', '<!-- This is a comment also -->'])
      expect(result).toEqual(expected)
    })

    it('Should recognize two html comments', () => {
      const result = compile('<span> <!-- This is a comment --> </span>')
      const expected = wrapTopLevel(['<span>', '<!-- This is a comment -->', '</span>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize simple text', () => {
      const result = compile('This is a text node')
      const expected = wrapTopLevel(['This is a text node'])
      expect(result).toEqual(expected)
    })

    it('Should recognize simple text with single quotes', () => {
      const result = compile('\'This is a text node\'')
      const expected = wrapTopLevel(['\'This is a text node\''])
      expect(result).toEqual(expected)
    })

    it('Should recognize simple text with double quotes', () => {
      const result = compile('"This is a text node"')
      const expected = wrapTopLevel(['"This is a text node"'])
      expect(result).toEqual(expected)
    })

    it('Should recognize simple text nested in block nodes', () => {
      const result = compile('<div>This is a text node</div>')
      const expected = wrapTopLevel(['<div>', 'This is a text node', '</div>'])
      expect(result).toEqual(expected)
    })

    it('Should recognize simple text nested in block nodes with a single node in-line', () => {
      const result = compile('<div>This is a text node</div><hr/>')
      const expected = wrapTopLevel(['<div>', 'This is a text node', '</div>', '<hr/>'])
      expect(result).toEqual(expected)
    })
  })
})
