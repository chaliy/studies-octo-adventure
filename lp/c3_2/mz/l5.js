var hamming = require('./lib/hamming');

var input = [1,0,1,1,1,1,0,1];

console.log('Вхідний код: ', input);

var encoded = hamming.encode(input);
console.log('Hamming Закодоване:', encoded);

var decoded = hamming.decode(encoded);
console.log('Hamming Декодоване:', decoded.result);
console.log('Hamming Помилки:', decoded.errorParities);
