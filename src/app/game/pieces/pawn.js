// @flow

import Piece from './piece'

export default class Pawn extends Piece {
  constructor(col:number, row:number, color:number) {
    super(col, row, color, 'pawn', 'p')
  }
}
