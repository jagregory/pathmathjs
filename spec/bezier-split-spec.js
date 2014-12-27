let expect = require('chai').expect

import Bezier from '../bezier'

describe('cubic bezier', () => {
  it('splits regular cubic bezier', () => {
    let l = Bezier.split([[0, 0], [400, 0], [0, 400], [400, 400]], 0.5)
    expect(l.length).to.eql(2)
    expect(l[0]).to.eql([[0, 0], [200, 0], [200, 100], [200, 200]])
    expect(l[1]).to.eql([[200, 200], [200, 300], [200, 400], [400, 400]])
  })
})
