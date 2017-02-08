import Piece from '../../../game/pieces/piece'
import { getValidStraightLineMoves } from '../moves'

export const getValidRookMoves = (piece:Piece, paddedPosition) => {

    let validRookMoves = [];

    getValidStraightLineMoves(0, 1, piece, paddedPosition).map(m => validRookMoves.push(m));
    getValidStraightLineMoves(0, -1, piece, paddedPosition).map(m => validRookMoves.push(m));
    getValidStraightLineMoves(1, 0, piece, paddedPosition).map(m => validRookMoves.push(m));
    getValidStraightLineMoves(-1, 0, piece, paddedPosition).map(m => validRookMoves.push(m));

    return validRookMoves;
}
