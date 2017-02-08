// @flow

import { Colors } from '../pieces'
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
      color = color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
    }
  }

  getSquareByRowCol(row:number, col:number) { return this.squares[row][col] }
}
