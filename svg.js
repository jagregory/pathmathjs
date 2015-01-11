let Constants = {
  PATHSEG_UNKNOWN: 0,
  PATHSEG_CLOSEPATH: 1,
  PATHSEG_MOVETO_ABS: 2,
  PATHSEG_MOVETO_REL: 3,
  PATHSEG_LINETO_ABS: 4,
  PATHSEG_LINETO_REL: 5,
  PATHSEG_CURVETO_CUBIC_ABS: 6,
  PATHSEG_CURVETO_CUBIC_REL: 7,
  PATHSEG_CURVETO_QUADRATIC_ABS: 8,
  PATHSEG_CURVETO_QUADRATIC_REL: 9,
  PATHSEG_ARC_ABS: 10,
  PATHSEG_ARC_REL: 11,
  PATHSEG_LINETO_HORIZONTAL_ABS: 12,
  PATHSEG_LINETO_HORIZONTAL_REL: 13,
  PATHSEG_LINETO_VERTICAL_ABS: 14,
  PATHSEG_LINETO_VERTICAL_REL: 15,
  PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: 16,
  PATHSEG_CURVETO_CUBIC_SMOOTH_REL: 17,
  PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: 18,
  PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: 19,
}

let unsupported = (t) => function() { throw new Error('Unsupported path segment ' + t) }
let lineToAbs = (prev, cur) => ['line', [prev.x, prev.y], [cur.x, cur.y]]
let curveToCubicAbs = (prev, cur) => ['cubic-bezier', [prev.x, prev.y], [cur.x1, cur.y1], [cur.x2, cur.y2], [cur.x, cur.y]]
let curveToQuadraticAbs = (prev, cur) => ['quadratic-bezier', [prev.x, prev.y], [cur.x1, cur.y1], [cur.x, cur.y]]
let arcAbs = (prev, cur) => ['arc', [prev.x, prev.y], [cur.r1, cur.r2], cur.angle, cur.largeArcFlag, cur.sweepFlag, [cur.x, cur.y]]

let converters = [
  unsupported('PATHSEG_UNKNOWN'), // PATHSEG_UNKNOWN
  unsupported('PATHSEG_CLOSEPATH'), // PATHSEG_CLOSEPATH
  unsupported('PATHSEG_MOVETO_ABS'), // PATHSEG_MOVETO_ABS
  unsupported('PATHSEG_MOVETO_REL'), // PATHSEG_MOVETO_REL
  lineToAbs,
  unsupported('PATHSEG_LINETO_REL'), // PATHSEG_LINETO_REL
  curveToCubicAbs,
  unsupported('PATHSEG_CURVETO_CUBIC_REL'), // PATHSEG_CURVETO_CUBIC_REL
  curveToQuadraticAbs,
  unsupported('PATHSEG_CURVETO_QUADRATIC_REL'), // PATHSEG_CURVETO_QUADRATIC_REL
  arcAbs,
  unsupported('PATHSEG_ARC_REL'), // PATHSEG_ARC_REL
  unsupported('PATHSEG_LINETO_HORIZONTAL_ABS'), // PATHSEG_LINETO_HORIZONTAL_ABS
  unsupported('PATHSEG_LINETO_HORIZONTAL_REL'), // PATHSEG_LINETO_HORIZONTAL_REL
  unsupported('PATHSEG_LINETO_VERTICAL_ABS'), // PATHSEG_LINETO_VERTICAL_ABS
  unsupported('PATHSEG_LINETO_VERTICAL_REL'), // PATHSEG_LINETO_VERTICAL_REL
  unsupported('PATHSEG_CURVETO_CUBIC_SMOOTH_ABS'), // PATHSEG_CURVETO_CUBIC_SMOOTH_ABS
  unsupported('PATHSEG_CURVETO_CUBIC_SMOOTH_REL'), // PATHSEG_CURVETO_CUBIC_SMOOTH_REL
  unsupported('PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS'), // PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS
  unsupported('PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL'), // PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL
]

// given a path DOM element, return a list of
// path segments
function convert(element) {
  let segments = [],
    pathSegList = element.pathSegList

  let prev = pathSegList[0]
  for (let i = 1; i < pathSegList.length; i++) {
    let cur = pathSegList[i]
    segments.push(converters[cur.pathSegType](prev, cur))
    prev = cur
  }

  return segments
}

export default { convert, Constants }
