// @flow

import Game from './game'
import Player from './game/player'
import { Colors } from './game/pieces'

const player1 = new Player('Player 1', Colors.WHITE)
const player2 = new Player('Player 2', Colors.BLACK)

const game = new Game(player1, player2)

console.log(game)
