/* jshint esnext: true */
module.exports.rand = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports.randf = function(min, max) {
  return Math.random() * (max - min) + min;
};

module.exports.rad = function(degrees) {
    return degrees * Math.PI / 180;
};

module.exports.concate = function(xx, s){
  if (xx.constructor && xx.constructor.name === 'GeneratorFunction'){
    return [...xx()].join(s);
  }
  return xx.join(s);
};
