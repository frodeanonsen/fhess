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
        case 'knight': {
            return getValidKnightMoves(piece, paddedPosition)
        }
        case 'bishop': {
            return getValidBishopMoves(piece, paddedPosition)
        }
        default: {
            return [];
        }
    }
}

const getValidPawnMoves = (piece:Piece, position) => {
    
    let validPawnMoves = [];
    let direction;
    const { col, row, color } = piece;
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

const getValidKnightMoves = (piece:Piece, position) => {
    
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
        if (position[m.col][m.row]) {
            return position[m.col][m.row].color !== color;
        }
        return true;
    })
    
    // Determine move type
    validKnightMoves = validKnightMoves.map(m => {
        if (position[m.col][m.row]) {
            return { ...m , type: 'capture' };
        }
        return { ...m , type: 'move' };
    })
    
    //Add isKingInCheck check
    return validKnightMoves;
}

const getValidStraightLineMoves = (x, y, piece, position) => {
  
    const { col, row, color } = piece;
    
    let validMoves = [];
    let i = 1;
    
    while (true) {
        const newCol = col + (i * x);
        const newRow = row + (i * y);
      if(0 <= newCol && newCol <= 7 && 0 <= newRow && newRow <= 7) {
          if(!position[newCol][newRow]) {
              validMoves.push({col: newCol, row: newRow, type: 'move'})
              i++;
          } else if (!position[newCol][newRow].color !== color) {
              validMoves.push({col: newCol, row: newRow, type: 'capture'})
              break;
          } else if (!position[newCol][newRow].color === color) {
              break;
          }
      } else {
          break;
      }
    }
    return validMoves;
}

const getValidBishopMoves = (piece:Piece, position) => {
    
    let validBishopMoves = [];
    const { col, row, color } = piece;
  
    getValidStraightLineMoves(1, 1, piece, position).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(1, -1, piece, position).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(-1, 1, piece, position).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(-1, -1, piece, position).map(m => validBishopMoves.push(m));
    
    //Add isKingInCheck check
    return validBishopMoves;
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
