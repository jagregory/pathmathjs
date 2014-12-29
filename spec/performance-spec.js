let Benchmark = require('benchmark')

import Arc from '../arc'

// stats: Arc#split x 850,379 ops/sec ±0.71% (95 runs sampled)
// stats: Arc#split x 1,067,238 ops/sec ±0.65% (93 runs sampled)
// stats: Arc#split x 1,143,954 ops/sec ±0.76% (96 runs sampled)
// stats: Arc#split x 1,316,498 ops/sec ±0.75% (97 runs sampled)
describe('performance', () => {
  it('should be fast', function() {
    this.timeout(0)
    var suite = new Benchmark.Suite;

    suite.add('Arc#split', function() {
      Arc.split([[0, 0], [50, 50], 0, true, true, [50, 50]], 0.5)
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .run();
  })
})
