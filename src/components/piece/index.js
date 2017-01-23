// @flow

import React, {Component} from 'react'
import {Piece, Colors} from '../../game/pieces'
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
import './piece.css'

export default class PieceComponent extends Component {
  render() {
    const piece:Piece = this.props.piece
    let imageUrl = pawnLightUrl

    if (piece.pieceType === 'queen') {
      imageUrl = piece.getColor() === Colors.BLACK ? queenDarkUrl : queenLightUrl
    }

    if (piece.pieceType === 'king') {
      imageUrl = piece.getColor() === Colors.BLACK ? kingDarkUrl : kingLightUrl
    }

    if (piece.pieceType === 'rook') {
      imageUrl = piece.getColor() === Colors.BLACK ? rookDarkUrl : rookLightUrl
    }

    if (piece.pieceType === 'bishop') {
      imageUrl = piece.getColor() === Colors.BLACK ? bishopDarkUrl : bishopLightUrl
    }

    if (piece.pieceType === 'knight') {
      imageUrl = piece.getColor() === Colors.BLACK ? knightDarkUrl : knightLightUrl
    }

    if (piece.pieceType === 'pawn') {
      imageUrl = piece.getColor() === Colors.BLACK ? pawnDarkUrl : pawnLightUrl
    }
    return (<img className={'piece'} src={imageUrl} alt='piece' />)
  }
}
