import Piece from '../../../game/pieces/piece'

export const getValidKnightMoves = (piece:Piece, paddedPosition) => {

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