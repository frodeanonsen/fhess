// @flow

import React, { Component } from 'react'
import { Colors } from '../../game/pieces'
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
import { Motion, spring } from 'react-motion'
import './piece.css'

export default class PieceComponent extends Component {

  constructor(props) {
    super(props)
    this.liftPiece = this.props.liftPiece
    this.placePiece = this.props.placePiece
    this.state = {
      isPressed: false,
      col: props.piece.col,
      row: props.piece.row,
      hoverCol: props.piece.col,
      hoverRow: props.piece.row,
      mouse: [0,0],
      delta: [0,0]
    }
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  handleMouseDown([pressX, pressY], {pageX, pageY}) {

    this.liftPiece(this.props.piece)
    this.setState({
      isPressed: true,
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY]
    })
  }

  handleMouseMove({pageX, pageY}) {
   const { isPressed, delta: [dx, dy] } = this.state;
    if(isPressed) {
      const mouse = [pageX - dx, pageY - dy];
      const hoverCol = Math.round((mouse[0]) / 100);
      const hoverRow = Math.round((mouse[1]) / 100);
      this.setState({mouse: mouse, hoverCol, hoverRow})
    }
  }

  handleMouseUp(e) {
    if (this.state.isPressed) {
      this.setState({isPressed: false})
      this.placePiece(this.props.piece, {col: this.state.hoverCol, row: this.state.hoverRow})
    }
  }

  render() {
    const { key, piece } = this.props
    const { isPressed, mouse: [mouseX, mouseY] } = this.state
    const x = piece.col * 100;
    const y = piece.row * 100;
    let motionStyle
    let imageUrl = pawnLightUrl

    if (piece.pieceType === 'queen') {
      imageUrl = piece.color === Colors.BLACK ? queenDarkUrl : queenLightUrl
    }

    if (piece.pieceType === 'king') {
      imageUrl = piece.color === Colors.BLACK ? kingDarkUrl : kingLightUrl
    }

    if (piece.pieceType === 'rook') {
      imageUrl = piece.color === Colors.BLACK ? rookDarkUrl : rookLightUrl
    }

    if (piece.pieceType === 'bishop') {
      imageUrl = piece.color === Colors.BLACK ? bishopDarkUrl : bishopLightUrl
    }

    if (piece.pieceType === 'knight') {
      imageUrl = piece.color === Colors.BLACK ? knightDarkUrl : knightLightUrl
    }

    if (piece.pieceType === 'pawn') {
      imageUrl = piece.color === Colors.BLACK ? pawnDarkUrl : pawnLightUrl
    }
    if (isPressed) {
      motionStyle = {
        translateX: spring(mouseX, [300, 40]),
        translateY: spring(mouseY, [300, 40]),
        scale: spring(1.2, [300, 40])
      }
    } else {
      motionStyle = {
        translateX: spring(x, [300, 40]),
        translateY: spring(y, [300, 40]),
        scale: spring(1, [300, 40])
      }
    }
    return (
      <Motion key={key} style={motionStyle}>
        { ({translateX, translateY, scale}) =>
          <div
            onMouseDown={this.handleMouseDown.bind(this, [x, y])}
            className="piece"
            style={{
              WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
              transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
            }}><img draggable="false" className="piece-image" src={imageUrl} alt="Piece"/></div>
        }
      </Motion>
    )
  }
}
