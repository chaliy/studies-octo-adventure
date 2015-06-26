var assign = Object.assign || require('object-assign');
var assert = require('assert');
var utils = require('../utils');

var dal = require('../dal').EmployeesDataAccess;


var _predefinedEmployees = {
  'Паша Чеховський': {position: 'Супер Директор'},
};

var _getEmployeeNames = function(){
  return Object.keys(_predefinedEmployees);
};

/**
* Обробка запису збереженного користувачем
*   - Валідація стану сутності
*   - Бізнес правила
*   - Нотифікація зацікавлених сторін
**/
var _process = function(employee, cb){
  cb(null, employee);
};

var EmployeesModel = assign({}, {
  /**
  * Список всіх employee
  **/
  all: function(filter, cb){
    dal.all(filter, cb);
  },
  /**
  * Зберегти зміни в employee
  **/
  update: function(id, patch, cb){
    _process(patch, function(err, employee){
      dal.update(id, employee, cb);
    });
  },

  /**
  * Додати employee
  **/
  add: function(employee, cb){
    _process(employee, function(err, employee){
      dal.add(employee, cb);
    });
  },

  /**
  * Видалити employee
  **/
  remove: function(id, cb){
    dal.remove(id, cb);
  },

  loadPredefined: function(cb){
    utils.forAll(_getEmployeeNames(),
      function(fullName, cb2){

        var predefined = _predefinedEmployees[fullName];

        dal.merge({fullName: fullName}, predefined, function(err, result){
          cb(err, fullName);
        });

      },
      function(err, fullNames){
        assert.equal(err, null);
        close();

        cb(null, fullNames);
      }
    );
  },

});


exports.EmployeesModel = EmployeesModel;
