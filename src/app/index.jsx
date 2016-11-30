// @flow

import Game from './game'
import Player from './game/player'
import { Colors } from './game/pieces'
import ReactDom from 'react-dom'
import React from 'react'
import BoardComponent from './components/board'

const player1 = new Player('Magnus Carlsen', Colors.WHITE)
const player2 = new Player('Sergej Karjakin', Colors.BLACK)

const game = new Game(player1, player2)
game.initialize()

console.log(game)

ReactDom.render(<BoardComponent game={game}/>, document.getElementById('root'));
