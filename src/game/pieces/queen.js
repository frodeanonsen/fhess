// @flow

import Piece from './piece'

export default class Queen extends Piece {
  constructor(color:number) {
    super(color, 'queen')
  }
}
