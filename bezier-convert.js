// convert a quadratic bezier to a cubic bezier using degree elevation
function quadraticToCubic(bezier) {
  let q0 = bezier[0],
    q0x = q0[0],
    q0y = q0[1],
    q1 = bezier[1],
    q1x = q1[0],
    q1y = q1[1],
    q2 = bezier[2],
    q2x = q2[0],
    q2y = q2[1]

  let c1 = [q0x + 2/3 * (q1x-q0x), q0y + 2/3 * (q1y-q0y)],
    c2 = [q2x + 2/3 * (q1x-q2x), q2y + 2/3 * (q1y-q2y)]

  return [q0, c1, c2, q2]
}

// convert a cubic bezier to a quadratic bezier. Reverses quadraticToCubic but
// won't work with more complex cubic beziers.
function cubicToQuadratic(bezier) {
  let c0 = bezier[0],
    c1 = bezier[1],
    c2 = bezier[2],
    c3 = bezier[3]

  let q1 = [3/2 * c1[0] - 1/2 * c0[0], 3/2 * c1[1] - 1/2 * c0[1]]

  return [c0, q1, c3]
}

export default { cubicToQuadratic, quadraticToCubic }
