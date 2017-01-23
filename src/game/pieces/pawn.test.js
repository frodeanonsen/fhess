/* eslint-env jest
 * @flow
 */

import { Colors, Pawn } from './index'

describe('the Pawn piece', () => {
  const p1 = new Pawn( Colors.BLACK)

  it('can have a color', () => {
    expect(p1.color).toBe(Colors.BLACK)
  })
})
