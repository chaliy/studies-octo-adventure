var ABC =  ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var decodeText = function(text, key, decode, abc){
  text = text || '';
  key = key || '';
  var size = abc.length;
  var keySize = key.length;
  var codeKey = key.split('').map(function(x){
    return abc.indexOf(x);
  });
  if (decode){
    for (var i = 0; i < keySize; i++) {
      codeKey[i] = (size - codeKey[i]) % size;
    }
  }
  var decoded = '';
  for (var i = 0, j = 0; i < text.length; i++) {

    var char = text.charAt(i);
    var abcCode = abc.indexOf(char);

    if (abcCode >= 0){
      var decodedCode = (abcCode + codeKey[j % keySize]) % size;
      decoded += abc.charAt(decodedCode);
      j++;
    } else {
      decoded += char;
    }
  }

  return decoded;
}


exports.ABC = ABC;
exports.decodeText = decodeText;
