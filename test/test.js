var should = require('chai').should()

beverages = [ 'chai', 'matcha', 'oolong' ];
testArray = [];
testArray.push('chai')
testArray.push('matcha')
testArray.push('oolong');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      beverages.should.eql(testArray);
    });
  });
});

