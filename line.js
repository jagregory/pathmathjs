function hypotenuse(a, b) {
  if (a === 0 && b === 0) {
    return 0
  }
  a = Math.abs(a)
  b = Math.abs(b)
  let r = (Math.min(a, b) / Math.max(a, b))
  return a * Math.sqrt(1 + r*r)
}

let distance = (x1, y1, x2, y2) => hypotenuse(x2-x1, y2-y1)
let length = (l) => distance(l[0][0], l[0][1], l[1][0], l[1][1])

function split(line, d) {
  let start = line[0],
    end = line[1],
    dx = end[0] - start[0],
    dy = end[1] - start[1],
    mid = [start[0] + dx * d, start[1] + dy * d]

  return [
    [start, mid],
    [mid, end]
  ]
}

export default { length, split }
