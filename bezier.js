import Cubic from './bezier-cubic'
import Quadratic from './bezier-quadratic'

function split(bezier, d) {
  if (bezier.length === 3) {
    return Quadratic.split(bezier, d)
  }

  if (bezier.length === 4) {
    return Cubic.split(bezier, d)
  }

  throw 'Invalid bezier specification'
}

export default { split }
