var harmonic = require('./lib/harmonic');

var values = [
  0, 30, 60, 30
];


console.log("Нульова гармоніка:", harmonic.harmonic(values, 0));
console.log("Перша гармоніка:", harmonic.harmonic(values, 1));
