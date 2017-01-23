// @flow

import React from 'react'
import Square from '../../game/board/square'
import PieceComponent from '../piece'
import './square.css'

export default class SquareComponent extends React.Component {
  render() {
    const square:Square = this.props.square
    const colorClass = square.color === 0 ? 'white' : 'black'
    const cssClasses = `square ${colorClass}`
    return (
      <div className={cssClasses}>
      </div>
      )
  }
}
