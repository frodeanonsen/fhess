// @flow

import Piece from '../pieces/piece'

export default class Square {
  row: number
  col: number
  color: number
  currentPiece: Piece

  constructor(row:number, col:number, color:number) {
    this.row = row
    this.col = col
    this.color = color
  }

  setPiece(piece:Piece) { this.currentPiece = piece }
  getPiece() { return this.currentPiece }

  getRow() { return this.row }
  getCol() { return this.col }

  getColor() { return this.color }
}
