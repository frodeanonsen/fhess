// @flow

export default class Square {
  row: number
  col: number
  color: number

  constructor(row:number, col:number, color:number) {
    this.row = row
    this.col = col
    this.color = color
  }

  getRow() { return this.row }
  getCol() { return this.col }
  getColor() { return this.color }
}
