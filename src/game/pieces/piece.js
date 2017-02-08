// @flow
const uuid = require('uuid/v4');

export default class Piece {
  col:number
  row:number
  color:number
  pieceType:string
  notation:string

  constructor(col:number, row:number, color:number, pieceType:string, notation:string) {
    this.id = uuid();
    this.color = color
    this.pieceType = pieceType
    this.notation = notation
    this.col = col
    this.row = row
  }

  getColor() { return this.color }

  getNotation() { return this.notation }
}
