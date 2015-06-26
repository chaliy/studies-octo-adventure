var input = 'ТОТОЛОЛЛОТОТОЛОТОЛО';

console.log('Вхідний текст: ', input);

var lzw = require('./lib/lzw');
var result = lzw.encode(input);
console.log('LZW Dictionary:', result.dictionary);
console.log('LZW Encoded:', result.output);

var decoded = lzw.decode(result.output, result.init);
console.log('LZW Decoded:', decoded);
