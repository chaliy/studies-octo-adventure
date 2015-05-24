/* jshint esnext:true */

function buildSortedAbc(abc_freq){
  return Object.keys(abc_freq)
    .sort(function(k1, k2){
      return abc_freq[k2] - abc_freq[k1];
    });
}

function buildTree(abcFreq){

  var queue = Object.keys(abcFreq)
      .map(function(k){
        return {
          sym: k,
          code: '',
          weight: abcFreq[k]
        };
      });

  var sortByPriority = function(){
    queue.sort(function(a, b){
      return b.weight - a.weight;
    });
  };

  while(queue.length > 1) {
    sortByPriority();    
    var right = queue.pop();
    var left = queue.pop();

    queue.push({
      right: right,
      left: left,
      code: '',
      weight: right.weight + left.weight
    });
  }
  return queue[0];
}

function buildCodeTable(tree){
  var codeTable = {};

  var rec = function(code, node){
    if (node){
      if (node.sym){
        codeTable[node.sym] = code;
      } else {
        rec('1' + code, node.left);
        rec('0' + code, node.right);
      }
    }
  };

  rec('', tree);

  return codeTable;
}

module.exports.buildCodeTable = function(abcFreq){
  var tree = buildTree(abcFreq);
  return buildCodeTable(tree);
};
