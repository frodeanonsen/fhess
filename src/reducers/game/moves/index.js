import { getValidPawnMoves } from './pawn'
import { getValidKingMoves } from './king'
import { getValidQueenMoves } from './queen'
import { getValidRookMoves } from './rook'
import { getValidKnightMoves } from './knight'
import { getValidBishopMoves } from './bishop'

export const resolveMove = (piece, paddedPosition, move) => {
    let newPosition = [ ...paddedPosition ];
    newPosition[piece.col][piece.row] = null;
    newPosition[move.col][move.row] = { ...piece, col: move.col, row: move.row };

    return newPosition;
}

export const unpadPosition = (paddedPosition) => {
    let unpaddedPosition = []
    paddedPosition.forEach(r => {
        r.filter(p => p !== null).forEach(p => unpaddedPosition.push(p))
    });
    return unpaddedPosition;
}

export const padPosition = (position) => {
    let paddedPosition = [];
    for(let i = 0; i < 8; i++){
        paddedPosition.push(new Array(8).fill(null));
    }

    position.map(p => paddedPosition[p.col][p.row] = { ...p });

    return paddedPosition;
}

export const getValidStraightLineMoves = (x, y, piece, paddedPosition) => {

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

export const getValidMoves = (piece:Piece, position) => {

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
