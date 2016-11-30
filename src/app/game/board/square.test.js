/* eslint-env jest
 * @flow
 */

import Square from './square'
import { Colors } from '../pieces'

describe('square', () => {
  const r = 2
  const c = 1
  const s1 = new Square(r, c, Colors.BLACK)

  it(`is at row ${r} and column ${c}`, () => {
    expect(s1.getRow()).toBe(r)
    expect(s1.getCol()).toBe(c)
  })
})
