export const PIECE_LIFTED = 'PIECE_LIFTED';

export function liftPiece(piece) {
    return {
        type: PIEVE_LIFTED,
        payload: {
            piece
        }
    };
}

