/*
Chai - Add CustomMatchers

usage: 
var CustomMatchers = require('./support/friendly_news_path_matcher');
chai.use(CustomMatchers);

expect('/materia/FooBar').to.be.a.friendlyNewsPath();
*/
 
var CustomMatchers = function(chai) {
  chai.Assertion.addMethod('point', function(x, y) {
    var a = this._obj;
 
    var expectedMessage = `expected {${a[0]}, ${a[1]}} to equal {${x}, ${y}}`
    var notExpectedMessage = `expected {${a[0]}, ${a[1]}} to not equal {${x}, ${y}}`
 
    this.assert(a[0] === x, expectedMessage, notExpectedMessage);
    this.assert(a[1] === y, expectedMessage, notExpectedMessage);
  });
};
 
module.exports = CustomMatchers;
