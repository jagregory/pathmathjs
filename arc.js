const PI = Math.PI,
  Tau = PI * 2

let rad = deg => deg * (PI/180)
let deg = rad => rad * (180/PI)
let angle = (u, v) => (u[0]*v[1] - u[1]*v[0] < 0 ? -1 : 1) * Math.acos((u[0]*v[0]+u[1]*v[1]) / Math.sqrt((Math.pow(u[0],2) + Math.pow(u[1],2))*(Math.pow(v[0],2) + Math.pow(v[1],2))))
let rotatePointAroundOriginByAngle = (x, y, cx, cy, angle) => angle === 0 ? [x, y] : [cx + (x-cx)*Math.cos(angle) - (y-cy)*Math.sin(angle), cy + (y-cy)*Math.cos(angle) + (x-cx)*Math.sin(angle)]
let pointAtAngleOnEllipse = (a, cx, cy, rx, ry, rotation) => rotatePointAroundOriginByAngle(cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, cx, cy, rotation)
let constrainSweep = a => Math.max(Math.min(a, Tau), -Tau)

// Conversion from centre to endpoint parameterization
// from http://www.w3.org/TR/SVG/implnote.html#ArcConversionCenterToEndpoint
let centreToEndpointArc = (cx, cy, rx, ry, a1, ad, rotation, end) => [
  pointAtAngleOnEllipse(a1, cx, cy, rx, ry, rotation),
  [rx, ry],
  rotation * (180/PI), // inlined: deg
  Math.abs(ad) > 180,
  ad >= 0,
  end || pointAtAngleOnEllipse(a1 + ad, cx, cy, rx, ry, rotation)
]

// Conversion from endpoint to centre parameterization
// http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
function endpointToCentreArc(arc) {
  let x1 = arc[0][0],
    y1 = arc[0][1],
    rx = arc[1][0],
    ry = arc[1][1],
    a = arc[2] * (PI/180), // inlined: rad
    aCos = Math.cos(a),
    aSin = Math.sin(a),
    largeArcFlag = arc[3],
    sweepFlag = arc[4],
    x2 = arc[5][0],
    y2 = arc[5][1]

  // x1', y1' derivitive of x1, y1
  let x1p = aCos * (x1 - x2) / 2.0 + aSin * (y1 - y2) / 2.0,
    y1p = -aSin * (x1 - x2) / 2.0 + aCos * (y1 - y2) / 2.0

  // adjust radii
  let x1p_sq = Math.pow(x1p,2),
    y1p_sq = Math.pow(y1p,2),
    rx_sq = Math.pow(rx,2),
    ry_sq = Math.pow(ry,2)
  let l = x1p_sq/rx_sq+y1p_sq/ry_sq;
  if (l > 1) {
    rx *= Math.sqrt(l);
    ry *= Math.sqrt(l);
    rx_sq = Math.pow(rx,2)
    ry_sq = Math.pow(ry,2)
  }

  // cx', cy'
  let sq = ((rx_sq*ry_sq)-(rx_sq*y1p_sq)-(ry_sq*x1p_sq)) / (rx_sq*y1p_sq+ry_sq*x1p_sq)
  let s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt(sq < 0 ? 0 : sq);
  let cxp = s * (rx * y1p / ry),
    cyp = s * -(ry * x1p / rx)

  // cx, cy
  let cx = (x1 + x2) / 2.0 + (aCos * cxp - aSin * cyp),
    cy = (y1 + y2) / 2.0 + (aSin * cxp + aCos * cyp)
  
  // initial angle
  let a1 = angle([1, 0], [(x1p-cxp)/rx, (y1p-cyp)/ry])

  // angle delta
  let u = [(x1p-cxp)/rx,(y1p-cyp)/ry],
    v = [(-x1p-cxp)/rx,(-y1p-cyp)/ry]
  let angleDelta = angle(u, v)
  
  let uvd = (u[0]*v[0]+u[1]*v[1]) / Math.sqrt((Math.pow(u[0],2) + Math.pow(u[1],2))*(Math.pow(v[0],2) + Math.pow(v[1],2)))
  if (uvd <= -1) angleDelta = Math.PI;
  if (uvd >= 1) angleDelta = 0;

  if (!sweepFlag && angleDelta > 0) {
    angleDelta = angleDelta - Tau
  } else if (sweepFlag & angleDelta < 0) {
    angleDelta = angleDelta + Tau
  }

  return [
    [cx, cy],
    [rx, ry],
    a1,
    Math.max(Math.min(angleDelta, Tau), -Tau), // inlined: constainSweep
    a
  ]
}

function split(arc, t) {
  t = Math.min(Math.max(t,0),1)
  let circle = endpointToCentreArc(arc),
    c = circle[0], cx = c[0], cy = c[1],
    r = circle[1], rx = r[0], ry = r[1],
    a1 = circle[2],
    ad = circle[3],
    rotation = circle[4],
    rotationD = rotation * (180/PI), // inlined: deg
    amid = Math.max(Math.min(t * ad, Tau), -Tau),       // inlined: constrainSweep
    namid = Math.max(Math.min(ad - t * ad, Tau), -Tau), // inlined: constrainSweep
    mid = pointAtAngleOnEllipse(a1 + amid, cx, cy, rx, ry, rotation)

  return [
    [arc[0], r, rotationD, Math.abs(amid) > Math.PI, amid >= 0, mid],   // inlined: centreToEndpointArc
    [mid, r, rotationD, Math.abs(namid) > Math.PI, namid >= 0, arc[5]], // inlined: centreToEndpointArc
  ]
}

export default { split }
