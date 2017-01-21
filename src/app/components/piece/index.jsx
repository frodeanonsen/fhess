// @flow

import React, {Component} from 'react'
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
            className={classList}
            style={{
              WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
              transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
            }}>{ text }</div>
        }
      </Motion>
    )
  }
}
