let expect = require('chai').expect

import Convert from '../bezier-convert'

describe('Convert#quadraticToCubic', () => {
  it('converts quadratic coordinates to cubic coordinates', () => {
    let cubic = Convert.quadraticToCubic([[100, 250], [250, 100], [400, 250]])

    expect(cubic).to.eql([[100, 250], [200, 150], [300, 150], [400, 250]])
  })
})

describe('Convert#cubicToQuadratic', () => {
  it('converts cubic coordinates to quadratic coordinates', () => {
    let cubic = Convert.cubicToQuadratic([[100, 250], [200, 150], [300, 150], [400, 250]])

    expect(cubic).to.eql([[100, 250], [250, 100], [400, 250]])
  })
})
