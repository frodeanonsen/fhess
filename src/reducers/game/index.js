// @flow

import { PIECE_LIFTED, PIECE_PLACED } from '../../actions/index';
import Board from '../../game/board'
import { StartingPosition } from '../../game/pieces'
import { getValidMoves, padPosition, unpadPosition, resolveMove } from './moves'

const initialState = {
    player1: 'Magnus Carlsen',
    player2: 'Sergej Karjakin',
    board: new Board(),
    position: {
        pieces: StartingPosition,
        blackCanCastle: true,
        whiteCanCastle: true,
        enPassantSquare: null,
        positionHistory: []
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PIECE_LIFTED: {
            // const validMoves = getValidMoves(action.payload.piece, state.position);
            return state
        }
        case PIECE_PLACED: {
            const { piece, target } = action.payload;
            const validMoves = getValidMoves(piece, state.position);
            const move = validMoves.filter(m => m.col === target.col && m.row === target.row)[0];
            if (move) {
               return {
                   ...state,
                   position: {
                     ...state.position,
                       pieces: unpadPosition(resolveMove(action.payload.piece, padPosition(state.position.pieces), move))
                   }
               }
            }
            return {
                ...state,
                board: new Board()
            }
        }
        default:
            return state;
    }
};
