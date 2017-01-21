// @flow

import k from './king'
import q from './queen'
import r from './rook'
import b from './bishop'
import kn from './knight'
import p from './pawn'
import pi from './piece'

export const King = k
export const Queen = q
export const Rook = r
export const Bishop = b
export const Knight = kn
export const Pawn = p
export const Piece = pi

export const Colors = { WHITE: 0, BLACK: 1 }

export const StartingPosition = [
  new r(0,0,0),
  new kn(1,0,0),
  new b(2,0,0),
  new q(3,0,0),
  new k(4,0,0),
  new b(5,0,0),
  new kn(6,0,0),
  new r(7,0,0),
  new p(0,1,0),
  new p(1,1,0),
  new p(2,1,0),
  new p(3,1,0),
  new p(4,1,0),
  new p(5,1,0),
  new p(6,1,0),
  new p(7,1,0),
  new p(0,6,1),
  new p(1,6,1),
  new p(2,6,1),
  new p(3,6,1),
  new p(4,6,1),
  new p(5,6,1),
  new p(6,6,1),
  new p(7,6,1),
  new r(0,7,1),
  new kn(1,7,1),
  new b(2,7,1),
  new q(3,7,1),
  new k(4,7,1),
  new b(5,7,1),
  new kn(6,7,1),
  new r(7,7,1),
]
