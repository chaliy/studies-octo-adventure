var express = require('express');
var assert = require('assert');
var router = express.Router();

var EmployeesModel = require('../core/models/employees-model').EmployeesModel;

var utils = require('../core/utils');

router.post('/load/', function(req, res) {

  var loaders = {
    'predefined': EmployeesModel.loadPredefined,
  };

  var loader = loaders[req.body.type];

  if (loader){
    loader(function(err, result){
      res.status(201).json(result);
    });
  } else {
    res.status(400).json("Loader not found!");
  }

});

router.post('', function(req, res) {
  EmployeesModel.add(req.body, function(err, result){
    res.status(201).json(result);
  });
});

router.put('/:id', function(req, res) {
  EmployeesModel.update(req.params.id, req.body, function(err, result){
    res.status(202).json(result);
  });
});

router.delete('/:id', function(req, res) {
  EmployeesModel.remove(req.params.id, function(err, result){
    res.json({});
  });
});

router.get('', function(req, res) {
  EmployeesModel.all({}, function(err, employees){
    assert.equal(err, null);
    res.json(employees);
  });
});

module.exports = router;
