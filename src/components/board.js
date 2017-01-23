// @flow

import React from 'react'
import Game from '../game'
import SquareComponent from './square'

export default class BoardComponent extends React.Component {
  render() {
    const game:Game = this.props.game
    const { board } = game

    const s = []

    for (let c = 0; c < 8; c += 1) {
      const col = []
      for (let r = 0; r < 8; r += 1) {
        col.push(board.getSquareByRowCol(r, c))
      }
      s.push(col)
    }

    let rowNum = 0
    const rows = s.map(row => {
    rowNum++
      return (
        <div key={`r${rowNum}`} className='row'>
          {row.map( square => {
            const id = `${square.getCol()}x${square.getRow()}`
            return (<SquareComponent key={id} square={square} />)
         })}
        </div>
      )
    })

    return (
      <div>
        {rows}
      </div>
    )
  }
}
