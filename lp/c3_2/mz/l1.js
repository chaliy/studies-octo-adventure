var abcFreq = {
  a: 25,
  b: 20,
  c: 15,
  d: 8,
  e: 7,
  f: 7,
  g: 3
};

var sf = require('./lib/shannon_fano');
var codeTable = sf.buildCodeTable(abcFreq);
console.log('Shannon-Fano:', codeTable);

var hu = require('./lib/huffman');

var codeTable = hu.buildCodeTable(abcFreq);
console.log('Huffman:', codeTable);
