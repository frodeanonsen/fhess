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
import { Motion, spring } from 'react-motion'

export default class PieceComponent extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isPressed: false
    }
  }
  
  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }
  
  handleMouseDown() {
    this.setState({
      isPressed: true
    })
    
  }
  
  handleMouseUp() {
    this.setState({isPressed: false})
  }
  
  render() {
    const { key, piece } = this.props
    const { isPressed } = this.state
    const color = piece.color == 1 ? 'black' : 'white'
    const classList = `piece ${color}`
    const text = piece.notation
    const x = piece.col * 100 + 5;
    const y = piece.row * 100 + 5;
    let motionStyle
    let imageUrl = pawnLightUrl
  
    if (piece.pieceType == 'queen') {
      imageUrl = piece.getColor() == Colors.BLACK ? queenDarkUrl : queenLightUrl
    }
  
    if (piece.pieceType == 'king') {
      imageUrl = piece.getColor() == Colors.BLACK ? kingDarkUrl : kingLightUrl
    }
  
    if (piece.pieceType == 'rook') {
      imageUrl = piece.getColor() == Colors.BLACK ? rookDarkUrl : rookLightUrl
    }
  
    if (piece.pieceType == 'bishop') {
      imageUrl = piece.getColor() == Colors.BLACK ? bishopDarkUrl : bishopLightUrl
    }
  
    if (piece.pieceType == 'knight') {
      imageUrl = piece.getColor() == Colors.BLACK ? knightDarkUrl : knightLightUrl
    }
  
    if (piece.pieceType == 'pawn') {
      imageUrl = piece.getColor() == Colors.BLACK ? pawnDarkUrl : pawnLightUrl
    }
    if (isPressed) {
      motionStyle = {
        translateX: spring(x),
        translateY: spring(y),
        scale: spring(1.2, [180, 10])
      }
    } else {
      motionStyle = {
        translateX: spring(x),
        translateY: spring(y),
        scale: spring(1, [180, 10])
      }
    }
    return (
      <Motion key={key} style={motionStyle}>
        { ({translateX, translateY, scale}) =>
          <div
            onMouseDown={this.handleMouseDown.bind(this)}
            className="piece"
            style={{
              WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
              transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
            }}><img className="piece-image" src={imageUrl}/></div>
        }
      </Motion>
    )
  }
}
