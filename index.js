import Arc from './arc'
import Bezier from './bezier'
import Line from './line'
import Svg from './svg'

let segs = {
  'arc': Arc,
  'cubic-bezier': Bezier,
  'line': Line,
  'quadratic-bezier': Bezier,
}

function findSegment(path, d) {
  let lengths = path.map(s => segs[s[0]].length(s.slice(1)), 0)
  let totalLength = lengths.reduce((a, b) => a + b, 0)
  let splitLength = totalLength * d

  let sum = 0
  for (let i = 0; i < lengths.length; i++) {
    let len = lengths[i]

    if (splitLength > sum && splitLength < sum + len) {
      // found the segment
      return [(splitLength - sum) / len, path[i]]
    }
  }

  return [0, null]
}

function split(path, d) {
  if (d === 0) {
    return [null, path]
  }
  if (d === 1) {
    return [path, null]
  }
  let [sd, seg] = findSegment(path, d)
  let n = segs[seg[0]].split(seg.slice(1), sd).map(s => [[seg[0]].concat(s)])
  return n
}

export default { Arc, Line, Bezier, Svg, split }
