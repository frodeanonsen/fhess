// @flow

import Piece from './piece'

export default class Knight extends Piece {
  constructor(col:number, row:number, color:number) {
    super(col, row, color, 'knight', 'N')
  }
}
