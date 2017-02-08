import Piece from '../../../game/pieces/piece'
import { getValidStraightLineMoves } from '../moves'

export const getValidBishopMoves = (piece:Piece, paddedPosition) => {

    let validBishopMoves = [];

    getValidStraightLineMoves(1, 1, piece, paddedPosition).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(1, -1, piece, paddedPosition).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(-1, 1, piece, paddedPosition).map(m => validBishopMoves.push(m));
    getValidStraightLineMoves(-1, -1, piece, paddedPosition).map(m => validBishopMoves.push(m));

    return validBishopMoves;
}
