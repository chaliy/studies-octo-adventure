var expect = require('chai').expect;
var calculator = require('../../app/models/calculator');

describe('Calculator', () => {

  it('Should add values', () => {
    var model = calculator("1+1");
    
    expect(model.result).to.be.equal(2);
  });
  
  it('Should substract values', () => {
    var model = calculator("1-1");
    
    expect(model.result).to.be.equal(0);
  });
  
  it('Should multiply values', () => {
    var model = calculator("1*1");
    
    expect(model.result).to.be.equal(1);
  });
  
  it('Should divide values', () => {
    var model = calculator("10/2");
    
    expect(model.result).to.be.equal(5);
  });

  
});
