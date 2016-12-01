// @flow

import React from 'react'
import Square from '../../game/board/square'
import PieceComponent from '../piece'
import './square.scss'

export default class SquareComponent extends React.Component {
  render() {
    const square:Square = this.props.square
    const colorClass = square.color == 0 ? 'white' : 'black'
    const cssClasses = `square ${colorClass}`
    const piece = square.getPiece()
    return (
      <div className={cssClasses}>
        {piece !== undefined ? <PieceComponent piece={piece} /> : ''}
      </div>
      )
  }
}
