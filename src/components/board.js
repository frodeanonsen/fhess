// @flow

import React from 'react'
import { connect } from 'react-redux'
import Game from '../game'
import SquareComponent from './square'
import PieceComponent from './piece'
import { liftPiece, placePiece } from '../actions'

class BoardComponent extends React.Component {

  render() {
    const game:Game = this.props.game
    const { board } = game
    const { liftPiece, placePiece } = this.props

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


    const piecesComps = game.position.pieces.map( (p) => {
      return (
        <PieceComponent key={p.id} piece={p} liftPiece={liftPiece} placePiece={placePiece}/>
      )
    })

    return (
      <div>
        <div>
          {rows}
        </div>
        <div>
          {piecesComps}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return { game: state }
  },
  (dispatch) => {
    return {
      liftPiece: piece => dispatch(liftPiece(piece)),
      placePiece: (piece, target) => dispatch(placePiece(piece, target)),
    }
  }
)(BoardComponent)
