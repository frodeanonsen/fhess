import Piece from '../../../game/pieces/piece'
import { getValidRookMoves } from './rook'
import { getValidBishopMoves } from './bishop'

export const getValidQueenMoves = (piece:Piece, paddedPosition) => {

    let validQueenMoves = [];

    getValidRookMoves(piece, paddedPosition).map(m => validQueenMoves.push(m));
    getValidBishopMoves(piece, paddedPosition).map(m => validQueenMoves.push(m));

    return validQueenMoves;
}