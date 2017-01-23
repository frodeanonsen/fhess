// @flow

import Piece from './piece'

export default class Queen extends Piece {
  constructor(col:number, row:number, color:number) {
    super(col, row, color, 'queen', 'Q')
  }
}
