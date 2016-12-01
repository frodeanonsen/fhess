// @flow

import Game from './game'
import Player from './game/player'
import { Colors } from './game/pieces'
import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import React from 'react'
import BoardComponent from './components/board'

const player1 = new Player('Magnus Carlsen', Colors.WHITE)
const player2 = new Player('Sergej Karjakin', Colors.BLACK)

const game = new Game(player1, player2)
game.initialize()

console.log("Starting")

const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <BoardComponent game={game} />
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./components/board', () => {
    const NextApp = require('./components/board').default
    ReactDOM.render(
      <AppContainer>
        <NextApp game={game} />
      </AppContainer>,
      rootEl
    )
  });
}
