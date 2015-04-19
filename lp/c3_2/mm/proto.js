var assert = require('assert');

var c1 = 'Y';
var c2 = 'Y';
var p1 = null;

var specs = [
  { prec: {c1: 'Y', c2: 'Y', p1: 'r'}, action: {c1: 'R', c2: 'Y'} },
  { prec: {c1: 'R', c2: 'Y', p1: 'r'}, action: {c1: 'R', c2: 'G'} },
  { prec: {c1: 'R', c2: 'G', p1: 'r'}, action: {c1: 'R', c2: 'Y', p1: 'R'} },
  { prec: {c1: 'R', c2: 'Y', p1: 'g'}, action: {c1: 'Y', c2: 'Y'} },
  { prec: {c1: 'Y', c2: 'Y', p1: 'g'}, action: {c1: 'Y', c2: 'R'} },
  { prec: {c1: 'Y', c2: 'R', p1: 'g'}, action: {c1: 'G', c2: 'R'} },
  { prec: {c1: 'G', c2: 'R', p1: 'g'}, action: {c1: 'Y', c2: 'R', p1: 'G'} },
  { prec: {c1: 'Y', c2: 'R', p1: 'r'}, action: {c1: 'Y', c2: 'Y'} }
];

var match = function(item){
  var prec = item.prec;
  if (prec.c1 === c1 && prec.c2 === c2){
    if (prec.p1){
      if ((prec.p1 === 'r' && p1 != 'R') || (prec.p1 === 'g' && p1 != 'G')){
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
};

for(var i = 0; i < 100; i++){

  var spec = specs.filter(match)[0];
  assert(spec);

  var action = spec.action;
  c1 = action.c1;
  c2 = action.c2;

  assert(!(c1 == 'G'&& c2 == 'G'));

  if (action.p1){
    p1 = action.p1;
  }

  console.log(c1, c2);
}

// // Print C specs
// specs.forEach(function(x, i){
//   var r = 'SPEC spec' + (i+1) + ' = SPEC{' + x.prec.c1 + ', '+ x.prec.c2;
//   r += ', ' + ((x.prec.p1) ? x.prec.p1 : '_');
//   r += ', ' + x.action.c1 + ', '+ x.action.c2;
//   r += ', ' + ((x.action.p1) ? x.action.p1 : '_');
//   r += '};';
//   console.log(r);
// });
