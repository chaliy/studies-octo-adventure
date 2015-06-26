/* jshint esnext:true */

function harmonic(values, n){
  var N = values.length;

  var cc = values.reduce(function(acc, a, k){
      return acc + (a * Math.cos((2 * Math.PI * n * k) / N));
    }, 0.0) / N;

  var cs = - values.reduce(function(acc, a, k){
      return acc + (a * Math.sin((2 * Math.PI * n * k) / N));
    }, 0.0) / N;

  return {
    c: Math.sqrt(Math.pow(cc, 2) + Math.pow(cs, 2)),
    phi: Math.atan2(cs, cc)
  };
}

module.exports.harmonic = harmonic;
