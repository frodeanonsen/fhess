/* eslint-env jest */
import Board from './index'
import { King, Queen, Rook, Bishop, Knight, Pawn, Colors } from '../pieces'

describe('the Board', () => {
  const board = new Board()

  it('has a black square at the bottom row, 7th column', () => {
    const square = board.getSquare(6, 7)
    expect(square.getColor()).toBe(Colors.BLACK)
  })

  it('has a black Rook in the top left corner', () => {
    board.initialize()
    const piece = board.getSquare(0, 0).getPiece()
    expect(piece instanceof Rook).toBe(true)
  })

  it('has a white King in position e1', () => {
    board.initialize()
    const piece = board.getSquare(7, 4).getPiece()
    expect(piece instanceof King).toBe(true)
    expect(piece.getColor()).toBe(Colors.WHITE)
  })

  it('has a black Pawn in position d7', () => {
    board.initialize()
    const piece = board.getSquare(1, 4).getPiece()
    expect(piece instanceof Pawn).toBe(true)
    expect(piece.getColor()).toBe(Colors.BLACK)
  })

  it('has a white Pawn in position d2', () => {
    board.initialize()
    const piece = board.getSquare(6, 4).getPiece()
    expect(piece instanceof Pawn).toBe(true)
    expect(piece.getColor()).toBe(Colors.WHITE)
  })
})
