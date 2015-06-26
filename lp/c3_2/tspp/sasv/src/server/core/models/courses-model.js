var assign = Object.assign || require('object-assign');
var assert = require('assert');
var utils = require('../utils');

var dal = require('../dal').CoursesDataAccess;


var CoursesModel = assign({}, {
  /**
  * Список всіх курсів
  **/
  all: function(filter, cb){
    dal.all(filter, cb);
  },
  /**
  * Зберегти зміни в курси
  **/
  update: function(id, course, cb){
    dal.update(id, course, cb);
  },

  /**
  * Додати курс
  **/
  add: function(course, cb){
    dal.add(course, cb);
  },

  /**
  * Видалити курс
  **/
  remove: function(id, cb){
    dal.remove(id, cb);
  },

});


exports.CoursesModel = CoursesModel;
