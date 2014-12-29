import PathMath from '../index.js'

function createSvgElement(name, attrs) {
  let el = document.createElementNS('http://www.w3.org/2000/svg', name)

  Object.keys(attrs).forEach(attr => el.setAttributeNS(null, attr, attrs[attr]))

  return el
}

let svgpt = pt => `${pt[0]},${pt[1]}`

function clearSvgs() {
  let svgs = document.getElementsByTagName('svg')
  for (let i = 0; i < svgs.length; i++) {
    svgs[i].innerHTML = ''
  }
}

function update(pos) {
  clearSvgs()
  console.clear()

  // lines
  ;(function() {
    let line = [[0, 0], [100, 100]]
    let splitLine = PathMath.Line.split(line, pos)

    let svg = document.getElementById('lines')
    svg.appendChild(createSvgElement('line', {
      x1: line[0][0],
      y1: line[0][1],
      x2: line[1][0],
      y2: line[1][1],
      stroke: 'black',
      'stroke-width': 2
    }))
    svg.appendChild(createSvgElement('line', {
      x1: splitLine[0][0][0],
      y1: splitLine[0][0][1],
      x2: splitLine[0][1][0],
      y2: splitLine[0][1][1],
      stroke: 'red',
      'stroke-width': 2,
      style: 'transform:translate(30px, 0)'
    }))
    svg.appendChild(createSvgElement('line', {
      x1: splitLine[1][0][0],
      y1: splitLine[1][0][1],
      x2: splitLine[1][1][0],
      y2: splitLine[1][1][1],
      stroke: 'blue',
      'stroke-width': 2,
      style: 'transform:translate(30px, 0)'
    }))
  })()

  // cubic bezier
  ;(function() {
    let bezier = [[0, 0], [100, 0], [0, 100], [100, 100]]
    let splitBezier = PathMath.Bezier.split(bezier, pos)
    let toSvg = b => `M${svgpt(b[0])} C${b.slice(1).map(svgpt).join(' ')}`

    let svg = document.getElementById('cubic-bezier')
    svg.appendChild(createSvgElement('path', {
      d: toSvg(bezier),
      stroke: 'black',
      'stroke-width': 2,
      fill: 'transparent'
    }))
    svg.appendChild(createSvgElement('path', {
      d: toSvg(splitBezier[0]),
      stroke: 'red',
      'stroke-width': 2,
      fill: 'transparent',
      style: 'transform:translate(60px, 0)'
    }))
    svg.appendChild(createSvgElement('path', {
      d: toSvg(splitBezier[1]),
      stroke: 'blue',
      'stroke-width': 2,
      fill: 'transparent',
      style: 'transform:translate(60px, 0)'
    }))
  })()

  // quadratic bezier
  ;(function() {
    let bezier = [[0, 0], [75,5], [100,50]]
    let splitBezier = PathMath.Bezier.split(bezier, pos)
    let toSvg = b => `M${svgpt(b[0])} Q${b.slice(1).map(svgpt).join(' ')}`

    let svg = document.getElementById('quadratic-bezier')
    svg.appendChild(createSvgElement('path', {
      d: toSvg(bezier),
      stroke: 'black',
      'stroke-width': 2,
      fill: 'transparent'
    }))
    svg.appendChild(createSvgElement('path', {
      d: toSvg(splitBezier[0]),
      stroke: 'red',
      'stroke-width': 2,
      fill: 'transparent',
      style: 'transform:translate(60px, 0)'
    }))
    svg.appendChild(createSvgElement('path', {
      d: toSvg(splitBezier[1]),
      stroke: 'blue',
      'stroke-width': 2,
      fill: 'transparent',
      style: 'transform:translate(60px, 0)'
    }))
  })()

  // arcs
  ;(function() {
    let toSvg = a => `M${svgpt(a[0])} A${svgpt(a[1])} ${a[2]} ${a[3]?1:0},${a[4]?1:0} ${svgpt(a[5])}`
    let arcs = [
      [[0, 0], [50, 50], -45, true, true,   [50, 50]],
      [[0, 0], [90, 50], 9, true, true,   [90, 90]],
      [[0, 0], [50, 50], 45, true, false,  [50, 50]],
      [[0, 0], [90, 50], 90, true, false,  [50, 50]],
      [[0, 0], [50, 50], 135, false, true,  [50, 50]],
      [[0, 0], [90, 50], 180, false, true,  [50, 50]],
      [[0, 0], [50, 50], 270, false, false, [50, 50]],
      [[0, 0], [90, 50], 355, false, false, [50, 50]],
    ]
    let y = 60
    
    let svg = document.getElementById('arc')

    arcs.forEach(arc => {
      let splitArc = PathMath.Arc.split(arc, pos)

      svg.appendChild(createSvgElement('path', {
        d: toSvg(arc),
        stroke: 'black',
        'stroke-width': 1,
        fill: 'transparent',
        style: `transform:translate(180px,${y}px)`
      }))

      svg.appendChild(createSvgElement('path', {
        d: toSvg(splitArc[0]),
        stroke: 'red',
        'stroke-width': 2,
        fill: 'transparent',
        style: `transform:translate(180px,${y}px)`
      }))

      svg.appendChild(createSvgElement('path', {
        d: toSvg(splitArc[1]),
        stroke: 'blue',
        'stroke-width': 2,
        fill: 'transparent',
        style: `transform:translate(180px,${y}px)`
      }))

      y += 150
    })
  })()
}

update(0.5)

let range = document.getElementById('range')
range.addEventListener('input', e => update(e.target.value / 100))
