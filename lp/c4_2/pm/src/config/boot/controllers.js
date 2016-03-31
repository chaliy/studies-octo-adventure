var glob = require('glob');

module.exports = app => {
  var controllers = glob.sync(__dirname + '/../../app/controllers/**/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });
};
