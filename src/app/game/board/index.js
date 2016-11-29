import { King, Queen, Rook, Bishop, Knight, Pawn, Colors } from '../pieces'
import Square from './square'

const colPositions = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 }

export default class Board {

  static letterPosToCol(letter) {
    return colPositions[letter.toLowerCase()]
  }

  constructor() {
    this.rows = 8
    this.cols = 8
    this.squares = [[null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null]]

    let color = Colors.WHITE

    for (let r = 0; r < this.rows; r += 1) {
      for (let c = 0; c < this.cols; c += 1) {
        this.squares[r][c] = new Square(r, c, color)
        color = color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
      }
    }
  }

  setupFirstRowPieces(col, color) {
    this.squares[col][0].setPiece(new Rook(color))
    this.squares[col][1].setPiece(new Knight(color))
    this.squares[col][2].setPiece(new Bishop(color))
    this.squares[col][3].setPiece(new Queen(color))
    this.squares[col][4].setPiece(new King(color))
    this.squares[col][5].setPiece(new Bishop(color))
    this.squares[col][6].setPiece(new Knight(color))
    this.squares[col][7].setPiece(new Rook(color))
  }

  setupPawnRow(col, color) {
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

  getSquareA(pos) {
    const [letterPos, numberPos] = pos.split('')
    const row = this.rows - numberPos
    const col = Board.letterPosToCol(letterPos)
    return this.squares[row][col]
  }

  getSquareByRowCol(row, col) { return this.squares[row][col] }
}
