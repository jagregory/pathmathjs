let expect = require('chai').expect

import Arc from '../arc'

describe('#split', () => {
  it('splits large positive angle direction arc', () => {
    let l = Arc.split([[0, 0], [50, 50], 0, true, true, [50, 50]])
  })

  xit('splits large negative angle direction arc', () => {
    let l = Arc.split([[0, 0], [50, 50], 0, true, false, [50, 50]])
  })

  xit('splits small positive angle direction arc', () => {
    let l = Arc.split([[0, 0], [50, 50], 0, false, true, [50, 50]])
  })

  xit('splits small negative angle direction arc', () => {
    let l = Arc.split([[0, 0], [50, 50], 0, false, false, [50, 50]])
  })
})
