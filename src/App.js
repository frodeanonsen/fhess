// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Player from './game/player'
import { Colors } from './game/pieces'
import BoardComponent from './components/board'
import configureStore from './configureStore'
import './App.css'

const player1 = new Player('Magnus Carlsen', Colors.WHITE)
const player2 = new Player('Sergej Karjakin', Colors.BLACK)

const store = configureStore()

class App extends Component {

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <div>Player 1: {player1.name}</div>
          <div>Player 2: {player2.name}</div>
        </div>
        <Provider store={store}>
          <BoardComponent />
        </Provider>
      </div>
    )
  }
}

export default App
