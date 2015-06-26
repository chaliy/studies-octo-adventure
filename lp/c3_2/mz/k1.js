var abcFreq = {
  a: 40,
  b: 25,
  c: 15,
  d: 10,
  e: 5,
  f: 5
};

var sf = require('./lib/shannon_fano');
var codeTable = sf.buildCodeTable(abcFreq);
console.log('Shannon-Fano:', codeTable);

var hu = require('./lib/huffman');

var codeTable = hu.buildCodeTable(abcFreq);
console.log('Huffman:', codeTable);
