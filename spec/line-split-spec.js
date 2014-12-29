let expect = require('chai').expect

import Line from '../line'

describe('line', () => {
  it('splits regular line', () => {
    let l = Line.split([[0, 0], [10, 10]], 0.5)
    expect(l.length).to.eql(2)
    expect(l[0]).to.eql([[0, 0], [5, 5]])
    expect(l[1]).to.eql([[5, 5], [10, 10]])
  })

  it('splits inverted line', () => {
    let l = Line.split([[0, 0], [-10, -10]], 0.5)
    expect(l.length).to.eql(2)
    expect(l[0]).to.eql([[0, 0], [-5, -5]])
    expect(l[1]).to.eql([[-5, -5], [-10, -10]])
  })

  it('splits line across zero', () => {
    let l = Line.split([[-5, -5], [5, 5]], 0.5)
    expect(l.length).to.eql(2)
    expect(l[0]).to.eql([[-5, -5], [0, 0]])
    expect(l[1]).to.eql([[0, 0], [5, 5]])
  })

  it('splits diagonal line', () => {
    let l = Line.split([[0, 10], [2.5, 50]], 0.75)
    expect(l.length).to.eql(2)
    expect(l[0]).to.eql([[0, 10], [1.875, 40]])
    expect(l[1]).to.eql([[1.875, 40], [2.5, 50]])
  })
})
