// @flow

export const PIECE_LIFTED = 'PIECE_LIFTED';
export const PIECE_PLACED = 'PIECE_PLACED';

export function liftPiece(piece) {
    return {
        type: PIECE_LIFTED,
        payload: {
            piece
        }
    };
}

export function placePiece(piece, target) {
    return {
        type: PIECE_PLACED,
        payload: {
            piece,
            target
        }
    };
}
