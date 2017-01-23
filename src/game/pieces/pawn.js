// @flow

import Piece from './piece'

export default class Pawn extends Piece {
  constructor(color:number) {
    super(color, 'pawn')
  }
}
