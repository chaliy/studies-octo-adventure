var ABC =  ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var decodeTextDictionary = function(text, abc, code){
  var decoded = '';
  for(var i = 0; i < text.length; i++){

    var char = text.charAt(i);
    var index = code.indexOf(char);
    decoded += abc.charAt(index);
  }

  return decoded;
}

var decodeText = function(text, decode, abc){
  text = text || '';
  var size = abc.length;
  var shift = 2;
  if (decode){
    shift = (size - shift) % size;
  }
  var decoded = '';
  for(var i = 0; i < text.length; i++){

    var char = text.charAt(i);
    var abcCode = abc.indexOf(char);

    if (abcCode >= 0){
      var decodedCode = (abcCode + shift) % size;
      decoded += abc.charAt(decodedCode);
    } else {
      decoded += char;
    }
  }

  return decoded;
}


exports.ABC = ABC;
exports.decodeTextDictionary = decodeTextDictionary;
exports.decodeText = decodeText;
