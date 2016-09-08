const chai = require('chai');
const should = chai.should();


describe('Canary Test', function(){
  it('the string hello should be hello', function(){
    const hello = 'hello';
    hello.should.be.equal('hello');
  });
});
