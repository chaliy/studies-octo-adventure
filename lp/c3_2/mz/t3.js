var abcFreq = {
  a: 40,
  b: 35,
  c: 15,
  d: 20,
  e: 10,
  f: 10,
  g: 10
};

var sf = require('./lib/shannon_fano');
var codeTable = sf.buildCodeTable(abcFreq);
console.log('Shannon-Fano:', codeTable);

var hu = require('./lib/huffman');

var codeTable = hu.buildCodeTable(abcFreq);
console.log('Huffman:', codeTable);
