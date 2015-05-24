/* jshint esnext:true */

function buildTree(abcFreq){

  var rec = function(abc){
    if (abc.length === 1){
      return abc[0];
    }
    if (abc.length === 0){
      return null;
    }

    var sum = abc.reduce(function(p,c){
      return p + abcFreq[c];
    }, 0);

    var separatorIndex = 0;
    var leftSum = 0;
    var prevDiff = sum;
    for(var i = 0; i < abc.length; i ++){
      leftSum += abcFreq[abc[i]];
      var newDiff = Math.abs(leftSum - (sum - leftSum));
      if (newDiff > prevDiff){
        separatorIndex = i;
        break;
      }
      prevDiff = newDiff;
    }

    var left = abc.slice(0, separatorIndex);
    var right = abc.slice(separatorIndex);

    return {
      l: rec(left),
      r: rec(right)
    };
  };

  var abc = Object.keys(abcFreq)
    .sort(function(k1, k2){
      return abcFreq[k2] - abcFreq[k1];
    });


  return rec(abc);
}

function buildCodeTable(tree){

  var code_table = {};

  var rec = function(currentCode, node){
    if (node){
      if (typeof(node) === 'string'){
        code_table[node] = currentCode;
        return;
      }
      rec(currentCode + '0', node.l);
      rec(currentCode + '1', node.r);
    }
  };

  rec('', tree);

  return code_table;
}

module.exports.buildCodeTable = function(abcFreq){
  var tree = buildTree(abcFreq);
  return buildCodeTable(tree);
};
