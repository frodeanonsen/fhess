import Pieces from './pieces'

class Game {
  constructor(player1, player2) {
    player1.pieces = new Pieces(Pieces.Colors.WHITE)
    player2.pieces = new Pieces(Pieces.Colors.BLACK)
  }
}

export default Game
