// @flow

import React, {Component} from 'react'
import {Piece, Colors} from '../../game/pieces'
import Square from '../../game/board/square'
import bishopDarkUrl from './images/Chess_bdt45.svg'
import bishopLightUrl from './images/Chess_blt45.svg'
import kingDarkUrl from './images/Chess_kdt45.svg'
import kingLightUrl from './images/Chess_klt45.svg'
import knightDarkUrl from './images/Chess_ndt45.svg'
import knightLightUrl from './images/Chess_nlt45.svg'
import pawnDarkUrl from './images/Chess_pdt45.svg'
import pawnLightUrl from './images/Chess_plt45.svg'
import queenDarkUrl from './images/Chess_qdt45.svg'
import queenLightUrl from './images/Chess_qlt45.svg'
import rookDarkUrl from './images/Chess_rdt45.svg'
import rookLightUrl from './images/Chess_rlt45.svg'
import styles from './piece.scss'

export default class PieceComponent extends Component {
  render() {
    const piece = this.props.piece
    const color = piece.color == 1 ? 'black' : 'white'
    const classList = `piece ${color}`
    const text = piece.notation
    const x = piece.col * 100 + 5;
    const y = piece.row * 100 + 5;
    const style = {
      transform: `translate(${x}px, ${y}px)`
    }
    return (<div className={classList} style={style}>{ text }</div>)
    // return (<img className={'piece'} src={imageUrl} />)
  }
}
