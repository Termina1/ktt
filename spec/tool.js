const DEFAUL_TPL_NAME = 'test'
const { compileToPhp } = require('../dist/index')

function wrap (result) {
  return result.map(el => typeof el === 'object' ? el.el : `'${el}'`)
    .join(' . ')
}

function eachWrap (block, param = 'iterator') {
  return unWrap(`implode('', array_map(function($params) { return ${wrap(block)}; }, $params['${param}']))`)
}

function unWrap (el) {
  return {
    type: 'unwrap',
    el
  }
}

function ifWrap (ifBody, elseBody, param = 'condition') {
  const ifPlace = ifBody.length > 0 ? wrap(ifBody) : `''`
  const elsePlace = elseBody.length > 0 ? wrap(elseBody) : `''`
  return unWrap(`($params['${param}'] ? (${ifPlace}) : (${elsePlace}))`)
}

function unlessWrap (ifBody, elseBody, param = 'condition') {
  const ifPlace = ifBody.length > 0 ? wrap(ifBody) : `''`
  const elsePlace = elseBody.length > 0 ? wrap(elseBody) : `''`
  return unWrap(`(!$params['${param}'] ? (${ifPlace}) : (${elsePlace}))`)
}

function wrapTopLevel (result) {
  result = wrap(result)
  return ` function handlebarsTemplate_${DEFAUL_TPL_NAME}($params) { return ${result}; }`
}

function compile (template) {
  return compileToPhp(DEFAUL_TPL_NAME, template).replace(/\s*\n\s*/g, ' ')
}

module.exports = {
  wrapTopLevel,
  DEFAUL_TPL_NAME,
  compile,
  wrap,
  eachWrap,
  ifWrap,
  unlessWrap,
  unWrap
}
