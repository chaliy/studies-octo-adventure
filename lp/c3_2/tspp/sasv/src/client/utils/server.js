var agent = require('superagent-promise');

module.exports.post = function(uri, data){
  return agent
    .post(uri, data)
    .end();
};

module.exports.put = function(uri, data){
  return agent
    .put(uri, data)
    .end();
};

module.exports.del = function(uri){
  return agent
    .del(uri)
    .end();
};

module.exports.get = function(uri){
  return agent
    .get(uri)
    .end();
};
