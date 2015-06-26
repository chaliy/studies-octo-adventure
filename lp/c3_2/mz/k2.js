var hamming = require('./lib/hamming');

var input = [0,1,0,1,1,0,1,0];

console.log('Вхідний код: ', input);

var encoded = hamming.encode(input);
console.log('Закодоване:', encoded);

var decoded = hamming.decode(encoded);
console.log('Декодоване:', decoded.result);
console.log('Помилки:', decoded.errorParities);

encoded[4] = (encoded[4] === 0) ? 1 : 0;
console.log('З помилокою:', encoded);

var decoded = hamming.decode(encoded);
console.log('Помилки:', decoded.errorParities);

var fixed = hamming.fix(encoded, decoded.errorParities);
console.log('Виправлене:', fixed);

var decoded = hamming.decode(fixed);
console.log('Декодоване:', decoded.result);
console.log('Помилки:', decoded.errorParities);
