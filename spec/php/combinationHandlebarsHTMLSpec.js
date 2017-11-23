/* eslint-env node, jasmine */
const { wrapTopLevel, compile, ifWrap, unWrap } = require('../tool')

describe('Combination Handlebars & HTML', () => {
  it('Should recognize a simple address template', () => {
    const result = compile(`<span class="address-container-line"> \
    <p class="address-container-city" name="city"> \
      {{city}} \
    </p> \
    {{#if showState}} \
      <p class="address-container-state" name="state"> \
        {{state}} \
      </p> \
    {{/if}} \
    <p class="address-container-zip" name="zip"> \
      {{zip}} \
    </p> \
  </span>`)
    const expected = wrapTopLevel([
      '<span ', 'class="address-container-line"', '>',
      '<p ', 'class="address-container-city"', ' ', 'name="city"', '>',
      unWrap('hbarsEscape($params[\'city\'])'),
      '</p>',
      ifWrap([
        '<p ', 'class="address-container-state"', ' ', 'name="state"', '>',
        unWrap('hbarsEscape($params[\'state\'])'),
        '</p>'
      ], [], 'showState'),
      '<p ', 'class="address-container-zip"', ' ', 'name="zip"', '>',
      unWrap('hbarsEscape($params[\'zip\'])'),
      '</p>',
      '</span>'
    ])
    expect(result).toEqual(expected)
  })
})
