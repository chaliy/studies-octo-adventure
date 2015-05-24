
function initDict(input){
  var dict = {};

  // Add ABC
  input.split('').forEach(function(sym){
    if (!dict[sym]){
      dict[sym] = '' + (Object.keys(dict).length + 1);
    }
  });

  return dict;
}

function encode(input, init){

  var init = init || initDict(input);
  var phrases = {};
  var output = '';

  Object.keys(init).forEach(function(phrase){
    phrases[phrase] = init[phrase];
  });

  var index = function(item){
    return '' + (Object.keys(phrases).indexOf(item) + 1);
  }

  var phrase = '';
  for(var i = 0; i < input.length; i++){
    var k = input[i];
    if (phrases[phrase + k]){
      phrase += k;
    } else {
      var prevIndex = index(phrase);
      phrases[phrase + k] = prevIndex + k;
      output += phrases[phrase];

      phrase = k;
    }
  }
  if (phrase){
    output += phrases[phrase];
  }

  return {
    dictionary: phrases,
    init: init,
    output : output
  }

}

function decode(input, init){
  var codes = {};
  var output = '';

  Object.keys(init).forEach(function(phrase){
    codes[init[phrase]] = phrase;
  });

  var index = function(code){
    return '' + (Object.keys(codes).indexOf(code) + 1);
  }

  var code = '';
  for(var i = 0; i < input.length; i++){
    var n = input[i];

    if (codes[code + n]){
      code += n;
    } else {
      var prevPhrase = codes[code];
      output += prevPhrase;

      var k = codes[n];
      codes[index(code) + k] = prevPhrase + k;
      code = n;
    }
  }

  if (code){
    output += codes[code];
  }

  return output;

}

// var input = 'МАМАМАЛАЛАМУ';
// console.log(input);
// var res = encode(input);
// console.log(res);
//
// var res2 = decode(res.output, res.init);
// console.log(res2);

module.exports.encode = encode;
module.exports.decode = decode;
