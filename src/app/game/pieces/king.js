// @flow

import Piece from './piece'

export default class King extends Piece {
  constructor(col:number, row:number, color:number) {
    super(col, row, color, 'king', 'K')
  }
}
