var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var server = require('../utils/server');

var CHANGE_EVENT = 'change';

var _courses = [];

var CoursesStore = assign({}, EventEmitter.prototype, {

  getCourses: function(){
    return _courses;
  },

  init: function(){
    this.reload();
  },

  reload: function(){
    var self = this;
    server.get('/api/courses/').then(function(result){
        _courses = result.body;
        self.emitChange();
    });
  },

  add: function(course){
    var self = this;

    return server
      .post('/api/courses/', course)
      .then(function(result){
        self.reload();
      });
  },

  update: function(id, patch){
    var self = this;
    return server
      .put('/api/courses/' + id + '/', patch)
      .then(function(result){
        self.reload();
      });
  },

  remove: function(id){
    var self = this;
    return server
      .del('/api/courses/' + id + '/')
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

exports.CoursesStore = CoursesStore;
