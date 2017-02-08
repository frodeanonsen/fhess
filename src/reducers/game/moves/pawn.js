export const getValidPawnMoves = (piece:Piece, paddedPosition) => {

    let validPawnMoves = [];
    let direction;
    const { col, row, color } = piece;
    color === 0 ? direction = -1 : direction = 1

    // Add single stem move if not blocked
    if (!paddedPosition[col][row + direction]) {
        validPawnMoves.push({col: col, row: row + direction, type: 'move'})
    }
    // Add doubble step move if at starting position
    if (!paddedPosition[col][row + (2*direction)]) {
       if((color === 0 && row === 6) || (color === 1 && row === 1)) {
           validPawnMoves.push({col: col, row: row + (2*direction), type: 'move'})
       }
    }

    //Add capture moves if opposing piece is in range
    if (col - 1 >= 0 && paddedPosition[col - 1][row + direction] !== null && paddedPosition[col - 1][row + direction].color !== color) {
        validPawnMoves.push({col: col - 1, row: row + direction, type: 'capture'})
    }
    if (col + 1 <= 7 && paddedPosition[col + 1][row + direction] !== null && paddedPosition[col + 1][row + direction].color !== color) {
        validPawnMoves.push({col: col + 1, row: row + direction, type: 'capture'})
    }

    return validPawnMoves;
}