// @flow

import Piece from './piece'

export default class Bishop extends Piece {
  constructor(col:number, row:number, color:number) {
    super(col, row, color, 'bishop', 'B')
  }
}
