// @flow

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

const resolveMove = (piece, paddedPosition, move) => {
    let newPosition = [ ...paddedPosition ];
    newPosition[piece.col][piece.row] = null;
    newPosition[move.col][move.row] = { ...piece, col: move.col, row: move.row };

    return newPosition;
}

const unpadPosition = (paddedPosition) => {
    let unpaddedPosition = []
   paddedPosition.forEach(r => {
       r.filter(p => p !== null).forEach(p => unpaddedPosition.push(p))
   });
    return unpaddedPosition;
}

const padPosition = (position) => {
    let paddedPosition = [];
    for(let i = 0; i < 8; i++){
        paddedPosition.push(new Array(8).fill(null));
    }

    position.map(p => paddedPosition[p.col][p.row] = { ...p });

    return paddedPosition;
}

const getValidPawnMoves = (piece:Piece, paddedPosition) => {

    let validPawnMoves = [];
    let direction;
    const { col, row, color } = piece;
    color === 0 ? direction = -1 : direction = 1

    // Add single stem move if not blocked
    if (!paddedPosition[col][row + direction]) {
        validPawnMoves.push({col: col, row: row + direction, type: 'move'})
    }
    // Add doubble step move if at starting position
    if (!paddedPosition[col][row + (2*direction)]) {
       if((color === 0 && row === 6) || (color === 1 && row === 1)) {
           validPawnMoves.push({col: col, row: row + (2*direction), type: 'move'})
       }
    }

    //Add capture moves if opposing piece is in range
    if (col - 1 >= 0 && paddedPosition[col - 1][row + direction] !== null && paddedPosition[col - 1][row + direction].color !== color) {
        validPawnMoves.push({col: col - 1, row: row + direction, type: 'capture'})
    }
    if (col + 1 <= 7 && paddedPosition[col + 1][row + direction] !== null && paddedPosition[col + 1][row + direction].color !== color) {
        validPawnMoves.push({col: col + 1, row: row + direction, type: 'capture'})
    }

    return validPawnMoves;
}
const getValidKingMoves = (piece:Piece, paddedPosition) => {

    let validKingMoves = [];
    const { col, row, color } = piece;
    const initialMoves = [
        { col: col + 1, row: row - 1 },
        { col: col + 1, row: row },
        { col: col + 1, row: row + 1 },
        { col: col, row: row + 1 },
        { col: col - 1, row: row + 1 },
        { col: col - 1, row: row },
        { col: col - 1, row: row - 1 },
        { col: col, row: row - 1 }
    ];

    // Filter out of bounds moves
    validKingMoves = initialMoves.filter(m => 0 <= m.col && m.col <= 7 && 0 <= m.row && m.row <= 7);

    // Filter moves blocked by own pieces
    validKingMoves = validKingMoves.filter(m => {
        if (paddedPosition[m.col][m.row]) {
            return paddedPosition[m.col][m.row].color !== color;
        }
        return true;
    })

    // Determine move type
    validKingMoves = validKingMoves.map(m => {
        if (paddedPosition[m.col][m.row]) {
            return { ...m , type: 'capture' };
        }
        return { ...m , type: 'move' };
    })

    return validKingMoves;
}


const getValidKnightMoves = (piece:Piece, paddedPosition) => {

    let validKnightMoves = [];
    const { col, row, color } = piece;
    const initialMoves = [
        { col: col + 1, row: row - 2 },
        { col: col + 2, row: row - 1 },
        { col: col + 2, row: row + 1 },
        { col: col + 1, row: row + 2 },
        { col: col - 1, row: row - 2 },
        { col: col - 2, row: row - 1 },
        { col: col - 2, row: row + 1 },
        { col: col - 1, row: row + 2 }
    ];

    // Filter out of bounds moves
    validKnightMoves = initialMoves.filter(m => 0 <= m.col && m.col <= 7 && 0 <= m.row && m.row <= 7);

    // Filter moves blocked by own pieces
    validKnightMoves = validKnightMoves.filter(m => {
        if (paddedPosition[m.col][m.row]) {
            return paddedPosition[m.col][m.row].color !== color;
        }
        return true;
    })

    // Determine move type
    validKnightMoves = validKnightMoves.map(m => {
        if (paddedPosition[m.col][m.row]) {
            return { ...m , type: 'capture' };
        }
        return { ...m , type: 'move' };
    })

    return validKnightMoves;
}

const getValidStraightLineMoves = (x, y, piece, paddedPosition) => {

    const { col, row, color } = piece;

    let validMoves = [];
    let i = 1;

    // Move in a straight line away from the piech and determine move validity and type.
    // Stop when an invalid move is found
    while (true) {
        const newCol = col + (i * x);
        const newRow = row + (i * y);
      if(0 <= newCol && newCol <= 7 && 0 <= newRow && newRow <= 7) {
          if(!paddedPosition[newCol][newRow]) {
              validMoves.push({col: newCol, row: newRow, type: 'move'})
              i++;
          } else if (paddedPosition[newCol][newRow].color !== color) {
              validMoves.push({col: newCol, row: newRow, type: 'capture'})
              break;
          } else if (paddedPosition[newCol][newRow].color === color) {
              break;
          }
      } else {
          break;
      }
    }
    return validMoves;
}

const getValidBishopMoves = (piece:Piece, paddedPosition) => {

    let validBishopMoves = [];

    getValidStraightLineMoves(1, 1, piece, paddedPosition).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(1, -1, piece, paddedPosition).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(-1, 1, piece, paddedPosition).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(-1, -1, piece, paddedPosition).map(m => validBishopMoves.push(m));

    return validBishopMoves;
}

const getValidRookMoves = (piece:Piece, paddedPosition) => {

    let validRookMoves = [];

    getValidStraightLineMoves(0, 1, piece, paddedPosition).map(m => validRookMoves.push(m));
    getValidStraightLineMoves(0, -1, piece, paddedPosition).map(m => validRookMoves.push(m));
    getValidStraightLineMoves(1, 0, piece, paddedPosition).map(m => validRookMoves.push(m));
    getValidStraightLineMoves(-1, 0, piece, paddedPosition).map(m => validRookMoves.push(m));

    return validRookMoves;
}

const getValidQueenMoves = (piece:Piece, paddedPosition) => {

    let validQueenMoves = [];

    getValidRookMoves(piece, paddedPosition).map(m => validQueenMoves.push(m));
    getValidBishopMoves(piece, paddedPosition).map(m => validQueenMoves.push(m));

    return validQueenMoves;
}

const isKingInCheck = (paddedPosition, color) => {

    // Find correct king in current position
    const king = paddedPosition.map(r => {
        return r.filter(p => {
            if(p !== null) {
                return (p.pieceType === 'king' && p.color === color);
            }
            return false;
        })[0]
    }).filter(p => p !== undefined)[0];

    // Make the king pretend its different piece types.
    // If it can capture a similar piece its in check.
    // Queens are both rooks and bishops in this context.
    if (getValidBishopMoves(king, paddedPosition).filter(m => m.type === 'capture')
        .filter(m => paddedPosition[m.col][m.row].pieceType === 'bishop' || paddedPosition[m.col][m.row].pieceType === 'queen').length > 0) {
        return true;
    }
    if (getValidRookMoves(king, paddedPosition).filter(m => m.type === 'capture')
        .filter(m => paddedPosition[m.col][m.row].pieceType === 'rook' || paddedPosition[m.col][m.row].pieceType === 'queen').length > 0) {
        return true;
    }
    if (getValidKnightMoves(king, paddedPosition).filter(m => m.type === 'capture')
        .filter(m => paddedPosition[m.col][m.row].pieceType === 'knight').length > 0) {
        return true;
    }
    return getValidPawnMoves(king, paddedPosition).filter(m => m.type === 'capture')
        .filter(m => paddedPosition[m.col][m.row].pieceType === 'pawn').length > 0;

}

const getValidMoves = (piece:Piece, position) => {

    const paddedPosition = padPosition(position.pieces);
    let validMoves;

    switch (piece.pieceType) {
        case 'pawn': {
            validMoves = getValidPawnMoves(piece, paddedPosition)
            break;
        }
        case 'knight': {
            validMoves = getValidKnightMoves(piece, paddedPosition)
            break;
        }
        case 'bishop': {
            validMoves = getValidBishopMoves(piece, paddedPosition)
            break;
        }
        case 'rook': {
            validMoves = getValidRookMoves(piece, paddedPosition)
            break;
        }
        case 'queen': {
            validMoves = getValidQueenMoves(piece, paddedPosition)
            break;
        }
        case 'king': {
            validMoves = getValidKingMoves(piece, paddedPosition)
            break;
        }
        default: {
            validMoves = [];
        }
    }
    return validMoves.filter(m => !isKingInCheck(resolveMove(piece, paddedPosition, m), piece.color));
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
