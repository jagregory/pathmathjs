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

// this formula is such that enables a non-oscillating segment-time-to-arc-time at screen resolutions (see demo).
function best_segment_max_sweep(rx, ry, mt) {
  let scale_factor = Math.max(Math.abs(rx), Math.abs(ry)) / 1024
  scale_factor = Math.max(scale_factor, 0.1) // cap scale factor so that we don't create sweeps larger than 90 deg.
  return Math.sqrt(1/Math.pow(scale_factor, 0.6)) * 30 // faster way to say 1/2^log10(scale) * 30
}

function endpoints(cx, cy, rx, ry, a1, ad, rotation, x2, y2) {
  let [x1, y1] = pointAtAngleOnEllipse(a1, cx, cy, rx, ry, rotation)
  if (!x2) {
    [x2, y2] = pointAtAngleOnEllipse(a1 + constrainSweep(ad), cx, cy, rx, ry, rotation)
  }
  return [x1, y1, x2, y2]
}

let angle_epsilon = 1e-10

//given the time t on an arc return the corresponding segment number and the time on that segment.
function arc_time_to_segment_time(t, sweep_angle, segment_max_sweep) {
  sweep_angle = Math.abs(constrainSweep(sweep_angle))
  if (sweep_angle < angle_epsilon) {
    return [1, t]
  }
  let segments = Math.ceil(sweep_angle / segment_max_sweep)
  let d = t * segments
  let i = Math.floor(d)
  return [i+1, d-i]
}

function segment(cx, cy, rx, ry, start_angle, sweep_angle) {
  let a = sweep_angle / 2
  let x0 = Math.cos(a)
  let y0 = Math.sin(a)
  let tx = (1 - x0) * 4 / 3
  let ty = y0 - tx * x0 / y0
  let px1 =  x0 + tx
  let py1 = -ty
  let px2 =  x0 + tx
  let py2 =  ty
  let px3 =  x0
  let py3 =  y0
  a = start_angle + sweep_angle / 2
  let sn = Math.sin(a)
  let cs = Math.cos(a)
  return [
    cx + rx * (px1 * cs - py1 * sn), // c1x
    cy + ry * (px1 * sn + py1 * cs), // c1y
    cx + rx * (px2 * cs - py2 * sn), // c2x
    cy + ry * (px2 * sn + py2 * cs), // c2y
    cx + rx * (px3 * cs - py3 * sn), // p2x
    cy + ry * (px3 * sn + py3 * cs)  // p2y
  ]
}

function to_bezier3(write, cx, cy, rx, ry, start_angle, sweep_angle, rotation, x2, y2, segment_max_sweep) {
  if (Math.abs(sweep_angle) < angle_epsilon) {
    let [x1, y1, x2a, y2b] = endpoints(cx, cy, rx, ry, start_angle, sweep_angle, rotation, x2, y2)
    x2 = x2a
    y2 = y2b
    write('curve', select(3, line_to_bezier3(x1, y1, x2, y2)))
  }

  rx = Math.abs(rx)
  ry = Math.abs(ry)
  sweep_angle = constrainSweep(sweep_angle)

  let segments = Math.ceil(Math.abs(sweep_angle / segment_max_sweep))
  let segment_sweep = sweep_angle / segments
  let end_angle = start_angle + sweep_angle - segment_sweep / 2

  for (let angle = start_angle; angle < end_angle; angle += segment_sweep) {
    let [bx2, by2, bx3, by3, bx4, by4] = segment(cx, cy, rx, ry, angle, segment_sweep)
    if (rotation != 0) {
      [bx2, by2] = rotatePointAroundOriginByAngle(bx2, by2, cx, cy, rotation)
      [bx3, by3] = rotatePointAroundOriginByAngle(bx3, by3, cx, cy, rotation)
      [bx4, by4] = rotatePointAroundOriginByAngle(bx4, by4, cx, cy, rotation)
    }

    if (Math.abs(end_angle - angle) < Math.abs(segment_sweep)) { //last segment: override endpoint with the specified one
      bx4 = x2
      by4 = y2
    }

    write('curve', bx2, by2, bx3, by3, bx4, by4)
  }
}

import CubicBezier from './bezier-cubic'

function length(arc, t) {
  let [x2, y2] = arc[5]
  let [[cx, cy], [rx, ry], a1, ad, rotation] = endpointToCentreArc(arc)
  t = typeof t === 'undefined' ? 1 : t

  if (rx === ry) {
    // circular length
    return Math.abs(t * ad * rx)
  } else {
    // decompose and compute the sum of the lengths of the segments
    let segment_max_sweep = best_segment_max_sweep(rx, ry)
    let [maxseg, segt] = arc_time_to_segment_time(t, ad, segment_max_sweep)
    let [x1, y1] = endpoints(cx, cy, rx, ry, a1, ad, rotation, x2, y2)
    let cseg = 0,
      len = 0
    let write = function(_, x2, y2, x3, y3, x4, y4) {
      cseg = cseg + 1
      if (cseg > maxseg || (cseg == maxseg && segt == 0)) {
        return
      }
      len = len + CubicBezier.length([[x1, y1], [x2, y2], [x3, y3], [x4, y4]], cseg < maxseg ? 1 : segt)
      x1 = x4
      y1 = y4
    }
    to_bezier3(write, cx, cy, rx, ry, a1, ad, rotation, x2, y2, segment_max_sweep)
    return len
  }
}

function isZero(n) {
  return Math.abs(n) <= 1e-13
}

export default { split, length }
