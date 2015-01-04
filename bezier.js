import Cubic from './bezier-cubic'
import Quadratic from './bezier-quadratic'

let invalid = function() { throw 'Invalid bezier specification' }
let length = (b) => (b.length === 3 ? Quadratic.length : b.length === 4 ? Cubic.length : invalid)(b)
let split = (b, d) => (b.length === 3 ? Quadratic.split : b.length === 4 ? Cubic.split : invalid)(b, d)

export default { length, split }
