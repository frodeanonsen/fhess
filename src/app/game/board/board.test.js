/* eslint-env jest
 * flow
*/

import Board from './index'
import { King, Queen, Rook, Bishop, Knight, Pawn, Colors } from '../pieces'

describe('an initialized board', () => {
  const board = new Board()
  board.initialize()

  it('has a black square at the bottom row, 7th column', () => {
    const square = board.getSquareByRowCol(6, 7)
    expect(square.getColor()).toBe(Colors.BLACK)
  })

  it('has a black Rook in the top left corner', () => {
    const piece = board.getSquareByRowCol(0, 0).getPiece()
    expect(piece instanceof Rook).toBe(true)
    expect(piece.getColor()).toBe(Colors.BLACK)
  })

  it('has a white King in position e1', () => {
    const piece = board.getSquareA('E1').getPiece()
    expect(piece instanceof King).toBe(true)
    expect(piece.getColor()).toBe(Colors.WHITE)
  })

  it('has a black Pawn in position d7', () => {
    const piece = board.getSquareA('d7').getPiece()
    expect(piece instanceof Pawn).toBe(true)
    expect(piece.getColor()).toBe(Colors.BLACK)
  })

  it('has a white Queen in position d1', () => {
    const piece = board.getSquareA('d1').getPiece()
    expect(piece instanceof Queen).toBe(true)
    expect(piece.getColor()).toBe(Colors.WHITE)
  })
})
