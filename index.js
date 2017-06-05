// @flow
import handlebarsX from 'handlebars-ex'
import walker from './lib/walker'
import type { Codegen } from './lib/types'
import PhpAdapter from './lib/codegen/php'

export function compile (template: string, adapter: Codegen) {
  const ast = handlebarsX.parse(template)
  return walker(ast, adapter)
}

const test = '<span class="address-container-line"> \
					<p class="address-container-city" name="city"> \
						{{city}} \
					</p> \
					{{#if showState}} \
						<p class="address-container-state" name="state"> \
							{{state}} \
						</p> \
            <br test="1" test32="10" /> \
					{{/if}} \
					<p class="address-container-zip" name="zip"> \
						{{zip}} \
					</p> \
				</span>'
console.log(compile(test, PhpAdapter))
