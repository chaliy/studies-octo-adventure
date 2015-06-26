var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var server = require('../utils/server');

var CHANGE_EVENT = 'change';

var _employees = [];

var EmployeesStore = assign({}, EventEmitter.prototype, {

  getEmployees: function(){
    return _employees;
  },

  init: function(){
    this.reload();
  },

  reload: function(){
    var self = this;
    server.get('/api/employees/').then(function(result){
        _employees = result.body;
        self.emitChange();
    });
  },

  add: function(employee){
    var self = this;
    return server
      .post('/api/employees/', employee)
      .then(function(result){
        self.reload();
      });
  },

  update: function(id, patch){
    var self = this;
    return server
      .put('/api/employees/' + id + '/', patch)
      .then(function(result){
        self.reload();
      });
  },

  remove: function(id){
    var self = this;
    return server
      .del('/api/employees/' + id + '/')
      .then(function(result){
        self.reload();
      });
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

exports.EmployeesStore = EmployeesStore;
