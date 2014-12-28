import Convert from './bezier-convert'

function splitQuadratic(bezier, d) {
  let cubic = Convert.quadraticToCubic(bezier)

  return splitCubic(cubic, d).map(Convert.cubicToQuadratic)
}

function splitCubic(bezier, d) {
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

function split(bezier, d) {
  if (bezier.length === 3) {
    return splitQuadratic(bezier, d)
  }

  if (bezier.length === 4) {
    return splitCubic(bezier, d)
  }

  throw 'Invalid bezier specification'
}

export default { split, splitCubic, splitQuadratic }
