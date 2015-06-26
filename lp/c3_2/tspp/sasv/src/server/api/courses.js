var express = require('express');
var assert = require('assert');
var router = express.Router();

var CoursesModel = require('../core/models/courses-model.js').CoursesModel;

router.post('', function(req, res) {
  CoursesModel.add(req.body, function(err, result){
    assert.equal(err, null);
    res.status(201).json(result);
  });
});

router.put('/:id', function(req, res) {
  CoursesModel.update(req.params.id, req.body, function(err, result){
    res.status(202).json(result);
  });
});

router.delete('/:id', function(req, res) {
  CoursesModel.remove(req.params.id, function(err, result){
    res.json({});
  });
});

router.get('', function(req, res) {
  CoursesModel.all({}, function(err, employees){
    assert.equal(err, null);
    res.json(employees);
  });
});

module.exports = router;
