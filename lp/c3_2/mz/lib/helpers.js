/* jshint esnext:true */

module.exports.buildFrequenciesTable = function(input){

  var counter = {};
  for(var symbol of input){
      counter[symbol] = (counter[symbol] || 0) + 1;
  }
  return counter;
};
