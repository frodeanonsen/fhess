import { PIECE_LIFTED, PIECE_PLACED } from '../actions/index';
import Board from '../game/board'
import { StartingPosition } from '../game/pieces'
import { Piece } from '../game/pieces/piece'

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

const getValidMoves = (piece:Piece, position) => {
    
    let paddedPosition = [];
    for(let i = 0; i < 8; i++){
        paddedPosition.push(new Array(8).fill(null));
    }
    
    position.pieces.map(p => paddedPosition[p.col][p.row] = { ...p });
    
    switch (piece.pieceType) {
        case 'pawn': {
            return getValidPawnMoves(piece, paddedPosition)
        }
        default: {
            return [];
        }
    }
}

const getValidPawnMoves = (piece:Piece, position) => {
    
    let validPawnMoves = [];
    let direction;
    const col = piece.col;
    const row = piece.row;
    const color = piece.color;
    color === 0 ? direction = -1 : direction = 1
    if (!position[col][row + direction]) {
        validPawnMoves.push({col: col, row: row + direction, type: 'move'})
    }
    if (!position[col][row + (2*direction)]) {
       if((color === 0 && row === 6) || (color === 1 && row === 1)) {
           validPawnMoves.push({col: col, row: row + (2*direction), type: 'move'})
       }
    }
    if (position[col - 1][row + direction] !== null && position[col - 1][row + direction].color !== color ) {
        validPawnMoves.push({col: col - 1, row: row + direction, type: 'capture'})
    }
    if (position[col + 1][row + direction] !== null && position[col + 1][row + direction].color !== color ) {
        validPawnMoves.push({col: col + 1, row: row + direction, type: 'capture'})
    }
    //Add isKingInCheck check
    return validPawnMoves;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PIECE_LIFTED: {
            const validMoves = getValidMoves(action.payload.piece, state.position);
            return state
        }
        case PIECE_PLACED: {
            const { piece, target } = action.payload;
            const validMoves = getValidMoves(action.payload.piece, state.position);
            if (validMoves.filter(m => m.col === action.payload.target.col && m.row === action.payload.target.row).length) {
               return {
                   ...state,
                   position: {
                     ...state.position,
                       pieces: state.position.pieces.map(p => {
                         if (p.col === piece.col && p.row === piece.row) {
                             return { ...p, col: target.col, row: target.row};
                         } else {
                             return p;
                         }
                       })
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
