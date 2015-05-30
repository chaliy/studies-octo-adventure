/* jshint esnext:true */
function isParityBit(x){
  // 1,2,4,8,16
  return (x & (x - 1)) === 0;
}

function calcParity(p, input){
  var pos = Math.pow(2, p-1);
  var encodedPos = pos-1;
  var parity1 = 0;
  var parityBit = true;
  var check = true;
  var checkCount = 0;
  var checkA = [];
  for(var i = pos; i <= input.length; i++){
    if (!parityBit && check){
      if (input[i-1] === 1){
        parity1++;
        checkA.push(input[i-1]);
      }
    }
    parityBit = false;
    checkCount++;
    if (checkCount >= pos){
      check = !check;
      checkCount = 0;
    }
  }

  return parity1%2;
}

function encode(input){

  // NOTE Most stupid implemenation possible

  // Encode space
  var encoded = [];
  var queue = input.slice();
  var parityBitsCount = 0;
  while(queue.length > 0){
    if (isParityBit(encoded.length + 1)){
      parityBitsCount++;
      encoded.push(0);
    } else {
      encoded.push(queue.shift());
    }
  }

  // Set parity bits
  for(var p = 1; p <= parityBitsCount; p++){
    var pos = Math.pow(2, p-1);
    encoded[pos-1] = calcParity(p, encoded);
  }

  return encoded;
}

function decode(input){
  var decoded = [];
  var errorParities = [];

  var p = 1;
  for(var i = 0; i < input.length; i++){
    if (isParityBit(i+1)){
      if (input[i] != calcParity(p, input)){
        errorParities.push(p);
      }
      p++;
    } else {
      decoded.push(input[i]);
    }
  }

  return {
    result: decoded,
    errorParities: errorParities
  };
}

module.exports.isParityBit = isParityBit;
module.exports.encode = encode;
module.exports.decode = decode;
