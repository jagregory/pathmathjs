import Convert from './bezier-convert'
import Cubic from './bezier-cubic'

function split(bezier, d) {
  let cubic = Convert.quadraticToCubic(bezier)

  return Cubic.split(cubic, d).map(Convert.cubicToQuadratic)
}

export default { split }
