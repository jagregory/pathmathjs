let rad = deg => deg * (Math.PI/180)
let deg = rad => rad * (180/Math.PI)
let angleRadians = (p1, p2) => Math.atan2(p2[1] - p1[1], p2[0] - p1[0])

// Elliptical arc implementation based on the SVG specification notes
function ellipticalArcCentre(start, r, angle, largeArcFlag, sweepFlag, end) {
  let x0 = start[0],
    y0 = start[1],
    rx = r[0],
    ry = r[1],
    x = end[0],
    y = end[1]

  // Compute the half distance between the current and the final point
  let dx2 = (x0 - x) / 2.0,
    dy2 = (y0 - y) / 2.0
  
  // Convert angle from degrees to radians
  angle = rad(angle % 360.0)
  let cosAngle = Math.cos(angle),
    sinAngle = Math.sin(angle)

  //
  // Step 1 : Compute (x1, y1)
  //
  let x1 = (cosAngle * dx2 + sinAngle * dy2),
    y1 = (-sinAngle * dx2 + cosAngle * dy2)
  
  // Ensure radii are large enough
  rx = Math.abs(rx)
  ry = Math.abs(ry)

  let Prx = rx * rx,
    Pry = ry * ry,
    Px1 = x1 * x1,
    Py1 = y1 * y1

  // check that radii are large enough
  // let radiiCheck = Px1/Prx + Py1/Pry
  // if (radiiCheck > 1) {
  //   rx = Math.sqrt(radiiCheck) * rx;
  //   ry = Math.sqrt(radiiCheck) * ry;
  //   Prx = rx * rx;
  //   Pry = ry * ry;
  // }

  //
  // Step 2 : Compute (cx1, cy1)
  //
  let sign = (largeArcFlag == sweepFlag) ? -1 : 1;
  let sq = ((Prx*Pry)-(Prx*Py1)-(Pry*Px1)) / ((Prx*Py1)+(Pry*Px1));
  sq = (sq < 0) ? 0 : sq;
  let coef = (sign * Math.sqrt(sq));
  let cx1 = coef * ((rx * y1) / ry);
  let cy1 = coef * -((ry * x1) / rx);

  //
  // Step 3 : Compute (cx, cy) from (cx1, cy1)
  //
  let sx2 = (x0 + x) / 2.0;
  let sy2 = (y0 + y) / 2.0;
  let cx = sx2 + (cosAngle * cx1 - sinAngle * cy1);
  let cy = sy2 + (sinAngle * cx1 + cosAngle * cy1);

  return [cx, cy, rx]
}

function chords(arc, d) {
  let start = arc[0],
    r = arc[1],
    angle = arc[2],
    largeArc = !!arc[3],
    sweep = !!arc[4],
    end = arc[5]

  let centre = ellipticalArcCentre(start, r, angle, largeArc, sweep, end)
  let radius = centre[2]

  let chord = [start, end, centre],
    dx = end[0] - start[0],
    dy = end[1] - start[1]
  let mid = [start[0] + dx * d, start[1] + dy * d]
  let midAngle = angleRadians(centre, mid)

  let midPoint = [centre[0] + radius * Math.cos(midAngle), centre[1] + radius * Math.sin(midAngle)]

  let chord1 = [start, midPoint, centre]
  let chord2 = [midPoint, end, centre]

  // let nr = [r[0] / (d * 3), r[1] / (d * 3)]
  // let mid = [end[0] * d, end[1] * d]

  return [
    chord1,
    chord2,
  ]
}

function split(arc, d) {
  let c = chords(arc, d)
  
  return [
    [c[0][0], arc[1], arc[2], arc[3], arc[4], c[0][1]],
    [c[1][0], arc[1], arc[2], arc[3], arc[4], c[1][1]],
  ]
}

export default { chords, split }
