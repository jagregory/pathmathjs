function split(line, d) {
  let start = line[0],
    end = line[1],
    dx = end[0] - start[0],
    dy = end[1] - start[0],
    mid = [start[0] + dx * d, start[1] + dy * d]

  return [
    [start, mid],
    [mid, end]
  ]
}

export default { split }
