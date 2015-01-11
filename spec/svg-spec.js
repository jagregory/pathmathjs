let expect = require('chai').expect

import Svg from '../svg'

describe('Svg#convert', () => {
  it('converts path', () => {
    let path = {
      pathSegList: [{
        pathSegType: Svg.Constants.PATHSEG_MOVETO_ABS,
        x: 10, y: 10
      }, {
        pathSegType: Svg.Constants.PATHSEG_LINETO_ABS,
        x: 20, y: 20
      }, {
        pathSegType: Svg.Constants.PATHSEG_CURVETO_CUBIC_ABS,
        x1: 50, y1: 20,
        x2: 60, y2: 30,
         x: 40,  y: 40
      }, {
        pathSegType: Svg.Constants.PATHSEG_CURVETO_QUADRATIC_ABS,
        x1: 70, y1: 50,
         x: 80,  y: 80
      }, {
        pathSegType: Svg.Constants.PATHSEG_ARC_ABS,
        r1: 8, r2: 10,
        angle: 5,
        largeArcFlag: true,
        sweepFlag: false,
        x: 100,  y: 100
      }]
    }

    let segments = Svg.convert(path)

    expect(segments).to.have.length(4)
    
    expect(segments[0][0]).to.eq('line')
    expect(segments[0][1]).to.eql([10, 10])
    expect(segments[0][2]).to.eql([20, 20])
    
    expect(segments[1][0]).to.eq('cubic-bezier')
    expect(segments[1][1]).to.eql([20, 20])
    expect(segments[1][2]).to.eql([50, 20])
    expect(segments[1][3]).to.eql([60, 30])
    expect(segments[1][4]).to.eql([40, 40])
    
    expect(segments[2][0]).to.eq('quadratic-bezier')
    expect(segments[2][1]).to.eql([40, 40])
    expect(segments[2][2]).to.eql([70, 50])
    expect(segments[2][3]).to.eql([80, 80])

    expect(segments[3][0]).to.eq('arc')
    expect(segments[3][1]).to.eql([80, 80])
    expect(segments[3][2]).to.eql([8, 10])
    expect(segments[3][3]).to.eql(5)
    expect(segments[3][4]).to.eql(true)
    expect(segments[3][5]).to.eql(false)
    expect(segments[3][6]).to.eql([100, 100])
  })
})
