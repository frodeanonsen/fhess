import Piece from '../../../game/pieces/piece'

export const getValidKingMoves = (piece:Piece, paddedPosition) => {

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