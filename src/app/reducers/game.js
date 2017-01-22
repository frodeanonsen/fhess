import { PIECE_LIFTED } from '../actions/index';
import Board from '../game/board'
import { StartingPosition } from '../game/pieces'

const initialState = {
    player1: 'Magnus Carlsen',
    player2: 'Sergej Karjakin',
    board: new Board(),
    position: {
        pieces: StartingPosition,
        blackCanCastle: true,
        whiteCanCastle: true,
        enPassantField: null,
        positionHistory: []
        
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PIECE_LIFTED:
            return state
        default:
            return state;
    }
};
