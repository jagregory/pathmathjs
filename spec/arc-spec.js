import Chai from 'chai'
import CustomMatchers from './matchers'
Chai.use(CustomMatchers)

let expect = Chai.expect

import Arc from '../arc'

describe('Arc#length', () => {
  it('large positive angle direction circular arc', () => {
    let arc = [[0, 0], [50, 50], 0, true, true, [50, 50]]

    expect(Arc.length(arc)).to.eq(235.61944901923448)
    expect(Arc.length(arc, 0.5)).to.eq(235.61944901923448/2)
  })

  it('large positive angle direction elliptical arc', () => {
    let arc = [[0, 0], [90, 50], 0, true, true, [90, 90]]
    
    expect(Arc.length(arc)).to.eq(205.19816557450145)
    expect(Arc.length(arc, 0.5)).to.eq(205.19816557450145/2)
  })
})

describe('Arc#split', () => {
  describe('unrotated', () => {
    it('large positive angle direction circular arc', () => {
      let arc = [[0, 0], [50, 50], 0, true, true, [50, 50]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(50, 50)
      expect(splitArcs[0][2]).to.eql(0)
      expect(splitArcs[0][3]).to.eql(true)
      expect(splitArcs[0][4]).to.eql(true)
      expect(splitArcs[0][5]).to.be.point(96.19397662556435, 19.1341716182545)

      expect(splitArcs[1][0]).to.be.point(96.19397662556435, 19.1341716182545)
      expect(splitArcs[1][1]).to.be.point(50, 50)
      expect(splitArcs[1][2]).to.eql(0)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(true)
      expect(splitArcs[1][5]).to.be.point(50, 50)
    })

    it('large positive angle direction elliptical arc', () => {
      let arc = [[0, 0], [90, 50], 0, true, true, [90, 90]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[0][2]).to.eql(0)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(true)
      expect(splitArcs[0][5]).to.be.point(134.09545442950497, 59.14213562373094)

      expect(splitArcs[1][0]).to.be.point(134.09545442950497, 59.14213562373094)
      expect(splitArcs[1][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[1][2]).to.eql(0)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(true)
      expect(splitArcs[1][5]).to.be.point(90, 90)
    })

    it('large negative angle direction circular arc', () => {
      let arc = [[0, 0], [50, 50], 0, true, false, [50, 50]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(50, 50)
      expect(splitArcs[0][2]).to.eql(0)
      expect(splitArcs[0][3]).to.eql(true)
      expect(splitArcs[0][4]).to.eql(false)
      expect(splitArcs[0][5]).to.be.point(19.1341716182545, 96.19397662556433)

      expect(splitArcs[1][0]).to.be.point(19.1341716182545, 96.19397662556433)
      expect(splitArcs[1][1]).to.be.point(50, 50)
      expect(splitArcs[1][2]).to.eql(0)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(false)
      expect(splitArcs[1][5]).to.be.point(50, 50)
    })

    it('large negative angle direction elliptical arc', () => {
      let arc = [[0, 0], [90, 50], 0, true, false, [90, 90]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[0][2]).to.eql(0)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(false)
      expect(splitArcs[0][5]).to.be.point(19.544155877284346, 94.49747468305833)

      expect(splitArcs[1][0]).to.be.point(19.544155877284346, 94.49747468305833)
      expect(splitArcs[1][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[1][2]).to.eql(0)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(false)
      expect(splitArcs[1][5]).to.be.point(90, 90)
    })

    it('small positive angle direction circular arc', () => {
      let arc = [[0, 0], [50, 50], 0, false, true, [50, 50]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(50, 50)
      expect(splitArcs[0][2]).to.eql(0)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(true)
      expect(splitArcs[0][5]).to.be.point(46.19397662556434, 30.865828381745512)

      expect(splitArcs[1][0]).to.be.point(46.19397662556434, 30.865828381745512)
      expect(splitArcs[1][1]).to.be.point(50, 50)
      expect(splitArcs[1][2]).to.eql(0)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(true)
      expect(splitArcs[1][5]).to.be.point(50, 50)
    })

    it('small positive angle direction elliptical arc', () => {
      let arc = [[0, 0], [90, 50], 0, false, true, [90, 90]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[0][2]).to.eql(0)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(true)
      expect(splitArcs[0][5]).to.be.point(134.09545442950497, 59.14213562373094)

      expect(splitArcs[1][0]).to.be.point(134.09545442950497, 59.14213562373094)
      expect(splitArcs[1][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[1][2]).to.eql(0)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(true)
      expect(splitArcs[1][5]).to.be.point(90, 90)
    })

    it('small negative angle direction circular arc', () => {
      let arc = [[0, 0], [50, 50], 0, false, false, [50, 50]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(50, 50)
      expect(splitArcs[0][2]).to.eql(0)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(false)
      expect(splitArcs[0][5]).to.be.point(30.865828381745512, 46.19397662556434)

      expect(splitArcs[1][0]).to.be.point(30.865828381745512, 46.19397662556434)
      expect(splitArcs[1][1]).to.be.point(50, 50)
      expect(splitArcs[1][2]).to.eql(0)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(false)
      expect(splitArcs[1][5]).to.be.point(50, 50)
    })

    it('small negative angle direction elliptical arc', () => {
      let arc = [[0, 0], [90, 50], 0, false, false, [90, 90]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[0][2]).to.eql(0)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(false)
      expect(splitArcs[0][5]).to.be.point(19.544155877284346, 94.49747468305833)

      expect(splitArcs[1][0]).to.be.point(19.544155877284346, 94.49747468305833)
      expect(splitArcs[1][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[1][2]).to.eql(0)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(false)
      expect(splitArcs[1][5]).to.be.point(90, 90)
    })
  })

  describe('rotated', () => {
    it('large positive angle direction circular arc', () => {
      let arc = [[0, 0], [50, 50], -45, true, true, [50, 50]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(50, 50)
      expect(splitArcs[0][2]).to.eql(-45)
      expect(splitArcs[0][3]).to.eql(true)
      expect(splitArcs[0][4]).to.eql(true)
      expect(splitArcs[0][5]).to.be.point(96.19397662556435, 19.134171618254477)

      expect(splitArcs[1][0]).to.be.point(96.19397662556435, 19.134171618254477)
      expect(splitArcs[1][1]).to.be.point(50, 50)
      expect(splitArcs[1][2]).to.eql(-45)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(true)
      expect(splitArcs[1][5]).to.be.point(50, 50)
    })

    it('large positive angle direction elliptical arc', () => {
      let arc = [[0, 0], [90, 50], 45, true, true, [90, 90]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(90, 50)
      expect(splitArcs[0][2]).to.eql(45)
      expect(splitArcs[0][3]).to.eql(true)
      expect(splitArcs[0][4]).to.eql(true)
      expect(splitArcs[0][5]).to.be.point(142.32523592309187, 65.26543091578203)

      expect(splitArcs[1][0]).to.be.point(142.32523592309187, 65.26543091578203)
      expect(splitArcs[1][1]).to.be.point(90, 50)
      expect(splitArcs[1][2]).to.eql(45)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(true)
      expect(splitArcs[1][5]).to.be.point(90, 90)
    })

    it('large negative angle direction circular arc', () => {
      let arc = [[0, 0], [50, 50], 90, true, false, [50, 50]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(50, 50)
      expect(splitArcs[0][2]).to.eql(90)
      expect(splitArcs[0][3]).to.eql(true)
      expect(splitArcs[0][4]).to.eql(false)
      expect(splitArcs[0][5]).to.be.point(19.13417161825449, 96.19397662556435)

      expect(splitArcs[1][0]).to.be.point(19.13417161825449, 96.19397662556435)
      expect(splitArcs[1][1]).to.be.point(50, 50)
      expect(splitArcs[1][2]).to.eql(90)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(false)
      expect(splitArcs[1][5]).to.be.point(50, 50)
    })

    it('large negative angle direction elliptical arc', () => {
      let arc = [[0, 0], [90, 50], -135, true, false, [90, 90]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(90, 50)
      expect(splitArcs[0][2]).to.eql(-135)
      expect(splitArcs[0][3]).to.eql(true)
      expect(splitArcs[0][4]).to.eql(false)
      expect(splitArcs[0][5]).to.be.point(65.26543091578205, 142.32523592309187)

      expect(splitArcs[1][0]).to.be.point(65.26543091578205, 142.32523592309187)
      expect(splitArcs[1][1]).to.be.point(90, 50)
      expect(splitArcs[1][2]).to.eql(-135)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(false)
      expect(splitArcs[1][5]).to.be.point(90, 90)
    })

    it('small positive angle direction circular arc', () => {
      let arc = [[0, 0], [50, 50], 135, false, true, [50, 50]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(50, 50)
      expect(splitArcs[0][2]).to.eql(135)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(true)
      expect(splitArcs[0][5]).to.be.point(46.19397662556433, 30.8658283817455)

      expect(splitArcs[1][0]).to.be.point(46.19397662556433, 30.8658283817455)
      expect(splitArcs[1][1]).to.be.point(50, 50)
      expect(splitArcs[1][2]).to.eql(135)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(true)
      expect(splitArcs[1][5]).to.be.point(50, 50)
    })

    it('small positive angle direction elliptical arc', () => {
      let arc = [[0, 0], [90, 50], 270, false, true, [90, 90]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[0][2]).to.eql(270)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(true)
      expect(splitArcs[0][5]).to.be.point(94.49747428898681, 19.54415603753359)

      expect(splitArcs[1][0]).to.be.point(94.49747428898681, 19.54415603753359)
      expect(splitArcs[1][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[1][2]).to.eql(270)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(true)
      expect(splitArcs[1][5]).to.be.point(90, 90)
    })

    it('small negative angle direction circular arc', () => {
      let arc = [[0, 0], [50, 50], 365, false, false, [50, 50]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(50, 50)
      expect(splitArcs[0][2]).to.eql(365)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(false)
      expect(splitArcs[0][5]).to.be.point(30.86582838174548, 46.193976625564325)

      expect(splitArcs[1][0]).to.be.point(30.86582838174548, 46.193976625564325)
      expect(splitArcs[1][1]).to.be.point(50, 50)
      expect(splitArcs[1][2]).to.eql(365)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(false)
      expect(splitArcs[1][5]).to.be.point(50, 50)
    })

    it('small negative angle direction elliptical arc', () => {
      let arc = [[0, 0], [90, 50], -90, false, false, [90, 90]]
      let splitArcs = Arc.split(arc, 0.75)

      expect(splitArcs[0][0]).to.be.point(0, 0)
      expect(splitArcs[0][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[0][2]).to.eql(-90)
      expect(splitArcs[0][3]).to.eql(false)
      expect(splitArcs[0][4]).to.eql(false)
      expect(splitArcs[0][5]).to.be.point(59.142135623730944, 134.09545442950497)

      expect(splitArcs[1][0]).to.be.point(59.142135623730944, 134.09545442950497)
      expect(splitArcs[1][1]).to.be.point(92.660671268883, 51.478150704935)
      expect(splitArcs[1][2]).to.eql(-90)
      expect(splitArcs[1][3]).to.eql(false)
      expect(splitArcs[1][4]).to.eql(false)
      expect(splitArcs[1][5]).to.be.point(90, 90)
    })
  })
})
