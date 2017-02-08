// @flow

import k from './king'
import q from './queen'
import r from './rook'
import b from './bishop'
import kn from './knight'
import p from './pawn'
import pi from './piece'
const uuid = require('uuid/v4');

export const King = k
export const Queen = q
export const Rook = r
export const Bishop = b
export const Knight = kn
export const Pawn = p
export const Piece = pi

export const Colors = { WHITE: 0, BLACK: 1 }

export const StartingPosition = [
  { col: 0, row: 0, pieceType: 'rook', color: 1, id: uuid() },
  { col: 1, row: 0, pieceType: 'knight', color: 1, id: uuid() },
  { col: 2, row: 0, pieceType: 'bishop', color: 1, id: uuid() },
  { col: 3, row: 0, pieceType: 'queen', color: 1, id: uuid() },
  { col: 4, row: 0, pieceType: 'king', color: 1, id: uuid() },
  { col: 5, row: 0, pieceType: 'bishop', color: 1, id: uuid() },
  { col: 6, row: 0, pieceType: 'knight', color: 1, id: uuid() },
  { col: 7, row: 0, pieceType: 'rook', color: 1, id: uuid() },
  { col: 0, row: 1, pieceType: 'pawn', color: 1, id: uuid() },
  { col: 1, row: 1, pieceType: 'pawn', color: 1, id: uuid() },
  { col: 2, row: 1, pieceType: 'pawn', color: 1, id: uuid() },
  { col: 3, row: 1, pieceType: 'pawn', color: 1, id: uuid() },
  { col: 4, row: 1, pieceType: 'pawn', color: 1, id: uuid() },
  { col: 5, row: 1, pieceType: 'pawn', color: 1, id: uuid() },
  { col: 6, row: 1, pieceType: 'pawn', color: 1, id: uuid() },
  { col: 7, row: 1, pieceType: 'pawn', color: 1, id: uuid() },
  { col: 0, row: 6, pieceType: 'pawn', color: 0, id: uuid() },
  { col: 1, row: 6, pieceType: 'pawn', color: 0, id: uuid() },
  { col: 2, row: 6, pieceType: 'pawn', color: 0, id: uuid() },
  { col: 3, row: 6, pieceType: 'pawn', color: 0, id: uuid() },
  { col: 4, row: 6, pieceType: 'pawn', color: 0, id: uuid() },
  { col: 5, row: 6, pieceType: 'pawn', color: 0, id: uuid() },
  { col: 6, row: 6, pieceType: 'pawn', color: 0, id: uuid() },
  { col: 7, row: 6, pieceType: 'pawn', color: 0, id: uuid() },
  { col: 0, row: 7, pieceType: 'rook', color: 0, id: uuid() },
  { col: 1, row: 7, pieceType: 'knight', color: 0, id: uuid() },
  { col: 2, row: 7, pieceType: 'bishop', color: 0, id: uuid() },
  { col: 3, row: 7, pieceType: 'queen', color: 0, id: uuid() },
  { col: 4, row: 7, pieceType: 'king', color: 0, id: uuid() },
  { col: 5, row: 7, pieceType: 'bishop', color: 0, id: uuid() },
  { col: 6, row: 7, pieceType: 'knight', color: 0, id: uuid() },
  { col: 7, row: 7, pieceType: 'rook', color: 0, id: uuid() }
]
