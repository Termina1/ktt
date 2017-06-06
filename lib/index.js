// @flow
import handlebarsX from 'handlebars-ex-partials'
import walker from './walker'
import type { Codegen } from './types'
import PhpAdapter from './codegen/php'

export function compile (name: string, template: string, adapter: Codegen) {
  const ast = handlebarsX.parse(template)
  return walker(name, ast, adapter)
}

export function compileToPhp (name: string, template: string) {
  return compile(name, template, PhpAdapter)
}
