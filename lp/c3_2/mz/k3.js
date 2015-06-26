var harmonic = require('./lib/harmonic');

var values = [
  0, 10, 20, 10
];


console.log("Нульова гармоніка:", harmonic.harmonic(values, 0));
console.log("Перша гармоніка:", harmonic.harmonic(values, 1));
