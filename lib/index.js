// @flow
import handlebarsX from 'handlebars-ex'
import walker from './lib/walker'
import type { Codegen } from './lib/types'
import PhpAdapter from './lib/codegen/php'

export function compile (name: string, template: string, adapter: Codegen) {
  const ast = handlebarsX.parse(template)
  return walker(name, ast, adapter)
}

export function compileToPhp (name: string, template: string) {
  return compile(name, template, PhpAdapter)
}
