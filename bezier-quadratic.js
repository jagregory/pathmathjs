import Convert from './bezier-convert'
import Cubic from './bezier-cubic'
import Point from './Point'
import {abscissae, weights} from './gauss-legendre-quadrature'

function split(bezier, d) {
  let cubic = Convert.quadraticToCubic(bezier)

  return Cubic.split(cubic, d).map(Convert.cubicToQuadratic)
}

function length(bezier, t) {
  t = typeof t === 'undefined' ? 1 : t
  let x1 = bezier[0][0], y1 = bezier[0][1],
      x2 = bezier[1][0], y2 = bezier[1][1],
      x3 = bezier[2][0], y3 = bezier[2][1]
  // quadratic coefficients
  let ax = x1-2*x2+x3, ay = y1-2*y2+y3,
      bx = 2*(x2-x1),  by = 2*(y2-y1)
  let z2 = t / 2
  let sum = 0
  for (let i = 0; i < abscissae.length; i++) {
    let adjT = (z2 * abscissae[i] + z2)
    // quadratic derivatives
    let dx = 2*ax*adjT + bx,
        dy = 2*ay*adjT + by 
    sum += weights[i] * Point.hypotenuse(dx, dy)
  }
  return z2 * sum
}

export default { length, split }
