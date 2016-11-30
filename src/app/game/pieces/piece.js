// @flow

export default class Piece {
  color:number
  pieceType:string

  constructor(color:number, pieceType:string) {
    this.color = color
    this.pieceType = pieceType
  }

  getColor() { return this.color }
}
