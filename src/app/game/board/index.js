// @flow

import { King, Queen, Rook, Bishop, Knight, Pawn, Colors } from '../pieces'
import Square from './square'

const colPositions = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 }

export default class Board {

  static letterPosToCol(letter) {
    return colPositions[letter.toLowerCase()]
  }

  rows: number
  cols: number
  squares: Square[][]

  constructor() {
    this.rows = 8
    this.cols = 8
    this.squares = []
    let color = Colors.WHITE

    for (let r = 0; r < this.rows; r += 1) {
      const row:Square[] = []
      for (let c = 0; c < this.cols; c += 1) {
        row.push(new Square(r, c, color))
        color = color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
      }
      this.squares.push(row)
    }
  }

  setupFirstRowPieces(col: number, color:number) {
    this.squares[col][0].setPiece(new Rook(color))
    this.squares[col][1].setPiece(new Knight(color))
    this.squares[col][2].setPiece(new Bishop(color))
    this.squares[col][3].setPiece(new Queen(color))
    this.squares[col][4].setPiece(new King(color))
    this.squares[col][5].setPiece(new Bishop(color))
    this.squares[col][6].setPiece(new Knight(color))
    this.squares[col][7].setPiece(new Rook(color))
  }

  setupPawnRow(col: number, color:number) {
    for (let row = 0; row < this.rows; row += 1) {
      this.squares[col][row].setPiece(new Pawn(color))
    }
  }

  initialize() {
    this.setupFirstRowPieces(0, Colors.BLACK)
    this.setupFirstRowPieces(7, Colors.WHITE)
    this.setupPawnRow(1, Colors.BLACK)
    this.setupPawnRow(6, Colors.WHITE)
  }

  getSquareA(pos:string) {
    const [letterPos:string, numberPos:number] = pos.split('')
    const row = this.rows - parseInt(numberPos)
    const col = Board.letterPosToCol(letterPos)
    return this.squares[row][col]
  }

  getSquareByRowCol(row:number, col:number) { return this.squares[row][col] }
}
