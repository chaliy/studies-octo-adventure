module.exports.forAll = function(items, func, cb){
  var results = [];

  if (items.length === 0){
    cb(null, results);
  } else {
    items.forEach(function(x){

      func(x, function(err, x2){
        results.push(x2);

        if (results.length === items.length){
          cb(null, results);
        }
      });
    });
  }
};

module.exports.substractSeconds = function(date, duration){
  var MS_PER_SECOND = 1000;
  return new Date(date.valueOf() - duration * MS_PER_SECOND);
};

module.exports.filterNulls = function(items){
  return items.filter(function(x){
    return !!(x);
  });
};
