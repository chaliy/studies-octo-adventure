var express = require('express');
var router = express.Router();

var model = require('../models/calculator');

router
  .get('/', (req, res) => {    
    res.render('calculator', {});
  })  
  .post('/', (req, res) => {
    var expr = req.body.expr;
    
    res.render('calculator', model(expr));
  });


module.exports = function (app) {
  app.use('/calculator', router);
};
