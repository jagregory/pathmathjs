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

export default { distance, hypotenuse }
