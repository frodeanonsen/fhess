// @flow

import Piece from './piece'

export default class Rook extends Piece {
  constructor(col:number, row:number, color:number) {
    super(col, row, color, 'rook', 'R')
  }
}
