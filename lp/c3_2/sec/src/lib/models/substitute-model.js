var ABC =  ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var CAESAR_CODE = 'VZHLANQRCWDXFOUSPBTIELGM KY';

var decodeText = function(text, abc, code){
  text = text || '';
  var decoded = '';
  for(var i = 0; i < text.length; i++){

    var char = text.charAt(i);
    var index = code.indexOf(char);
    decoded += abc.charAt(index);
  }

  return decoded;
};


exports.ABC = ABC;
exports.CAESAR_CODE = CAESAR_CODE;
exports.decodeText = decodeText;
