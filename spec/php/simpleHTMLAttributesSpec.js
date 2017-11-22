/* eslint-env node, jasmine */

const { compileToPhp: compile } = require('../../dist/index')

const DEFAUL_TPL_NAME = 'test';

function wrapTopLevel (result) {
  return `
function handlebarsTemplate_${DEFAUL_TPL_NAME}($params) {
  return ${result};
}`
}

describe('Simple HTML Attributes', () => {
  describe('key value nodes', () => {
    it('Should recognize key-value with one value using double quotes', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div data-type="controller"></div>')
      const expected = wrapTopLevel(`'<div ' . 'data-type="controller"' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize key-value with none value using double quotes', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div data-type=""></div>')
      const expected = wrapTopLevel(`'<div ' . 'data-type=""' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize key-value with two value using double quotes', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div class="blue red"></div>')
      const expected = wrapTopLevel(`'<div ' . 'class="blue red"' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize key-value with one value using single quotes', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div data-type=\'controller\'></div>')
      const expected = wrapTopLevel(`'<div ' . 'data-type="controller"' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize key-value with none value using single quotes', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div data-type=\'\'></div>')
      const expected = wrapTopLevel(`'<div ' . 'data-type=""' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize key-value with two value using single quotes', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div class=\'blue red\'></div>')
      const expected = wrapTopLevel(`'<div ' . 'class="blue red"' . '/>'`)
      expect(result).toEqual(expected)
    })
  })

  describe('single keys nodes', () => {
    it('Should recognize single key', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div checked ></div>')
      const expected = wrapTopLevel(`'<div ' . 'checked' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize two single keys', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div checked disabled ></div>')
      const expected = wrapTopLevel(`'<div ' . 'checked' . ' ' . 'disabled' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize two single keys (one with single quotes)', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div checked \'disabled\' ></div>')
      const expected = wrapTopLevel(`'<div ' . 'checked' . ' ' . 'disabled' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize two single keys (one with double quotes)', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div checked "disabled" ></div>')
      const expected = wrapTopLevel(`'<div ' . 'checked' . ' ' . 'disabled' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize two single keys (one with double quotes and the other with single quotes)', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div "checked" \'disabled\' ></div>')
      const expected = wrapTopLevel(`'<div ' . 'checked' . ' ' . 'disabled' . '/>'`)
      expect(result).toEqual(expected)
    })

    it('Should recognize single keys nodes mixed', () => {
      const result = compile(DEFAUL_TPL_NAME, '<div "checked" ok-value testing \'disabled\' ></div>')
      const expected = wrapTopLevel(`'<div ' . 'checked' . ' ' . 'ok-value' . ' ' . 'testing' . ' ' . 'disabled' . '/>'`)
      expect(result).toEqual(expected)
    })
  })
})
