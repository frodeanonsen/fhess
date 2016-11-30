// @flow

import Player from './player'

export default class Game {
  player1: Player
  player2: Player

  constructor(player1:Player, player2:Player) {
    this.player1 = player1
    this.player2 = player2
  }
}
