export const PIECE_LIFTED = 'PIECE_LIFTED';

export function liftPiece(piece) {
    return {
        type: PIECE_LIFTED,
        payload: {
            piece
        }
    };
}

