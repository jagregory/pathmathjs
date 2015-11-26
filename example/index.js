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

function pathToD(path) {
  let d = ''

  for (let i = 0; i < path.length; i++) {
    let [type, ...seg] = path[i]
    
    if (i === 0) {
      d += 'M'+svgpt(seg[0])
    }

    if (type === 'line') {
      d += 'L'+svgpt(seg[1])
    } else if (type === 'cubic-bezier') {
      d += 'C'+svgpt(seg[1])+' '+svgpt(seg[2])+' '+svgpt(seg[3])
    } else if (type === 'quadratic-bezier') {
      d += 'Q'+svgpt(seg[1])+' '+svgpt(seg[2])
    }
  }

  return d
}

function update(pos) {
  clearSvgs()
  console.clear()

  // lines
  ;(function() {
    let svg = document.getElementById('lines')
    let el = createSvgElement('path', {
      d: 'M0,0 L100,100',
      stroke: 'black',
      'stroke-width': 2
    })

    let path = PathMath.Svg.convert(el)
    let [left, right] = PathMath.split(path, pos)

    svg.appendChild(el)
    left && svg.appendChild(createSvgElement('path', {
      d: pathToD(left),
      stroke: 'blue',
      'stroke-width': 2,
      style: 'transform:translate(30px, 0)'
    }))
    right && svg.appendChild(createSvgElement('path', {
      d: pathToD(right),
      stroke: 'red',
      'stroke-width': 2,
      style: 'transform:translate(30px, 0)'
    }))
  })()

  // cubic bezier
  ;(function() {
    let svg = document.getElementById('cubic-bezier')
    let el = createSvgElement('path', {
      d: 'M0,0 C100,0 0,100 100,100',
      stroke: 'black',
      'stroke-width': 2,
      fill: 'transparent'
    })

    let path = PathMath.Svg.convert(el)
    let [left, right] = PathMath.split(path, pos)

    svg.appendChild(el)
    left && svg.appendChild(createSvgElement('path', {
      d: pathToD(left),
      stroke: 'red',
      'stroke-width': 2,
      fill: 'transparent',
      style: 'transform:translate(60px, 0)'
    }))
    right && svg.appendChild(createSvgElement('path', {
      d: pathToD(right),
      stroke: 'blue',
      'stroke-width': 2,
      fill: 'transparent',
      style: 'transform:translate(60px, 0)'
    }))
  })()

  // quadratic bezier
  ;(function() {

    let svg = document.getElementById('quadratic-bezier')
    let el = createSvgElement('path', {
      d: 'M0,0 Q75,5 100,50',
      stroke: 'black',
      'stroke-width': 2,
      fill: 'transparent'
    })

    let path = PathMath.Svg.convert(el)
    let [left, right] = PathMath.split(path, pos)

    svg.appendChild(el)
    left && svg.appendChild(createSvgElement('path', {
      d: pathToD(left),
      stroke: 'red',
      'stroke-width': 2,
      fill: 'transparent',
      style: 'transform:translate(60px, 0)'
    }))
    right && svg.appendChild(createSvgElement('path', {
      d: pathToD(right),
      stroke: 'blue',
      'stroke-width': 2,
      fill: 'transparent',
      style: 'transform:translate(60px, 0)'
    }))
  })()

  // arcs
  ;(function() {
    let arcs = [
      // 'M0,0 A50,50 -45 1,1 50,50',
      // 'M0,0 A90,50 9 1,1 90,90',
      // 'M0,0 A50,50 45 1,0 50,50',
      'M0,0 A90,50 90 1,0 50,50',
      'M0,0 A50,50 135 0,1 50,50',
      'M0,0 A90,50 180 0,1 50,50',
      'M0,0 A50,50 270 0,0 50,50',
      'M0,0 A90,50 355 0,0 50,50',
    ]
    let y = 60
    
    let svg = document.getElementById('arc')

    arcs.forEach(arc => {
      let el = createSvgElement('path', {
        d: arc,
        stroke: 'black',
        'stroke-width': 1,
        fill: 'transparent',
        style: `transform:translate(180px,${y}px)`
      })
      svg.appendChild(el)

      let path = PathMath.Svg.convert(el)
      let [left, right] = PathMath.split(path, pos)

      left && svg.appendChild(createSvgElement('path', {
        d: pathToD(left),
        stroke: 'red',
        'stroke-width': 2,
        fill: 'transparent',
        style: `transform:translate(180px,${y}px)`
      }))
      right && svg.appendChild(createSvgElement('path', {
        d: pathToD(right),
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
