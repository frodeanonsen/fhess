// @flow

import Player from './player'
import Board from './board'
import { StartingPosition, Piece } from './pieces'

export default class Game {
  player1: Player
  player2: Player
  board: Board
  position: Array<Piece>

  initialize () {
    this.position = StartingPosition
  }

  constructor (player1: Player, player2: Player) {
    this.player1 = player1
    this.player2 = player2
    this.board = new Board()
  }
}
