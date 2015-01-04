import Convert from './bezier-convert'
import Point from './Point'
import {abscissae, weights} from './gauss-legendre-quadrature'

let coefficients = (x1, x2, x3, x4) => [x4-x1+3*(x2-x3), 3*x1-6*x2+3*x3, 3*(x2-x1), x1] // cubic coefficients
let derivative1_for = (t, a, b, c) => c + t * (2 * b + 3 * a * t)                       // cubic derivative

function length(bezier, t) {
  t = typeof t === 'undefined' ? 1 : t
  let x1 = bezier[0][0], y1 = bezier[0][1],
      x2 = bezier[1][0], y2 = bezier[1][1],
      x3 = bezier[2][0], y3 = bezier[2][1],
      x4 = bezier[3][0], y4 = bezier[3][1]
  // cubic coefficients
  let ax = x4-x1+3*(x2-x3), ay = y4-y1+3*(y2-y3),
      bx = 3*x1-6*x2+3*x3,  by = 3*y1-6*y2+3*y3,
      cx = 3*(x2-x1),       cy = 3*(y2-y1)
  let z2 = t / 2
  let sum = 0
  for (let i = 0; i < abscissae.length; i++) {
    let adjT = z2 * abscissae[i] + z2
    // cubic derivatives
    let dx = cx + adjT * (2 * bx + 3 * ax * adjT),
        dy = cy + adjT * (2 * by + 3 * ay * adjT)
    sum += weights[i] * Point.hypotenuse(dx, dy)
  }
  return z2 * sum
}

function split(bezier, d) {
  let x1 = bezier[0][0],          y1 = bezier[0][1],
      x2 = bezier[1][0],          y2 = bezier[1][1],
      x3 = bezier[2][0],          y3 = bezier[2][1],
      x4 = bezier[3][0],          y4 = bezier[3][1],
      x12 = (x2-x1)*d+x1,         y12 = (y2-y1)*d+y1,
      x23 = (x3-x2)*d+x2,         y23 = (y3-y2)*d+y2,
      x34 = (x4-x3)*d+x3,         y34 = (y4-y3)*d+y3,
      x123 = (x23-x12)*d+x12,     y123 = (y23-y12)*d+y12,
      x234 = (x34-x23)*d+x23,     y234 = (y34-y23)*d+y23,
      x1234 = (x234-x123)*d+x123, y1234 = (y234-y123)*d+y123

  return [
    [[x1, y1],       [x12, y12],   [x123, y123], [x1234, y1234]],
    [[x1234, y1234], [x234, y234], [x34, y34],   [x4, y4]],
  ]
}

export default { length, split }
