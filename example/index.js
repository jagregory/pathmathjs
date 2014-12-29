import PathMath from '../index.js'

function createSvgElement(name, attrs) {
  let el = document.createElementNS('http://www.w3.org/2000/svg', name)

  Object.keys(attrs).forEach(attr => el.setAttributeNS(null, attr, attrs[attr]))

  return el
}

let svgpt = pt => `${pt[0]},${pt[1]}`

// lines
;(function() {
  let line = [[0, 0], [100, 100]]
  let splitLine = PathMath.Line.split(line, 0.5)

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
  let splitBezier = PathMath.Bezier.split(bezier, 0.5)

  let svg = document.getElementById('cubic-bezier')
  svg.appendChild(createSvgElement('path', {
    d: `M${svgpt(bezier[0])} C${bezier.slice(1).map(svgpt).join(' ')}`,
    stroke: 'black',
    'stroke-width': 2,
    fill: 'transparent'
  }))
  svg.appendChild(createSvgElement('path', {
    d: `M${svgpt(splitBezier[0][0])} C${splitBezier[0].slice(1).map(svgpt).join(' ')}`,
    stroke: 'red',
    'stroke-width': 2,
    fill: 'transparent',
    style: 'transform:translate(60px, 0)'
  }))
  svg.appendChild(createSvgElement('path', {
    d: `M${svgpt(splitBezier[1][0])} C${splitBezier[1].slice(1).map(svgpt).join(' ')}`,
    stroke: 'blue',
    'stroke-width': 2,
    fill: 'transparent',
    style: 'transform:translate(60px, 0)'
  }))
})()

// quadratic bezier
;(function() {
  let bezier = [[0, 0], [75,5], [100,50]]
  let splitBezier = PathMath.Bezier.split(bezier, 0.5)

  let svg = document.getElementById('quadratic-bezier')
  svg.appendChild(createSvgElement('path', {
    d: `M${svgpt(bezier[0])} Q${bezier.slice(1).map(svgpt).join(' ')}`,
    stroke: 'black',
    'stroke-width': 2,
    fill: 'transparent'
  }))
  svg.appendChild(createSvgElement('path', {
    d: `M${svgpt(splitBezier[0][0])} Q${splitBezier[0].slice(1).map(svgpt).join(' ')}`,
    stroke: 'red',
    'stroke-width': 2,
    fill: 'transparent',
    style: 'transform:translate(60px, 0)'
  }))
  svg.appendChild(createSvgElement('path', {
    d: `M${svgpt(splitBezier[1][0])} Q${splitBezier[1].slice(1).map(svgpt).join(' ')}`,
    stroke: 'blue',
    'stroke-width': 2,
    fill: 'transparent',
    style: 'transform:translate(60px, 0)'
  }))
})()
