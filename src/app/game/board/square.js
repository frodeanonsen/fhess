export default class Square {

  constructor(row, col, color) {
    this.row = row
    this.col = col
    this.color = color
  }

  setPiece(piece) { this.currentPiece = piece }
  getPiece() { return this.currentPiece }

  getRow() { return this.row }
  getCol() { return this.col }

  getColor() { return this.color }
}
